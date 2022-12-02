export type IStep = {
    id: string
    body: string,
    status: boolean
}

export type ITodo = {
    id: string,
    body: string,
    status: boolean
    steps: IStep[]
}

export interface TodoState {
    todos: ITodo[]
    isLoading: boolean,
    error: string
}

