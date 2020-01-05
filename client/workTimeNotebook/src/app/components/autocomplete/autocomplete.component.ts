import { Component, OnInit, Input, Renderer2, OnDestroy, ElementRef, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { WorkTimeNoteItem } from 'src/app/state/workTimeNote/workTimeNote.state';
import { Store } from '@ngrx/store';
import { AppState, getAutocompleteTypes, getAutocompleteCustomers, getAutocompleteDescriptions, getAutocompleteUrls, getItems } from 'src/app/state/app.state';
import { SetAutocompleteTypes, SetAutocompleteCustomers, SetAutocompleteDescriptions, SetAutocompleteUrls } from 'src/app/state/autocomplete';
import { DOCUMENT } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  private disposeFocusListner: Function;
  private disposeFocusoutListner: Function;
  private disposeInputListner: Function;
  private disposeClickListner: Function;
  private disposeKeyupListner: Function;

  private subscriptions: Subscription[] = [];
  private items: WorkTimeNoteItem[] = [];
  private length: number = null;

  autocompleteSugetions$: Observable<string[]>;
  autocompleteSugetions: string[];
  selectedIndex: number = null;

  @Input()
  fc: FormControl;
  @Input()
  ref: HTMLInputElement;
  @Input()
  autocompleteType: string;

  constructor(private renderer: Renderer2, private store: Store<AppState>, private el: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    if (!this.fc) {
      throw new Error(`AutocompleteComponent requiers 'fc' attribute.`);
    }
    if (!this.ref) {
      throw new Error(`AutocompleteComponent requiers 'ref' attrbute.`);
    }
    if (!this.autocompleteType) {
      throw new Error(`AutocompleteComponent requiers 'autocompleteType' attrbute.`);
    }

    this.disposeFocusListner = this.renderer.listen(this.ref, 'focus', this.generateNewAutocoplete.bind(this));
    this.disposeInputListner = this.renderer.listen(this.ref, 'input', this.generateNewAutocoplete.bind(this));
    this.disposeClickListner = this.renderer.listen(this.document, 'click', (event: any) => {
      if (!this.el.nativeElement.contains(event.target) && !this.ref.contains(event.target))
        this.setAutocompleteEmpty();
    });
    this.disposeKeyupListner = this.renderer.listen(this.ref, 'keydown', this.keyDown.bind(this));

    this.initSugestions();
    this.initItems();

    const sub = this.autocompleteSugetions$.subscribe(s => {
      this.length = s.length;
      this.autocompleteSugetions = s;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    if (this.disposeFocusListner)
      this.disposeFocusListner();
    if (this.disposeFocusoutListner)
      this.disposeFocusoutListner();
    if (this.disposeInputListner)
      this.disposeInputListner();
    if (this.disposeClickListner)
      this.disposeClickListner();
    if (this.disposeKeyupListner)
      this.disposeKeyupListner();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  clicked(value: string) {
    this.setAutocompleteEmpty();
    this.fc.setValue(value);
  }

  mouseover(index: number, value: string) {
    this.selectedIndex = index;
    this.fc.setValue(value);
  }

  private keyDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.setAutocompleteEmpty();
    } else if (e.code === 'ArrowDown') {
      this.handleArrowDown();
    } else if (e.code === 'ArrowUp') {
      this.handleArrowUp();
    } else if (e.code === 'Tab') {
      this.setAutocompleteEmpty();
    }
  }

  private handleArrowUp() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
    this.fc.setValue(this.autocompleteSugetions[this.selectedIndex]);
  }

  private handleArrowDown() {
    if (this.selectedIndex === null) {
      this.selectedIndex = 0;
    }
    else if (this.selectedIndex + 1 < this.length) {
      this.selectedIndex++;
    }
    this.fc.setValue(this.autocompleteSugetions[this.selectedIndex]);
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

  private generateNewAutocoplete() {
    const value = this.fc.value;

    switch (this.autocompleteType) {
      case 'type': {
        const newItems = this.items
          .map(i => i.type)
          .filter((v, i, a) => a.indexOf(v) === i)
          .filter(i => i.indexOf(value) > -1)
          .slice(0, 5);
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      case 'customer': {
        const newItems = this.items
          .map(i => i.customer)
          .filter((v, i, a) => a.indexOf(v) === i)
          .filter(i => i.indexOf(value) > -1)
          .slice(0, 5);
        this.store.dispatch(new SetAutocompleteCustomers(newItems));
        break;
      }
      case 'description': {
        const newItems = this.items
        .map(i => i.description)
        .filter((v, i, a) => a.indexOf(v) === i)
        .filter(i => i.indexOf(value) > -1)
        .slice(0, 5);
        this.store.dispatch(new SetAutocompleteDescriptions(newItems));
        break;
      }
      case 'url': {
        const newItems = this.items
        .map(i => i.uri)
        .filter((v, i, a) => a.indexOf(v) === i)
        .filter(i => i.indexOf(value) > -1)
        .slice(0, 5);
        this.store.dispatch(new SetAutocompleteUrls(newItems));
        break;
      }
      default: {
        throw new Error('Invalid value for autocompleteType in appAutoComplete directive.');
      }
    }
  }

  private setAutocompleteEmpty() {
    switch (this.autocompleteType) {
      case 'type': {
        this.store.dispatch(new SetAutocompleteTypes([]));
        break;
      }
      case 'customer': {
        this.store.dispatch(new SetAutocompleteCustomers([]));
        break;
      }
      case 'description': {
        this.store.dispatch(new SetAutocompleteDescriptions([]));
        break;
      }
      case 'url': {
        this.store.dispatch(new SetAutocompleteUrls([]));
        break;
      }
      default: {
        throw new Error('Invalid value for autocompleteType in appAutoComplete directive.');
      }
    }
  }

}
