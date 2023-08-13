import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  allusers,
  loginUser,
  registerUser,
  updateUser,
} from "./userController";

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
  describe("display All USERS", () => {
    it("should display all users", async () => {
      const mockUpusers = [
        {
          userId: "97yhuit68uyt8jk",
          userName: "David Munyiri",
          userEmail: "davidmunyiri2019@outlook.com",
          userPassword: "h732865t4gy83365236",
        },
        {
          userId: "97yhueb87weib738",
          userName: "Dawud Munyiri",
          userEmail: "davidmunyiri2019@gmail.com",
          userPassword: "h7334987yfehur",
        },
      ];

      const req = {};
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          recordset: mockUpusers,
        }),
      });
      await allusers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Here is the list of users",
        users: mockUpusers,
      });
    });
  });
  ///TEST FOR USER DETAILS UPDATE
  describe("Test if users details are updated succesful", () => {
    it("Should update User Details succesfully", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
      const userId = "0972vsbyubwte6";
      const mockUserdetails = {
        userName: "Dawud Mahubali",
        userEmail: "dawud@gmail.com",
        userPhone: "098765765",
        userPassword: "Mahu#1234",
      };
      const req = {
        params: {
          userId,
        },
        body: {
          mockUserdetails,
        },
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      });
      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Details updated succsessfully",
      });
    }); //////
    it("Should not update User Details", async () => {
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
      const mockId = "wrong id";
      const mockUserdetails = {
        userName: "Dawud Mahubali",
        userEmail: "dawud@gmail.com",
        userPhone: "",
        userPassword: "Mahu#1234",
      };
      const req = {
        params: {
          mockId,
        },
        body: {
          mockUserdetails,
        },
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 0,
        }),
      });
      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Details not  updated",
      });
    });
  }); ///test for user details update ends here
  describe("Test User Login", () => {
    it("Should return an error if no username or password is provided or both", async () => {
      const req = {
        body: {},
      };
      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Kindly input your credentials",
      });
    });
    it("Should Enable a user to Login and return a token", async () => {
      const user = {
        userId: "787rnyhcg3gv8bg34cr",
        userName: "Mahubali",
        userEmail: "mahubali@gmail.com",
        userPhone: "0986215464",
        role: "NULL",
        userPassword: "ouiweuiriuew907ajbf",
        profilePic: "NULL",
      };
      const req = {
        body: {
          userName: user.userName,
          userPassword: "12345678",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
          recordset: [user],
        }),
      });

      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      jest.spyOn(jwt, "sign").mockReturnValueOnce("mockedToken");

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Logged in successful",
        token: "mockedToken"
      });
    }); //////////////
  });
});
