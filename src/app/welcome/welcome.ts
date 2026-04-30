import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Welcome {
  features = [
    {
      icon: '🎮',
      title: 'Gamificação Inteligente',
      description: 'Acumule XP e suba de nível enquanto contribui para a cidade'
    },
    {
      icon: '🌍',
      title: 'Impacto Ambiental',
      description: 'Acompanhe quanto de CO₂ você está evitando diariamente'
    },
    {
      icon: '🏆',
      title: 'Recompensas Reais',
      description: 'Resgate pontos por benefícios em parceiros sustentáveis'
    },
    {
      icon: '📊',
      title: 'Análises Detalhadas',
      description: 'Dashboard completo com suas estatísticas e progresso'
    }
  ];
}
