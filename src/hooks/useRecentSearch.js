// src/hooks/useRecentSearches.js
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recent_searches'
const MAX_RECENT = 10

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState([])

    /**
     * Load recent searches from storage
     */
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            const recent = stored ? JSON.parse(stored) : []
            setRecentSearches(recent)
        } catch (error) {
            console.error('Failed to load recent searches:', error)
            setRecentSearches([])
        }
    }, [])

    /**
     * Add to recent searches
     */
    const addToRecent = (item) => {
        try {
            const filtered = recentSearches.filter(search => search.id !== item.id)
            const newRecent = [item, ...filtered].slice(0, MAX_RECENT)

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent))
            setRecentSearches(newRecent)
        } catch (error) {
            console.error('Failed to save recent search:', error)
        }
    }

    /**
     * Clear all recent searches
     */
    const clearRecent = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
            setRecentSearches([])
        } catch (error) {
            console.error('Failed to clear recent searches:', error)
        }
    }

    /**
     * Remove specific item
     */
    const removeFromRecent = (itemId) => {
        try {
            const filtered = recentSearches.filter(search => search.id !== itemId)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
            setRecentSearches(filtered)
        } catch (error) {
            console.error('Failed to remove recent search:', error)
        }
    }

    return {
        recentSearches,
        addToRecent,
        clearRecent,
        removeFromRecent
    }
}