// import { Component } from '@angular/core'
// import { AuthenticationService, UserDetails } from '../service/authentication.service'
// import { FormBuilder } from '@angular/forms';
// import { Router } from "@angular/router";


// @Component({
//   templateUrl: './profile.component.html'
// })
// export class ProfileComponent {
//   details: UserDetails;
//   updateProfileFormFirstName;
//   updateProfileFormLastName;
//   updateProfileFormEmail;
//   updateProfileFormPassword;
//   last_name_submit = false;
//   firstNameSubmit = false;
//   emailSubmit = false;
//   passwordSubmit = false;


//   constructor(private auth: AuthenticationService,private router: Router,  private formBuilder: FormBuilder,) {
//     this.updateProfileFormFirstName = this.formBuilder.group({
//       first_name: "",
//     });  
//     this.updateProfileFormLastName = this.formBuilder.group({
//       last_name: "",
//     });  
//     this.updateProfileFormEmail = this.formBuilder.group({
//       email: "",
//     });  
//     this.updateProfileFormPassword = this.formBuilder.group({
//       password: "",
//     });  
//   }


//   ngOnInit() {
//     this.auth.profile().subscribe(
//       user => {
//         this.details = user
//         // console.log(this.details)
//       },
//       err => {
//         console.error(err)
//       }
//     )
//   }

  

//   onClickMeFirstName() {
//     this.firstNameSubmit = true;
//     // console.log(this.first_name_submit)
//   }

//   onClickMeLastName() {
//     this.last_name_submit = true;
//     // console.log(this.first_name_submit)
//   }

//   onClickMeEmail() {
//     this.emailSubmit = true;
//     // console.log(this.first_name_submit)
//   }

//   onClickMepassword() {
//     this.passwordSubmit = true;
//     // console.log(this.first_name_submit)
//   }


//   onSubmit(userData) {
//     console.log(userData)
//     // console.log(this.details)
//      this.auth.update(userData, this.details.id ).subscribe(
//         () => {
//           // console.log(this.router)
//           this.router.navigateByUrl("/")
//         },
//         err => {
//           console.error(err);
//         }
//       );
 
    
//   }
// }