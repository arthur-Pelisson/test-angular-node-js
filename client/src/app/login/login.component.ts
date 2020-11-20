import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../service/authentication.service';
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  connection = false;

  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        console.error(err);
        this.connection = true;
      }
    )
  }
}