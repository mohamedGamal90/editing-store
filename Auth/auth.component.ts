import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  LoginForm!: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.initailForm();
  }

  loginSubmit() {
    console.log("logging in")
    this.authService.loginHandler(this.LoginForm.value.email,this.LoginForm.value.password);
  }
  // email: test@test.com
  // password: 1234test

  private initailForm() {
    let email: string = '';
    let password: string = '';

    this.LoginForm = new FormGroup({
      email: new FormControl(email,[Validators.required,Validators.email]),
      password: new FormControl(password,[Validators.required]),
    });
  }
}
