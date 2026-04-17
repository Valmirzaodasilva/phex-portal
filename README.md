# PHEX Portal — v2.0.0

Portal web da PHEX Logística, recriado com **Angular 20** (standalone components, signals) e design moderno, responsivo e fiel à identidade visual da empresa.

---

## 🎨 Identidade Visual

| Variável | Cor |
|---|---|
| `--color-primary` | `#6f93cd` — Azul principal |
| `--color-dark` | `#2d4b7b` — Azul escuro |
| `--color-light` | `#d1e2ff` — Azul claro |
| `--color-yellow` | `#f5ff7d` — Amarelo destaque |
| `--color-secondary` | `#ef4b43` — Vermelho/coral |

---

## 🚀 Stack

- **Angular 20** — Standalone components, signals, `@if/@for` control flow
- **SCSS puro** — Sem bibliotecas de UI externas
- **Google Fonts** — Inter / Poppins
- **Material Icons** — Ícones inline via CDN

---

## 📐 Arquitetura

```
src/
├── app/
│   ├── core/
│   │   ├── services/    (portal, dynamic-page, ssw, images)
│   │   └── models/      (interfaces tipadas)
│   ├── shared/
│   │   └── components/  (loading-spinner, error-state, scroll-to-top)
│   ├── layout/
│   │   ├── navbar/      (responsivo, drawer mobile, sticky)
│   │   └── footer/      (3 colunas, dados dinâmicos)
│   ├── pages/
│   │   ├── home/        (redirect para primeiro menu)
│   │   ├── dynamic-page/
│   │   └── ssw-search/
│   ├── components/
│   │   └── dynamic-components/
│   │       ├── text-component
│   │       ├── button-component
│   │       ├── principles-card-component
│   │       ├── information-card-component
│   │       ├── service-card-component
│   │       └── banner-component  (slideshow automático a cada 5s)
│   ├── app.component.ts
│   ├── app.config.ts    (APP_INITIALIZER, lazy loading)
│   └── app.routes.ts
├── environments/
└── styles/
    ├── styles.scss
    ├── _variables.scss
    └── _animations.scss
```

---

## 🔧 Configuração

### Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env-example`:

```env
API_URL=https://api.phex.com.br
```

### Rodar localmente

```bash
npm install
npm start
# Acesse: http://localhost:4200
```

O proxy redireciona `/api/*` → `API_URL` (configurado em `proxy.conf.js`).

### Build para produção

```bash
npm run build-prod
```

---

## 🌐 Roteamento

| Rota | Componente |
|---|---|
| `/` | Redirect para primeiro item do menu |
| `/:menuUrl` | `DynamicPageComponent` |
| `/rastreamento/:menuUrl` | `SswSearchComponent` |

---

## 🧱 Componentes Dinâmicos

| Tipo | Descrição |
|---|---|
| `TEXT` / `TITLE` | Texto com cor, alinhamento e tamanho configuráveis |
| `BUTTON` | Botão com URL interna ou externa |
| `PRINCIPLES_CARD` | Grid de cards com ícone, título e texto |
| `INFORMATION_CARD` | Cards informativos com borda colorida |
| `SERVICE_CARD` | Cards com imagem de fundo e botão |
| `BANNER` | Hero section com slideshow automático (5s) |

---

## ⚡ Performance

- `ChangeDetectionStrategy.OnPush` em todos os componentes
- Lazy loading de todas as páginas
- `APP_INITIALIZER` para carregar menu/config antes do render
- CSS transforms para animações (sem reflow)
- Imagens com `loading="lazy"`

---

## 📱 Responsividade

| Breakpoint | Largura |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Mobile-first. Sem scroll horizontal em nenhum breakpoint.
