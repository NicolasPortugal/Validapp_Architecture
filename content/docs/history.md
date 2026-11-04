## Registro inicial de decisões

### 04/11/2026 — Portal estático e versionado

Esta primeira versão usa React, TypeScript e Vite. O conteúdo fica em Markdown, JSON e arquivos Mermaid no próprio repositório. A escolha evita backend e torna cada alteração revisável por commit. A navegação usa hash para funcionar em recargas de páginas internas no GitHub Pages.

### 04/11/2026 — Separar produtos por tipo de acesso

No código do app analisado, contas autenticadas usam `public.products`, enquanto visitantes usam AsyncStorage. Esta página registra a decisão observada no código; a motivação histórica original não foi documentada.

### 04/11/2026 — Sessão e avatar privados

O app utiliza SecureStore para a sessão nativa e um bucket privado para avatar, conforme `secureSessionStorage.js`, `profileService.js` e a migração versionada. O motivo histórico detalhado dessas escolhas permanece pendente de documentação.

### Próximas atualizações

Registre novas decisões aqui com data, contexto, solução e consequência. Atualize diagramas e dados estruturados na mesma mudança quando o app ou o banco evoluírem.
