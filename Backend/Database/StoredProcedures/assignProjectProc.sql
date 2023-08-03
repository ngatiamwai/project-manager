CREATE OR ALTER PROCEDURE assignProjectProc(@userName VARCHAR(100),@projectId VARCHAR(100))
AS 
BEGIN 
UPDATE projectTable 
SET assignedTo=@userName 
WHERE projectId=@projectId 
END;