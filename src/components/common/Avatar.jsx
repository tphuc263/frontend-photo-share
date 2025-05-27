/**
 * Avatar Component
 */
export const Avatar = ({
                           src,
                           alt,
                           fallback,
                           size = 'medium',
                           onClick
                       }) => {
    const sizeClasses = {
        small: 'avatar-sm',
        medium: 'avatar-md',
        large: 'avatar-lg'
    }

    const handleClick = onClick ? { onClick } : {}
    const cursor = onClick ? { cursor: 'pointer' } : {}

    return (
        <div
            className={`avatar ${sizeClasses[size]}`}
            style={cursor}
            {...handleClick}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || 'Avatar'}
                    className="avatar-image"
                />
            ) : (
                <div className="avatar-fallback">
                    {fallback || '👤'}
                </div>
            )}
        </div>
    )
}