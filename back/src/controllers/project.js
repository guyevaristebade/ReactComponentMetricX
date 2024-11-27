import { projectModel } from '../models/index.js'

export const getAllProjects = async (req, res) => {
    let response = {
        status: 200,
    }

    try {
        const queryProject = await projectModel.find()

        if (!queryProject) {
            response.error = 'Project not found'
            response.status = 404
        } else {
            response.data = queryProject
        }
    } catch (error) {
        response.error = 'Internal error server'
        response.status = 500
    }

    return response
}

export const getProjectsById = async (projectId) => {
    let response = {
        status: 200,
    }

    try {
        const queryProjectById = await projectModel
            .findById(projectId)
            .populate('_versionId')
            .exec()

        if (!queryProjectById) {
            response.error = 'Project not found'
            response.status = 404
        } else {
            response.data = queryProjectById
        }
    } catch (error) {
        response.error = 'Internal error server'
        response.status = 500
    }

    return response
}
