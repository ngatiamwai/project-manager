CREATE OR ALTER PROCEDURE getOneProject(@projectId VARCHAR(200))
AS
    BEGIN
        SELECT * FROM projectTable WHERE projectId = @projectId
    END