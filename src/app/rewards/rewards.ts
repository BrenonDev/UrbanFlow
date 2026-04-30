import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface Reward {
  id: string;
  icon: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  available: boolean;
}

@Component({
  selector: 'app-rewards',
  standalone: false,
  templateUrl: './rewards.html',
  styleUrl: './rewards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rewards {
  authService = inject(AuthService);
  selectedCategory = signal('todos');

  rewards: Reward[] = [
    {
      id: '1',
      icon: '🚴',
      title: 'Crédito Bike Compartilhada',
      description: 'Resgate R$ 50 em créditos para bike compartilhada',
      cost: 500,
      category: 'transporte',
      available: true
    },
    {
      id: '2',
      icon: '🎫',
      title: 'Passagem de Ônibus',
      description: 'Uma passagem de ônibus grátis em qualquer linha',
      cost: 300,
      category: 'transporte',
      available: true
    },
    {
      id: '3',
      icon: '☕',
      title: 'Café Gourmet',
      description: 'Uma bebida especial em café parceiro Green',
      cost: 200,
      category: 'gastronomia',
      available: true
    },
    {
      id: '4',
      icon: '🎒',
      title: 'Mochila Sustentável',
      description: 'Mochila ecológica feita com materiais reciclados',
      cost: 1000,
      category: 'lifestyle',
      available: true
    },
    {
      id: '5',
      icon: '🥗',
      title: 'Cesta Orgânica',
      description: 'Cesta com produtos orgânicos de produtor local',
      cost: 750,
      category: 'gastronomia',
      available: true
    },
    {
      id: '6',
      icon: '🏋️',
      title: 'Mês Academia Green',
      description: 'Um mês de academia com desconto especial',
      cost: 600,
      category: 'lifestyle',
      available: true
    }
  ];

  categories = [
    { value: 'todos', label: 'Todas as recompensas' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'gastronomia', label: 'Gastronomia' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  get filteredRewards(): Reward[] {
    if (this.selectedCategory() === 'todos') {
      return this.rewards;
    }
    return this.rewards.filter(r => r.category === this.selectedCategory());
  }

  redeemReward(reward: Reward): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser || (currentUser.points || 0) < reward.cost) {
      alert('Pontos insuficientes para resgatar esta recompensa');
      return;
    }

    // Atualizar usuário
    this.authService.updateUser({
      ...currentUser,
      points: (currentUser.points || 0) - reward.cost
    });

    alert(`Recompensa "${reward.title}" resgatada com sucesso! Verifique seu email para detalhes.`);
  }

  canRedeem(reward: Reward): boolean {
    const currentUser = this.authService.currentUser();
    return currentUser ? (currentUser.points || 0) >= reward.cost : false;
  }
}
