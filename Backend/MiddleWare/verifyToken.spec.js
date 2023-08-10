import jwt from 'jsonwebtoken';
const { tokenVerfying } = require('./verifyToken')
jest.mock('jsonwebtoken');


describe('Checking Token', () => {
    it('should get the token', async () => {
        jwt.verify.mockReturnValue({ userID: '1234' });

        const req = {
            headers: { token: 'valid_token' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        await tokenVerfying(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('Show 401 if token is missing', async () => {
        const req = { headers: {} };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const next = jest.fn();
        await tokenVerfying(req, res, next),

            expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'You are not allowed to be seeing This, provide a token' })
    });

    it('should handle invalid token', async () => {
        const req = {
          headers: { token: 'invalid_token' },
        };
        const res = {
          json: jest.fn(),
        };
        const next = jest.fn();
      
        try {
          await tokenVerfying(req, res, next);
        } catch (error) {
          expect(error.message).toBe('Invalid token');
        }
      
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
      
});
