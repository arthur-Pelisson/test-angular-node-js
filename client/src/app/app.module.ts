
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './service/authentication.service'
import { AuthGuardService } from './service/auth-guard.service'
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    
  ],
  
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
