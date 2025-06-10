import { useState, useEffect } from 'react';
import { useUserProfile } from "../../hooks/useUserProfile.js";
import { useAuthContext } from '../../context/AuthContext.jsx';
import { follow, unfollow } from '../../services/followService.js';
import '../../assets/styles/pages/profilePage.css';

const ProfilePage = () => {
    const {profile, posts, handleLoadMore} = useUserProfile();
    const {user: currentUser} = useAuthContext();

    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    useEffect(() => {
        if (profile.data?.isFollowingByCurrentUser) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [profile.data]);

    if (profile.loading) {
        return <div className="profile-container"><p>Đang tải trang cá nhân...</p></div>;
    }

    if (profile.error) {
        return <div className="profile-container"><p>Lỗi: {profile.error}</p></div>;
    }

    if (!profile.data) {
        return <div className="profile-container"><p>Không tìm thấy dữ liệu người dùng.</p></div>;
    }

    const showFollowButton = currentUser && profile.data && currentUser.id !== profile.data.id;
    const showEditButton = currentUser && profile.data && currentUser.id === profile.data.id;

    const handleFollowToggle = async () => {
        if (!profile.data?.id) return;

        setIsFollowLoading(true);
        try {
            if (isFollowing) {
                await unfollow(profile.data.id);
                setIsFollowing(false);
            } else {
                await follow(profile.data.id);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Failed to toggle follow state:', error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-avatar">
                    <img src={profile.data.imageUrl} alt="Avatar" />
                </div>
                <div className="profile-info">
                    <div className="profile-info-top">
                        <h1 className="username">{profile.data.username}</h1>
                        {showEditButton && (
                            <button className="edit-profile-button">Edit Profile</button>
                        )}
                        {showFollowButton && (
                            <button
                                className={`follow-button ${isFollowing ? 'following' : ''}`}
                                onClick={handleFollowToggle}
                                disabled={isFollowLoading}
                            >
                                {isFollowLoading ? '...' : (isFollowing ? 'Following' : 'Follow')}
                            </button>
                        )}
                    </div>
                    <div className="profile-stats">
                        <span><strong>{profile.data.stats?.posts}</strong> posts</span>
                        <span><strong>{profile.data.stats?.followers}</strong> followers</span>
                        <span><strong>{profile.data.stats?.following}</strong> following</span>
                    </div>
                    <div className="profile-bio">
                        <p>{profile.data.bio}</p>
                    </div>
                </div>
            </header>

            <main className="prfile-posts-container">
                <div className="profile-posts">
                    {posts.data.map((post, index) => (
                        <div key={post.id || index} className="post-item">
                            <img src={post.imageUrl} alt={`Post ${post.id}`} />
                        </div>
                    ))}
                </div>

                {posts.error && <p className="error-message">Lỗi khi tải bài viết: {posts.error}</p>}

                {posts.loading && <p>Đang tải thêm bài viết...</p>}
                {!posts.loading && posts.currentPage < posts.totalPages - 1 && (
                    <button onClick={handleLoadMore} className="load-more-button">
                        Tải thêm
                    </button>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;