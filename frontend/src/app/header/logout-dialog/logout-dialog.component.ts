import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-logout-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {

  private authService = inject(AuthenticationService);
  private dialogRef = inject(MatDialogRef<LogoutDialogComponent>);


  logout() {
    this.authService.clearUserFromLocalStorage();
    window.location.reload();
    this.dialogRef.close(true);
  }

}
