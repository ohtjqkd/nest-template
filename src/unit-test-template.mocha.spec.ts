import { expect } from 'chai';

import { beforeEach, afterEach, it, before, after } from 'mocha';
import { Test, TestingModule } from '@nestjs/testing';
import { SinonSandbox, createSandbox } from 'sinon';
import { UserController } from './domains/user/user.controller';
import { UserService } from './domains/user/user.service';
import { UserRepository } from './domains/user/user.repository';
import { UserDto } from './domains/user/entity/user.model';

describe('User Controller (unit)', () => {
  let controller: UserController;
  let service: UserService;
  let sandbox: SinonSandbox;

  before(async () => {});

  after(async () => {});

  beforeEach(async () => {
    // prepare the test environment for all test cases
    // create a module

    sandbox = createSandbox();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = moduleFixture.get<UserController>(UserController);
    service = moduleFixture.get<UserService>(UserService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Create User', async () => {
    const inputBody: UserDto = {
      name: 'test',
    };

    const expectedUser = UserDto.create({
      name: 'test',
    });

    sandbox.stub(service, 'createUser').resolves(expectedUser);
    const result = await controller.createUser(inputBody);
    return expect(result).to.deep.equal(expectedUser);
  });
});
