CREATE OR ALTER PROCEDURE addProjectPROC(@projectId VARCHAR(200), @projectName VARCHAR(500), @projectDescription VARCHAR(1000), @endDate DATE)
AS
BEGIN
    INSERT INTO projectTable(projectId, projectName, projectDescription, endDate) VALUES(@projectId, @projectName, @projectDescription, @endDate)
END