import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './domains/user/user.service';
import { UserRepository } from './domains/user/user.repository';

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

describe('Service Tests', () => {
  let service: UserService;

  beforeAll(async () => {
    // prepare the test environment for all test cases
  });

  afterAll(async () => {
    // clean up the test environment for all test cases
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(() => {
              // mock implementation
              return ['test1', 'test2'];
            }),
          },
        },
      ],
    }).compile();

    service = moduleFixture.get<UserService>(UserService);
  });

  it('Define Service Test', async () => {
    expect(service).toBeDefined();
  });

  it('Test getUserList', async () => {
    expect(service.getUserList()).resolves.toEqual(['test1', 'test2']);
  });
});
