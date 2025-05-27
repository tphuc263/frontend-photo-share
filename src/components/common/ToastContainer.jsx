export const ToastContainer = ({ toasts, onRemove }) => (
    <div className="toast-container">
        {toasts.map(toast => (
            <Toast
                key={toast.id}
                toast={toast}
                onRemove={onRemove}
            />
        ))}
    </div>
)

const Toast = ({ toast, onRemove }) => (
    <div className={`toast toast-${toast.type}`}>
        <span className="toast-message">{toast.message}</span>
        <button
            className="toast-close"
            onClick={() => onRemove(toast.id)}
        >
            ✕
        </button>
    </div>
)