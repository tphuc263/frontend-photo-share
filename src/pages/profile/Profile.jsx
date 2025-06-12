import {useEffect, useState, useRef} from 'react';
import {useUserProfile} from "../../hooks/useUserProfile.js";
import {useAuthContext} from '../../context/AuthContext.jsx';
import {follow, unfollow} from '../../services/followService.js';
import {Link} from 'react-router-dom';
import '../../assets/styles/pages/profilePage.css';
import {updateUserProfile} from "../../services/userService.js";

const ProfilePage = () => {
    const {profile, posts, handleLoadMore, setProfile} = useUserProfile();
    const {user: currentUser} = useAuthContext();

    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const fileInputRef = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null); // temp save url to pre view
    const [isUploading, setIsUploading] = useState(false);

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

    const handleAvatarClick = () => {
        if (showEditButton) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    }

    const handleAvatarUpload = async () => {
        if (!avatarFile) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', avatarFile);
            const updatedProfileData = await updateUserProfile(formData);
            setProfile(prev => ({
                ...prev,
                data: updatedProfileData,
            }));
            // clear after success
            setAvatarFile(null);
            setAvatarPreview(null);
            alert("update avatar success");
        } catch (e) {
            console.error('Failed to update avatar:', e);
            alert("error.message")
        } finally {
            setIsUploading(false);
        }
    }
    const cancelAvatarChange = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
    };

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
                    <div
                        className={`avatar-wrapper ${showEditButton && !isUploading ? 'editable' : ''}`}
                        onClick={showEditButton && !isUploading ? handleAvatarClick : undefined}
                    >
                        <img src={avatarPreview || profile.data.imageUrl}
                             alt="Avatar"
                        />
                        {isUploading && <div className="avatar-loader"></div>}
                    </div>
                    {avatarPreview && !isUploading && (
                        <div className="avatar-controls">
                            <button onClick={handleAvatarUpload} className="save-avatar-button">Save</button>
                            <button onClick={cancelAvatarChange} className="cancel-avatar-button">Cancel</button>
                        </div>
                    )}
                </div>
                <div className="profile-info">
                    <div className="profile-info-top">
                        <h1 className="username">{profile.data.username}</h1>
                        {showEditButton && (
                            <Link to="/edit-profile" className="edit-profile-button">Edit Profile </Link>
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

            <main className="profile-posts-container">
                <div className="profile-posts">
                    {posts.data.map((post, index) => (
                        <div key={post.id || index} className="post-item">
                            <img src={post.imageUrl} alt={`Post ${post.id}`}/>
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
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/gif"
            />
        </div>
    );
};

export default ProfilePage;