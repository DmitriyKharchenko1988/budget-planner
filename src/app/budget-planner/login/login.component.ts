import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      console.log("Login info==>", this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('Неправильна електронна адреса або пароль!', 'Закрити', {duration: 3000});
    }
  }

  register() {
    if (this.registerForm.valid) {
      console.log("Register info==>>", this.registerForm.value);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.router.navigate(['/budget-planner/login']);
    } else {
      this.snackBar.open('Будь ласка, заповніть всі поля правильно!', 'Закрити', {duration: 3000});
    }
  }
}
