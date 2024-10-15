import { assert } from 'chai';
import { beforeEach, afterEach, it } from 'mocha';
import { Test, TestingModule } from '@nestjs/testing';
import { SinonSandbox, createSandbox } from 'sinon';
import { UserController } from './domains/user/user.controller';
import { UserService } from './domains/user/user.service';
import { UserRepository } from './domains/user/user.repository';
import { Users } from './domains/user/entity/user.model';

describe('User Controller (unit)', () => {
  let controller: UserController;
  let service: UserService;
  let sandbox: SinonSandbox;

  beforeEach(async () => {
    // prepare the test environment for all test cases
    // create a module

    sandbox = createSandbox();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    controller = moduleFixture.get<UserController>(UserController);
    service = moduleFixture.get<UserService>(UserService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Define Test', async () => {
    assert.isDefined(controller);
    assert.isDefined(service);
  });

  it('Create User', async () => {
    const user: Users = {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      password: 'test',
      role: 'test',
      created_at: new Date(),
      updated_at: new Date(),
    };

    assert.isDefined(user);

    sandbox.stub(service, 'createUser').resolves(user);
    const result = await controller.createUser(user);
    assert.isDefined(result);

    assert.equal(result, user);
  });
});
