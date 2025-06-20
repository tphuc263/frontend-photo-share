import {Link} from "react-router-dom";
import "../../assets/styles/components/userResultItem.css"

export const UserResultItem = ({user}) => (
    <Link to={`/profile/${user.id}`} className="user-result-item">
        <img src={user.imageUrl} alt={`${user.username}'s avatar`} className="avatar"/>
        <div className="user-info">
            <span className="username">{user.username}</span>
        </div>
    </Link>
);