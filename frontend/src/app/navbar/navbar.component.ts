import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() title = '';
  @Input() returnLink = '';
  @Input() createAvailable = false;
  @Input() createFunction = () => {};

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigateByUrl(this.returnLink);
  }
}
