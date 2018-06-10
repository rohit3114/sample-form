import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.form.subscribe(
      formGroup => {
        this.formGroup = formGroup;
        });
  }


}
