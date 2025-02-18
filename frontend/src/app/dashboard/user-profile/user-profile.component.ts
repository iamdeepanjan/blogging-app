import { Component, inject, OnInit } from '@angular/core';
import { User } from './User';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  user = new User();
  private userSevice = inject(UserService);

  ngOnInit(): void {
    this.userSevice.getLoggedUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
