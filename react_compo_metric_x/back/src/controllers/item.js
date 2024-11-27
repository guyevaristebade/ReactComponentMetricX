import { itemsModel } from '../models/index.js'

const getAllItems = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryItems = await itemsModel.find()

        if (!queryItems) {
            response.error = 'Items not found'
            response.status = 404
        }

        response.data = queryItems
    } catch (error) {
        response.error = 'Internal server error'
        response.status = 500
    }

    return response
}

export { getAllItems }
