CREATE OR ALTER PROCEDURE viewAllAssignedProjectsProc (@assigned INT)
AS 
BEGIN 
SELECT * FROM projectTable 
WHERE assigned=@assigned
END;