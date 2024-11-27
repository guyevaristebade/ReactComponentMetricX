import { mainModel } from '../models/index.js'
import Ajv from 'ajv'
const ajv = new Ajv()

// Schema de validation du fichier JSON
const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
        version: { type: 'string' },
        date: { type: 'string' },
        stats: { type: 'object' },
        team: { type: 'string' },
        project: { type: 'string' },
    },
    required: ['version', 'date', 'stats', 'team', 'project'],
}

const validate = ajv.compile(schema)

export const saveFile = async (file) => {
    let response = {
        status: 200,
    }

    try {
        if (file) {
            const JSONfile = JSON.parse(file.buffer.toString())

            // Validation du fichier JSON
            if (!validate(JSONfile)) {
                response.error =
                    "Echec de validation du fichier, ce fichier ne correspond pas aux attente de l'application"
                response.status = 400
                return response
            }

            const fileData = new mainModel(JSONfile)
            await fileData.save()

            response.data = fileData
        } else {
            response.error = 'No file found'
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal server error: ' + error.message
        response.status = 500
    }
    return response
}
