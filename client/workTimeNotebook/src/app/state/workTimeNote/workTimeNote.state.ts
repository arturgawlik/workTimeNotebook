export interface WorkTimeNote {
    id: string;
    type: string;
    customer: string;
    description: string;
    uri: string;
    startDate: Date;
    endDate: Date;
    spentTimeInMinutes: number;
}

export const initialState: WorkTimeNote[] = [] as WorkTimeNote[];
