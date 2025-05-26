/**
 * HOME COMPONENT - INSTAGRAM-STYLE FEED
 * Purpose: Display main feed with photo posts similar to Instagram
 * Key Design Elements:
 * - Clean, minimal layout matching Instagram's aesthetic
 * - Square aspect ratio images (1:1)
 * - Consistent spacing and typography
 * - Interactive elements (like, comment, share)
 */

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'

const Home = () => {
    const { user } = useAuth()

    // Mock data for demonstration - will be replaced with real API data
    const [posts] = useState([
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
    ])

    // State for managing post interactions
    const [postStates, setPostStates] = useState(
        posts.reduce((acc, post) => ({
            ...acc,
            [post.id]: {
                isLiked: post.isLiked,
                likesCount: post.likes,
                showComments: false
            }
        }), {})
    )

    /**
     * Handle like/unlike functionality
     * In real app, this would make API call to backend
     */
    const handleLike = (postId) => {
        setPostStates(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                isLiked: !prev[postId].isLiked,
                likesCount: prev[postId].isLiked
                    ? prev[postId].likesCount - 1
                    : prev[postId].likesCount + 1
            }
        }))
    }

    /**
     * Handle comment section toggle
     */
    const handleCommentToggle = (postId) => {
        setPostStates(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                showComments: !prev[postId].showComments
            }
        }))
    }

    /**
     * Handle share functionality (placeholder)
     */
    const handleShare = (postId) => {
        // In real app, this would open share modal
        console.log('Sharing post:', postId)
    }

    /**
     * Handle save/bookmark functionality (placeholder)
     */
    const handleSave = (postId) => {
        // In real app, this would save post to user's saved collection
        console.log('Saving post:', postId)
    }

    /**
     * Render individual post component
     */
    const PostComponent = ({ post }) => {
        const postState = postStates[post.id]

        return (
            <article className="post-container">
                {/* Post Header - User info and menu */}
                <header className="post-header">
                    <div className="post-avatar">
                        {post.user.avatar}
                    </div>
                    <div className="post-user-info">
                        <div className="post-username">{post.user.username}</div>
                        <div className="post-time">{post.timeAgo}</div>
                    </div>
                    <button className="action-btn" aria-label="More options">
                        <MoreHorizontal size={20} />
                    </button>
                </header>

                {/* Post Image - Square aspect ratio like Instagram */}
                <div className="post-image-container">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="post-image"
                        loading="lazy"
                    />
                </div>

                {/* Post Actions - Like, Comment, Share, Save */}
                <div className="post-actions">
                    <div className="action-buttons">
                        <button
                            className={`action-btn ${postState.isLiked ? 'liked' : ''}`}
                            onClick={() => handleLike(post.id)}
                            aria-label={postState.isLiked ? 'Unlike' : 'Like'}
                        >
                            <Heart
                                size={24}
                                fill={postState.isLiked ? 'currentColor' : 'none'}
                            />
                        </button>

                        <button
                            className="action-btn"
                            onClick={() => handleCommentToggle(post.id)}
                            aria-label="Comment"
                        >
                            <MessageCircle size={24} />
                        </button>

                        <button
                            className="action-btn"
                            onClick={() => handleShare(post.id)}
                            aria-label="Share"
                        >
                            <Send size={24} />
                        </button>

                        <button
                            className="action-btn"
                            onClick={() => handleSave(post.id)}
                            aria-label="Save"
                            style={{ marginLeft: 'auto' }}
                        >
                            <Bookmark size={24} />
                        </button>
                    </div>

                    {/* Post Stats - Likes and Comments count */}
                    <div className="post-stats">
                        <strong>{postState.likesCount.toLocaleString()} likes</strong>
                    </div>

                    {/* Post Caption */}
                    <div className="post-caption">
                        <span className="username">{post.user.username}</span>
                        {post.caption}
                    </div>

                    {/* Comments Section (expandable) */}
                    {post.comments > 0 && (
                        <button
                            className="view-comments-btn"
                            onClick={() => handleCommentToggle(post.id)}
                        >
                            View all {post.comments} comments
                        </button>
                    )}

                    {/* Comments Container (hidden by default) */}
                    {postState.showComments && (
                        <div className="comments-section">
                            {/* Mock comments - will be replaced with real data */}
                            <div className="comment">
                                <span className="comment-username">john_doe</span>
                                <span className="comment-text">Amazing shot! 📸</span>
                            </div>
                            <div className="comment">
                                <span className="comment-username">photo_enthusiast</span>
                                <span className="comment-text">Love the composition and lighting!</span>
                            </div>
                        </div>
                    )}

                    {/* Add Comment Input */}
                    <div className="add-comment">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <button className="post-comment-btn">Post</button>
                    </div>
                </div>
            </article>
        )
    }

    return (
        <div className="home-page">
            {/* Welcome Header */}
            <div className="welcome-header">
                <h1>Welcome back, {user?.username}!</h1>
                <p>Stay connected with your friends and discover amazing content</p>
            </div>

            {/* Posts Feed */}
            <div className="posts-feed">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostComponent key={post.id} post={post} />
                    ))
                ) : (
                    /* Empty State */
                    <div className="post-placeholder">
                        <h3>No posts yet</h3>
                        <p>Start following people to see their posts in your feed!</p>
                        <button className="explore-btn">
                            Explore ShareApp
                        </button>
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {posts.length > 0 && (
                <div className="load-more-container">
                    <button className="load-more-btn">
                        Load more posts
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home