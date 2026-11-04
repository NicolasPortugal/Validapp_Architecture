## Conta e acesso

1. **Cadastro:** a pessoa informa nome, e-mail e senha; `authService.registerAccount` chama `supabase.auth.signUp`. Quando não há sessão, a navegação conduz à confirmação de e-mail.
2. **Confirmação:** a tela recebe o código e `confirmSignup` chama `verifyOtp` com tipo `email`, em um cliente temporário. O formato esperado no app é de seis dígitos. O tamanho configurado no projeto remoto de Auth não foi verificado.
3. **Entrada:** `loginWithEmail` usa `signInWithPassword`; o contexto de autenticação atualiza a navegação para as abas principais.
4. **Recuperação:** `resetPasswordForEmail` envia o pedido; `verifyRecoveryCode` valida o código em um cliente temporário; `updateRecoveredPassword` altera a senha e encerra essa sessão temporária.
5. **Visitante:** entra nas abas sem autenticação. Seus produtos ficam apenas neste aparelho, no AsyncStorage.

## Produtos

1. No cadastro manual, a pessoa fornece nome, quantidade e outros dados opcionais, incluindo validade. `ProductContext` grava no Supabase para conta ou em AsyncStorage para visitante.
2. No armazém e no painel, o contexto carrega os produtos; `expiry.js` calcula o estado de vencimento por data civil no fuso `America/Sao_Paulo`.
3. Na aba Escanear, `expo-camera` lê o código de barras e abre o cadastro manual com o código preenchido. O app não infere automaticamente validade a partir do código.
4. O app permite atualizar e remover registros pelo mesmo contexto de produtos.

## Preferências e perfil

O tema e as preferências de interface são locais ao aparelho. Contas podem editar nome e foto; visitantes não enviam avatar ao Storage. A exclusão de conta remove a foto pelo cliente e chama a RPC `delete_my_account`.
