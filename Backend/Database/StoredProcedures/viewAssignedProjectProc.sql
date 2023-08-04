CREATE OR ALTER PROCEDURE viewAssignedProjectProc(@userId VARCHAR (100))
AS 
BEGIN 
SELECT * FROM projectTable 
WHERE assignedTo=@userId
END;