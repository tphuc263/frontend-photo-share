import {useState, useEffect, useRef} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {updateUserProfile} from "../../services/userService.js";
import '../../assets/styles/pages/editProfile.css';

const EditProfileForm = () => {
    const {user: currentUser, setUser} = useAuthContext();

    const fileInputRef = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const[username, setUsername] = useState("")
    const[bio, setBio] = useState("")

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username || "");
            setBio(currentUser.bio || "");
            setAvatarPreview(currentUser.imageUrl || null);
        }
    }, [currentUser]);

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
        setIsUploading(true);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('bio', bio);
        if (avatarFile) {
            formData.append('image', avatarFile);
        }

        try {
            const updatedProfileData = await updateUserProfile(formData);
            setUser(updatedProfileData);
            alert("Profile updated successfully!");
            setAvatarFile(null);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    if (!currentUser) {
        return <div>Loading user data...</div>;
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
                            <span className="current-username">{currentUser.username}</span>
                            <button type="button" className="change-photo-button" onClick={handleAvatarClick}>
                                Change profile photo
                            </button>
                        </div>
                    </div>

                    <div className="form-row">
                        <aside><label htmlFor={"username"}> Username </label></aside>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <aside>
                            <label htmlFor={"bio"}> Bio </label>
                        </aside>
                        <input
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <aside></aside>
                        <div className="input-wrapper">
                            <button type="submit" className="submit-button" disabled={isUploading}>
                                {isUploading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/gif"
                />
            </div>
        </>
    )
}
export default EditProfileForm
