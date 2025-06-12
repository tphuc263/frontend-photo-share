import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCurrentUserProfile, getUserProfileById, updateUserProfile} from '../services/userService';
import {getUserPhotos} from '../services/photoService';

export const useUserProfile = () => {
    const {userId} = useParams();

    const [profile, setProfile] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const [posts, setPosts] = useState({
        data: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0,
    });

    // Effect để fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            setProfile({data: null, loading: true, error: null});
            try {
                const data = userId ? await getUserProfileById(userId) : await getCurrentUserProfile();
                setProfile({data, loading: false, error: null});
            } catch (error) {
                setProfile({data: null, loading: false, error: error.message});
            }
        };

        fetchProfile();
    }, [userId]);

    // Effect để fetch posts
    useEffect(() => {
        if (!profile.data) return;

        const fetchPosts = async () => {
            setPosts(prev => ({...prev, loading: true, error: null}));
            try {
                const postResponse = await getUserPhotos(profile.data.id, posts.currentPage);
                setPosts(prev => ({
                    ...prev,
                    data: posts.currentPage === 0 ? postResponse.content : [...prev.data, ...postResponse.content],
                    totalPages: postResponse.totalPages,
                    loading: false,
                }));
            } catch (err) {
                setPosts(prev => ({...prev, loading: false, error: err.message}));
            }
        };

        fetchPosts();
    }, [profile.data, posts.currentPage]);

    const handleLoadMore = () => {
        if (posts.currentPage < posts.totalPages - 1) {
            setPosts(prev => ({...prev, currentPage: prev.currentPage + 1}));
        }
    };

    return {profile, posts, handleLoadMore, setProfile};
};