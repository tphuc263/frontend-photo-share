import { useState, useEffect } from 'react';
import './Explore.css';

/**
 * Explore page component for discovering content
 */
function Explore() {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [trendingTags, setTrendingTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTag, setActiveTag] = useState('all');

    useEffect(() => {
        // Fetch trending content and tags
        const fetchTrending = async () => {
            try {
                // In a real app, this would be an API call
                // For now, we'll use mock data

                // Mock trending tags
                const mockTags = [
                    { id: 'tag1', name: 'photography', postsCount: 1250 },
                    { id: 'tag2', name: 'nature', postsCount: 982 },
                    { id: 'tag3', name: 'travel', postsCount: 756 },
                    { id: 'tag4', name: 'food', postsCount: 645 },
                    { id: 'tag5', name: 'fashion', postsCount: 521 }
                ];

                // Mock trending posts
                const mockPosts = Array(20).fill().map((_, i) => ({
                    id: `explore${i}`,
                    imageUrl: 'https://via.placeholder.com/300',
                    likes: Math.floor(Math.random() * 500) + 100,
                    commentsCount: Math.floor(Math.random() * 50),
                    user: {
                        username: `user${i % 10}`,
                        avatar: 'https://via.placeholder.com/50'
                    },
                    tags: mockTags.slice(0, Math.floor(Math.random() * 3) + 1).map(tag => tag.name)
                }));

                // Simulate network delay
                setTimeout(() => {
                    setTrendingTags(mockTags);
                    setTrendingPosts(mockPosts);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to load explore content. Please try again.');
                setLoading(false);
                console.error('Error fetching explore content:', err);
            }
        };

        fetchTrending();
    }, []);

    // Filter posts by active tag
    const filteredPosts = activeTag === 'all'
        ? trendingPosts
        : trendingPosts.filter(post => post.tags.includes(activeTag));

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading trending content...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="explore-container">
            {/* Trending tags */}
            <div className="trending-tags">
                <button
                    className={`tag-button ${activeTag === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTag('all')}
                >
                    All
                </button>

                {trendingTags.map(tag => (
                    <button
                        key={tag.id}
                        className={`tag-button ${activeTag === tag.name ? 'active' : ''}`}
                        onClick={() => setActiveTag(tag.name)}
                    >
                        #{tag.name}
                    </button>
                ))}
            </div>

            {/* Explore grid */}
            <div className="explore-grid">
                {filteredPosts.map(post => (
                    <div key={post.id} className="explore-item">
                        <img src={post.imageUrl} alt="" className="explore-image" />
                        <div className="explore-overlay">
                            <div className="overlay-user">
                                <img src={post.user.avatar} alt={post.user.username} className="mini-avatar" />
                                <span className="username">{post.user.username}</span>
                            </div>
                            <div className="overlay-stats">
                                <span className="stat-item">❤️ {post.likes}</span>
                                <span className="stat-item">💬 {post.commentsCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;