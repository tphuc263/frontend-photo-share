import { useAuth } from '../contexts/AuthContext'

const Home = () => {
    const { user } = useAuth()

    return (
        <div className="home-page">
            <h1>Welcome back, {user?.username}!</h1>
            <p>This is your home feed</p>

            {/* Placeholder for posts feed */}
            <div className="posts-feed">
                <div className="post-placeholder">
                    <p>Posts will appear here...</p>
                </div>
            </div>
        </div>
    )
}

export default Home