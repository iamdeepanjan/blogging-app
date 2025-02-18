import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterRequest } from './RegisterRequest';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  registerForm: FormGroup = new FormGroup({});
  error: string = '';
  passwordValueChange: Subscription = new Subscription();

  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
    this.passwordValueChange = this.registerForm
      .get('password')!
      .valueChanges.subscribe(() => {
        this.error = '';
    });
    this.passwordValueChange = this.registerForm
      .get('confirmPassword')!
      .valueChanges.subscribe(() => {
        this.error = '';
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = this.registerForm.value;

      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          console.log('Registration successful');
        },
        error: (error: any) => {
          this.error = 'User already exists with this email';
        },
      });
    } else {
      this.makeFormDirty(this.registerForm);
    }
  }

  makeFormDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsDirty();
      form.controls[key].markAsTouched();
    });
  }

  private passwordsMatchValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
