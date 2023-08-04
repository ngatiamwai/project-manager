BEGIN
    TRY
        CREATE TABLE projectTable(
            projectId VARCHAR(200) PRIMARY KEY,
            projectName VARCHAR(500) NOT NULL,
            projectDescription VARCHAR(1000) NOT NULL,
            startDate DATE DEFAULT GETDATE(),
            endDate DATE NOT NULL,
            status BIT DEFAULT 0,
            assignedTo VARCHAR(100),
            FOREIGN KEY (assignedTo) REFERENCES userTable (userName)
            ON DELETE SET NULL
            ON UPDATE CASCADE
        )

    END TRY
BEGIN
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH  
    
   
