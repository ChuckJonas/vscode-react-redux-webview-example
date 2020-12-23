export interface IncrementCounter {
    type: 'Increment';
}

export interface ErrorAction {
    type: 'Error',
    msg: string;
}

export interface GetActiveEditor {
    type: 'GetActiveEditor';
    name: string;
}