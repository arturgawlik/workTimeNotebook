export interface WorkTimeNoteItem {
    id: string;
    type: string;
    customer: string;
    description: string;
    uri: string;
    startDate: Date;
    endDate: Date;
    spentTimeInMinutes: number;
}

export interface WorkTimeNote {
    items: WorkTimeNoteItem[],
    data: any,
}

export const initialState: WorkTimeNote = {} as WorkTimeNote;
