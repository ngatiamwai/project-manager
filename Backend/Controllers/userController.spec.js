import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { allusers, registerUser } from "./userController";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe(" Tests For Users Controller", () => {
  describe("Registering a User", () => {
    it("should Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
      const mockUser = {
        userName: "David Munyiri",
        userEmail: "davidmunyiri2019@outlook.com",
        userPhone: "64262416216",
        userPassword: "Mahu12#34",
      };
      const req = {
        body: mockUser,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      });
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Registered Succesful",
      });
    });

    it("should Not Register a User", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
      const mockUser = {
        userName: "David Munyiri",
        userEmail: "davidmunyiri2019@outlook.com",
        userPhone: "64262416216",
        userPassword: "Mahu12#34",
      };
      const req = {
        body: mockUser,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 0,
        }),
      });
      await registerUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Error Registering User",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  }); ///Registering a user test ends here

  //TEST TO GET ALL USERS
  describe("display All USERS",()=>{
    it("should display all users",async()=>{
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce()
})
await allusers(req,res)

expect(res.json).toHaveBeenCalledWith({message:"Here is the list of users",users:allusers})
    })
    
  })
});
