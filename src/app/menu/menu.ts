import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'w-100'
  }
})
export class Menu {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
