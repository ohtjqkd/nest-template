import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { Connection, createConnection } from 'mysql2';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Set testcontainer before all tests
  let mysqlContainer: StartedMySqlContainer;
  let mysqlClient: Connection;

  beforeAll(async () => {
    // if you need to some container before all tests
    // you can use some container here; e.g. mysql, mongo, redis, etc.
    mysqlContainer = await new MySqlContainer().start();
    mysqlClient = createConnection(mysqlContainer.getConnectionUri());
    mysqlClient.connect();
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
