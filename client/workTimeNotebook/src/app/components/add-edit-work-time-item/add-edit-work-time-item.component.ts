import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, getItems } from 'src/app/state/app.state';
import { StartAddWorkTimeNote } from 'src/app/state/workTimeNote';
import * as moment from 'moment';
import { dateTimeFormat } from 'src/app/utils/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-work-time-item',
  templateUrl: './add-edit-work-time-item.component.html',
  styleUrls: ['./add-edit-work-time-item.component.css']
})
export class AddEditWorkTimeItemComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  private timeout: any;
  private interval: any;

  workTimeItemForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.initComponent();
    const sub = this.store.select(getItems).subscribe(() => this.initComponent());
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  initComponent() {
    this.buildForm();
    this.repeatEvery(this.setEndDate.bind(this), 1000 * 60);
    const sub1 = this.workTimeItemForm.get('startDate').valueChanges.subscribe(() => this.calculateAndSetTimeSpendValue());
    const sub2 = this.workTimeItemForm.get('endDate').valueChanges.subscribe(() => {
      this.calculateAndSetTimeSpendValue();
      if (this.workTimeItemForm.get('endDate').dirty) {
        this.clearReactOnTimeChanges();
      }
    });
    const sub3 = this.workTimeItemForm.get('timeSpendInMinutes').valueChanges.subscribe(() => {
      if (this.workTimeItemForm.get('timeSpendInMinutes').dirty) {
        this.clearReactOnTimeChanges();
      }
      this.calculateAndSetEndDateValue();
    });

    this.subs.push(sub1);
    this.subs.push(sub2);
    this.subs.push(sub3);
  }

  resetTimeForm() {
    this.workTimeItemForm.get('startDate').setValue(this.getCurrentDate());
    this.workTimeItemForm.get('endDate').setValue(this.getCurrentDate());
    this.workTimeItemForm.get('timeSpendInMinutes').setValue(0);
    this.repeatEvery(this.setEndDate.bind(this), 1000 * 60);
  }

  submitForm() {
    if (this.workTimeItemForm.valid) {
      this.store.dispatch(new StartAddWorkTimeNote(this.workTimeItemForm.value));
    }
  }

  getTypeErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('type').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Type is required!'
      }
    }
    return msg;
  }

  getCustomerErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('customer').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Customer is required!'
      }
    }
    return msg;
  }

  getDescriptionErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('description').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Description is required!'
      }
    }
    return msg;
  }

  getUriErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('uri').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Url is required!'
      }
    }
    return msg;
  }

  getStartDateErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('startDate').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Start date is required!'
      }
    }
    return msg;
  }

  getEndDateErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('endDate').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field End date is required!'
      }
    }
    return msg;
  }

  getSpendTimeErrMsg() {
    let msg: string;
    const errors = this.workTimeItemForm.get('timeSpendInMinutes').errors;
    if (errors) {
      if (errors.required) {
        msg = 'Field Spend Time is required!'
      }
    }
    return msg;
  }

  private clearReactOnTimeChanges() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private buildForm() {
    this.workTimeItemForm = this.fb.group({
      'id': [''],
      'type': ['', Validators.required],
      'customer': ['', Validators.required],
      'description': ['', Validators.required],
      'uri': ['', Validators.required],
      'startDate': [this.getCurrentDate(), Validators.required],
      'endDate': [this.getCurrentDate(), Validators.required],
      'timeSpendInMinutes': [0, Validators.required]
    });
  }

  private getCurrentDate(): string {
    return moment().format(dateTimeFormat);
  }

  private setEndDate() {
    const currentDateTime = this.getCurrentDate();
    this.workTimeItemForm.get('endDate').setValue(currentDateTime);
  }

  private calculateAndSetTimeSpendValue() {
    const startDateFormValue: string = this.workTimeItemForm.get('startDate').value;
    const endDateFormValue: string = this.workTimeItemForm.get('endDate').value;

    const startDate = moment(startDateFormValue, dateTimeFormat);
    const endDate = moment(endDateFormValue, dateTimeFormat);

    const duration = moment.duration(endDate.diff(startDate)).asMinutes();
    this.workTimeItemForm.get('timeSpendInMinutes').setValue(duration, { emitEvent: false });
  }

  private calculateAndSetEndDateValue() {
    const startDateFormValue: string = this.workTimeItemForm.get('startDate').value;
    const timeSpendInMinutes: number = this.workTimeItemForm.get('timeSpendInMinutes').value;

    const endDate = moment(startDateFormValue, dateTimeFormat).add({ minutes: timeSpendInMinutes }).format(dateTimeFormat);
    this.workTimeItemForm.get('endDate').setValue(endDate, { emitEvent: false });
  }

  private repeatEvery(func: Function, interval: number) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }

    const delay = interval - new Date().getTime() % interval;

    function start() {
      func();
      this.interval = setInterval(func, interval);
    }

    this.timeout = setTimeout(start, delay);
  }

}
