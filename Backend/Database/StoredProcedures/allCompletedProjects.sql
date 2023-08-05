CREATE OR ALTER PROCEDURE allCompletedProjects
AS 
BEGIN 
SELECT * FROM projectTable WHERE status=1
END;

EXECUTE allCompletedProjects