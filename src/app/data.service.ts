import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, FormControl ,Validators} from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  formGroup: FormGroup;
  formGroupSubject;
  form;
  
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: [ '' ],
      subscription: new FormControl('advanced'),
      password: ''
    });
    this.formGroupSubject = new BehaviorSubject<FormGroup>(this.formGroup);
    this.form = this.formGroupSubject.asObservable();
   }
}
