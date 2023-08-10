import mssql from 'mssql'
import { allCompletedProjects, createProject, deleteProject, getOneProject, unassignedProjects, updateProject, viewallprojects } from './projectController'



const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}

describe('Project Controller', ()=>{
    
    describe('Creating a project',()=>{
            const req = {
                body: {
                    projectName: "projects main",
                    projectDescription: "build a dam",
                    startDate: "2021/04/04",
                    endDate: "2023/04/04"
                }
            }
        it('should create a project successfully', async()=>{

            const mockedInput = jest.fn().mockReturnThis()//for chained inputs on after the request pool connection succesfull
            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})
    
            const mockedRequest ={
                input: mockedInput,
                execute: mockedExecute
    
            }
            const mockedPool = {
                request: jest.fn().mockReturnValue(mockedRequest)
            }

            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

            await createProject(req, res)
            // expect(mockedInput).toHaveBeenCalledWith('startDate', mssql.Date, "2021/04/04")
            expect(mockedInput).toHaveBeenCalledWith('projectName', mssql.VarChar, "projects main")
            expect(mockedInput).toHaveBeenCalledWith('projectDescription', mssql.VarChar, "build a dam")
            expect(mockedInput).toHaveBeenCalledWith('endDate', mssql.Date, "2023/04/04")

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
            message: 'Project created Succesfully'
            })
            expect(mockedExecute).toHaveBeenCalledWith('addProjectPROC');
            expect(mockedInput).toHaveBeenCalledWith('projectId', mssql.VarChar, expect.any(String))

        }) 
        
        it('should generate error if failed to create project',async()=>{
            const mockedInput = jest.fn().mockReturnThis()//for chained inputs on after the request pool connection succesfull
            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})
            const mockedRequest ={
                input: mockedInput,
                execute: mockedExecute
            }
            const mockedPool = {
                request: jest.fn().mockReturnValue(mockedRequest)
            }
            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)
            await createProject(req, res)
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
            message: 'Creation failed'
            })
        }) 
    })


    describe('Get all projects',()=>{
        const sampleprojects =  [
                {
                  projectId: "077f9c00-33e3-4e31-8da7-491e8ecf5b1f",
                  projectName: "Eat food",
                  projectDescription: "enough food",
                  startDate: "2021-04-03",
                  endDate: "2030-04-03",
                  status: false,
                  assignedTo: null,
                  assigned: false,
                  userAssignedEmailed: false,
                  emailAdminCompleted: false
                },
                {
                  projectId: "0b2ab4c8-0f63-46d9-9f39-123bca27da6e",
                  projectName: "Nairobi school",
                  projectDescription: "run on the runways",
                  startDate: "2023-08-08",
                  endDate: "2027-04-03",
                  status: false,
                  assignedTo: null,
                  assigned: false,
                  userAssignedEmailed: false,
                  emailAdminCompleted: false
                }
            ]
        
        const req = {}
        it('return all projects', async()=>{

            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: sampleprojects
                })
            })

            await viewallprojects(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({projects: sampleprojects})
        })

    })


    describe('get one project',()=>{
        const sampleProject = [
            {
              projectId: "077f9c00-33e3-4e31-8da7-491e8ecf5b1f",
              projectName: "Eat food",
              projectDescription: "enough food",
              startDate: "2021-04-03",
              endDate: "2030-04-03",
              status: false,
              assignedTo: null,
              assigned: false,
              userAssignedEmailed: false,
              emailAdminCompleted: false
            }
          ]

        it('should get one project', async()=>{
            const projectId = 'jsksjsjdsdjdk'
            const req = {
                params: {projectId: projectId}
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: sampleProject
                })
            })

            await getOneProject(req, res)

            expect(res.json).toHaveBeenCalledWith({project: sampleProject})
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })


    describe('Update a project',()=>{
        it("should update a project successfully", async()=>{
            const projectId = 'calvo'
            const newchangedProject = {
                "projectName": "Eat food",
                "projectDescription": "enough food",
                "startDate": "2021/0404",
                "endDate": "2030/04/04"
            } 
            const req = {
                params:{
                    projectId:projectId
                },
                body: newchangedProject
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await updateProject(req, res)
            expect(res.status).toHaveBeenCalledWith(200);  
            expect(res.json).toHaveBeenCalledWith({
                message: "Project updated Succesfully" 
            }) 
        })

        it("should generate an error if update has failed to happen", async()=>{
            const projectId = 'calvo'
            const newchangedProject = {
                "projectName": "Eat food",
                "projectDescription": "enough food",
                "startDate": "2021/0404",
                "endDate": "2030/04/04"
            } 
            const req = {
                params:{
                    projectId:projectId
                },
                body: newchangedProject
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await updateProject(req, res)
            expect(res.status).toHaveBeenCalledWith(200);  
            expect(res.json).toHaveBeenCalledWith({
                message: "Update failed"  
            }) 
        })
    })


    describe('Delete a project',()=>{
        
        it('should delete a project successfully',async()=>{
                        
            
            const req = { 
                params: {
                    projectId: "ejhiefheifhei"
                }
            }

            const mockedInput = jest.fn().mockReturnThis()//for chained inputs on after the request pool connection succesfull
            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})
    
            const mockedRequest ={
                input: mockedInput,
                execute: mockedExecute
    
            }
            const mockedPool = {
                request: jest.fn().mockReturnValue(mockedRequest)
            }

            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

            await deleteProject(req, res)

            expect(mockedInput).toHaveBeenCalledWith('projectId', req.params.projectId) 
            expect(mockedExecute).toHaveBeenCalledWith('deleteProject') 

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
            message: 'deleted successfully'
            })  
        })
    })
 

    describe('All completed projects',()=>{
        const allCompleted = [
            {
              projectId: "14bf0f0b-c156-48ce-838f-6c8f4aa73e8c",
              projectName: "Build a charity walk",
              projectDescription: "This wll help to donate monyet for some users manze",
              startDate: "2023-08-08",
              endDate: "2023-08-31",
              status: true,
              assignedTo: "af682c82-0bac-4644-a1c3-0e16b04697e0",
              assigned: true,
              userAssignedEmailed: true,
              emailAdminCompleted: true
            }
          ]

        it('should return all completed projects', async()=>{
            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: allCompleted
                })
            })

            await allCompletedProjects(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({completedProjects: allCompleted})
        })
    })


    describe('All projects not assigned',()=>{
        const projects = [
            {
              projectId: "077f9c00-33e3-4e31-8da7-491e8ecf5b1f",
              projectName: "Eat food",
              projectDescription: "enough food",
              startDate: "2021-04-03",
              endDate: "2030-04-03"
            },
            {
              projectId: "0b2ab4c8-0f63-46d9-9f39-123bca27da6e",
              projectName: "Nairobi school",
              projectDescription: "run on the runways",
              startDate: "2023-08-08",
              endDate: "2027-04-03"
            }]

          it('should return all projects not assigned', async()=>{
            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: projects
                })
            })

            await unassignedProjects(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({projects: projects})
        })

    })


})