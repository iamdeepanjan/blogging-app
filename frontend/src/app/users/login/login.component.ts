import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from './LoginRequest';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm: FormGroup = new FormGroup({});
  loginRequest: LoginRequest = new LoginRequest();
  error: string = '';
  passwordValueChange: Subscription = new Subscription();

  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.passwordValueChange = this.loginForm
      .get('password')!
      .valueChanges.subscribe(() => {
        this.error = '';
      });
  }   
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginRequest = this.loginForm.value;
      this.authService.login(this.loginRequest).subscribe({
        next: (response: any) => {
          this.authService.saveUserInLocalStorage(response);
          this.router.navigate(['/my-blogs']);
          console.log('Login successful');
        },
        error: (error: any) => {
          this.error = 'Invalid login credentials, please try again';
        },
      });
    } else {
      this.makeFormDirty(this.loginForm);
    }
  }

  makeFormDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsDirty();
      form.controls[key].markAsTouched();
    });
  }
}
