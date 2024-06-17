import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {

  constructor(private router: Router) {}

  onNavigate(path: string) {
    this.router.navigate([`/${path}`]);
  }
}