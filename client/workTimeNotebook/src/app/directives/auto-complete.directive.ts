import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Observer, Observable } from 'rxjs';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective {

  @HostListener('input', ['$event']) onInput(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  @HostListener('focus', ['$event']) onFocus(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
  }

  generateNewAutocoplete(value: string) {
    
  }

}
