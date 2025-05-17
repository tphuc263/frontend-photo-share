import { useState, useEffect } from 'react';
import PhotoCard from '../components/features/PhotoCard';
import './Home.css';

/**
 * Home page component displaying personalized feed
 */
function Home() {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate API fetch
        const fetchFeed = async () => {
            try {
                // In a real app, this would be an API call
                // For now we'll use mock data
                const mockFeed = [
                    {
                        id: '1',
                        imageUrl: 'https://via.placeholder.com/500',
                        caption: 'Beautiful sunset at the beach!',
                        hashtags: ['sunset', 'beach', 'vacation'],
                        likes: 125,
                        user: {
                            id: 'user1',
                            username: 'traveler',
                            avatar: 'https://via.placeholder.com/50'
                        },
                        comments: [
                            { username: 'photoFan', text: 'Amazing view!' },
                            { username: 'sunset_lover', text: 'Perfect colors 😍' }
                        ]
                    },
                    {
                        id: '2',
                        imageUrl: 'https://via.placeholder.com/500',
                        caption: 'My morning coffee ritual',
                        hashtags: ['coffee', 'morning', 'lifestyle'],
                        likes: 84,
                        user: {
                            id: 'user2',
                            username: 'coffeeGram',
                            avatar: 'https://via.placeholder.com/50'
                        },
                        comments: [
                            { username: 'caffeine_addict', text: 'That looks delicious!' }
                        ]
                    },
                    {
                        id: '3',
                        imageUrl: 'https://via.placeholder.com/500',
                        caption: 'City lights',
                        hashtags: ['cityscape', 'night', 'urban'],
                        likes: 210,
                        user: {
                            id: 'user3',
                            username: 'cityExplorer',
                            avatar: 'https://via.placeholder.com/50'
                        },
                        comments: []
                    }
                ];

                // Set timeout to simulate network delay
                setTimeout(() => {
                    setFeed(mockFeed);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to load feed. Please try again.');
                setLoading(false);
                console.error('Error fetching feed:', err);
            }
        };

        fetchFeed();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your feed...</p>
            </div>
        );
    }

    // Error state
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

    // Empty feed state
    if (feed.length === 0) {
        return (
            <div className="empty-feed">
                <h2>Your feed is empty</h2>
                <p>Start following people to see their photos here!</p>
                <button className="explore-button">Explore</button>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="feed">
                {feed.map(photo => (
                    <PhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </div>
    );
}

export default Home;