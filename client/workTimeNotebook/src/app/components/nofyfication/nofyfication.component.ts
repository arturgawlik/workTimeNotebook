import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getNotyfication } from 'src/app/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { Notyfication } from 'src/app/state/workTimeNote/workTimeNote.state';
import { Notyfi } from './notyfication.model';

@Component({
  selector: 'app-nofyfication',
  templateUrl: './nofyfication.component.html',
  styleUrls: ['./nofyfication.component.css']
})
export class NofyficationComponent implements OnInit, OnDestroy {

  private notyfication$: Observable<Notyfication>;
  private subs: Subscription[] = [];
  notyfications: Notyfi[] = [];

  constructor(private store: Store<AppState>) {
    this.notyfication$ = this.store.pipe(select(getNotyfication));
  }

  ngOnInit() {
    const sub = this.notyfication$.subscribe(n => {
      if (n) {
        const index = this.notyfications.push({ message: n.message, type: n.type }) - 1;
        this.generateTimeout(index);
      }
    });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.forEach(s => {
        s.unsubscribe();
      });
    }
  }

  remove(index: number) {
    this.notyfications.splice(index, 1);
  }

  mouseover(index: number) {
    clearTimeout(this.notyfications[index].timer);
  }

  mouseout(index: number) {
    this.generateTimeout(index);
  }

  private generateTimeout(index: number) {
    const timer = setTimeout(() => {
      this.remove(index);
    }, 1000);
    this.notyfications[index].timer = timer;
  }

}
