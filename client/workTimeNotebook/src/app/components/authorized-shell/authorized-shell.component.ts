import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { StartInitWorkTimeNote } from 'src/app/state/workTimeNote';

@Component({
  selector: 'app-authorized-shell',
  templateUrl: './authorized-shell.component.html',
  styleUrls: ['./authorized-shell.component.css']
})
export class AuthorizedShellComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new StartInitWorkTimeNote(null));
  }

}
