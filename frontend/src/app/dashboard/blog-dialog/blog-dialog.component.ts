import { Component, inject, OnInit } from '@angular/core';
import { BlogPost } from '../all-blogs/BlogPost';
import { BlogPostsService } from '../../services/blog-posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AllCommentsComponent } from '../all-comments/all-comments.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-dialog',
  imports: [TitleCasePipe, AllCommentsComponent, MatIconModule, MatButtonModule],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.scss'
})
export class BlogDialogComponent implements OnInit {

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
    this.router.navigate(['all-blogs']);
  }

}
