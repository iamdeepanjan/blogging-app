import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  hideOld = signal(true);
  clickEvent(event: MouseEvent) {
    this.hideOld.set(!this.hideOld());
    event.stopPropagation();
  }
  hideNew = signal(true);
  clickEventNew(event: MouseEvent) {
    this.hideNew.set(!this.hideNew());
    event.stopPropagation();
  }
  hideConfirm = signal(true);
  clickEventConfirm(event: MouseEvent) {
    this.hideConfirm.set(!this.hideConfirm());
    event.stopPropagation();
  }

  passwordForm: FormGroup = new FormGroup({});
  error: string = '';
  passwordValueChange: Subscription = new Subscription();
  private userService = inject(UserService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );

    this.passwordValueChange = this.passwordForm
      .get('newPassword')!
      .valueChanges.subscribe(() => {
        this.error = '';
      });

    this.passwordValueChange = this.passwordForm
      .get('confirmPassword')!
      .valueChanges.subscribe(() => {
        this.error = '';
      });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const passwordData = {
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      };

      this.userService.changePassword(passwordData).subscribe({
        next: () => {
          this.router.navigate(['/user-profile']);
          this._snackBar.open('Password changed successfully', 'Close', {
            duration: 3000,
          });
          console.log('Password changed successfully');
        },
        error: () => {
          this.error = 'Incorrect old password';
        },
      });
    } else {
      this.makeFormDirty(this.passwordForm);
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
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }
}
