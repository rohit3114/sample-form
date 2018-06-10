import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'form-component',
  template: `
    <form [formGroup]="formGroup">
      <input type="text" formControlName="name" 
      (keyup)="onKeyUp()" (keydown)="onKeyDown()" 
      [ngClass]="{ 'invalid': formGroup.controls.name.invalid }">
    </form>
  `,
  styles: [
    '.invalid { border-color: red; color: red; }'
  ]
})
export class StackoverflowComponent implements OnInit {

  formGroup: FormGroup;
  subject: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [ '' ]
    });

    // Subscribe to the subject, which is triggered with each keyup
    // When the debounce time has passed, we add a validator and update the form control to check validity
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => {
          this.formGroup.controls.name.setValidators([ Validators.minLength(5) ]);
          this.formGroup.controls.name.updateValueAndValidity();
        }
      );
  }

  onKeyUp(): void {
    this.subject.next();
  }

  onKeyDown(): void {
    // When the user starts to type, remove the validator
    this.formGroup.controls.name.clearValidators();
  }

}