import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

describe('Posts controller', () => {
  describe('GET /posts', () => {
    it('responds with error message and status 401', async () => {
      const response = await request(app).get('/api/v1/posts');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('Token not found');
    });
  });
});