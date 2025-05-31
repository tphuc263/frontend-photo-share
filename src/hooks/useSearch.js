// src/hooks/useSearch.js
import {useCallback, useState} from 'react'
import {searchService} from '../services/searchService.js'
import {debounce} from '../utils/helpers.js'

export const useSearch = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /**
     * Perform search with debouncing
     */
    const performSearch = useCallback(
        debounce(async (searchQuery) => {
            if (!searchQuery.trim()) {
                setResults([])
                return
            }

            try {
                setLoading(true)
                setError(null)

                const response = await searchService.searchUsers(searchQuery, 0, 10)

                if (response.success) {
                    setResults(response.data.data.content || [])
                } else {
                    setError(response.error)
                }
            } catch (err) {
                setError(err.message)
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 500),
        []
    )

    /**
     * Handle search query change
     */
    const handleSearch = (newQuery) => {
        setQuery(newQuery)
        performSearch(newQuery)
    }

    /**
     * Clear search
     */
    const clearSearch = () => {
        setQuery('')
        setResults([])
        setError(null)
    }

    return {
        query,
        results,
        loading,
        error,
        handleSearch,
        clearSearch
    }
}