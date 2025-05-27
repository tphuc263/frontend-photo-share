export const EmptyState = ({
                              title,
                              description,
                              actionText,
                              onAction,
                              icon = '📭'
                          }) => (
    <div className="empty-state">
        <div className="empty-state-icon">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        {description && (
            <p className="empty-state-description">{description}</p>
        )}
        {actionText && onAction && (
            <button
                onClick={onAction}
                className="empty-state-action"
            >
                {actionText}
            </button>
        )}
    </div>
)