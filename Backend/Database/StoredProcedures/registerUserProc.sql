CREATE OR ALTER PROCEDURE registerUserProc(@userId VARCHAR(100),@userName VARCHAR(50),@userEmail VARCHAR(50),@userPhone VARCHAR(50),@userPassword VARCHAR(MAX),@role VARCHAR(20))
AS 
BEGIN 
INSERT INTO userTable(userId,userName,userEmail,userPhone,userPassword,role)
VALUES 
(@userId,@userName,@userEmail,@userPhone,@userPassword,@role)
END; 
SELECT * FROM userTable