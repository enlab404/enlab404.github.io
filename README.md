# EN lab — portfólio (versão estática)

Versão em HTML, CSS e JavaScript puros do portfólio, pronta para o GitHub Pages.
Não precisa de build, Node ou servidor.

## Estrutura

```
index.html        → página única (menu lateral + área de conteúdo)
css/style.css     → todo o visual (paleta, animações e responsivo)
js/dados.js       → CONTEÚDO: perfil, formação, projetos, pesquisas e contatos
js/app.js         → rotas, menu, abrir/fechar projetos, formulário
assets/favicon.svg
.nojekyll         → avisa o GitHub Pages para servir os arquivos como estão
```

## Onde mudar as informações

Quase tudo fica em **`js/dados.js`**:

- `perfil`: nome, título, cidade, apresentação, formação, ferramentas e links de contato.
- `projetos`: o campo `tipo` define a página em que o projeto aparece (`'comercial'`, `'academico'` ou `'extensao'`).
- `pesquisas`: trabalhos de pesquisa.

Para adicionar um projeto, copie um bloco `{ ... }`, cole abaixo e altere os campos. O `slug` precisa ser único.

## Publicar no GitHub Pages

1. Crie um repositório e envie o conteúdo desta pasta (o `index.html` precisa ficar na raiz).
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos o site fica em `https://<seu-usuario>.github.io/<repositorio>/`.

As páginas usam endereços como `#/projetos/comerciais`, que funcionam no GitHub Pages sem configuração extra.

## Testar no computador

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Formulário de contato

Sem servidor, o botão **Enviar mensagem** abre o aplicativo de e-mail do visitante com a mensagem pronta para o endereço em `perfil.contatos.email`.

Para receber as mensagens direto, sem o visitante precisar do app de e-mail, crie um formulário gratuito no [Formspree](https://formspree.io) e coloque o endereço em `config.formularioEndpoint` dentro de `js/dados.js`.
