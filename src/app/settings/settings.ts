import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  authService = inject(AuthService);

  // Form state
  name = signal('');
  email = signal('');
  city = signal('');
  bioMode = signal('dark');
  notifications = signal({
    missions: true,
    achievements: true,
    rewards: true,
    social: false
  });
  successMessage = signal('');

  constructor() {
    const user = this.authService.currentUser();
    if (user) {
      this.name.set(user.name);
      this.email.set(user.email);
    }
  }

  saveProfile(): void {
    this.successMessage.set('');
    
    const user = this.authService.currentUser();
    if (!user) return;

    const result = this.authService.updateUser({
      ...user,
      name: this.name()
    });

    if (result.success) {
      this.successMessage.set('Perfil atualizado com sucesso!');
      setTimeout(() => this.successMessage.set(''), 3000);
    }
  }

  exportData(): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const data = JSON.stringify(user, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `urbanflow_${user.id}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  logout(): void {
    if (confirm('Tem certeza que deseja sair?')) {
      this.authService.logout();
    }
  }
}
