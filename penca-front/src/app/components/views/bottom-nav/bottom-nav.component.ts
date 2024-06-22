import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelperService } from 'src/app/services/auth-helper.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {


  constructor(private router: Router, private authHelper: AuthHelperService) {}

  get isAdmin(): boolean {
    return this.authHelper.getRole() == 'admin';
  }

  onNavigate(path: string) {
    this.router.navigateByUrl(`${path}`);
  }
}