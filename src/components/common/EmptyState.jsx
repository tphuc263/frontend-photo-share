// src/components/common/EmptyState.jsx (updated)
const EmptyState = ({
                        icon,
                        title,
                        description,
                        actionText,
                        onAction,
                        size = 'medium'
                    }) => {
    return (
        <div className={`empty-state empty-state-${size}`}>
            {icon && <div className="empty-state-icon">{icon}</div>}
            <h3 className="empty-state-title">{title}</h3>
            {description && (
                <p className="empty-state-description">{description}</p>
            )}
            {actionText && onAction && (
                <button onClick={onAction} className="empty-state-action">
                    {actionText}
                </button>
            )}
        </div>
    )
}

export default EmptyState