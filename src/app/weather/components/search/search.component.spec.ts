import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit types value when search clicked', () => {
    const element: HTMLInputElement = fixture.nativeElement.querySelector('#city');
    const mockValue: string = 'test';

    spyOn(component.onSearch, 'emit').and.callThrough();
    element.value = mockValue;
    element.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    expect(component.onSearch.emit).toHaveBeenCalledWith(mockValue);
  });

  it('should set filter to passed in value', () => {
    const mockValue: string = 'test';
    component.value = mockValue;
    fixture.detectChanges();

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#city');
    expect(element.value).toEqual(mockValue);
  });
});
