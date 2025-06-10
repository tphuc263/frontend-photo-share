import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '../../hooks/useCreatePost.js'
import '../../assets/styles/pages/createPage.css'

const Create = () => {
    const navigate = useNavigate()
    const {
        formData,
        setFormData,
        loading,
        error,
        setError,
        submitPost,
        resetForm
    } = useCreatePost()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (formData.imagePreview) {
                URL.revokeObjectURL(formData.imagePreview)
            }
            const previewUrl = URL.createObjectURL(file)
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: previewUrl
            }))
            setError('')
        }
    }

    const handleCaptionChange = (e) => {
        setFormData(prev => ({ ...prev, caption: e.target.value }))
        setError('')
    }

    const handleTagsChange = (e) => {
        setFormData(prev => ({ ...prev, tags: e.target.value }))
        setError('')
    }

    const handleSubmit = async () => {
        const success = await submitPost(formData)
        if (success) {
            alert('Post created successfully!')
            resetForm()
            navigate('/')
        }
    }

    const handleCancel = () => {
        resetForm()
        navigate('/')
    }

    useEffect(() => {
        return () => {
            if (formData.imagePreview) {
                URL.revokeObjectURL(formData.imagePreview)
            }
        }
    }, [formData.imagePreview])


    return (
        <div className="create-page">
            <div className="create-header">
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                <h2>New post</h2>
                <button
                    onClick={handleSubmit}
                    className="share-btn"
                    disabled={loading || !formData.image || !formData.caption.trim()}
                >
                    {loading ? 'Sharing...' : 'Share'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="image-upload-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload-input"
                />
                <label htmlFor="image-upload-input" className="image-preview-container">
                    {formData.imagePreview ? (
                        <img src={formData.imagePreview} alt="Selected preview" className="image-preview" />
                    ) : (
                        <div className="placeholder">
                            <span className="icon">+</span>
                            <p>Select a photo</p>
                        </div>
                    )}
                </label>
            </div>

            <div className="form-section">
                <textarea
                    placeholder="Write a caption..."
                    value={formData.caption}
                    onChange={handleCaptionChange}
                    rows="4"
                    className="caption-input"
                ></textarea>
                <input
                    type="text"
                    placeholder="Add tags (e.g., #nature, #travel)"
                    value={formData.tags}
                    onChange={handleTagsChange}
                    className="tags-input"
                />
            </div>
        </div>
    )
}

export default Create