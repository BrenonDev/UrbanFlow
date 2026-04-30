# UrbanFlow

UrbanFlow e uma aplicacao web de mobilidade urbana sustentavel com gamificacao. A plataforma incentiva usuarios a completarem missoes de deslocamento consciente, acumularem XP, subirem de nivel e resgatarem recompensas ligadas a transporte e parceiros urbanos.

## Visao Geral

O projeto simula uma experiencia completa de usuario, com cadastro, login, painel de progresso, missoes, recompensas e configuracoes de perfil. A autenticacao e os dados do usuario sao armazenados localmente no navegador, tornando o app simples de executar e testar sem backend.

## Funcionalidades

- Cadastro e login de usuarios
- Rotas protegidas por autenticacao
- Dashboard com XP, nivel, missoes concluidas e impacto estimado
- Listagem e filtro de missoes urbanas
- Conclusao de missoes com progresso e recompensa em XP
- Catalogo de recompensas com saldo de pontos
- Atualizacao de dados do perfil
- Interface responsiva com Angular e Bootstrap

## Tecnologias

- Angular 21
- TypeScript
- Bootstrap 5
- ng-bootstrap
- RxJS
- Vitest

## Estrutura

```text
src/
  app/
    dashboard/   # Painel do usuario
    login/       # Entrada na plataforma
    signup/      # Cadastro de usuario
    missions/    # Missoes urbanas
    rewards/     # Recompensas
    settings/    # Configuracoes do perfil
    services/    # Autenticacao e guards
    welcome/     # Tela inicial
```

## Como Executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Acesse no navegador:

```text
http://localhost:4200
```

## Scripts Disponiveis

```bash
npm start
```

Executa o app em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao em `dist/`.

```bash
npm test
```

Executa os testes configurados no projeto.

## Rotas Principais

- `/welcome` - apresentacao do UrbanFlow
- `/signup` - criacao de conta
- `/login` - acesso do usuario
- `/dashboard` - painel de progresso
- `/missions` - missoes sustentaveis
- `/rewards` - recompensas disponiveis
- `/settings` - configuracoes do perfil

## Observacoes

- O app utiliza `localStorage` para simular autenticacao e persistencia.
- Nao ha integracao com backend nesta versao.
- As recompensas, missoes e metricas sao dados simulados para demonstracao da experiencia.

## Objetivo

UrbanFlow foi desenvolvido como uma proposta de produto digital para tornar escolhas de mobilidade mais conscientes, acessiveis e recompensadoras por meio de progresso, desafios e beneficios.
