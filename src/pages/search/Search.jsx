// src/pages/search/Search.jsx
import { Search as SearchIcon } from 'lucide-react'
import { useSearch } from '../../hooks/useSearch.js'
import { useRecentSearches } from '../../hooks/useRecentSearch.js'
import SearchInput from '../../components/common/SearchInput.jsx'
import UserListItem from '../../components/common/UserListItem.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import { LoadingSpinner } from '../../components/common/LoadingSpinner.jsx'
import '../../assets/styles/pages/searchPage.css'

const Search = () => {
    const { query, results, loading, error, handleSearch, clearSearch } = useSearch()
    const { recentSearches, addToRecent, clearRecent } = useRecentSearches()

    const showResults = query.trim() && (results.length > 0 || !loading)
    const showRecent = !query && recentSearches.length > 0

    /**
     * Handle user selection
     */
    const handleUserSelect = (user) => {
        addToRecent(user)
    }

    return (
        <div className="search-page">
            <div className="search-container">
                <SearchHeader />

                <SearchInput
                    value={query}
                    onChange={handleSearch}
                    onClear={clearSearch}
                    placeholder="Search users..."
                    autoFocus
                />

                <SearchResults
                    show={showResults}
                    loading={loading}
                    error={error}
                    results={results}
                    query={query}
                    onUserSelect={handleUserSelect}
                />

                <RecentSearches
                    show={showRecent}
                    searches={recentSearches}
                    onClearAll={clearRecent}
                />

                <SearchEmptyState
                    show={!showResults && !showRecent}
                />
            </div>
        </div>
    )
}

/**
 * Sub-components
 */
const SearchHeader = () => (
    <div className="search-header">
        <h1>Search</h1>
    </div>
)

const SearchResults = ({ show, loading, error, results, query, onUserSelect }) => {
    if (!show) return null

    return (
        <div className="search-results">
            {loading ? (
                <div className="search-loading">
                    <LoadingSpinner size="small" />
                </div>
            ) : error ? (
                <EmptyState
                    title="Search Error"
                    description={error}
                    size="small"
                />
            ) : results.length > 0 ? (
                <div className="results-list">
                    {results.map(user => (
                        <UserListItem
                            key={user.id}
                            user={user}
                            onClick={onUserSelect}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title={`No users found`}
                    description={`No results for "${query}"`}
                    size="small"
                />
            )}
        </div>
    )
}

const RecentSearches = ({ show, searches, onClearAll }) => {
    if (!show) return null

    return (
        <div className="recent-searches">
            <div className="recent-header">
                <h3>Recent</h3>
                <button onClick={onClearAll} className="clear-recent">
                    Clear all
                </button>
            </div>
            <div className="recent-list">
                {searches.map(user => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}

const SearchEmptyState = ({ show }) => {
    if (!show) return null

    return (
        <EmptyState
            icon={<SearchIcon size={48} />}
            title="Search for users"
            description="Find people by their username"
        />
    )
}

export default Search