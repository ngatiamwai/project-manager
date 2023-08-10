import jwt from 'jsonwebtoken';
const { tokenVerfying } = require('./verifyToken')



describe('Checking Token', () => {
    it('should get the token', async () => {
        const validToken = jwt.sign({ userID: '1234' }, 'sfdrfsdsfsfdr');
        const req = {
            headers: { token: validToken },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
        await tokenVerfying(req, res, next)


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
        const invalidToken = 'iugui.uiguoiyh.iyfhvygi';
      
        const req = {
          headers: { token: invalidToken }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
      
        await tokenVerfying(req, res, next);
      
        expect(res.json).toHaveBeenCalledWith({ Error: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
      });
      
      

});
