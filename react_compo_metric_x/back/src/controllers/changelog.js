import { changeLogModel } from '../models/index.js'

/**
 *
 * @returns {object} - The changelog
 * Cette fonction permet de récupérer la changelog
 */
export const getChangelog = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryChangelog = await changeLogModel.find()

        if (!queryChangelog) {
            response.status = 404
            response.error = 'No changelog found'
        } else {
            response.data = queryChangelog
        }
    } catch (error) {
        console.error('Error fetching changelog:', error)
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}
