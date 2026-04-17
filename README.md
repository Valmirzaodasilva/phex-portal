# PHEX Portal — v2.0.0

Site público da **PHEX Logística** — empresa de transporte de cargas e encomendas em Mato Grosso, fundada em 2010.

> "Sua remessa vai e as informações vem, com a PHEX você vai mais longe!"

## 🛠️ Stack

- **Angular 20** — Standalone components, Signals, novo control flow (@if, @for, @switch)
- **Tailwind CSS v4** — Paleta Phex configurada via @theme
- **Angular Material** — apenas para ícones (Material Icons via CDN)

## 🎨 Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#6f93cd` | Cor principal, botões, ícones |
| `--color-dark` | `#2d4b7b` | Títulos, navbar, footer |
| `--color-light` | `#d1e2ff` | Fundos sutis |
| `--color-phex-yellow` | `#f5ff7d` | Destaques, CTAs |
| `--color-secondary` | `#ef4b43` | Alertas, botões secundários |

## 🏗️ Arquitetura

```
src/app/
├── core/
│   ├── models/          # Interfaces TypeScript (menu, page, footer, ssw, config, enums)
│   └── services/        # portal-api, ssw, config (APP_INITIALIZER)
├── layout/
│   ├── navbar/          # Responsivo com drawer mobile, sticky + backdrop-blur
│   └── footer/          # 3 colunas, dados da API
├── pages/
│   ├── dynamic-page/    # Renderiza página dinâmica por slug/ID
│   └── ssw-search/      # Formulário SSW dinâmico + resultado HTML
└── components/
    ├── dynamic-renderer/ # Roteador de componentes dinâmicos
    ├── banner/           # Carrossel auto-play 5s
    ├── text-component/
    ├── button-component/
    ├── principles-card/
    ├── information-card/
    ├── service-card/
    └── skeleton-loader/
```

## 🧭 Roteamento

O portal usa roteamento dinâmico. Antes do app renderizar, o `APP_INITIALIZER` carrega o menu da API. As rotas são:

| Path | Componente |
|---|---|
| `/` | Redireciona para `/inicio` |
| `/:pageSlug` | `DynamicPageComponent` |
| `/rastreio/:id` | `SswSearchComponent` |

## ⚡ Features

- ✅ Standalone components em todos os componentes
- ✅ `OnPush` change detection em todos os componentes
- ✅ Signals para estado reativo
- ✅ Novo control flow `@if`, `@for`, `@switch`
- ✅ `APP_INITIALIZER` para config e menu antes do app renderizar
- ✅ Lazy loading nas páginas
- ✅ Skeleton loaders durante carregamento
- ✅ Navbar responsiva (desktop + mobile drawer com slide-in)
- ✅ Footer dinâmico com 3 colunas
- ✅ 6 tipos de componente dinâmico: TEXT, BUTTON, PRINCIPLES_CARD, INFORMATION_CARD, SERVICE_CARD, BANNER
- ✅ Banner com carrossel auto-play a cada 5s
- ✅ Página SSW com formulário dinâmico + renderização de resultado HTML
- ✅ Aviso especial no campo `senha` do SSW

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run start
# Acessa: http://localhost:4200

# Build de produção
npm run build-prod
```

## 🌐 Environments

```typescript
// development: http://localhost:3000
// production: https://api.phex.com.br
```

## 📦 Proxy

O arquivo `proxy.conf.js` redireciona chamadas `/api/*` para a API local durante desenvolvimento.
