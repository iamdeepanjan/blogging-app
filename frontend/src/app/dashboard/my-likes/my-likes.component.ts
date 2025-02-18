import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlicePipe, TitleCasePipe } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { BlogPost } from '../all-blogs/BlogPost';
import { Router, RouterModule } from '@angular/router';
import { LikesService } from '../../services/likes.service';

@Component({
  selector: 'app-my-likes',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    SlicePipe,
    TitleCasePipe,
    RouterModule
  ],
  templateUrl: './my-likes.component.html',
  styleUrl: './my-likes.component.scss'
})
export class MyLikesComponent {

  cols: number = 3;
  blogs: BlogPost[] = [];
  displayedblogs: BlogPost[] = []; // Paginated employees
  pageSize = 18;
  currentPage = 0;
  likes: { [key: number]: number } = {};
  private likeService = inject(LikesService);
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
    this.refreshSubscription = this.likeService.refresh$.subscribe(() => {
      this.loadAllBlogs();
    });
  }

  loadAllBlogs() {
    this.likeService.getMyLikedBlogs().subscribe((data) => {
      this.blogs = data;
      this.updateDisplayedBlogs();
      const likeRequests = data.map((blog) =>
        this.likeService.getLikeCount(blog.id!)
    );

      forkJoin(likeRequests).subscribe({
        next: (counts) => {
          counts.forEach((count, index) => {
            this.likes[this.blogs[index].id!] = count;
          });
        },
        error: (err) => console.error('Error fetching like counts:', err),
      });
    });
  }

  loadLikeCount(blogId: number): void {
    this.likeService.getLikeCount(blogId).subscribe({
      next: (count) => {
        this.likes[blogId] = count;
      },
      error: (err) => {
        console.error('Error fetching like count:', err);
      }
    });
  }

  toggleLike(blogId: number): void {
    this.likeService.toggleLike(blogId).subscribe({
      next: (message) => {
        console.log(message);
        this.likeService.triggerRefresh(); // Refresh blog list
      },
      error: (err) => {
        console.error('Error toggling like:', err);
      }
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
    this.router.navigate(['all-blog', id]);
  }

}
