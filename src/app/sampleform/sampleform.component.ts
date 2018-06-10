import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/debounceTime';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sampleform',
  templateUrl: './sampleform.component.html',
  styleUrls: ['./sampleform.component.css']
})
export class SampleformComponent implements OnInit {
  emailVal = '';
  formCtrlSub: Subscription;

  form = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
    ])
  });

  get email() { 
   return this.form.get('email');
  }

  

  constructor() { 
  }

  ngOnInit() {
    this.formCtrlSub = this.email.valueChanges
                      .debounceTime(3000)
                       .subscribe(
                         newValue => this.emailVal = newValue
                       );


  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

}
