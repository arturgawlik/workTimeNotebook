import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { WorkTimeNoteItem } from 'src/app/state/workTimeNote/workTimeNote.state';
import { Store } from '@ngrx/store';
import { AppState, getAutocompleteTypes, getAutocompleteCustomers, getAutocompleteDescriptions, getAutocompleteUrls, getItems } from 'src/app/state/app.state';
import { SetAutocompleteTypes, SetAutocompleteCustomers, SetAutocompleteDescriptions, SetAutocompleteUrls } from 'src/app/state/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  private disposeFocusListner: Function;
  private disposeFocusoutListner: Function;
  private disposeInputListner: Function;

  private subscriptions: Subscription[] = [];
  private items: WorkTimeNoteItem[] = [];
  
  autocompleteSugetions$: Observable<string[]>;

  @Input()
  fc: FormControl;
  @Input()
  ref: HTMLInputElement;
  @Input()
  autocompleteType: string;

  constructor(private renderer: Renderer2, private store: Store<AppState>) {
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
    this.disposeFocusoutListner = this.renderer.listen(this.ref, 'focusout', this.setAutocompleteEmpty.bind(this));
    this.disposeInputListner = this.renderer.listen(this.ref, 'input', this.generateNewAutocoplete.bind(this));

    this.initSugestions();
    this.initItems();
  }

  ngOnDestroy() {
    this.disposeFocusListner();
    this.disposeFocusoutListner();
    this.disposeInputListner();
    this.subscriptions.forEach(s => s.unsubscribe());
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
        const newItems = this.items.filter(i => i.type.indexOf(value) > -1).slice(0, 5).map(i => i.type);
        this.store.dispatch(new SetAutocompleteTypes(newItems));
        break;
      }
      case 'customer': {
        const newItems = this.items.filter(i => i.customer.indexOf(value) > -1).slice(0, 5).map(i => i.customer);;
        this.store.dispatch(new SetAutocompleteCustomers(newItems));
        break;
      }
      case 'description': {
        const newItems = this.items.filter(i => i.description.indexOf(value) > -1).slice(0, 5).map(i => i.description);;
        this.store.dispatch(new SetAutocompleteDescriptions(newItems));
        break;
      }
      case 'url': {
        const newItems = this.items.filter(i => i.uri.indexOf(value) > -1).slice(0, 5).map(i => i.uri);;
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
