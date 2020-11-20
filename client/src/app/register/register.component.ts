import { Component, OnInit } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../service/authentication.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validators';

@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  

  credentials: TokenPayload = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }





  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: MustMatch('password', 'confirmPassword')
      });
    }
  

  get f() { return this.registerForm.controls; }

  onSubmit() {
    // console.log(this.registerForm.get('first_name').value)
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    
    this.credentials = {
      id:0,
      first_name: this.registerForm.get('first_name').value,
      last_name: this.registerForm.get('last_name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }

      this.auth.register(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl("/profile");
        },
        err => {
          console.error(err);
        }
      );
    }
    

  
}