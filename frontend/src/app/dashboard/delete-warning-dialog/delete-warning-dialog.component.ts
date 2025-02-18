import { Component, inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BlogPostsService } from '../../services/blog-posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-warning-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-warning-dialog.component.html',
  styleUrl: './delete-warning-dialog.component.scss'
})
export class DeleteWarningDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  private blogService = inject(BlogPostsService);
  private dialogRef = inject(MatDialogRef<DeleteWarningDialogComponent>);
  private _snackBar = inject(MatSnackBar);


  onConfirmDelete(id: number) {
    this.blogService.deleteBlog(id).subscribe({
      next: (response) => {
        console.log('BlogPost deleted successfully');
        this.dialogRef.close(true);
        this.openSnackBar('Blog deleted successfully', 'Done');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
    });
  }
}
