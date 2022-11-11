import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser = {
  email: 'juhan@juurikas.ee',
  password: 'juhan',
};

const wrongUser = {
  email: 'wrog@wrong.ee',
  password: 'wrongpassword',
};

describe('Login controller', () => {
  describe('POST /api/v1/login', () => {
    it('responds with error message and statusCode 404', async () => {
      const response = await request(app).post('/api/v1/login').send(wrongUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('User not found');
    });
    it('responds with token and statusCode 200', async () => {
      const response = await request(app).post('/api/v1/login').send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.token).to.a('string');
    });
  });
});