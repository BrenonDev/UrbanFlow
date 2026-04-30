import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  
  // Dados simulados que seriam vindos de um backend
  userStats = computed(() => {
    const user = this.currentUser();
    if (!user) return null;
    
    return {
      xp: 4850,
      level: 8,
      missionsCompleted: user.missionsCompleted || 23,
      xpNextLevel: 680,
      xpProgress: 68,
      co2Avoided: 18.6,
      pointsAvailable: 1240,
      levelName: 'Mobilidade consciente'
    };
  });

  weeklyData = [
    { day: 'Seg', xp: 320, height: 45 },
    { day: 'Ter', xp: 485, height: 68 },
    { day: 'Qua', xp: 270, height: 38 },
    { day: 'Qui', xp: 585, height: 82 },
    { day: 'Sex', xp: 405, height: 57 },
    { day: 'Sáb', xp: 530, height: 74 },
    { day: 'Dom', xp: 357, height: 50 }
  ];

  achievements = [
    {
      icon: '🏅',
      title: 'Explorador de ciclovias',
      description: 'Complete 5 trajetos de bicicleta.',
      progress: 3
    },
    {
      icon: '🌍',
      title: 'Semana de baixo carbono',
      description: 'Evite veículo individual por 7 dias.',
      progress: 5
    },
    {
      icon: '🚶',
      title: 'Caminhada inteligente',
      description: 'Faça 10 deslocamentos curtos a pé.',
      progress: 7
    }
  ];
}
