import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/Auth/login';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let login: Login = {
      username: this.loginform.get('username')?.value,
      password: this.loginform.get('password')?.value,
    };
    this.authService.login(login).subscribe(
      (res: any) => {
        this.router.navigate(['principal/game']);
        localStorage.setItem('hasUser', 'true');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
