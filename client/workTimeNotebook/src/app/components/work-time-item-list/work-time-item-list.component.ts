import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getItems } from 'src/app/state/app.state';
import { Subscription } from 'rxjs';
import { WorkTimeNoteItem } from 'src/app/state/workTimeNote/workTimeNote.state';

@Component({
  selector: 'app-work-time-item-list',
  templateUrl: './work-time-item-list.component.html',
  styleUrls: ['./work-time-item-list.component.css']
})
export class WorkTimeItemListComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  items: WorkTimeNoteItem[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    const sub = this.store.select(getItems).subscribe(i => this.items = i);
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
