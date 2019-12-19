export interface WorkTimeNoteItem {
    id: string;
    type: string;
    customer: string;
    description: string;
    uri: string;
    startDate: Date;
    endDate: Date;
    timeSpentInMinutes: number;
}

export interface AddEditMessage {
    type: string;
    message: string;
    handled: boolean;
}

export interface WorkTimeNote {
    items: WorkTimeNoteItem[],
    addEditMessages: AddEditMessage[]
}

export const initialState: WorkTimeNote = {items: [], addEditMessages: []} as WorkTimeNote;
