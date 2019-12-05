import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { Message } from './models/message';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  detailsForm: FormGroup;
  loader;
  City: any = ['Bhopal', 'Banglore', 'Delhi', 'Mumbai', 'Pune']
  public message : Message;
  public messages : Message[];
  public isFormSubmitted:boolean = false
  constructor(private _fb: FormBuilder) { 
    
  }

  ngOnInit() {
     this._createForm();
  }

  /**
   * create our reactive form here
   */
  private _createForm() {
    this.detailsForm = this._fb.group({
      firstName: ['', [Validators.required,  Validators.minLength(2)]],
      lastName: ['', [Validators.required,  Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('(?=[^0-9]*[0-9]).{10,}')]],
      cityName: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  /**
   * Join the fun
   */
  onSubmit() {
    const param = this.detailsForm.value;
    if(this.detailsForm.status == 'VALID')
      this.isFormSubmitted = true;

    this.message = new Message('', this.detailsForm.get('firstName').value);
    this.messages = [
      new Message('Hi '+ this.detailsForm.get('firstName').value+ ' Welcome to chatbot universe', 'Bot', new Date())
    ];
    }

}
