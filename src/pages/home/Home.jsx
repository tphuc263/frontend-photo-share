import {useEffect, useState} from "react";
import {getNewsfeed} from "../../services/newsfeedService.js";
import PhotoCard from '../../components/features/PhotoCard.jsx';
import {Loader} from '../../components/common/Loader.jsx'
import '../../assets/styles/pages/homePage.css';


const Home = () => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadFeed = async (pageNum = 0, isRefresh = false) => {
        try {
            setLoading(true);
            setError(null);

            const response = await getNewsfeed(pageNum, 20);
            const newPosts = response.data.content;

            if (isRefresh) {
                setFeed(newPosts);
            } else {
                setFeed(prev => [...prev, ...newPosts]);
            }

            setHasMore(!response.data.last);
            setPage(pageNum);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            loadFeed(page + 1, false);
        }
    };

    const refreshFeed = () => {
        loadFeed(0, true).catch(err => {
            console.error('Failed to load initial feed:', err);
        });
    };

    useEffect(() => {
        loadFeed(0, true).catch(err => {
            console.error('Failed to load initial feed:', err);
        });
    }, []);


    return (
        <div className="home-container">
            <main className="feed-wrapper">
                <button onClick={refreshFeed} disabled={loading} className="refresh-btn">
                    {loading ? 'Loading...' : 'Refresh Feed'}
                </button>

                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}
                {loading && feed.length === 0 && !error && (
                    <div className="page-loader-container">
                        <Loader />
                    </div>
                )}

                {feed.map((post) => (
                    <PhotoCard
                        key={post.id}
                        username={post.username}
                        avatarSrc={post.userImageUrl}
                        photoSrc={post.imageURL}
                        caption={post.caption}
                        likesCount={post.likesCount}
                        commentsCount={post.commentsCount}
                        isLiked={post.isLikedByCurrentUser}
                        createdAt={post.createdAt}
                        tags={post.tags}
                    />
                ))}

                {loading && feed.length > 0 && (
                    <div className="load-more-loader">
                        <Loader />
                    </div>
                )}

                {hasMore && !loading && (
                    <button onClick={loadMore} className="load-more-btn">
                        Load More
                    </button>
                )}

                {loading && <div className="loading">Loading...</div>}

            </main>
        </div>
    );
};

export default Home;