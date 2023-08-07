CREATE OR ALTER PROCEDURE registerUserProc(@userId VARCHAR(100),@userName VARCHAR(50),@userEmail VARCHAR(50),@userPhone VARCHAR(50),@userPassword VARCHAR(MAX))
AS 
BEGIN 
INSERT INTO userTable(userId,userName,userEmail,userPhone,userPassword)
VALUES 
(@userId,@userName,@userEmail,@userPhone,@userPassword)
END; 
SELECT * FROM userTable