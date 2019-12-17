import { Action } from '@ngrx/store';

export const START_INIT_WORK_TIME_NOTE = 'Start Init Work Time Note';
export const COMPLETE_INIT_WORK_TIME_NOTE = 'Complete Init Work Time Note';
export const START_ADD_WORK_TIME_NOTE = 'Start Add Work Time Note';
export const Complete_ADD_WORK_TIME_NOTE = 'Complete Add Work Time Note';

export class StartInitWorkTimeNote implements Action {
    readonly type: string = START_INIT_WORK_TIME_NOTE;

    constructor(public payload: any) {
    }
}

export class CompleteInitWorkTimeNote implements Action {
    readonly type: string = COMPLETE_INIT_WORK_TIME_NOTE;

    constructor(public payload: any) {
    }
}

export class StartAddWorkTimeNote implements Action {
    readonly type: string = START_ADD_WORK_TIME_NOTE;

    constructor(public payload: any) {
    }
}

export class CompleteAddWorkTimeNote implements Action {
    readonly type: string = Complete_ADD_WORK_TIME_NOTE;

    constructor(public payload: any) {
    }
}


export type WorkTimeNoteAction = StartInitWorkTimeNote 
| CompleteInitWorkTimeNote 
| StartAddWorkTimeNote 
| CompleteAddWorkTimeNote;
