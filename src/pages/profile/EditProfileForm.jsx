import {useState, useEffect, useRef} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {
  updateUserProfile,
  getCurrentUserProfile,
} from "../../services/userService.js";
import '../../assets/styles/pages/editProfile.css';

const EditProfileForm = () => {
    const {user: currentUser, setUser} = useAuthContext();

    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);

     const [formData, setFormData] = useState({
       username: "",
       bio: "",
     });

    const fileInputRef = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      const fetchProfileForEditing = async () => {
        if (currentUser?.id) {
          try {
            const fullProfileData = await getCurrentUserProfile(); // Hoặc getUserProfile
            setFormData({
              username: fullProfileData.username || "",
              bio: fullProfileData.bio || "",
            });
            setAvatarPreview(fullProfileData.imageUrl || null);
            setError(null);
          } catch (err) {
            console.error("Failed to load profile data for editing:", err);
            setError("Could not load your profile. Please refresh the page.");
          } finally {
            setPageLoading(false);
          }
        }
      };

      fetchProfileForEditing();
    }, [currentUser?.id]);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview( URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataToSubmit = new FormData();
        dataToSubmit.append("username", formData.username);
        dataToSubmit.append("bio", formData.bio);
        if (avatarFile) {
            dataToSubmit.append("image", avatarFile);
        }

        try {
            const updatedProfileData = await updateUserProfile(dataToSubmit);
            setUser(updatedProfileData);
            alert("Profile updated successfully!");
            setAvatarFile(null);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (pageLoading) {
      return (
        <div className="edit-profile-container">Loading your profile...</div>
      );
    }

    if (error) {
      return (
        <div className="edit-profile-container error-message">{error}</div>
      );
    }

    return (
      <>
        <div className="edit-profile-container">
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="form-row form-row-avatar">
              <div className="avatar-preview-wrapper">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="avatar-preview"
                />
              </div>
              <div className="avatar-actions">
                <span className="current-username">{formData.username}</span>
                <button
                  type="button"
                  className="change-photo-button"
                  onClick={handleAvatarClick}
                >
                  Change profile photo
                </button>
              </div>
            </div>

            <div className="form-row">
              <aside>
                <label htmlFor={"username"}> Username </label>
              </aside>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <aside>
                <label htmlFor={"bio"}> Bio </label>
              </aside>
              <input
                type="text"
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <aside></aside>
              <div className="input-wrapper">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/gif"
          />
        </div>
      </>
    );
}
export default EditProfileForm
