export const ErrorState = ({
    title = 'Something went wrong',
    message,
    onRetry,
    retryText = 'Try again'
}) => (
    <div className="error-state">
        <div className="error-state-icon">❌</div>
        <h3 className="error-state-title">{title}</h3>
        {message && (
            <p className="error-state-message">{message}</p>
        )}
        {onRetry && (
            <button
                onClick={onRetry}
                className="error-state-retry"
            >
                {retryText}
            </button>
        )}
    </div>
)