export class WorkTimeNoteBackendModel {
    id: string;
    type: string;
    customer: string;
    description: string;
    uri: string;
    startDate: Date;
    endDate: Date;
    spentTimeInMinutes: number;
}
