import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('Controller Tests', () => {
  let app: INestApplication;

  let controller: AppController;

  beforeAll(async () => {
    // prepare the test environment for all test cases
  });

  afterAll(async () => {
    // clean up the test environment for all test cases
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn(() => 'Hello World!'),
            getTest: jest.fn().mockResolvedValue(['test1', 'test2']),
          },
        },
      ],
    }).compile();

    controller = moduleFixture.get<AppController>(AppController);
  });

  // test cases
  it('Define Test', async () => {
    expect(controller).toBeDefined();
  });

  it('GET /', () => {
    expect(controller.getHello()).toBe('Hello World!');
  });
});
