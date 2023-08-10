const {Router} = require('express');

const { createProject, deleteProject, viewallprojects, getOneProject, updateProject, allCompletedProjects, unassignedProjects } = require('../Controllers/projectController');
const { tokenVerfying } = require('../MiddleWare/verifyToken');


const projectRouter = Router();


projectRouter.post('/',tokenVerfying, createProject);
projectRouter.delete('/:projectId',deleteProject)
projectRouter.get('/', viewallprojects)
projectRouter.get('/:projectId', getOneProject)
projectRouter.put('/:projectId', updateProject)
projectRouter.get('/completed/projects', allCompletedProjects)
projectRouter.get('/unasigned/projects',tokenVerfying,unassignedProjects)

module.exports = {
    projectRouter
}