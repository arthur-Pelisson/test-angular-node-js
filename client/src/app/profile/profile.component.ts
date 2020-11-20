import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../service/authentication.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MustMatch } from '../_helpers/must-match.validators';



@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  updateProfileFormFirstName: FormGroup;
  updateProfileFormLastName: FormGroup;
  updateProfileFormEmail: FormGroup;
  updateProfileFormPassword: FormGroup;
  last_name_submit = false;
  firstNameSubmit = false;
  emailSubmit = false;
  passwordSubmit = false;
  submitted = false;
  passwordReq = false;
  oldNewPassword = false;



  constructor(private auth: AuthenticationService, private router: Router, private formBuilder: FormBuilder, ) {
    this.updateProfileFormFirstName = this.formBuilder.group({
      first_name: ['', Validators.required]
    });

    this.updateProfileFormLastName = this.formBuilder.group({
      last_name: ['', Validators.required]
    });

    this.updateProfileFormEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.updateProfileFormPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      });
  }


  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        // console.log(this.details)
      },
      err => {
        console.error(err)
      }
    )
  }


  get f() { return this.updateProfileFormFirstName.controls; }
  get l() { return this.updateProfileFormLastName.controls; }
  get e() { return this.updateProfileFormEmail.controls; }
  get p() { return this.updateProfileFormPassword.controls; }


  onClickMeFirstName() {

    this.firstNameSubmit = true;
    this.last_name_submit = false;
    this.emailSubmit = false;
    this.passwordSubmit = false;
    // console.log(this.first_name_submit)
  }

  onClickMeLastName() {

    this.firstNameSubmit = false;
    this.last_name_submit = true;
    this.emailSubmit = false;
    this.passwordSubmit = false;
    // console.log(this.first_name_submit)
  }

  onClickMeEmail() {
    this.firstNameSubmit = false;
    this.last_name_submit = false;
    this.emailSubmit = true;
    this.passwordSubmit = false;
    // console.log(this.first_name_submit)
  }

  onClickMepassword() {
    this.firstNameSubmit = false;
    this.last_name_submit = false;
    this.emailSubmit = false;
    this.passwordSubmit = true;
    // console.log(this.first_name_submit)
  }

  onClickMeFirstNameAnule() {
    this.firstNameSubmit = false;
  }

  onClickMeLastNameAnule() {
    this.last_name_submit = false;
  }
  onClickMefEmailAnule() {
    this.emailSubmit = false;
  }
  onClickMePasswordAnule() {
    this.passwordSubmit = false;
  }

  onClickDeleteAccount() {
    this.auth.logout();
    this.auth.delete(this.details.id).subscribe(
      () => {
        console.log("User successfull delete")
      },
      err => {
        console.error(err);
      }
    );
  }


  onSubmit(userData) {
    this.submitted = true;
    // console.log(userData.password)
    if (this.firstNameSubmit == true) {
      console.log("f")
      if (this.updateProfileFormFirstName.invalid) return;
    } else if (this.last_name_submit == true) {
      console.log("l")
      if (this.updateProfileFormLastName.invalid) return;
    } else if (this.emailSubmit == true) {
      console.log("e")
      if (this.updateProfileFormEmail.invalid) return;
    } else if (this.passwordSubmit == true) {
      console.log("p")
      if (this.updateProfileFormPassword.invalid) return;
      console.log("nop")
      let password = userData.password;
      userData = { password: password };
      this.passwordReq = true;
    }
    console.log('nop')
    this.auth.update(userData, this.details.id, this.passwordReq).subscribe(
      () => {
        // console.log(this.router)
        this.router.navigateByUrl("/")
      },
      err => {
        console.error(err);
        console.error(err.error.text);
        if (err.error.text === "Your new password can\'t be the same at the old password") {
          this.oldNewPassword = true;
        }
      }
    );
  }


}