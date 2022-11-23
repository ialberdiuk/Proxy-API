const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const faker = require('faker');
const UserController = require('./user.controller');
const UserService = require('../services/user.service');

describe('UserController', () => {
  describe('register a new user', () => {
    let status; 
    let json; 
    let res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });
    it('should not register a user when name param is not provided', async () => {
      const req = { body: { email: faker.internet.email() } };

      await UserController.signUp(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal('Invalid Params');
    });

    it('should not register a user when name and email params are not provided', async () => {
      const req = { body: {} };

      await UserController.signUp(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal('Invalid Params');
    });

    it('should not register a user when email param is not provided', async () => {
      const req = { body: { name: faker.name.findName() } };

      await UserController.signUp(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal('Invalid Params');
    });

    it('should register a user when email, username and password are provided', async () => {
      const req = {
        body: { username: faker.name.findName(), email: faker.internet.email(), password: 'asdshd87324' },
      };

      const stubValue = {
        username: faker.name.findName(),
        email: faker.internet.email(),
        hashed_password: 'asdshd87324'
      };

      const stubCreate = {
        username: faker.name.findName(),
        email: faker.internet.email(),
        hashed_password: 'asdshd87324'
      }
      sinon.stub(UserService, 'getUser').returns(stubValue);
      const createUserStub = sinon.stub(UserService, 'create').returns(stubCreate);
      await UserController.signUp(req, res);
      expect(createUserStub.calledOnce).to.be.true;
      expect(createUserStub.calledOnce).to.be.true;
      expect(createUserStub.args[0][0]).to.equal(req.body.username);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].data).to.equal(stubCreate);
    });
  });
});
