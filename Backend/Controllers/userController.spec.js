import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { allusers, checkUser, registerUser, updateUser, userCompleteProject } from "./userController";

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

      const mockUpusers=[
        {
          userId:"97yhuit68uyt8jk",
          userName:"David Munyiri",
          userEmail:"davidmunyiri2019@outlook.com",
          userPassword:"h732865t4gy83365236"
        },
        {
          userId:"97yhueb87weib738",
          userName:"Dawud Munyiri",
          userEmail:"davidmunyiri2019@gmail.com",
          userPassword:"h7334987yfehur"
        }
      ]

      const req={}
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce({
      recordset:mockUpusers,
    })
})
await allusers(req,res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:"Here is the list of users",users:allusers})
    })
    
  })
  ///TEST FOR USER DETAILS UPDATE
  describe("Test if users details are updated succesful",()=>{
    it("Should update User Details succesfully",async()=>{

      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy")
      const userId="0972vsbyubwte6"
      const mockUserdetails={
        userName:"Dawud Mahubali",
        userEmail:"dawud@gmail.com",
        userPhone:"098765765",
        userPassword:"Mahu#1234",
      }
      const req={
        params:{
          userId,
        },
        body:{
          mockUserdetails
        }
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:1,
         }),
      })
      await updateUser(req,res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({message: "Details updated succsessfully"})
    })//////
    it("Should not update User Details succesfully",async()=>{
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy")
      const mockId="o9j87h67huhb"
      const mockUserdetails={
        userName:"Dawud Mahubali",
        userEmail:"dawud@gmail.com",
        userPhone:"098765765",
        userPassword:"Mahu#1234"
      }
      const req={
        params:{
          mockId,
        },
        body:{
          mockUserdetails,
        }
      
      }
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:0,
        }),
      })
      await updateUser(req,res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({message: "Details not  updated"})
    })


  })///test for user details update ends here
  describe("Test User Login",()=>{
    it("Should Enable a user to Login",async()=>{

    })
  })

  describe('user to complete a project successfully',()=>{
    const req = {
      body: {projectId: "381246da-c1a1-4d98-8b11-b9ae45127bea"},
      params: {
        userId: "fegi"
      }
    }
    
    it("mark a certain project as completed", async()=>{
      const mockedInput = jest.fn().mockReturnThis()

      const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

      const mockedRequest ={
          input: mockedInput,
          execute: mockedExecute
      }
      const mockedPool ={
        request: jest.fn().mockReturnValue(mockedRequest)
      }
      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

      await userCompleteProject(req,res)

      expect(mockedInput).toHaveBeenCalledWith('userId', mssql.VarChar, req.params.userId);
      expect(mockedInput).toHaveBeenCalledWith('projectId', mssql.VarChar, req.body.projectId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
          message: 'Project marked as completed'
      })

    })

    it('ought to gennerate an error if marking as completed fails', async()=>{
      const mockedInput = jest.fn().mockReturnThis()

      const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

      const mockedRequest ={
          input: mockedInput,
          execute: mockedExecute
      }
      const mockedPool ={
        request: jest.fn().mockReturnValue(mockedRequest)
      }
      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

      await userCompleteProject(req,res)

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
          message: 'Update failed, kindly ensure you have input the correct credentials'
      })
    })
    
  })


  describe('Check user token',()=>{
    it('should check the user token information', async()=>{
      const req = {
        info: {
              userName: "jese faith",
              userEmail: "selesterat@gmail.com",
              userPhone: "5945905",
              profilePic: null,
              role: "user"
        }
      }
      await checkUser(req,res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(req.info)
    })
  })

});
