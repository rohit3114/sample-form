import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




import { AppComponent } from './app.component';
import { SampleformComponent } from './sampleform/sampleform.component';
import { FormComponent } from './form/form.component';
import { StackoverflowComponent } from './stackoverflow/stackoverflow.component';
import { SuccessComponent } from './success/success.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    SampleformComponent,
    FormComponent,
    StackoverflowComponent,
    SuccessComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '' , component: FormComponent},
      {path: 'success' , component: SuccessComponent},
      {path: '**' , component: NotfoundComponent}

    ])
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
