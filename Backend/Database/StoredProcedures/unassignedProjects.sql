CREATE OR ALTER PROCEDURE unassignedProjectsProc
AS 
BEGIN 
SELECT projectId, projectName, projectDescription, startDate, endDate FROM projectTable WHERE assigned=0
END;

