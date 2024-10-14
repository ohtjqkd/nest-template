import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MySqlContainer } from '@testcontainers/mysql';
import { createConnection } from 'mysql2';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import * as mongoose from 'mongoose';
import * as net from 'net';

const dynamicPort = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(() => resolve(port));
    });
    server.on('error', (err) => reject(err));
  });
};

const startGenericContainer = async (
  image: string,
  port?: number,
): Promise<StartedTestContainer> => {
  const exposedPort = port ? port : await dynamicPort();
  return await new GenericContainer(image)
    .withExposedPorts(exposedPort)
    .start();
};

const startMySqlContainer = async () => {
  const mysqlContainer = await new MySqlContainer().start();
  const mysqlClient = createConnection(mysqlContainer.getConnectionUri());
  mysqlClient.connect();
  return { mysqlContainer, mysqlClient };
};

const startMongoContainer = async () => {
  // start mongo container
  const container = await startGenericContainer('mongo:latest', 27017);
  const mongoPort = container.getFirstMappedPort();
  const client = await mongoose.connect(
    `mongodb://${container.getHost()}:${mongoPort}/test`,
  );
  return { container, client };
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Set testcontainer before all tests
  let mongoContainer: StartedTestContainer;
  let mongoClient;

  beforeAll(async () => {
    // if you need to some container before all tests
    // you can use some container here; e.g. mysql, mongo, redis, etc.
    // mysqlContainer = await new MySqlContainer().start();
    // mysqlClient = createConnection(mysqlContainer.getConnectionUri());
    // mysqlClient.connect();
    const { container, client } = await startMongoContainer();
    mongoContainer = container;
    mongoClient = client;
    mongoClient
      .collection('test')
      .insertMany([{ test: 'test1' }, { test: 'test2' }]);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // if you need to clean up the test environment after all tests
    // you can clean up the container here
    await mongoClient.close();
    await mongoContainer.stop();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
