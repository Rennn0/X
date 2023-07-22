export interface upload {
    description: string,
    url: string,
    time: string
    loaded?: boolean
}

export interface profile {
    name: string,
    lastname: string,
    password: string,
    email: string,
    username: string,
    uploads: upload[]
}

export interface message {
    username: string,
    sms: string,
    time: Date
}

