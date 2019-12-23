import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective {

  @HostListener('input', ['$event']) onChange(e: any) {
    console.log(e);
  }

  constructor(private el: ElementRef) {
  }



}
