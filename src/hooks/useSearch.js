// src/hooks/useSearch.js
import { useCallback, useState } from 'react';
import { searchUsers } from '../services/searchService.js';
import { debounce } from '../utils/helpers.js';

export const useSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const performSearch = useCallback(
        debounce(async (searchQuery) => {
            if (!searchQuery.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await searchUsers(searchQuery, 0, 10);
                const pageData = response.data;

                setResults(pageData.content || []);

            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
                setError(errorMessage);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500), // Debounce 500ms
        []
    );

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        performSearch(newQuery);
    };

    return {
        query,
        results,
        loading,
        error,
        handleSearch
    };
};