import {store as notificationStore} from 'react-notifications-component'

export const showNotification = (title, message, type) => {
    notificationStore.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: false
        }
    })
}
