import {useState} from 'react'

export const useToast = () => {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'info', duration = 2000) => {
        const id = Date.now()
        const toast = {id, message, type}

        setToasts(prev => [...prev, toast])

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return {toasts, addToast, removeToast}
}