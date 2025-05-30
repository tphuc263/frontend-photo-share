/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({message = 'Loading...', size = 'medium'}) => {
    const sizeClasses = {
        small: 'loading-spinner-sm',
        medium: 'loading-spinner-md',
        large: 'loading-spinner-lg'
    }

    return (
        <div className="loading-container">
            <div className={`loading-spinner ${sizeClasses[size]}`}>
                ⏳
            </div>
            {message && (
                <p className="loading-message">{message}</p>
            )}
        </div>
    )
}