CREATE OR ALTER PROCEDURE assignProjectProc(@userId VARCHAR(100),@projectId VARCHAR(100),@assigned INT)
AS 
BEGIN 
UPDATE projectTable 
SET assignedTo=@userId ,assigned=@assigned
WHERE projectId=@projectId 
END;