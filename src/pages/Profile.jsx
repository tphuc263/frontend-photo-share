import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Profile.css';

/**
 * User profile page component
 */
function Profile() {
    const { username } = useParams();
    const { user: currentUser } = useUser();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // Reset state on username change
        setLoading(true);
        setError(null);

        const fetchProfile = async () => {
            try {
                // In a real app, these would be API calls
                // For now, we'll use mock data
                const mockUser = {
                    id: 'user123',
                    username: username || 'traveler',
                    name: 'Travel Enthusiast',
                    bio: 'Exploring the world one photo at a time ✈️',
                    avatar: 'https://via.placeholder.com/150',
                    postsCount: 42,
                    followersCount: 1024,
                    followingCount: 350
                };

                const mockPosts = Array(9).fill().map((_, i) => ({
                    id: `post${i}`,
                    imageUrl: 'https://via.placeholder.com/300',
                    likes: Math.floor(Math.random() * 200),
                    commentsCount: Math.floor(Math.random() * 30)
                }));

                // Simulate network delay
                setTimeout(() => {
                    setUser(mockUser);
                    setPosts(mockPosts);
                    setLoading(false);

                    // Check if this is the current user's profile
                    if (currentUser && currentUser.username === username) {
                        // This is the current user's profile
                    } else {
                        // Check if following this user
                        setIsFollowing(Math.random() > 0.5); // Random for demo
                    }
                }, 1000);
            } catch (err) {
                setError('Failed to load profile. Please try again.');
                setLoading(false);
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, [username, currentUser]);

    const handleFollow = () => {
        // Toggle follow state
        setIsFollowing(!isFollowing);

        // Update followers count
        setUser(prev => ({
            ...prev,
            followersCount: isFollowing
                ? prev.followersCount - 1
                : prev.followersCount + 1
        }));

        // API call would go here in a real app
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading profile...</p>
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

    const isCurrentUser = currentUser && user && currentUser.username === user.username;

    return (
        <div className="profile-container">
            {/* Profile header */}
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={user.avatar} alt={user.username} />
                </div>

                <div className="profile-info">
                    <div className="profile-top">
                        <h1 className="profile-username">{user.username}</h1>

                        {isCurrentUser ? (
                            <button className="edit-profile-btn">Edit Profile</button>
                        ) : (
                            <button
                                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                                onClick={handleFollow}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>

                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-value">{user.postsCount}</span>
                            <span className="stat-label">posts</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{user.followersCount}</span>
                            <span className="stat-label">followers</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{user.followingCount}</span>
                            <span className="stat-label">following</span>
                        </div>
                    </div>

                    <div className="profile-bio">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="bio-text">{user.bio}</p>
                    </div>
                </div>
            </div>

            {/* Profile tabs */}
            <div className="profile-tabs">
                <button
                    className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    Posts
                </button>
                <button
                    className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved
                </button>
                <button
                    className={`tab-button ${activeTab === 'tagged' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tagged')}
                >
                    Tagged
                </button>
            </div>

            {/* Grid of posts */}
            <div className="posts-grid">
                {posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <img src={post.imageUrl} alt="" className="grid-image" />
                        <div className="grid-overlay">
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

export default Profile;