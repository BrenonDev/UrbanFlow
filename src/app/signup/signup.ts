import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = signal('');
  city = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  agreeTerms = signal(false);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  signup(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    // Validações
    if (!this.name() || !this.email() || !this.password() || !this.confirmPassword()) {
      this.errorMessage.set('Por favor, preencha todos os campos');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('As senhas não correspondem');
      return;
    }

    if (!this.agreeTerms()) {
      this.errorMessage.set('Você deve aceitar os termos de uso');
      return;
    }

    this.loading.set(true);

    // Simula delay da requisição
    setTimeout(() => {
      const result = this.authService.signup(this.email(), this.password(), this.name());
      this.loading.set(false);

      if (result.success) {
        this.successMessage.set('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.errorMessage.set(result.message || 'Erro ao criar conta');
      }
    }, 600);
  }
}
