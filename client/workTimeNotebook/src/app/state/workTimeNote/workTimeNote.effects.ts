import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { START_INIT_WORK_TIME_NOTE, StartInitWorkTimeNote, CompleteInitWorkTimeNote, START_ADD_WORK_TIME_NOTE, CompleteAddWorkTimeNote } from './workTimeNote.actions';
import { switchMap, map } from 'rxjs/operators';
import { WorkTimeNoteBackendService } from 'src/app/modules/backend/services/workTimeNote/workTimeNote-backend.service';


@Injectable()
export class WorkTimeNoteEffects {

    constructor(private actions$: Actions, private workTimeNoteBackendService: WorkTimeNoteBackendService) {
    }

    @Effect()
    public startInitWorkTimeNote$ = this.actions$.pipe(
        ofType(START_INIT_WORK_TIME_NOTE),
        switchMap((action: StartInitWorkTimeNote) => 
            this.workTimeNoteBackendService.getAll().pipe(
                map(res => new CompleteInitWorkTimeNote(res))
            )
        )
    );

    @Effect()
    public startAddWorkTimeItem = this.actions$.pipe(
        ofType(START_ADD_WORK_TIME_NOTE),
        switchMap((action: StartInitWorkTimeNote) => 
            this.workTimeNoteBackendService.save(action.payload).pipe(
                map(res => new CompleteAddWorkTimeNote(res))
            )
        )
    );
}
