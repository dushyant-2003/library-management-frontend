export type Notification = {
    notificationId: string
    userId: string,
    title: string,
    message: string,
    date: string
}

export type NotificationResponse  = {
    status: string,
    message: string,
    data: Notification[]

}