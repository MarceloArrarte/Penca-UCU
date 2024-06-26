import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  profile$: Observable<UserProfile>;

  constructor(private userService: UsersService) {
    this.profile$ = this.userService.getProfile();
  }
}
