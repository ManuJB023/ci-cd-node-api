const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message with API info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Welcome to the CI/CD Node API');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /health', () => {
    it('should return detailed health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('GET /api/users', () => {
    it('should return paginated list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);

      const firstUser = response.body.users[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('email');
      expect(firstUser).toHaveProperty('createdAt');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/users?page=1&limit=2')
        .expect(200);

      expect(response.body.users.length).toBeLessThanOrEqual(2);
      expect(response.body.pagination).toHaveProperty('currentPage', 1);
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalUsers');
    });

    it('should support name filtering', async () => {
      const response = await request(app)
        .get('/api/users?name=john')
        .expect(200);

      if (response.body.users.length > 0) {
        response.body.users.forEach(user => {
          expect(user.name.toLowerCase()).toContain('john');
        });
      }
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return specific user', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid user ID', async () => {
      const response = await request(app)
        .get('/api/users/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('POST /api/users', () => {
    it('should create new user with valid data', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.name).toBe(newUser.name);
      expect(response.body.user.email).toBe(newUser.email.toLowerCase());
      expect(response.body.user).toHaveProperty('createdAt');
      expect(response.body.user).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
      expect(response.body).toHaveProperty('details');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'invalid-email'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Please provide a valid email address');
    });

    it('should return 400 for short name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'A',
          email: 'test@example.com'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Name must be a string with at least 2 characters');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update existing user', async () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com'
      };

      const response = await request(app)
        .put('/api/users/1')
        .send(updatedUser)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'User updated successfully');
      expect(response.body.user.id).toBe(1);
      expect(response.body.user.name).toBe(updatedUser.name);
      expect(response.body.user.email).toBe(updatedUser.email);
      expect(response.body.user).toHaveProperty('updatedAt');
    });

    it('should update only provided fields', async () => {
      const response = await request(app)
        .put('/api/users/2')
        .send({ name: 'Only Name Updated' })
        .expect(200);

      expect(response.body.user.name).toBe('Only Name Updated');
      expect(response.body.user).toHaveProperty('email');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .put('/api/users/999')
        .send({ name: 'Test', email: 'test@example.com' })
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid user ID', async () => {
      const response = await request(app)
        .put('/api/users/invalid')
        .send({ name: 'Test' })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete existing user', async () => {
      const response = await request(app)
        .delete('/api/users/3')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'User deleted successfully');
      expect(response.body).toHaveProperty('deletedUser');
      expect(response.body.deletedUser).toHaveProperty('id', 3);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid user ID', async () => {
      const response = await request(app)
        .delete('/api/users/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('GET /api/stats', () => {
    it('should return API statistics', async () => {
      const response = await request(app)
        .get('/api/stats')
        .expect(200);

      expect(response.body).toHaveProperty('totalUsers');
      expect(response.body).toHaveProperty('apiVersion', '1.0.0');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent API routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'API endpoint not found');
      expect(response.body).toHaveProperty('availableEndpoints');
    });

    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});
