import {
    versionModel,
    statsModel,
    projectModel,
    ComponentModel,
} from '../models/index.js'

export const getAllVersions = async () => {
    let response = {
        status: 200,
    }

    try {
        const allVersions = await versionModel.find({})

        if (allVersions) {
            response.data = allVersions
        } else {
            response.status = 404
            response.error = 'Versions Not Found'
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal Server Error'
    }

    return response
}

export const getStatByVersionId = async (versionId) => {
    let response = {
        status: 200,
    }

    try {
        const result = await statsModel.findById(versionId).exec()

        if (result) {
            response.data = result
        } else {
            response.status = 404
            response.error = 'Stat Version Not Found'
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal Server Error'
    }

    return response
}

export const getRepartitionProjectPerVersion = async (req, res) => {
    let response = {
        status: 200,
    }

    try {
        const versions = await versionModel.find()
        const versionData = versions.map((version) => {
            return { _id: version.version, count: 0 }
        })

        const uniqueComponentNames = await projectModel.distinct('name')
        const projects = await Promise.all(
            uniqueComponentNames.map(async (componentName) => {
                return projectModel
                    .findOne({ name: componentName })
                    .populate('_versionId')
                    .sort({ date: -1 })
                    .limit(1)
            }),
        )

        let i = 0
        for (const project of projects) {
            for (const data of versionData) {
                if (data._id === project._versionId.version) {
                    data.count += 1
                }
            }
        }

        /*const partage = versionData.map((data) => {
      return data.count !== 0
    })*/

        if (!versions) {
            response.status = 404
            response.error = 'Version Not Found'
        } else {
            response.data = partage
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal Server Error'
    }

    return response
}

export const getVersionByComponentName = async (name) => {
    let response = {
        status: 200,
    }

    try {
        const component = await ComponentModel.find({ name: name }).populate(
            '_versionId',
        )

        const versions = component.map((vers) => {
            return {
                id: vers._versionId._id,
                version: vers._versionId.version,
            }
        })

        if (versions) {
            response.data = versions
        } else {
            response.error = 'No data found '
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal error server '
        response.status = 500
    }
    return response
}
