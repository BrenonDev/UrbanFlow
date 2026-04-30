import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  login(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.loading.set(true);

    // Simula delay da requisição
    setTimeout(() => {
      const result = this.authService.login(this.email(), this.password());
      this.loading.set(false);

      if (result.success) {
        this.successMessage.set(result.message || '');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      } else {
        this.errorMessage.set(result.message || 'Erro ao fazer login');
      }
    }, 600);
  }

  // Demo: Carregar credenciais de teste
  loadDemoCredentials(): void {
    this.email.set('demo@urbanflow.com');
    this.password.set('demo123456');
  }
}
