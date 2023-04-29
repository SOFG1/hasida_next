export type AlertType = {
    isError: boolean,
    text: string
}

export interface IAppState {
    alert: AlertType | null
}