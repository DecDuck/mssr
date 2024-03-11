interface Notification {
    type: "TEXT" | "LOADING" | "ERROR",
    name: string,
    dismissible: boolean,

    content?: string,
    progress?: number,
}

export const useNotifications = () => useState<{ [key: string]: Notification }>('notifications', () => ({}))