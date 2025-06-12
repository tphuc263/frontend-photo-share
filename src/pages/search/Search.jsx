import {useCallback, useEffect, useState} from 'react';
import {debounce} from "../../utils/helpers.js";
import {UserResultItem} from "../../components/features/UserResultItem.jsx";
import {searchUsers} from "../../services/searchService.js";
import '../../assets/styles/pages/searchPage.css';


const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchUsers = async (searchText) => {
        if (!searchText) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setLoading(true);
        setHasSearched(true);
        try {
            const response = await searchUsers(searchText);
            console.log(response);
            if (response.data) {
                setResults(response.data.content);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useCallback(
        debounce((val) => {
            fetchUsers(val).catch(() => {
            });
        }, 500),
        []
    );

    useEffect(() => {
        debouncedFetch(query);
    }, [query, debouncedFetch]);

    return (
        <div className="search-page">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for users..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="search-results">
                    {loading && <div className="status-message">Loading...</div>}

                    {!loading && hasSearched && results.length === 0 && (
                        <div className="status-message">No users found.</div>
                    )}

                    {!loading && results.length > 0 && (
                        results.map(user => (
                            <UserResultItem key={user.id} user={user}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;