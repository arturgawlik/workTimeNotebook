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

export interface Notyfication {
    type: string;
    message: string;
}

export interface WorkTimeNote {
    items: WorkTimeNoteItem[],
    notyfication: Notyfication
}

export const initialState: WorkTimeNote = { items: [], notyfication: null } as WorkTimeNote;


