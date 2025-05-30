// src/components/common/SearchInput.jsx
import { Search as SearchIcon, X } from 'lucide-react'
import '../../styles/components/SearchInput.css'

const SearchInput = ({
                         value,
                         onChange,
                         onClear,
                         placeholder = "Search...",
                         disabled = false,
                         autoFocus = false
                     }) => {
    return (
        <div className="search-input-container">
            <SearchIcon size={16} className="search-icon" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
                disabled={disabled}
                autoFocus={autoFocus}
                autoComplete="off"
            />
            {value && (
                <button
                    onClick={onClear}
                    className="search-clear"
                    aria-label="Clear search"
                    disabled={disabled}
                >
                    <X size={16} />
                </button>
            )}
        </div>
    )
}

export default SearchInput