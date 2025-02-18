import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { BlogPostsService } from '../../services/blog-posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-blog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.scss',
})
export class UpdateBlogComponent {

  id: number = 0;
  blogForm!: FormGroup;
  private fb = inject(FormBuilder);
  private blogPostsService = inject(BlogPostsService);
  private _snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogPostsService.getBlogById(this.id).subscribe((data) => {
      this.blogForm.patchValue(data);
    })
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get comment() {
    return this.blogForm.get('title');
  }

  get content() {
    return this.blogForm.get('content');
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blog:any = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
      };
      this.blogPostsService.updateBlog(this.id,blog).subscribe({
        next: (data) => {
          this.router.navigate([`/my-blogs/${this.id}`]);
          this._snackBar.open('Blog updated successfully', 'Close', {
            duration: 3000,
          });
          this.blogForm.reset();
        },
        error: (error) => {
          this._snackBar.open('Error updating blog', 'Close', {
            duration: 3000,
          });
        },
      }); 
    }
    else{
      this.makeFormDirty(this.blogForm);
    }
  }

  makeFormDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsDirty();
      form.controls[key].markAsTouched();
    });
  }
}
