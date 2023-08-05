CREATE OR ALTER PROCEDURE completeProject(@userId VARCHAR(500), @projectId VARCHAR(200))
AS 
BEGIN 
UPDATE projectTable 
SET status=1
WHERE assignedTo = @userId AND projectId = @projectId
END;



-- SELECT * FROM projectTable WHERE assignedTo = @userId
-- EXECUTE completeProject '0f03d02a-0c88-432a-bc8c-88d5a4f79949', '0569da57-2bb6-4b5d-a7df-f4ad46f46c7e'