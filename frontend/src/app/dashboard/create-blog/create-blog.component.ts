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
import { BlogPost } from '../all-blogs/BlogPost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent implements OnInit {

  blogForm!: FormGroup;
  private fb = inject(FormBuilder);
  private blogPostsService = inject(BlogPostsService);
  private _snackBar = inject(MatSnackBar);
  blogs: BlogPost[] = [];
  lastBlogId = 0;
  private router = inject(Router);

  
  ngOnInit(): void {
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
      this.blogPostsService.createBlog(blog).subscribe({
        next: (data) => {
          this.blogPostsService.getAllBlogs().subscribe((data) => {
            this.blogs = data;
            this.lastBlogId = this.blogs[this.blogs.length - 1].id!;
            this.router.navigate([`/my-blogs/${this.lastBlogId}`]);
            this._snackBar.open('Blog created successfully', 'Close', {
              duration: 3000,
            });
          })
          this.blogForm.reset();
        },
        error: (error) => {
          this._snackBar.open('Error creating blog', 'Close', {
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
