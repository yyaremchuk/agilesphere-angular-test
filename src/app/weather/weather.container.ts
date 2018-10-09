import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Weather } from '../model/weather';
import { IState } from './store/index';
import { SearchCityAction } from './store/actions/weather';
import { WeatherSelectors } from './store/selectors/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search
    [value]="search$ | async"
    (onSearch)="citySearch($event)">
  </app-search>
  <app-results [cities]="cities$ | async"></app-results>  `
})
export class WeatherContainer implements OnInit {
  public search$: Observable<string>;
  public cities$: Observable<Array<Weather>>;

  constructor(
    private store: Store<IState>
  ) {}

  public ngOnInit(): void {
    this.search$ = this.store.select<string>(WeatherSelectors.search);
    this.cities$ = this.store.select<Array<Weather>>(WeatherSelectors.cities);
  }

  public citySearch(city: string): void {
    this.store.dispatch(new SearchCityAction(city));
  }
}
