import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { reducers, IState } from './store/index';
import { SearchCityAction } from './store/actions/weather';
import { WeatherContainer } from './weather.container';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [],
      providers: [{
        provide: Store,
        useValue: jasmine.createSpyObj('Store', ['dispatch', 'select'])
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SearchCityAction on search', () => {
    const mockSearch: string = 'test';
    const store: jasmine.SpyObj<Store<IState>> = TestBed.get(Store);
    store.dispatch.and.callThrough();
    component.citySearch(mockSearch);

    expect(store.dispatch).toHaveBeenCalledWith(new SearchCityAction(mockSearch));
  });
});
