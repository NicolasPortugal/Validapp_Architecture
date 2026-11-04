# ValidApp Architecture

Portal estático de engenharia do ValidApp: arquitetura, código, esquema do banco, fluxos, segurança, histórico e versões Android. Esta é a versão inicial. A documentação foi levantada em **04/11/2026** a partir da branch `passo-1-interface-e-perfil` do [aplicativo](https://github.com/AndryusLucas/Validapp_Dev) e de metadados do Supabase, sem consultar registros pessoais.

## Rodar localmente

Requer Node.js 22 ou superior. No terminal Git Bash ou PowerShell:

```bash
npm ci
npm run dev
```

Abra o endereço que o Vite mostrar, normalmente `http://localhost:5173/Validapp_Architecture/`. Para validar a versão de produção:

```bash
npm run build
npm run preview
```

No PowerShell com execução de scripts bloqueada, use `npm.cmd` nos comandos acima.

## Estrutura

- `src/App.tsx`: navegação, páginas e componentes de apresentação.
- `src/styles.css`: tema, layout responsivo e estilos do portal.
- `content/docs/*.md`: explicações versionadas.
- `content/database.json`: snapshot seguro das tabelas e políticas relevantes.
- `content/modules.json`: mapa de módulos e links para o código do app.
- `content/diagrams/*.mmd`: diagramas Mermaid.
- `content/releases.json`: única fonte para a página de versões.
- `.github/workflows/pages.yml`: build e deploy no GitHub Pages.

A navegação usa URLs com `#` para funcionar em páginas internas do GitHub Pages. O `base` do Vite está configurado para `/Validapp_Architecture/`.

## Publicar no GitHub Pages

1. Faça push da branch `main` deste repositório.
2. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
3. Execute o workflow **Publicar portal no GitHub Pages** em **Actions**, ou faça um novo push em `main`.
4. Verifique o resultado em `https://nicolasportugal.github.io/Validapp_Architecture/`.

O endereço só deve ser anunciado depois de confirmar o deploy. Segundo a [documentação do GitHub Pages](https://docs.github.com/en/pages/quickstart), o GitHub Free oferece Pages para repositórios públicos; Pages para repositórios privados requer GitHub Pro, Team ou Enterprise. Se a opção não aparecer, confira o plano antes de alterar a visibilidade do repositório.

## Publicar um APK

1. Prefira criar uma **GitHub Release** no repositório do aplicativo e anexar o APK real como asset. Para builds internos do EAS, também é possível usar o link direto do artefato `.apk`, desde que ele esteja acessível sem login.
2. Copie a URL direta do APK e confirme que ela responde com o arquivo.
3. Edite apenas `content/releases.json`: crie um item com `status: "published"`, versão, data ISO (`AAAA-MM-DD`), título, descrição, `downloadUrl`, novidades e correções. Mantenha versões ainda não lançadas como `planned`, sem URL.
4. Confirme que o link abre o arquivo; rode `npm run build`; faça commit e push.

A página ordena as versões publicadas pela data, mostra a mais recente em destaque e não apresenta botão de download para itens planejados.

## Manter a documentação correta

O portal não consulta o aplicativo, o Supabase ou o GitHub em tempo real. Ao mudar código ou esquema, atualize o conteúdo correspondente e registre a data da nova verificação. Marque como **Não verificado** ou **Pendente de documentação** qualquer ponto incerto. Não inclua tokens, chaves, registros de usuários ou dados pessoais.
