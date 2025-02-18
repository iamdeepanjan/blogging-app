import { Component, inject, OnInit } from '@angular/core';
import { BlogPost } from '../all-blogs/BlogPost';
import { BlogPostsService } from '../../services/blog-posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MyBlogCommentsComponent } from '../my-blog-comments/my-blog-comments.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-my-blog-dialog',
  imports: [TitleCasePipe, MyBlogCommentsComponent,  MatIconModule, MatButtonModule],
  templateUrl: './my-blog-dialog.component.html',
  styleUrl: './my-blog-dialog.component.scss'
})
export class MyBlogDialogComponent {

  id: number = 0;
  blog: BlogPost = new BlogPost();

  private blogService = inject(BlogPostsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe((data) => {
      this.blog = data;
    });
  }
  goBack() {
    this.router.navigate(['my-blogs']);
  }


}
