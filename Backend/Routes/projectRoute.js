const {Router} = require('express');
const { createProject, deleteProject, viewallprojects, getOneProject, updateProject, allCompletedProjects } = require('../Controllers/projectController');
//const { tokenVerfying } = require('../MiddleWare/verifyToken');

const projectRouter = Router();

// projectRouter.get('/:completed', allCompletedProjects)
projectRouter.post('/', createProject);
// projectRouter.post('/', createProject);
projectRouter.delete('/:projectId',deleteProject)
projectRouter.get('/', viewallprojects)
projectRouter.get('/:projectId', getOneProject)
projectRouter.put('/:projectId', updateProject)
projectRouter.get('/:completed/projects', allCompletedProjects)

module.exports = {
    projectRouter
}