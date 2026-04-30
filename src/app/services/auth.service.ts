import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  points?: number;
  level?: number;
  missionsCompleted?: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'urbanflow_auth';
  private readonly DB_NAME = 'UrbanFlowDB';
  private readonly STORE_NAME = 'auth';

  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Registra um novo usuário
   */
  signup(email: string, password: string, name: string): AuthResponse {
    // Validação básica
    if (!email || !password || !name) {
      return { success: false, message: 'Todos os campos são obrigatórios' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }

    if (!this.isValidEmail(email)) {
      return { success: false, message: 'E-mail inválido' };
    }

    // Verifica se usuário já existe
    const existingUser = this.getUserByEmail(email);
    if (existingUser) {
      return { success: false, message: 'E-mail já cadastrado' };
    }

    // Cria novo usuário
    const newUser: User = {
      id: this.generateId(),
      email,
      name,
      points: 0,
      level: 1,
      missionsCompleted: 0
    };

    // Salva no localStorage (em produção, seria no backend)
    this.saveUser(email, password, newUser);

    // Faz login automático
    this.currentUser.set(newUser);
    this.isAuthenticated.set(true);
    this.saveSessionToStorage(newUser);

    return { success: true, message: 'Cadastro realizado com sucesso!', user: newUser };
  }

  /**
   * Faz login de um usuário
   */
  login(email: string, password: string): AuthResponse {
    if (!email || !password) {
      return { success: false, message: 'E-mail e senha são obrigatórios' };
    }

    const credentials = this.getUserCredentials(email);
    if (!credentials || credentials.password !== password) {
      return { success: false, message: 'E-mail ou senha incorretos' };
    }

    const user = credentials.user;
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    this.saveSessionToStorage(user);

    return { success: true, message: 'Login realizado com sucesso!', user };
  }

  /**
   * Faz logout
   */
  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/welcome']);
  }

  /**
   * Atualiza dados do usuário
   */
  updateUser(userData: Partial<User>): AuthResponse {
    const user = this.currentUser();
    if (!user) {
      return { success: false, message: 'Usuário não autenticado' };
    }

    const updatedUser = { ...user, ...userData };
    this.currentUser.set(updatedUser);
    this.saveSessionToStorage(updatedUser);

    // Atualiza dados armazenados
    const allUsers = this.getAllUsers();
    const updatedUsers = allUsers.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem(`${this.STORAGE_KEY}_users`, JSON.stringify(updatedUsers));

    return { success: true, message: 'Perfil atualizado com sucesso!', user: updatedUser };
  }

  /**
   * Carrega usuário do localStorage
   */
  private loadUserFromStorage(): void {
    try {
      const sessionData = localStorage.getItem(this.STORAGE_KEY);
      if (sessionData) {
        const user = JSON.parse(sessionData);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * Salva session do usuário no localStorage
   */
  private saveSessionToStorage(user: User): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
    }
  }

  /**
   * Salva novo usuário
   */
  private saveUser(email: string, password: string, user: User): void {
    try {
      const allUsers = this.getAllUsers();
      const userWithPassword = {
        user,
        password,
        email,
        createdAt: new Date().toISOString()
      };

      const users = [...allUsers, userWithPassword];
      localStorage.setItem(`${this.STORAGE_KEY}_users`, JSON.stringify(users));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  /**
   * Obtém credenciais do usuário
   */
  private getUserCredentials(email: string) {
    try {
      const allUsers = this.getAllUsers();
      return allUsers.find(u => u.email === email);
    } catch {
      return null;
    }
  }

  /**
   * Obtém usuário por email
   */
  private getUserByEmail(email: string): User | null {
    try {
      const allUsers = this.getAllUsers();
      return allUsers.find(u => u.email === email)?.user || null;
    } catch {
      return null;
    }
  }

  /**
   * Obtém todos os usuários
   */
  private getAllUsers(): any[] {
    try {
      const data = localStorage.getItem(`${this.STORAGE_KEY}_users`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Valida email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Gera ID único
   */
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
