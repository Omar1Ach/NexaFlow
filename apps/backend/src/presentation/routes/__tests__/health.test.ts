import request from 'supertest';
import app from '../../../app';
import { prisma } from '../../../infrastructure/database/prismaClient';

describe('GET /api/v1/health', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return 200 with success true', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true });
  });
});
