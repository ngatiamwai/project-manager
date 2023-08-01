const {Router} = require('express');
const { createProject, deleteProject } = require('../Controllers/projectController');

const projectRouter = Router();

projectRouter.post('/',createProject);
projectRouter.delete('/:projectId',deleteProject)

module.exports = {
    projectRouter
}