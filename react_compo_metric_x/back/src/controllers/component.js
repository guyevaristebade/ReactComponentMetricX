import { ComponentModel, projectModel } from '../models/index.js'

/**
 * Cette fonction permet de récupérer tous les composants triés par date la plus haute
 */
export const getAllComponentsSortedByDate = async () => {
    let response = {
        status: 200,
    }

    try {
        const uniqueComponentNames = await ComponentModel.distinct('name')

        if (!uniqueComponentNames) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const components = await Promise.all(
            uniqueComponentNames.map(async (componentName) => {
                return ComponentModel.findOne({ name: componentName })
                    .sort({ date: -1 })
                    .limit(1)
            }),
        )

        if (components) {
            response.data = components
        }
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}

/**
 * Cette fonction permet de récupérer un composant par son nom
 * */
export const getComponentByName = async (name) => {
    let response = {
        status: 200,
    }

    try {
        const components = await ComponentModel.find({ name: name })
            .populate('_projectId')
            .populate('_versionId')
            .sort({ date: -1 })
            .limit(1)

        if (components) {
            response.data = components
        } else {
            response.error = 'No data found'
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal Server Error' + error.message
        response.status = 500
    }

    return response
}

/**
 * Cette fonction permet de récupérer les noms de tous les composants
 * */
export const getAllComponentNames = async () => {
    let response = {
        status: 200,
    }

    try {
        const uniqueComponentNames = await ComponentModel.distinct('name')
        if (!uniqueComponentNames) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const components = await Promise.all(
            uniqueComponentNames.map(async (componentName) => {
                return ComponentModel.findOne({ name: componentName })
                    .sort({ date: -1 })
                    .limit(1)
            }),
        )

        response.data = uniqueComponentNames
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}

/**
 * Cette fonction renvoie les statistiques d'un  composant en utilisant son nom
 * */

export const getComponentStatisticsByName = async (name) => {
    let response = {
        status: 200,
    }

    try {
        const result = await ComponentModel.find({ name: name })

        if (result) {
            response.data = result
        } else {
            response.error = 'No data found'
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}

/* 
    Cette  fonction renvoie de façon groupé les informations sur un composant 
    elle addition la propriété count 
    et ramssemble les children et les props 
*/
export const getGroupComponentStatisticsByName = async (req, res, next) => {
    try {
        const componentName = req.params.name
        const components = await ComponentModel.find({ name: componentName })

        if (!components || components.length === 0) {
            return res.status(404).json({ errorMessage: 'Data not found' })
        }

        // Groupement des données
        const consolidatedData = components.reduce(
            (acc, component) => {
                acc.count += component.count

                // Ajout des props
                const props = JSON.parse(component.props)
                for (const [key, value] of Object.entries(props)) {
                    if (!acc.props[key]) {
                        acc.props[key] = value
                    } else {
                        for (const [propKey, propValue] of Object.entries(
                            value,
                        )) {
                            if (acc.props[key][propKey]) {
                                acc.props[key][propKey] += propValue
                            } else {
                                acc.props[key][propKey] = propValue
                            }
                        }
                    }
                }

                // Ajout des enfants
                const children = JSON.parse(component.children)
                for (const [key, value] of Object.entries(children)) {
                    if (!acc.children[key]) {
                        acc.children[key] = value
                    } else {
                        acc.children[key] += value
                    }
                }

                return acc
            },
            { count: 0, props: {}, children: {} },
        )

        res.status(200).json({ component: consolidatedData })
    } catch (error) {
        res.status(500).json({
            errorMessage: `Internal Server Error: ${error.message}`,
        })
    }
}

/**
 * Cette fonction renvoie le nombre total de composant
 * */
export const getTotalNumberOfComponents = async () => {
    let response = {
        status: 200,
    }

    try {
        const components = await ComponentModel.aggregate([
            { $sort: { name: 1, date: -1 } },
            {
                $group: {
                    _id: '$name',
                    latestComponent: { $first: '$$ROOT' },
                    total: { $sum: '$count' },
                },
            },
            { $replaceRoot: { newRoot: '$latestComponent' } },
        ])

        if (!components) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const size = components.reduce(
            (total, component) => total + component.count,
            0,
        )

        response.data = size
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }
    return response
}

/**
 * TODO cette fonction est à modifier
 * Cette fonction permet d'avoir la moyenne des composants par projet
 * elle se base sur l'addition de la propriété count
 * */
export const getAverageComponentsPerProject = async () => {
    let response = {
        status: 200,
    }

    try {
        // Récupérer le nombre total de projets directement
        const projectsSize = await projectModel.countDocuments()

        if (projectsSize === 0) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const components = await ComponentModel.aggregate([
            {
                $sort: { name: 1, date: -1 },
            },
            {
                $group: {
                    _id: '$name',
                    latestComponent: { $first: '$$ROOT' },
                    total: { $sum: '$count' },
                },
            },
            {
                $group: {
                    _id: null,
                    totalComponent: { $sum: '$latestComponent.count' },
                },
            },
        ])

        if (!components) {
            response.error = 'No data found'
            response.status = 404
        }

        const totalComponent =
            components.length > 0 ? components[0].totalComponent : 0
        const averageComponent = Math.round(totalComponent / projectsSize)

        response.data = averageComponent
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }
    return response
}

/**
 * Cette fonction permet d'avoir le nombre total de composants avec la date la plus haute  sans enfant ( children : {} )
 * */
export const getComponentsNoChildren = async (req, res) => {
    let response = {
        status: 200,
    }

    try {
        const queryComponent = await ComponentModel.aggregate([
            { $sort: { name: 1, date: -1 } },
            {
                $group: {
                    _id: '$name',
                    latestComponent: { $first: '$$ROOT' },
                },
            },
            { $replaceRoot: { newRoot: '$latestComponent' } },
        ])

        if (!queryComponent) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const componentNoChildren = queryComponent.filter((component) => {
            return (
                !component.children ||
                Object.keys(JSON.parse(component.children)).length === 0
            )
        })

        const size = componentNoChildren.length

        response.data = size
    } catch (error) {
        response.error = 'Internal server error : ' + error.message
        response.status = 500
    }
    return response
}

export const getComponentWithoutProps = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryComponent = await ComponentModel.aggregate([
            { $sort: { name: 1, date: -1 } },
            {
                $group: {
                    _id: '$name',
                    latestComponent: { $first: '$$ROOT' },
                },
            },
            { $replaceRoot: { newRoot: '$latestComponent' } },
        ])

        if (!queryComponent) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const componentNoChildren = queryComponent.filter((component) => {
            return (
                !component.props ||
                Object.keys(JSON.parse(component.props)).length === 0
            )
        })

        const size = componentNoChildren.length

        response.data = size
    } catch (error) {
        response.error = 'Internal server error : ' + error.message
        response.status = 500
    }
    return response
}

/**
 * Cette fonction renvoie le pourcentage de composant par projet
 * */
export const getPercentageComponentsPerProject = async () => {
    let response = {
        status: 200,
    }

    try {
        const projects = await projectModel.find()
        const components = await ComponentModel.find()

        if (!projects.length || !components.length) {
            response.status = 404
            response.error = 'No data found'
            return response
        }

        const totalComponentsCount = components.length // on récupère le nombre total de composants
        const projectComponentsMap = components.reduce((acc, component) => {
            const projectId = component._projectId // on récupère l'id du projet
            acc[projectId] = (acc[projectId] || 0) + component.count // on ajoute le nombre de composant au projet
            return acc
        }, {})

        const result = projects.map((project) => {
            const nbComponentsProject = projectComponentsMap[project._id] || 0 // on récupère le nombre de composant correspondant au projet via son id
            const value = Math.round(
                (nbComponentsProject * 100) / totalComponentsCount,
            ) // on calcule le pourcentage de composant par projet
            return { id: project.name, label: project.name, value }
        })

        response.data = result
    } catch (error) {
        response.error = 'Internal server error: ' + error.message
        response.status = 500
    }

    return response
}

export const getTopTenOfComponent = async () => {
    let response = {
        status: 200,
    }

    try {
        const topComponents = await ComponentModel.aggregate([
            {
                $group: {
                    _id: '$name',
                    totalInstances: { $sum: '$count' },
                },
            },
            {
                $sort: { totalInstances: -1 },
            },
            {
                $limit: 10,
            },
        ])

        if (topComponents) {
            response.data = topComponents
        } else {
            response.error = 'No data found'
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}

/**
 *
 * @param {String} name
 * @param {ObjectId} versionId
 * @returns tableau contenant les informations d'un composant sur une version donnée
 */
export const getComponentVersionInfo = async (name, versionId) => {
    let response = {
        status: 200,
    }
    try {
        let aggregated = {
            name: '',
            count: 0,
            props: {},
            children: {},
            version: {},
            project: '',
        }

        const component = await ComponentModel.findOne({
            name: name,
            _versionId: versionId,
        })
            .populate('_versionId')
            .populate('_projectId')

        if (!component) {
            response.error = 'component not found'
            response.status = 404
            return response
        }

        let props = {}
        if (component.props) {
            try {
                props = JSON.parse(component.props)
            } catch (e) {
                console.error(
                    `Invalid JSON in props for component ${component.name}: ${component.props}`,
                )
            }
        }

        let children = {}
        if (component.children) {
            try {
                children = JSON.parse(component.children)
            } catch (e) {
                console.error(
                    `Invalid JSON in children for component ${component.name}: ${component.children}`,
                )
            }
        }

        aggregated = {
            name: component.name,
            count: component.count,
            props: props,
            children: children,
            project: component._projectId.name,
            version: {
                id: component._versionId._id,
                name: component._versionId.version,
            },
        }

        response.data = aggregated
    } catch (error) {
        response.error = 'Internal Server Error : ' + error.message
        response.status = 500
    }
    return response
}

/**
 *
 * @param {String} name
 * @returns tableau cotenant les versions d'un composant
 */
export const getAllVersionsOfComponent = async (name) => {
    let response = {
        status: 200,
    }
    try {
        const component = await ComponentModel.find({ name: name }).populate(
            '_versionId',
        )

        const version = component.map((v) => v._versionId.version)

        if (component) {
            response.data = version
        } else {
            response.error = 'No data found'
            response.status = 404
        }
    } catch (error) {
        response.error = 'Internal Server Error '
        response.status = 500
    }
    return response
}

/**
 *
 * @returns un tableau contenant les projets et le nombre de composants associés
 */
export const componentsPerProject = async () => {
    let response = {
        status: 200,
    }

    try {
        const projets = await projectModel.find()
        if (!projets) {
            response.error = 'No data found'
            response.status = 404
            return response
        }

        const projectDatas = await Promise.all(
            projets.map(async (project) => {
                const components = await ComponentModel.find({
                    _projectId: project._id,
                })
                let count = components.reduce(
                    (acc, curr) => acc + curr.count,
                    0,
                )
                return { name: project.name, count }
            }),
        )
        response.data = projectDatas
    } catch (error) {
        response.error = 'Internal Server Error'
        response.status = 500
    }

    return response
}

/**
 *
 * @param {String} name
 * @returns un tableau contenant les informations globales d'un composant
 * Cette fonction permet de récupérer les informations globales d'un composant
 */

export const getGlobalComponentInfo = async (name) => {
    let response = {
        status: 200,
    }

    try {
        const component = await ComponentModel.find({ name: name })
            .populate('_projectId')
            .populate('_versionId')

        if (!component) {
            response.status = 404
            response.error = 'No component found'
            return response
        }

        const aggregated = {
            name: '',
            count: 0,
            props: {},
            children: {},
            versions: new Set(),
            projects: new Set(),
        }

        component.forEach((item) => {
            if (!aggregated.name) aggregated.name = item.name

            aggregated.count += item.count

            // fusion des props
            let itemProps = {}
            if (item.props) {
                try {
                    itemProps = JSON.parse(item.props)
                } catch (e) {
                    console.error(
                        `Invalid JSON in props for component ${item.name}: ${item.props}`,
                    )
                }
            }

            Object.keys(itemProps).forEach((key) => {
                if (!aggregated.props[key]) {
                    aggregated.props[key] = {}
                }
                Object.keys(itemProps[key]).forEach((subKey) => {
                    if (aggregated.props[key][subKey]) {
                        aggregated.props[key][subKey] += itemProps[key][subKey]
                    } else {
                        aggregated.props[key][subKey] = itemProps[key][subKey]
                    }
                })
            })

            let itemChildren = {}
            if (item.children) {
                try {
                    itemChildren = JSON.parse(item.children)
                } catch (e) {
                    console.error(
                        `Invalid JSON in children for component ${item.name}: ${item.children}`,
                    )
                }
            }

            Object.keys(itemChildren).forEach((key) => {
                if (aggregated.children[key]) {
                    aggregated.children[key] += itemChildren[key]
                } else {
                    aggregated.children[key] = itemChildren[key]
                }
            })

            aggregated.versions.add(item._versionId.version)

            aggregated.projects.add(item._projectId.name)
        })

        aggregated.versions = Array.from(aggregated.versions)
        aggregated.projects = Array.from(aggregated.projects)

        response.data = aggregated
    } catch (error) {
        response.error = 'Internal Server Error : ' + error.message
        response.status = 500
    }

    return response
}
