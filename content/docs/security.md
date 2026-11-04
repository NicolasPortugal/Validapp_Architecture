## Controles verificados

- **Autenticação:** Supabase Auth gerencia cadastro, login por senha, confirmação e recuperação. O aplicativo usa a chave pública configurada no ambiente; nenhuma chave é necessária para navegar neste portal.
- **Sessão:** no Android/iOS, o adaptador de sessão usa Expo SecureStore com divisão de valores grandes em partes. Em web preview do app, a sessão fica apenas em memória. `supabase.js` controla o auto refresh conforme o estado do app.
- **Dados de produtos:** `public.products` tem políticas RLS para leitura, inserção, edição e exclusão ligadas a `auth.uid() = user_id`.
- **Avatar:** o bucket `validapp-avatars` é privado. As políticas de Storage limitam leitura e escrita ao caminho do próprio usuário; o app gera URL assinada por prazo limitado.
- **Exclusão de conta:** o app chama a RPC `delete_my_account`, depois de tentar remover o avatar. A implementação interna da função deve ser auditada separadamente antes de qualquer afirmação de garantia total de remoção.

## Escopo e pontos a verificar

As tabelas `pantry_items` e `global_products` também têm políticas no banco, mas o uso delas pelo app atual não foi verificado. A configuração efetiva dos modelos de e-mail, o tamanho remoto do OTP e o comportamento de permissões em todos os aparelhos também não foram verificados neste levantamento.

Este portal é estático e não se conecta ao Supabase em produção. Não armazene segredos, dados pessoais ou capturas de tokens neste repositório.
