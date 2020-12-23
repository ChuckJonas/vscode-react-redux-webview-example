

export type Message = IncrementCounter | GetActiveEditor;

export interface IncrementCounter {
    type: 'INCREMENT_COUNTER',
}

export interface GetActiveEditor {
    type: 'GET_ACTIVE_EDITOR',
    fileName: string
}