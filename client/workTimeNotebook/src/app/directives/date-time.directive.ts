import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { dateTimeFormat } from '../utils/constants';

@Directive({
  selector: '[appDateTime]'
})
export class DateTimeDirective implements OnInit {

  @HostListener('input', ['$event.target'])
  onInput(e: HTMLInputElement) {
    this.valueChange(e.value);
  }

  constructor(private el: ElementRef<HTMLInputElement>) {
  }

  ngOnInit(): void {
    this.setCurrentDateTime();
  }
  
  valueChange(value: string) {
    if (value.length === 2) {
      this.el.nativeElement.value = value + '.';
    } else if (value.length === 5) {
      this.el.nativeElement.value = value + '.';
    } else if (value.length === 10) {
      this.el.nativeElement.value = value + '/';
    } else if (value.length === 13) {
      this.el.nativeElement.value = value + ':';
    } else if (value.length > 16) {
      this.el.nativeElement.value = value.slice(0, 16);
    }
  }

  setCurrentDateTime() {
    const currDateTime = moment().format(dateTimeFormat);
    this.el.nativeElement.value = currDateTime;
  }

}
