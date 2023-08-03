const {Router} = require('express');
const { createProject, deleteProject, viewallprojects, getOneProject, updateProject } = require('../Controllers/projectController');
const { tokenVerfying } = require('../MiddleWare/verifyToken');

const projectRouter = Router();

projectRouter.post('/', createProject);
projectRouter.delete('/:projectId',deleteProject)
projectRouter.get('/', viewallprojects)
projectRouter.get('/:projectId', getOneProject)
projectRouter.put('/:projectId', updateProject)

module.exports = {
    projectRouter
}