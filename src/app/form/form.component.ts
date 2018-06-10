import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl ,Validators} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import {Router} from '@angular/router';
import { DataService } from '../data.service';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  emailSubject: Subject<any> = new Subject();
  pwdSubject: Subject<any> = new Subject();
  isSubmit = false;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private data: DataService ) {
  
   }

  get email(){
    return this.formGroup.controls.email;
  }

  ngOnInit(): void {
    this.data.form.subscribe(
      formGroup => {
        this.formGroup = formGroup;
        });

   
    
    this.emailSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
          this.formGroup.controls.email.setValidators([ Validators.required,
            Validators.pattern(/\S+@\S+\.\S+/)
          ]);
          this.formGroup.controls.email.updateValueAndValidity();
          console.log('inside email subscribe');
        }
      );

      this.pwdSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.formGroup.controls.password.setValidators([ Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[A-Za-z])(?=.*[$@$_!%*#?&])/)
        ]);
        this.formGroup.controls.password.updateValueAndValidity();
      });
    }

  onKeyUp(e): void {
    this.isSubmit = false;
    if(e.target.id === 'email')
    this.emailSubject.next();
    else this.pwdSubject.next();
  }

  onKeyDown(e): void {
    if(e.target.id === 'email')
    this.formGroup.controls.email.clearValidators();
    else 
    this.formGroup.controls.password.clearValidators();
    }

  reset() {

    if (confirm('Are you sure you want to discard your input values')) {
      this.isSubmit = false;
      this.formGroup.controls.password.clearValidators();
      this.formGroup.controls.email.clearValidators();
      this.formGroup.reset();
  }
}

  submit() {
    if (this.formGroup.valid) {
      console.log('successful');
      this.router.navigate(['/success']);
    }

    else {
      console.log('inside submit else');
      this.isSubmit = true;
      this.formGroup.controls.email.markAsTouched();
      this.formGroup.controls.password.markAsTouched();
    }

  }
}
