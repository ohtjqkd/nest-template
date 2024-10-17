import net from 'net';
import mongoose from 'mongoose';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { MySqlContainer } from '@testcontainers/mysql';
import * as mysql from 'mysql2';

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

export const startMySqlContainer = async () => {
  const mysqlContainer = await new MySqlContainer().start();
  const mysqlClient = mysql.createConnection(mysqlContainer.getConnectionUri());
  mysqlClient.connect();
  return { mysqlContainer, mysqlClient };
};

export const startMongoContainer = async () => {
  // start mongo container
  const container = await startGenericContainer('mongo:latest', 27017);
  const mongoPort = container.getFirstMappedPort();
  const client = await mongoose
    .createConnection(`mongodb://${container.getHost()}:${mongoPort}/test`)
    .asPromise();

  return { container, client };
};
