import { Directive, ElementRef, HostListener, Renderer2, Input, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective implements OnInit {

  @HostListener('input', ['$event']) onInput(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  @HostListener('focus', ['$event']) onFocus(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  @Input()
  type: 'type' | 'dsadsa';

  constructor(private el: ElementRef<HTMLInputElement>, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if (!this.type) {
      throw new Error('storeName is required when using appAutoComplete directive.');
    }
  }

  generateNewAutocoplete(value: string) {
  }

}
