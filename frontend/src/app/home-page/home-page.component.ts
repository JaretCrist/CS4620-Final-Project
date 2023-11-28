import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private router: Router) {}

  goSources(): void {
    this.router.navigateByUrl('/sources');
  }

  goSpells(): void {
    this.router.navigateByUrl('/spells');
  }

  goMonsters(): void {
    this.router.navigateByUrl('/monsters');
  }

  goRedDragon(): void {
    this.router.navigateByUrl('/monsters/13');
  }
}
