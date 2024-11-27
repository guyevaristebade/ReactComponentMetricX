import { statsModel } from '../models/index.js'

export const getAllStatistics = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryStat = await statsModel.find()

        if (!queryStat) {
            response.status = 404
            response.error = ' Stats Not Found'
        } else {
            response.data = queryStat
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}
