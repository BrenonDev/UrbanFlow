import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface Mission {
  id: string;
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  category: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  progress: number;
  completed: boolean;
}

@Component({
  selector: 'app-missions',
  standalone: false,
  templateUrl: './missions.html',
  styleUrl: './missions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Missions {
  authService = inject(AuthService);
  selectedCategory = signal('todos');

  missions: Mission[] = [
    {
      id: '1',
      icon: '🚇',
      title: 'Use transporte público',
      description: 'Complete um trajeto usando metrô, ônibus ou trem',
      xpReward: 320,
      category: 'mobilidade',
      difficulty: 'fácil',
      progress: 45,
      completed: false
    },
    {
      id: '2',
      icon: '🚴',
      title: 'Pedale 5 km',
      description: 'Complete 5 quilômetros de deslocamento com bicicleta',
      xpReward: 450,
      category: 'exercício',
      difficulty: 'médio',
      progress: 60,
      completed: false
    },
    {
      id: '3',
      icon: '🚶',
      title: 'Caminhada urbana',
      description: 'Caminhe por 2 km em uma rota sustentável',
      xpReward: 250,
      category: 'exercício',
      difficulty: 'fácil',
      progress: 100,
      completed: true
    },
    {
      id: '4',
      icon: '🚗',
      title: 'Participe de caronas',
      description: 'Faça uma carona compartilhada com amigos',
      xpReward: 380,
      category: 'mobilidade',
      difficulty: 'médio',
      progress: 0,
      completed: false
    },
    {
      id: '5',
      icon: '🛴',
      title: 'Use patinete elétrico',
      description: 'Faça um deslocamento usando patinete elétrico',
      xpReward: 300,
      category: 'mobilidade',
      difficulty: 'fácil',
      progress: 25,
      completed: false
    },
    {
      id: '6',
      icon: '🌳',
      title: 'Dia sem carro',
      description: 'Complete um dia inteiro sem usar veículo individual',
      xpReward: 850,
      category: 'impacto',
      difficulty: 'difícil',
      progress: 15,
      completed: false
    }
  ];

  categories = [
    { value: 'todos', label: 'Todas as missões' },
    { value: 'mobilidade', label: 'Mobilidade' },
    { value: 'exercício', label: 'Exercício' },
    { value: 'impacto', label: 'Impacto' }
  ];

  get filteredMissions(): Mission[] {
    if (this.selectedCategory() === 'todos') {
      return this.missions;
    }
    return this.missions.filter(m => m.category === this.selectedCategory());
  }

  completeMission(mission: Mission): void {
    const index = this.missions.findIndex(m => m.id === mission.id);
    if (index !== -1) {
      this.missions[index].completed = true;
      this.missions[index].progress = 100;
      
      // Atualizar usuário com os XP ganhos
      const currentUser = this.authService.currentUser();
      if (currentUser) {
        this.authService.updateUser({
          ...currentUser,
          points: (currentUser.points || 0) + mission.xpReward,
          missionsCompleted: (currentUser.missionsCompleted || 0) + 1
        });
      }
    }
  }

  getDifficultyClass(difficulty: string): string {
    return `difficulty-${difficulty}`;
  }
}
