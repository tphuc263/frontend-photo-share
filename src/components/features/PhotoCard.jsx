import React from 'react';
import '../../assets/styles/components/photoCard.css';

const PhotoCard = ({
                       username,
                       avatarSrc,
                       photoSrc,
                       caption
                   }) => {

    return (
        <div className="photo-card">
            <div className="photo-card-header">
                <img src={avatarSrc} alt={`${username}'s avatar`} className="avatar" />
                <span className="username">{username}</span>
            </div>

            <img src={photoSrc} alt="Post" className="photo" />

            <div className="photo-card-actions">
            </div>

            <div className="photo-card-likes">
            </div>

            <div className="photo-card-caption">
                <span className="username">{username}</span> {caption}
            </div>
        </div>
    );
};

export default PhotoCard;