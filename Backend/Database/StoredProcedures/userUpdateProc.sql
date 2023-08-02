CREATE OR ALTER PROCEDURE userUpdateProc(@userId VARCHAR(100),@userName VARCHAR(100),@userEmail VARCHAR(100),@userPhone VARCHAR(20),@userPassword VARCHAR(MAX),@profilePic VARCHAR(200))
AS 
BEGIN 
UPDATE userTable
SET userName=@userName, userEmail=@userEmail,userPhone=@userPhone,userPassword=@userPassword,profilePic=@profilePic
WHERE userId=@userId 
END;