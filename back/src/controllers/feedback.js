import { feedback, ComponentModel } from '../models/index.js'

/**
 * Permet récolter des feedbacks sur l'utilisation d'un composant
 */
export const postFeedBack = async (queryObject) => {
    let response = {
        status: 200,
    }

    const { component, firstName, lastName, message, title } = queryObject

    try {
        const queryComponent = await ComponentModel.find({
            name: component,
        }).exec()

        const componentId = queryComponent[queryComponent.length - 1]._id

        const feedBack = new feedback({
            _componentId: componentId,
            componentName: component,
            firstname: firstName,
            lastname: lastName,
            message: message,
            title: title,
            postDate: `${new Date().toLocaleDateString()}`,
        })

        console.log(queryComponent)

        await feedBack.save()

        if (feedBack) {
            response.succes = 'Feedback send successfully'
        } else {
            response.error = 'Failed to send feedback.'
            response.status = 404
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}

/*
 * Afficher les feedbacks sur l'utilisation des librairies de composants (dans une page spécifique)
 * */
export const getAllFeedBack = async () => {
    let response = {
        status: 200,
    }

    try {
        const queryFeedBack = await feedback.find()
        console.log(queryFeedBack)
        if (queryFeedBack) {
            response.data = queryFeedBack
        } else {
            response.error = 'feedback not found'
        }
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}

// ce n'est pas la plus importante
export const postLikesFeedBack = async (feedbackId) => {
    let response = {
        status: 200,
    }

    try {
        const feedback = await feedback.findById(feedbackId)

        if (!feedback) {
            response.status = 404
            response.error = 'Feedback not found'
        }

        feedback.likes += 1

        await feedback.save()

        response.succes = 'Feedback liked successfully' //feedback
    } catch (error) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}

// ce n'est pas la plus importante
export const postDislikeOnFeedBack = async (req, res) => {
    try {
        const { feedbackId } = req.params
        const feedback = await feedback.findById(feedbackId)

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' })
        }

        if (feedback.likes > 0) {
            feedback.likes -= 1
        }

        await feedback.save()

        return res.status(200).json({ message: 'Dislike added successfully' })
    } catch (error) {
        console.error('Error while adding dislike on feedback:', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const postCommentOnFeedBack = async (req, res) => {
    try {
        const { feedBackId } = req.params
        const { comment } = req.body

        const feedback = await feedback.findById(feedBackId)

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' })
        }

        const commentFeedBack = {
            author: 'Anonyme',
            content: comment,
            datetime: new Date(),
        }
        feedback.comments.push(commentFeedBack)

        await feedback.save()

        return res
            .status(200)
            .json({ message: 'Comment added successfully', feedback })
    } catch (error) {
        console.error('Error while posting comment on feedback:', error)
        return res
            .status(500)
            .json({ message: 'Internal server error' + error.message })
    }
}
