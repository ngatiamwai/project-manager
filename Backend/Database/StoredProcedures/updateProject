CREATE OR ALTER PROCEDURE updateProject(@projectId VARCHAR(200), @projectName VARCHAR(500), @projectDescription VARCHAR(1000), @startDate DATE, @endDate DATE)
AS
    BEGIN
        UPDATE projectTable SET projectName = @projectName, projectDescription = @projectDescription,
        startDate = @startDate, endDate = @endDate WHERE projectId = @projectId;
    END