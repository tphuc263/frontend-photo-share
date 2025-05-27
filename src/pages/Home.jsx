/**
 * HOME COMPONENT - UPDATED WITH PHOTOCARD INTEGRATION
 * Purpose: Display main feed with photo cards
 * Responsibilities:
 * - Load newsfeed from backend
 * - Handle photo interactions
 * - Manage pagination and loading states
 * - Coordinate between PhotoCard and services
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import PhotoCard from '../components/feed/PhotoCard'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { photoService } from '../services/photoService'
import { commentService } from '../services/commentService'
import '../styles/pages/homePage.css'

const Home = () => {
    const { user } = useAuth()

    // Feed state management
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    /**
     * Load initial newsfeed
     */
    useEffect(() => {
        loadNewsfeed()
    }, [])

    /**
     * Load newsfeed from backend
     */
    const loadNewsfeed = async (pageNum = 0, reset = true) => {
        try {
            if (reset) {
                setLoading(true)
                setError(null)
            } else {
                setLoadingMore(true)
            }

            const response = await photoService.getNewsfeed(pageNum, 20)

            if (response.success) {
                const newPhotos = response.data.content || []

                if (reset) {
                    setPhotos(newPhotos)
                } else {
                    setPhotos(prev => [...prev, ...newPhotos])
                }

                setHasMore(!response.data.last)
                setPage(pageNum)
            } else {
                throw new Error(response.error)
            }

        } catch (err) {
            console.error('Failed to load newsfeed:', err)
            setError('Failed to load feed. Please try again.')
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    /**
     * Handle photo like/unlike
     */
    const handlePhotoLike = async (photoId) => {
        try {
            // Optimistic update
            setPhotos(prevPhotos =>
                prevPhotos.map(photo => {
                    if (photo.id === photoId) {
                        return {
                            ...photo,
                            isLikedByCurrentUser: !photo.isLikedByCurrentUser,
                            likesCount: photo.isLikedByCurrentUser
                                ? photo.likesCount - 1
                                : photo.likesCount + 1
                        }
                    }
                    return photo
                })
            )

            // Call API
            const response = await photoService.toggleLike(photoId)

            if (!response.success) {
                // Revert optimistic update on error
                setPhotos(prevPhotos =>
                    prevPhotos.map(photo => {
                        if (photo.id === photoId) {
                            return {
                                ...photo,
                                isLikedByCurrentUser: !photo.isLikedByCurrentUser,
                                likesCount: photo.isLikedByCurrentUser
                                    ? photo.likesCount + 1
                                    : photo.likesCount - 1
                            }
                        }
                        return photo
                    })
                )
                console.error('Failed to toggle like:', response.error)
            }

        } catch (error) {
            console.error('Failed to toggle like:', error)
            // Revert optimistic update
            setPhotos(prevPhotos =>
                prevPhotos.map(photo => {
                    if (photo.id === photoId) {
                        return {
                            ...photo,
                            isLikedByCurrentUser: !photo.isLikedByCurrentUser,
                            likesCount: photo.isLikedByCurrentUser
                                ? photo.likesCount + 1
                                : photo.likesCount - 1
                        }
                    }
                    return photo
                })
            )
        }
    }

    /**
     * Handle photo comment
     */
    const handlePhotoComment = async (photoId, commentText) => {
        try {
            const response = await commentService.createComment(photoId, {
                text: commentText
            })

            if (response.success) {
                // Update comments count
                setPhotos(prevPhotos =>
                    prevPhotos.map(photo => {
                        if (photo.id === photoId) {
                            return {
                                ...photo,
                                commentsCount: photo.commentsCount + 1
                            }
                        }
                        return photo
                    })
                )
                return true
            } else {
                console.error('Failed to add comment:', response.error)
                return false
            }

        } catch (error) {
            console.error('Failed to add comment:', error)
            return false
        }
    }

    /**
     * Handle photo share
     */
    const handlePhotoShare = async (photoId) => {
        try {
            const photo = photos.find(p => p.id === photoId)
            if (!photo) return

            const shareData = {
                title: `Check out this photo by ${photo.username}`,
                text: photo.caption || 'Check out this amazing photo!',
                url: `${window.location.origin}/photo/${photoId}`
            }

            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(shareData.url)
                // TODO: Show toast notification
                console.log('Link copied to clipboard!')
            }

        } catch (error) {
            console.error('Failed to share photo:', error)
        }
    }

    /**
     * Handle photo save/bookmark
     */
    const handlePhotoSave = async (photoId) => {
        try {
            // TODO: Implement save functionality when backend is ready
            console.log('Save photo:', photoId)
            // Could call bookmarkService.toggleBookmark(photoId)
        } catch (error) {
            console.error('Failed to save photo:', error)
        }
    }

    /**
     * Handle load more photos
     */
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            loadNewsfeed(page + 1, false)
        }
    }

    /**
     * Handle refresh feed
     */
    const handleRefresh = () => {
        setPage(0)
        loadNewsfeed(0, true)
    }

    /**
     * Render loading state
     */
    if (loading) {
        return (
            <div className="home-page">
                <LoadingSpinner message="Loading your newsfeed..." />
            </div>
        )
    }

    /**
     * Render error state
     */
    if (error) {
        return (
            <div className="home-page">
                <div className="error-state">
                    <h3>Unable to load feed</h3>
                    <p>{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="retry-btn"
                    >
                        Try again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="home-page">
            {/* Welcome Header */}
            <WelcomeHeader
                username={user?.username}
                onRefresh={handleRefresh}
            />

            {/* Photos Feed */}
            <PhotosFeed
                photos={photos}
                onLike={handlePhotoLike}
                onComment={handlePhotoComment}
                onShare={handlePhotoShare}
                onSave={handlePhotoSave}
                hasMore={hasMore}
                loadingMore={loadingMore}
                onLoadMore={handleLoadMore}
                currentUser={user}
            />
        </div>
    )
}

/**
 * Welcome Header Sub-component
 */
const WelcomeHeader = ({ username, onRefresh }) => (
    <div className="welcome-header">
        <h1>Welcome back, {username}!</h1>
        <p>Stay connected with your friends and discover amazing content</p>
        <button
            onClick={onRefresh}
            className="refresh-btn"
            aria-label="Refresh feed"
        >
            🔄 Refresh
        </button>
    </div>
)

/**
 * Photos Feed Sub-component
 */
const PhotosFeed = ({
                        photos,
                        onLike,
                        onComment,
                        onShare,
                        onSave,
                        hasMore,
                        loadingMore,
                        onLoadMore,
                        currentUser
                    }) => {
    if (photos.length === 0) {
        return (
            <EmptyState
                title="No photos in your feed"
                description="Start following people to see their photos here!"
                actionText="Explore ShareApp"
                onAction={() => console.log('Navigate to explore')}
                icon="📷"
            />
        )
    }

    return (
        <>
            <div className="photos-feed">
                {photos.map(photo => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onLike={onLike}
                        onComment={onComment}
                        onShare={onShare}
                        onSave={onSave}
                        currentUser={currentUser}
                    />
                ))}
            </div>

            {/* Load More Section */}
            {hasMore && (
                <div className="load-more-container">
                    {loadingMore ? (
                        <LoadingSpinner
                            size="small"
                            message="Loading more photos..."
                        />
                    ) : (
                        <button
                            onClick={onLoadMore}
                            className="load-more-btn"
                        >
                            Load more photos
                        </button>
                    )}
                </div>
            )}

            {/* End of feed message */}
            {!hasMore && photos.length > 0 && (
                <div className="end-of-feed">
                    <p>You're all caught up! 🎉</p>
                </div>
            )}
        </>
    )
}

export default Home