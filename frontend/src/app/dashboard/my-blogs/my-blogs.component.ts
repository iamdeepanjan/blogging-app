import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlicePipe, TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { BlogPost } from '../all-blogs/BlogPost';
import { BlogPostsService } from '../../services/blog-posts.service';
import { Router, RouterLink } from '@angular/router';
import { DeleteWarningDialogComponent } from '../delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'app-my-blogs',
  imports: [
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    SlicePipe,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.scss'
})
export class MyBlogsComponent implements OnInit, AfterViewInit, OnDestroy {

  cols: number = 3;
  blogs: BlogPost[] = [];
  displayedblogs: BlogPost[] = []; // Paginated employees
  pageSize = 18;
  currentPage = 0;
  likes: { [key: number]: number } = {};

  private dialog = inject(MatDialog);
  private blogService = inject(BlogPostsService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private refreshSubscription!: Subscription;

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.cols = result.matches ? 1 : 3;
      });
    this.loadAllBlogs();
    this.refreshSubscription = this.blogService.refresh$.subscribe(() => {
      this.loadAllBlogs();
    });
  }

  loadAllBlogs() {
    this.blogService.getMyBlogs().subscribe((data) => {
      this.blogs = data;
      this.updateDisplayedBlogs();
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  onPageChange() {
    this.currentPage = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.updateDisplayedBlogs();
  }

  updateDisplayedBlogs() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedblogs = this.blogs.slice(startIndex, endIndex);
  }

  goToMyBlog(id: number) {
    this.router.navigate(['my-blogs', id]);
  }

  goToEditBlog(id: number) {
    this.router.navigate(['edit-blog', id]);
  }

  openDeleteDialog(blog: BlogPost) {
    const dialogRef = this.dialog.open(DeleteWarningDialogComponent, {
      data: blog,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Dialog result: ${result}`);
        this.blogService.triggerRefresh();
      }
    });
  }

}
