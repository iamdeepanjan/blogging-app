import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../all-comments/Comment';
import { TitleCasePipe } from '@angular/common';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-blog-comments',
  imports: [TitleCasePipe, AddCommentComponent, MatIconModule, MatButtonModule],
  templateUrl: './my-blog-comments.component.html',
  styleUrl: './my-blog-comments.component.scss'
})
export class MyBlogCommentsComponent implements OnInit {

  @Input() blogId!: number;

  comments: Comment[] = [];
  newComment: string = '';
  private refreshSubscription!: Subscription;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.loadComments();
    this.refreshSubscription = this.commentService.refresh$.subscribe(() => {
      this.loadComments();
    });
  }

  loadComments() {
    this.commentService.getComments(this.blogId).subscribe({
      next: (data) => (this.comments = data),
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  // Delete a comment
  deleteComment(commentId: number) {
    this.commentService.deleteComment(this.blogId, commentId).subscribe({
      next: () => {
        // this.comments = this.comments.filter(comment => comment.id !== commentId);
        this.loadComments();
        this.commentService.triggerRefresh();
      },
      error: (err) => console.error('Error deleting comment:', err)
    });
  }

}
