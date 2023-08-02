BEGIN 
TRY 
CREATE TABLE userTable(
    userId VARCHAR(100) PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    userEmail VARCHAR(100) NOT NULL,
    userPhone VARCHAR (15) NOT NULL,
    userPassword VARCHAR(MAX) NOT NULL,
    --CONSTRAINT FK_usersProject FOREIGN KEY (projectId) REFERENCES projectTable
)
END TRY
BEGIN 
CATCH 
THROW 50001,'Table has already been created',1
END 
CATCH 

