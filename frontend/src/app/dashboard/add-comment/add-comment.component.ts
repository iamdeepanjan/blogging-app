import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../all-comments/Comment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
})
export class AddCommentComponent {
  @Input() blogId!: number;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(private commentService: CommentsService) {}


  addComment() {
    if (!this.newComment.trim()) return;

    this.commentService.addComment(this.blogId, this.newComment).subscribe({
      next: (comment) => {
        this.comments.push(comment); // Add new comment to list
        this.newComment = ''; // Clear input
        this.commentService.triggerRefresh();
      },
      error: (err) => console.error('Error adding comment:', err)
    });
  }
}
