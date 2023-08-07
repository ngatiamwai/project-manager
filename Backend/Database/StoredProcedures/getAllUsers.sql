CREATE OR ALTER PROCEDURE getAllUsersProc
AS
BEGIN SELECT userId, userName, userEmail, userPhone, role FROM userTable
END;