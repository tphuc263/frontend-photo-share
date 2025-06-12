import {useState} from 'react'
import {createPhoto} from '../services/photoService.js'

const initialFormData = {
    image: null,
    imagePreview: null,
    caption: '',
    tags: ''
}

export const useCreatePost = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const parseTagsFromInput = (tagString) => {
        if (!tagString.trim()) return []

        return tagString
            .split(/[,\s]+/)
            .map(tag => tag.replace('#', '').trim().toLowerCase())
            .filter(tag => tag.length > 0)
            .slice(0, 10)
    }

    const validateCreatePostForm = (data) => {
        if (!data.image) {
            return 'Please select an image'
        }

        if (!data.caption.trim()) {
            return 'Please add a caption'
        }

        if (data.caption.length > 2200) {
            return 'Caption is too long (max 2200 characters)'
        }

        return null
    }

    const submitPost = async (postData) => {
        const validationError = validateCreatePostForm(postData)
        if (validationError) {
            setError(validationError)
            return false
        }

        try {
            setLoading(true)
            setError('')

            const formDataToSend = new FormData()
            formDataToSend.append('image', postData.image)
            formDataToSend.append('caption', postData.caption.trim())

            const parsedTags = parseTagsFromInput(postData.tags)
            if (parsedTags.length > 0) {
                parsedTags.forEach(tag => {
                    formDataToSend.append('tags', tag)
                })
            }

            const response = await createPhoto(formDataToSend)

            if (response.success) {
                console.log('Photo created successfully')
                return true
            } else {
                setError(response.error || 'Failed to create post')
                return false
            }

        } catch (error) {
            console.error('Failed to create post:', error)
            setError('Failed to create post. Please try again.')
            return false
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        if (formData.imagePreview) {
            URL.revokeObjectURL(formData.imagePreview)
        }
        setFormData(initialFormData)
        setError('')
    }

    return {
        formData,
        setFormData,
        loading,
        error,
        setError,
        submitPost,
        resetForm,
        validateForm: validateCreatePostForm,
        parseTagsFromInput
    }
}