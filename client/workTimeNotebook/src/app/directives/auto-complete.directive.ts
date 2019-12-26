import { Directive, ElementRef, HostListener, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAutocompleteTypes, getAutocompleteCustomers, getAutocompleteDescriptions, getAutocompleteUrls, getItems } from '../state/app.state';
import { SetAutocompleteTypes } from '../state/autocomplete';
import { WorkTimeNoteItem } from '../state/workTimeNote/workTimeNote.state';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective implements OnInit, OnDestroy {

  @HostListener('input', ['$event']) onInput(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  @HostListener('focus', ['$event']) onFocus(e: any) {
    this.generateNewAutocoplete(this.el.nativeElement.value);
  }

  @Input('appAutoComplete')
  private autocompleteType: 'type' | 'customer' | 'description' | 'url';

  private subscriptions: Subscription[] = [];
  private items: WorkTimeNoteItem[] = [];

  private autocompleteSugetions$: Observable<string[]>;

  constructor(private el: ElementRef<HTMLInputElement>, private store: Store<AppState>, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.initSugestions();
    this.initItems();
    this.autocompleteSugetions$.subscribe(i => {
      console.log(i);
      this.createAutocompleteSugestionsInDOM(i);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  createAutocompleteSugestionsInDOM(items: string[]) {

    this.removeULElementIfExist();

    const ULElement = this.createNewULElement(items);
    this.el.nativeElement.after(ULElement);
  }

  private createNewULElement(items: string[]) {
    const ULElement = this.renderer.createElement('ul') as HTMLUListElement;

    // styles
    ULElement.style.position = 'absolute';
    ULElement.style.right = '10px';

    items.forEach(i => {
      const LIElement = this.renderer.createElement('li') as HTMLLIElement;
      LIElement.innerHTML = i;
      ULElement.appendChild(LIElement);
    });
    return ULElement;
  }

  private removeULElementIfExist() {
    let elem = this.el.nativeElement.nextSibling;

    while (elem) {
      if (elem instanceof HTMLUListElement)
        elem.remove();
      elem = this.el.nativeElement.nextSibling;
    }

  }

  private initSugestions() {
    switch (this.autocompleteType) {
      case 'type': {
        this.autocompleteSugetions$ = this.store.select(getAutocompleteTypes);
        break;
      }
      case 'customer': {
        this.autocompleteSugetions$ = this.store.select(getAutocompleteCustomers);
        break;
      }
      case 'description': {
        this.autocompleteSugetions$ = this.store.select(getAutocompleteDescriptions);
        break;
      }
      case 'url': {
        this.autocompleteSugetions$ = this.store.select(getAutocompleteUrls);
        break;
      }
      default: {
        throw new Error('Invalid value for autocompleteType in appAutoComplete directive.');
      }
    }
  }

  private initItems() {
    const sub = this.store.select(getItems).subscribe(items => {
      this.items = items;
    });

    this.subscriptions.push(sub);
  }

  private generateNewAutocoplete(value: string) {
    switch (this.autocompleteType) {
      case 'type': {
        const newItems = this.items.filter(i => i.type.indexOf(value) > -1).slice(0, 10).map(i => i.type);
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      case 'customer': {
        const newItems = this.items.filter(i => i.customer.indexOf(value) > -1).slice(0, 10).map(i => i.customer);;
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      case 'description': {
        const newItems = this.items.filter(i => i.description.indexOf(value) > -1).slice(0, 10).map(i => i.description);;
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      case 'url': {
        const newItems = this.items.filter(i => i.uri.indexOf(value) > -1).slice(0, 10).map(i => i.uri);;
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      default: {
        throw new Error('Invalid value for autocompleteType in appAutoComplete directive.');
      }
    }
  }

}
