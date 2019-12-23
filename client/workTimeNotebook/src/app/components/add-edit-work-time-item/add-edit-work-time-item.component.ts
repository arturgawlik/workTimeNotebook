import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { StartAddWorkTimeNote } from 'src/app/state/workTimeNote';

@Component({
  selector: 'app-add-edit-work-time-item',
  templateUrl: './add-edit-work-time-item.component.html',
  styleUrls: ['./add-edit-work-time-item.component.css']
})
export class AddEditWorkTimeItemComponent implements OnInit {

  workTimeItemForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.workTimeItemForm = this.fb.group({
      'id': [''],
      'type': ['Otrs', Validators.required],
      'customer': ['Futuriti', Validators.required],
      'description': ['Problemy z monitoringiem', Validators.required],
      'uri': ['google.com', Validators.required],
      'startDate': [new Date().toISOString().substring(0,19), Validators.required],
      'endDate': [new Date().toISOString().substring(0,19), Validators.required],
      'timeSpendInMinutes': ['63', Validators.required]
    });
  }

  submitForm() {
    if (this.workTimeItemForm.valid) {
      this.store.dispatch(new StartAddWorkTimeNote(this.workTimeItemForm.value));
    }
  }

}
