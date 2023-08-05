const {Router} = require('express');
const { createProject, deleteProject, viewallprojects, getOneProject, updateProject, allCompletedProjects } = require('../Controllers/projectController');
const { tokenVerfying } = require('../MiddleWare/verifyToken');

const projectRouter = Router();

projectRouter.get('/:completed', allCompletedProjects)
projectRouter.post('/',tokenVerfying, createProject);
projectRouter.delete('/:projectId',deleteProject)
projectRouter.get('/', viewallprojects)
projectRouter.get('/:projectId', getOneProject)
projectRouter.put('/:projectId', updateProject)
projectRouter.get('/:completed', allCompletedProjects)

module.exports = {
    projectRouter
}