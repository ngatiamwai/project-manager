CREATE OR ALTER PROCEDURE deleteProject(@projectId VARCHAR(200))
AS
BEGIN
    DELETE FROM projectTable WHERE projectId=@projectId
END