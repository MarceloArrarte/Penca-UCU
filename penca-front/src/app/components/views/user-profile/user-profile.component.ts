import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { MainTitleService } from 'src/app/services/main-title.service';
import { UserProfile, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  profile$: Observable<UserProfile>;

  constructor(private userService: UsersService, private titleService: MainTitleService, private authService: AuthService) {
    this.titleService.title$.next('Perfil de usuario');
    this.profile$ = this.userService.getProfile();
  }

  logout() {
    this.authService.logout();
  }
}
