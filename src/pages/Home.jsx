/**
 * HOME COMPONENT - CLEAN ARCHITECTURE
 * Purpose: Display main feed with posts
 * Responsibilities:
 * - Render feed layout and welcome section
 * - Manage feed-level state (posts, pagination)
 * - Handle post interactions via callbacks
 * - Coordinate between Post components and data layer
 * - No direct post rendering logic
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Post from '../components/feed/Post'
import {LoadingSpinner} from '../components/common/LoadingSpinner.jsx'
import {EmptyState} from '../components/common/EmptyState'

const Home = () => {
    const { user } = useAuth()

    // Feed state management
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    // Mock data for demonstration - will be replaced with API calls
    const mockPosts = [
        {
            id: '1',
            user: {
                id: 'user1',
                username: 'nature_lover',
                avatar: '🌿'
            },
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            caption: 'Beautiful mountain landscape during golden hour 🏔️✨ #nature #mountains #photography',
            likes: 142,
            comments: 23,
            timeAgo: '2h',
            isLiked: false
        },
        {
            id: '2',
            user: {
                id: 'user2',
                username: 'coffee_addict',
                avatar: '☕'
            },
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
            caption: 'Perfect morning brew ☕ Nothing beats a fresh cup of coffee to start the day!',
            likes: 89,
            comments: 12,
            timeAgo: '4h',
            isLiked: true
        },
        {
            id: '3',
            user: {
                id: 'user3',
                username: 'travel_diaries',
                avatar: '✈️'
            },
            image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=600&h=600&fit=crop',
            caption: 'Exploring the ancient streets of this beautiful city 🏛️ Every corner tells a story #travel #architecture',
            likes: 256,
            comments: 41,
            timeAgo: '6h',
            isLiked: false
        }
    ]

    /**
     * Initialize feed data
     * In real app, this would call API
     */
    useEffect(() => {
        const loadFeed = async () => {
            try {
                setLoading(true)
                // TODO: Replace with real API call
                // const feedData = await feedService.getFeed()

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000))
                setPosts(mockPosts)

            } catch (err) {
                setError('Failed to load feed')
                console.error('Feed loading error:', err)
            } finally {
                setLoading(false)
            }
        }

        loadFeed()
    }, [])

    /**
     * Handle post like/unlike
     * @param {string} postId - ID of post to like
     */
    const handlePostLike = async (postId) => {
        try {
            // Optimistic update
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            isLiked: !post.isLiked,
                            likes: post.isLiked ? post.likes - 1 : post.likes + 1
                        }
                    }
                    return post
                })
            )

            // TODO: Call API
            // await postService.toggleLike(postId)
            console.log('Like toggled for post:', postId)

        } catch (error) {
            // Revert optimistic update on error
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            isLiked: !post.isLiked,
                            likes: post.isLiked ? post.likes + 1 : post.likes - 1
                        }
                    }
                    return post
                })
            )
            console.error('Failed to toggle like:', error)
        }
    }

    /**
     * Handle post comment
     * @param {string} postId - ID of post to comment on
     * @param {string} commentText - Comment text
     */
    const handlePostComment = async (postId, commentText) => {
        try {
            // TODO: Call API to add comment
            // await postService.addComment(postId, commentText)
            console.log('Comment added to post:', postId, 'Text:', commentText)

            // Update comments count optimistically
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: post.comments + 1
                        }
                    }
                    return post
                })
            )

        } catch (error) {
            console.error('Failed to add comment:', error)
        }
    }

    /**
     * Handle post share
     * @param {string} postId - ID of post to share
     */
    const handlePostShare = async (postId) => {
        try {
            // TODO: Implement share functionality
            console.log('Sharing post:', postId)

            // Could open share modal, copy link, etc.
            if (navigator.share) {
                await navigator.share({
                    title: 'Check out this post on ShareApp',
                    url: `${window.location.origin}/post/${postId}`
                })
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`)
                // Show toast notification
            }

        } catch (error) {
            console.error('Failed to share post:', error)
        }
    }

    /**
     * Handle post save/bookmark
     * @param {string} postId - ID of post to save
     */
    const handlePostSave = async (postId) => {
        try {
            // TODO: Call API to save post
            // await postService.toggleSave(postId)
            console.log('Post saved:', postId)

        } catch (error) {
            console.error('Failed to save post:', error)
        }
    }

    /**
     * Load more posts (pagination)
     */
    const handleLoadMore = async () => {
        try {
            // TODO: Implement pagination
            console.log('Loading more posts...')
        } catch (error) {
            console.error('Failed to load more posts:', error)
        }
    }

    /**
     * Render loading state
     */
    if (loading) {
        return (
            <div className="home-page">
                <LoadingSpinner message="Loading your feed..." />
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
                        onClick={() => window.location.reload()}
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
            <WelcomeHeader username={user?.username} />

            {/* Posts Feed */}
            <FeedContainer
                posts={posts}
                onLike={handlePostLike}
                onComment={handlePostComment}
                onShare={handlePostShare}
                onSave={handlePostSave}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
            />
        </div>
    )
}

/**
 * Welcome Header Sub-component
 */
const WelcomeHeader = ({ username }) => (
    <div className="welcome-header">
        <h1>Welcome back, {username}!</h1>
        <p>Stay connected with your friends and discover amazing content</p>
    </div>
)

/**
 * Feed Container Sub-component
 */
const FeedContainer = ({ posts, onLike, onComment, onShare, onSave, hasMore, onLoadMore }) => {
    if (posts.length === 0) {
        return (
            <EmptyState
                title="No posts yet"
                description="Start following people to see their posts in your feed!"
                actionText="Explore ShareApp"
                onAction={() => console.log('Navigate to explore')}
            />
        )
    }

    return (
        <>
            <div className="posts-feed">
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onLike={onLike}
                        onComment={onComment}
                        onShare={onShare}
                        onSave={onSave}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="load-more-container">
                    <button
                        onClick={onLoadMore}
                        className="load-more-btn"
                    >
                        Load more posts
                    </button>
                </div>
            )}
        </>
    )
}

export default Home