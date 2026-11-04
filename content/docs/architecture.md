## Como as partes se conectam

O ValidApp é um aplicativo Expo/React Native. `App.js` monta os provedores de tema, preferências, autenticação, produtos e relógio de validade; em seguida define a navegação. Uma pessoa sem conta vê o fluxo de autenticação. Quem entrou ou escolheu o modo visitante acessa as abas Início, Armazém, Escanear e Ajustes.

`ProductContext.js` é o ponto de acesso aos produtos. Para uma conta autenticada, consulta e grava em `public.products` no Supabase, filtrando pelo `user_id`. Para visitante, usa AsyncStorage no aparelho. A migração de dados locais de uma versão anterior está implementada no mesmo módulo; o comportamento em todos os cenários reais ainda depende de teste no dispositivo.

O Supabase fornece Auth, Postgres e Storage. `supabase.js` cria o cliente com sessão persistida por `secureSessionStorage.js`. No dispositivo, esse adaptador usa Expo SecureStore; na prévia web do aplicativo, usa memória. A foto de perfil de conta é enviada a um bucket privado e aberta por URL assinada.

### Dependências verificadas

Expo SDK 58, React 19.3, React Native 0.88, React Navigation 7, Supabase JS 2.118, AsyncStorage, SecureStore, expo-camera, expo-image-picker e expo-image-manipulator constam no `package.json` do app, consultado em 04/11/2026.

### Limites desta documentação

Esta é uma fotografia do código na branch `passo-1-interface-e-perfil` e dos metadados do banco consultados em 04/11/2026. Ela não é sincronizada automaticamente com o app ou o Supabase.
