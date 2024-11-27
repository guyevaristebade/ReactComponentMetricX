import { teamModel } from '../models/index.js'

export const getAllTeam = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryTeams = await teamModel.find({})
        const teams = queryTeams.map((team, index) => {
            return { key: `${index + 1}`, name: team.name }
        })

        if (!queryTeams) {
            response.status = 404
            response.error = 'Team not found'
        } else {
            response.data = teams
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}

export const getTeamById = async (teamId) => {
    let response = {
        status: 200,
    }

    try {
        const queryTeamById = await teamModel.findById(teamId).exec()

        if (!queryTeamById) {
            response.status = 404
            response.error = 'Team not found'
        } else {
            response.data = queryTeamById
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}
