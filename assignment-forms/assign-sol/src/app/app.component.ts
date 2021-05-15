import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states = ['Stable', 'Critical' , 'Finished'];
  signupForm : FormGroup;
  excludedProjects = [ 'Test' ];

  constructor(formBuilder: FormBuilder){}

ngOnInit(){
  this.signupForm = new FormGroup({
    'project': new FormControl(null, [Validators.required, this.excludingProjects(/Test/i)]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'states': new FormControl('Stable')
  });
}

onSubmit(){
  console.log(this.signupForm.value);
  console.log("This form is valid: " + this.signupForm.valid)
 
}

// excludingProjects(control: FormControl): {[s: string]: boolean} {
//   if(this.excludedProjects.indexOf(control.value) !== -1){
//     return { 'proiectulEsteExclus': true }
//   }
//   return null;
// }


  excludingProjects(nameRe: RegExp) : ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
}
