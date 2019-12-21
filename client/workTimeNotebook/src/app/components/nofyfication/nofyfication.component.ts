import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getNotyfication } from 'src/app/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { Notyfication } from 'src/app/state/workTimeNote/workTimeNote.state';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-nofyfication',
  templateUrl: './nofyfication.component.html',
  styleUrls: ['./nofyfication.component.css']
})
export class NofyficationComponent implements OnInit {

  private notyfication$: Observable<Notyfication>;

  type: string;
  message: string;

  constructor(private store: Store<AppState>) {
    this.notyfication$ = this.store.pipe(select(getNotyfication));
  }

  ngOnInit() {
    this.notyfication$.subscribe(n => {
      if (n) {
        this.message = n.message;
        this.type = n.type;
        setTimeout(() =>{
          this.remove();
        }, 3000);
      }
    })
  }

  remove() {
    this.type = null;
    this.message = null;
  }

}
