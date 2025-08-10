import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/pages/profilePage.css";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useUserProfile } from "../../hooks/useUserProfile.js";
import { follow, unfollow } from "../../services/followService.js";

const ProfilePage = () => {
  const { profile, posts, handleLoadMore, setProfile } = useUserProfile();
  const { user: currentUser } = useAuthContext();

  const [isFollowLoading, setIsFollowLoading] = useState(false);

  if (profile.loading) {
    return (
      <div className="profile-container">
        <p>Đang tải trang cá nhân...</p>
      </div>
    );
  }

  if (profile.error) {
    return (
      <div className="profile-container">
        <p>Lỗi: {profile.error}</p>
      </div>
    );
  }

  if (!profile.data) {
    return (
      <div className="profile-container">
        <p>Không tìm thấy dữ liệu người dùng.</p>
      </div>
    );
  }

  const isOwnProfile =
    currentUser && profile.data && currentUser.id === profile.data.id;
  const displayData = profile.data;
  const stats = profile.data.stats;

  const showEditButton = isOwnProfile;
  const showFollowButton = currentUser && !isOwnProfile;

  const handleFollowToggle = async () => {
    if (!profile.data?.id) return;

    setIsFollowLoading(true);

    const currentlyFollowing = profile.data.followingByCurrentUser;

    try {
      if (currentlyFollowing) {
        await unfollow(profile.data.id);

        setProfile((prevProfile) => ({
          ...prevProfile,
          data: {
            ...prevProfile.data,
            followingByCurrentUser: false,
            stats: {
              ...prevProfile.data.stats,
              followers: prevProfile.data.stats.followers - 1,
            },
          },
        }));
      } else {
        await follow(profile.data.id);

        setProfile((prevProfile) => ({
          ...prevProfile,
          data: {
            ...prevProfile.data,
            followingByCurrentUser: true,
            stats: {
              ...prevProfile.data.stats,
              followers: prevProfile.data.stats.followers + 1,
            },
          },
        }));
      }
    } catch (error) {
      console.error("Failed to toggle follow state:", error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-wrapper">
            <img src={displayData.imageUrl} alt="Avatar" />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info-top">
            <h1 className="username">{displayData.username}</h1>
            {showEditButton && (
              <Link to="/edit-profile" className="edit-profile-button">
                Edit Profile
              </Link>
            )}
            {showFollowButton && (
              <button
                className={`follow-button ${
                  profile.data.followingByCurrentUser ? "following" : ""
                }`}
                onClick={handleFollowToggle}
                disabled={isFollowLoading}
              >
                {isFollowLoading
                  ? "..."
                  : profile.data.followingByCurrentUser
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="profile-stats">
            <span>
              <strong>{stats?.posts}</strong> posts
            </span>
            <span>
              <strong>{stats?.followers}</strong> followers
            </span>
            <span>
              <strong>{stats?.following}</strong> following
            </span>
          </div>
          <div className="profile-bio">
            <p>{displayData.bio}</p>
          </div>
        </div>
      </header>

      <main className="profile-posts-container">
        <div className="profile-posts">
          {posts.data.map((post, index) => (
            <div key={post.id || index} className="post-item">
              <img src={post.imageUrl} alt={`Post ${post.id}`} />
            </div>
          ))}
        </div>

        {posts.error && (
          <p className="error-message">Lỗi khi tải bài viết: {posts.error}</p>
        )}

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
