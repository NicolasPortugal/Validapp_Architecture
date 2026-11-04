# Orientações para agentes

Este repositório contém somente o portal estático ValidApp Architecture. Não altere o app `Validapp_Dev`, o banco Supabase ou os dados do projeto durante tarefas deste portal, salvo pedido explícito do usuário.

## Organização

- `src/App.tsx` contém as rotas e páginas; `src/styles.css` contém o visual e os temas.
- `content/docs/*.md` contém o texto técnico. Edite estes arquivos para mudanças no conteúdo; evite duplicar a mesma explicação em componentes.
- `content/database.json` é um snapshot de metadados de banco. Consulte metadados reais em leitura antes de atualizar tabelas, chaves ou políticas. Nunca consulte ou copie registros pessoais.
- `content/modules.json` mapeia arquivos e responsabilidades. Confirme que cada link existe na branch do app indicada em `src/App.tsx`.
- `content/diagrams/*.mmd` define os diagramas; atualize a fonte `.mmd` e o texto explicativo na mesma alteração.
- `content/releases.json` alimenta toda a página de versões. Para adicionar uma versão publicada, inclua versão, data ISO, `status: "published"`, título, descrição, URL real e acessível do APK, novidades e correções. Prefira GitHub Releases; um link direto de artefato do EAS também pode ser usado após confirmar que o arquivo está acessível. Não invente APKs, datas ou links. Itens planejados usam `status: "planned"`, `releaseDate: null` e `downloadUrl: null`.

## Desenvolvimento

Use Node.js 22+. Execute `npm ci`, `npm run format:check`, `npm run check` e `npm run build`. No PowerShell, use `npm.cmd` se `npm.ps1` estiver bloqueado. O Vite usa `base: '/Validapp_Architecture/'`; preserve isso para GitHub Pages. A navegação com `HashRouter` permite recarregar rotas internas.

## Veracidade e segurança

- Escreva somente fatos verificados no código do app ou nos metadados do banco. Informe a branch/fonte e a data. Sinalize pontos incertos como **Não verificado** ou **Pendente de documentação**.
- Não exponha chaves, tokens, URLs privadas de infraestrutura, dados de contas ou capturas com informações pessoais.
- Não faça o portal conectar diretamente ao Supabase ou ao repositório em tempo real neste MVP.
- Evite dependências, componentes e abstrações sem uso real. Mantenha a interface responsiva e navegável por teclado.
- Antes de publicar, confirme a URL do Pages e o funcionamento dos links de APK; o build local sozinho não comprova deploy.
