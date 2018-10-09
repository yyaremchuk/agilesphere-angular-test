import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  public formGroup: FormGroup;

  @Input()
  public set value(city: string) {

    if (!this.formGroup) {
      return;
    }

    this.formGroup.patchValue({
      city
    });
  }

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter(null);

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      city: [null, [Validators.required]]
    });
  }

  public search(): void {
    this.onSearch.emit(this.formGroup.value.city);
  }
}
