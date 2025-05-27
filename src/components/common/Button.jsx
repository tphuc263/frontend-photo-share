export const Button = ({
                           children,
                           variant = 'primary',
                           size = 'medium',
                           disabled = false,
                           loading = false,
                           onClick,
                           type = 'button',
                           className = '',
                           ...props
                       }) => {
    const baseClass = 'btn'
    const variantClass = `btn-${variant}`
    const sizeClass = `btn-${size}`
    const disabledClass = disabled || loading ? 'btn-disabled' : ''

    const fullClassName = [
        baseClass,
        variantClass,
        sizeClass,
        disabledClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            className={fullClassName}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <>
                    <span className="btn-loading-spinner">⏳</span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    )
}