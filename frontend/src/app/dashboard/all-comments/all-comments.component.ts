import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from './Comment';
import { TitleCasePipe } from '@angular/common';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-comments',
  imports: [TitleCasePipe, AddCommentComponent],
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.scss'
})
export class AllCommentsComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
