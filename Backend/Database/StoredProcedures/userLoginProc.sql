CREATE OR ALTER PROCEDURE userLoginProc(@userName VARCHAR(100))
AS 
BEGIN 
SELECT * FROM userTable
WHERE userName=@userName
END; 
SELECT * FROM userTable