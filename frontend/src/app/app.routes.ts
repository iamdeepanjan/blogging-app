import { Routes } from '@angular/router';
import { AllBlogsComponent } from './dashboard/all-blogs/all-blogs.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { MyLikesComponent } from './dashboard/my-likes/my-likes.component';
import { MyBlogsComponent } from './dashboard/my-blogs/my-blogs.component';
import { canactivaterouteGuard } from './canactivateroute.guard';
import { MyBlogDialogComponent } from './dashboard/my-blog-dialog/my-blog-dialog.component';
import { BlogDialogComponent } from './dashboard/blog-dialog/blog-dialog.component';
import { CreateBlogComponent } from './dashboard/create-blog/create-blog.component';
import { UpdateBlogComponent } from './dashboard/update-blog/update-blog.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

export const routes: Routes = [

    {path: '', redirectTo: 'all-blogs', pathMatch: 'full'},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [canactivaterouteGuard]},
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [canactivaterouteGuard]},
    {path: 'all-blogs', component: AllBlogsComponent, canActivate: [canactivaterouteGuard]},
    {path: 'my-blogs', component: MyBlogsComponent, canActivate: [canactivaterouteGuard]},
    {path: 'my-likes', component: MyLikesComponent, canActivate: [canactivaterouteGuard]},
    {path: 'create-blog', component: CreateBlogComponent, canActivate: [canactivaterouteGuard]},
    {path: 'all-blog/:id', component: BlogDialogComponent, canActivate: [canactivaterouteGuard]},
    {path: 'my-blogs/:id', component: MyBlogDialogComponent, canActivate: [canactivaterouteGuard]},
    {path: 'edit-blog/:id', component: UpdateBlogComponent, canActivate: [canactivaterouteGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},

];
