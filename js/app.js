/*
 * EN lab — portfólio estático (HTML, CSS e JS puros).
 * As rotas usam "#/" (ex.: #/projetos/comerciais), o que funciona no GitHub Pages sem configuração.
 * O conteúdo vem de js/dados.js.
 */
(function () {
  'use strict';

  var dados = window.ENLAB;
  var main = document.getElementById('conteudo');
  var trilho = document.querySelector('.trilho');
  var alternar = document.querySelector('.alternar');
  var listaMenu = document.querySelector('#menu-principal ul');
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------ */
  /* Utilidades                                                          */
  /* ------------------------------------------------------------------ */

  function esc(valor) {
    return String(valor == null ? '' : valor)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function porAno(a, b) { return b.ano - a.ano; }

  function semProtocolo(url) { return url.replace(/^https?:\/\/(www\.)?/, ''); }

  /* ------------------------------------------------------------------ */
  /* Logo Órbita (SVG). Com "animar", o elétron percorre a órbita.       */
  /* ------------------------------------------------------------------ */

  var contadorLogo = 0;
  var CAMINHO_ORBITA = 'M112,60 a52,20 0 1,1 -104,0 a52,20 0 1,1 104,0';

  function logoOrbita(opcoes) {
    var tamanho = opcoes.tamanho || 44;
    var animar = !!opcoes.animar;
    var rotulo = opcoes.rotulo || '';
    var espessura = tamanho < 80 ? 6 : 4;
    var id = ++contadorLogo;
    var grad = 'orbita-' + id;
    var mascara = 'mascara-' + id;
    var acessivel = rotulo ? 'role="img" aria-label="' + esc(rotulo) + '"' : 'aria-hidden="true" focusable="false"';

    var eletron = animar
      ? '<circle r="11" fill="#00D1E0" fill-opacity="0.22"><animateMotion dur="14s" repeatCount="indefinite" path="' + CAMINHO_ORBITA + '"/></circle>' +
        '<circle r="5.5" fill="#7DF4FF"><animateMotion dur="14s" repeatCount="indefinite" path="' + CAMINHO_ORBITA + '"/></circle>'
      : '';
    var eletronFixo = animar
      ? ''
      : '<circle cx="107" cy="38" r="11" fill="#00D1E0" fill-opacity="0.22"/><circle cx="107" cy="38" r="6" fill="#7DF4FF"/>';

    return '<span class="logo-orbita">' +
      '<svg width="' + tamanho + '" height="' + tamanho + '" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" ' + acessivel + '>' +
        '<defs>' +
          '<linearGradient id="' + grad + '" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="#1F4FA8"/><stop offset="1" stop-color="#00D1E0"/>' +
          '</linearGradient>' +
          // Recorta a órbita em volta do "en" para ela passar por trás das letras, em qualquer fundo.
          '<mask id="' + mascara + '" maskUnits="userSpaceOnUse" x="-10" y="-10" width="140" height="140">' +
            '<rect x="-10" y="-10" width="140" height="140" fill="#fff"/>' +
            '<text x="60" y="73" text-anchor="middle" font-family="Sora, system-ui, sans-serif" font-size="38" font-weight="700" fill="#000" stroke="#000" stroke-width="8" stroke-linejoin="round">en</text>' +
          '</mask>' +
        '</defs>' +
        '<g mask="url(#' + mascara + ')">' +
          '<ellipse cx="60" cy="60" rx="52" ry="20" transform="rotate(25 60 60)" stroke="#1F4FA8" stroke-opacity="0.45" stroke-width="' + (espessura * 0.75) + '"/>' +
          '<g transform="rotate(-25 60 60)">' +
            '<ellipse cx="60" cy="60" rx="52" ry="20" stroke="url(#' + grad + ')" stroke-width="' + espessura + '"/>' +
            eletron +
          '</g>' +
          eletronFixo +
        '</g>' +
        '<text x="60" y="73" text-anchor="middle" font-family="Sora, system-ui, sans-serif" font-size="38" font-weight="700" fill="#E6EEF7">en</text>' +
      '</svg></span>';
  }

  /* ------------------------------------------------------------------ */
  /* Rotas                                                               */
  /* ------------------------------------------------------------------ */

  var ROTAS = {
    '/': {
      rotulo: 'Quem sou eu',
      titulo: 'EN lab | Efraim Negreiros',
      render: paginaQuemSouEu,
    },
    '/projetos/comerciais': {
      rotulo: 'Projetos comerciais',
      titulo: 'Projetos comerciais | EN lab',
      render: function () {
        return paginaProjetos('comercial', 'Projetos comerciais',
          'Sistemas construídos para clientes e em uso no dia a dia de empresas e equipes.');
      },
    },
    '/projetos/academicos': {
      rotulo: 'Projetos acadêmicos',
      titulo: 'Projetos acadêmicos | EN lab',
      render: function () {
        return paginaProjetos('academico', 'Projetos acadêmicos',
          'Trabalhos de disciplina e estudos práticos desenvolvidos durante a graduação.');
      },
    },
    '/projetos/extensao': {
      rotulo: 'Projetos de extensão',
      titulo: 'Projetos de extensão | EN lab',
      render: function () {
        return paginaProjetos('extensao', 'Projetos de extensão',
          'Ações com a comunidade: tecnologia e conhecimento aplicados fora da universidade.');
      },
    },
    '/pesquisa': {
      rotulo: 'Pesquisa',
      titulo: 'Pesquisa | EN lab',
      render: paginaPesquisa,
    },
    '/contatos': {
      rotulo: 'Contatos',
      titulo: 'Contatos | EN lab',
      render: paginaContatos,
      depois: ligarFormulario,
    },
  };

  function caminhoAtual() {
    var hash = location.hash || '';
    if (hash.indexOf('#/') !== 0) return '/';
    var caminho = hash.slice(1).replace(/\/+$/, '') || '/';
    return ROTAS[caminho] ? caminho : '/';
  }

  function montarMenu() {
    listaMenu.innerHTML = Object.keys(ROTAS).map(function (caminho) {
      return '<li><a href="#' + caminho + '" data-caminho="' + caminho + '">' +
        '<span class="marcador" aria-hidden="true"></span>' + esc(ROTAS[caminho].rotulo) + '</a></li>';
    }).join('');
  }

  function marcarAtivo(caminho) {
    listaMenu.querySelectorAll('a').forEach(function (a) {
      var ativo = a.getAttribute('data-caminho') === caminho;
      a.classList.toggle('ativo', ativo);
      if (ativo) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  var primeiraCarga = true;

  function navegar() {
    // Um hash que não é rota (ex.: "#conteudo") não troca a página.
    if (location.hash && location.hash.indexOf('#/') !== 0) return;

    var caminho = caminhoAtual();
    var rota = ROTAS[caminho];
    main.innerHTML = rota.render();
    if (rota.depois) rota.depois();
    document.title = rota.titulo;
    marcarAtivo(caminho);
    fecharMenu();

    if (!primeiraCarga) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    primeiraCarga = false;
  }

  /* ------------------------------------------------------------------ */
  /* Menu móvel                                                          */
  /* ------------------------------------------------------------------ */

  function abrirMenu(aberto) {
    trilho.classList.toggle('aberto', aberto);
    alternar.setAttribute('aria-expanded', String(aberto));
    alternar.textContent = aberto ? 'Fechar' : 'Menu';
  }
  function fecharMenu() { abrirMenu(false); }

  alternar.addEventListener('click', function () {
    abrirMenu(!trilho.classList.contains('aberto'));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && trilho.classList.contains('aberto')) {
      fecharMenu();
      alternar.focus();
    }
  });

  // Clicar de novo no item da página atual também fecha o menu.
  listaMenu.addEventListener('click', fecharMenu);
  document.querySelectorAll('.marca').forEach(function (m) { m.addEventListener('click', fecharMenu); });

  document.querySelector('[data-pular]').addEventListener('click', function (e) {
    e.preventDefault();
    main.focus();
  });

  /* ------------------------------------------------------------------ */
  /* Página: Quem sou eu                                                 */
  /* ------------------------------------------------------------------ */

  function paginaQuemSouEu() {
    var p = dados.perfil;

    var formacao = p.formacao.map(function (f) {
      var emAndamento = f.situacao === 'Em andamento' || f.fim == null;
      return '<li>' +
        '<span class="no' + (emAndamento ? ' atual' : '') + '" aria-hidden="true"></span>' +
        '<p class="periodo">' + f.inicio + '–' + (f.fim == null ? 'atual' : f.fim) + '</p>' +
        '<h3>' + esc(f.curso) + '</h3>' +
        '<p class="instituicao">' + esc(f.instituicao) + '</p>' +
        '<p class="descricao">' + esc(f.descricao) + '</p>' +
        '<span class="situacao" data-viva="' + emAndamento + '">' + esc(f.situacao) + '</span>' +
      '</li>';
    }).join('');

    var experiencias = (p.experiencias || []).map(function (x) {
      return '<li>' +
        '<span class="no" aria-hidden="true"></span>' +
        '<p class="periodo">' + esc(x.periodo) + '</p>' +
        '<h3>' + esc(x.cargo) + '</h3>' +
        '<p class="instituicao">' + esc(x.instituicao) + '</p>' +
        '<p class="descricao">' + esc(x.descricao) + '</p>' +
      '</li>';
    }).join('');

    var competencias = p.competencias.map(function (c) {
      return '<div><dt>' + esc(c.grupo) + '</dt><dd><ul class="etiquetas">' +
        c.itens.map(function (i) { return '<li class="etiqueta">' + esc(i) + '</li>'; }).join('') +
        '</ul></dd></div>';
    }).join('');

    return '' +
      '<section class="heroi">' +
        '<div class="heroi-texto">' +
          '<p class="local">' + esc(p.localizacao) + '</p>' +
          '<h1>' + esc(p.nome) + '</h1>' +
          '<p class="titulo">' + esc(p.titulo) + '</p>' +
          '<div class="resumo">' + p.resumo.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
          '<div class="acoes">' +
            '<a class="botao botao-principal" href="#/projetos/comerciais">Ver projetos</a>' +
            '<a class="botao botao-contorno" href="#/contatos">Entrar em contato</a>' +
          '</div>' +
        '</div>' +
        '<div class="heroi-orbita" aria-hidden="true">' +
          logoOrbita({ tamanho: 380, animar: !reduzirMovimento.matches }) +
        '</div>' +
      '</section>' +

      '<section class="bloco" aria-labelledby="titulo-formacao">' +
        '<h2 id="titulo-formacao">Formação acadêmica</h2>' +
        '<ol class="linha-tempo">' + formacao + '</ol>' +
      '</section>' +

      (experiencias
        ? '<section class="bloco" aria-labelledby="titulo-experiencia">' +
            '<h2 id="titulo-experiencia">Experiência</h2>' +
            '<ol class="linha-tempo">' + experiencias + '</ol>' +
          '</section>'
        : '') +

      '<section class="bloco" aria-labelledby="titulo-competencias">' +
        '<h2 id="titulo-competencias">Ferramentas que uso</h2>' +
        '<dl class="competencias">' + competencias + '</dl>' +
      '</section>';
  }

  /* ------------------------------------------------------------------ */
  /* Página: Projetos                                                    */
  /* ------------------------------------------------------------------ */

  function paginaProjetos(tipo, titulo, descricao) {
    var lista = dados.projetos.filter(function (p) { return p.tipo === tipo; }).sort(porAno);

    var cabecalho = '<header class="pagina-cabecalho">' +
      '<h1>' + esc(titulo) + '</h1>' +
      '<p>' + esc(descricao) + '</p>' +
      '<span class="contagem">' + lista.length + ' ' + (lista.length === 1 ? 'projeto' : 'projetos') + '</span>' +
    '</header>';

    if (lista.length === 0) {
      return '<div class="pagina">' + cabecalho + '<div class="aviso"><p>Nenhum projeto nesta categoria ainda.</p></div></div>';
    }

    var itens = lista.map(function (p) {
      var det = 'det-' + p.slug;
      var links = '';
      if (p.links && (p.links.demo || p.links.repositorio)) {
        links = '<p class="links">' +
          (p.links.demo ? '<a href="' + esc(p.links.demo) + '" target="_blank" rel="noopener" tabindex="-1">Abrir projeto</a>' : '') +
          (p.links.repositorio ? '<a href="' + esc(p.links.repositorio) + '" target="_blank" rel="noopener" tabindex="-1">Ver código</a>' : '') +
        '</p>';
      }
      return '<li class="projeto">' +
        '<button type="button" class="cabeca" aria-expanded="false" aria-controls="' + det + '">' +
          '<span class="ano">' + p.ano + '</span>' +
          '<span class="principal">' +
            '<span class="nome">' + esc(p.titulo) + '</span>' +
            '<span class="resumo">' + esc(p.resumo) + '</span>' +
          '</span>' +
          '<span class="lado">' +
            '<span class="situacao" data-viva="' + (p.situacao !== 'Concluído') + '">' + esc(p.situacao) + '</span>' +
            '<span class="sinal" aria-hidden="true"></span>' +
          '</span>' +
        '</button>' +
        '<div class="detalhes" id="' + det + '" aria-hidden="true">' +
          '<div class="detalhes-interno">' +
            '<p class="descricao">' + esc(p.descricao) + '</p>' +
            '<dl class="ficha">' +
              '<div><dt>Papel</dt><dd>' + esc(p.papel) + '</dd></div>' +
              (p.parceiro ? '<div><dt>Parceiro</dt><dd>' + esc(p.parceiro) + '</dd></div>' : '') +
            '</dl>' +
            '<ul class="etiquetas" aria-label="Tecnologias">' +
              p.stack.map(function (t) { return '<li class="etiqueta">' + esc(t) + '</li>'; }).join('') +
            '</ul>' +
            links +
          '</div>' +
        '</div>' +
      '</li>';
    }).join('');

    return '<div class="pagina">' + cabecalho + '<ul class="projetos-lista">' + itens + '</ul></div>';
  }

  // Abre um projeto e fecha o que estava aberto (mesmo comportamento do Angular).
  main.addEventListener('click', function (e) {
    var botao = e.target.closest('.projeto .cabeca');
    if (!botao) return;
    var item = botao.parentElement;
    var abrir = !item.classList.contains('aberto');

    main.querySelectorAll('.projeto.aberto').forEach(function (outro) {
      if (outro !== item) definirAberto(outro, false);
    });
    definirAberto(item, abrir);
  });

  function definirAberto(item, aberto) {
    item.classList.toggle('aberto', aberto);
    item.querySelector('.cabeca').setAttribute('aria-expanded', String(aberto));
    item.querySelector('.detalhes').setAttribute('aria-hidden', String(!aberto));
    item.querySelectorAll('.links a').forEach(function (a) { a.tabIndex = aberto ? 0 : -1; });
  }

  /* ------------------------------------------------------------------ */
  /* Página: Pesquisa                                                    */
  /* ------------------------------------------------------------------ */

  function paginaPesquisa() {
    var lista = dados.pesquisas.slice().sort(porAno);

    var itens = lista.map(function (p) {
      return '<article class="pesquisa">' +
        '<div class="meta">' +
          '<span class="ano">' + p.ano + '</span>' +
          '<span class="modalidade">' + esc(p.modalidade) + '</span>' +
        '</div>' +
        '<div class="corpo">' +
          '<h2>' + esc(p.titulo) + '</h2>' +
          '<p class="resumo">' + esc(p.resumo) + '</p>' +
          '<p class="orientacao">Orientação: ' + esc(p.orientacao) + '</p>' +
          '<div class="rodape">' +
            '<ul class="etiquetas" aria-label="Palavras-chave">' +
              p.palavrasChave.map(function (k) { return '<li class="etiqueta">' + esc(k) + '</li>'; }).join('') +
            '</ul>' +
            '<span class="situacao" data-viva="' + (p.situacao === 'Em andamento') + '">' + esc(p.situacao) + '</span>' +
          '</div>' +
          (p.link ? '<a class="ler" href="' + esc(p.link) + '" target="_blank" rel="noopener">Ler o trabalho completo</a>' : '') +
        '</div>' +
      '</article>';
    }).join('');

    return '<div class="pagina">' +
      '<header class="pagina-cabecalho">' +
        '<h1>Pesquisa</h1>' +
        '<p>Iniciação científica, artigos e estudos em andamento, com as perguntas que cada um tenta responder.</p>' +
      '</header>' +
      '<div class="pesquisas-lista">' + itens + '</div>' +
    '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Página: Contatos                                                    */
  /* ------------------------------------------------------------------ */

  var CAMPOS = {
    nome: { validar: function (v) { return v.trim().length > 0 && v.length <= 120; } },
    email: { validar: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    assunto: { validar: function (v) { return v.trim().length > 0 && v.length <= 150; } },
    mensagem: { validar: function (v) { return v.trim().length >= 10 && v.length <= 3000; } },
  };

  function campo(id, rotulo, tipo, extra, erro) {
    var controle = tipo === 'textarea'
      ? '<textarea id="' + id + '" name="' + id + '" rows="6" aria-describedby="erro-' + id + '"></textarea>'
      : '<input id="' + id + '" name="' + id + '" type="' + tipo + '" ' + (extra || '') + ' aria-describedby="erro-' + id + '">';
    return '<div class="campo">' +
      '<label for="' + id + '">' + rotulo + '</label>' + controle +
      '<p class="erro" id="erro-' + id + '" hidden>' + erro + '</p>' +
    '</div>';
  }

  function paginaContatos() {
    var c = dados.perfil.contatos;
    return '<div class="pagina">' +
      '<header class="pagina-cabecalho">' +
        '<h1>Contatos</h1>' +
        '<p>Para propostas de projeto, parcerias de pesquisa ou convites para extensão, escreva por aqui ou pelos canais ao lado.</p>' +
      '</header>' +
      '<div class="contato-grade">' +
        '<div class="contato-area">' + formularioHtml() + '</div>' +
        '<aside aria-labelledby="titulo-canais">' +
          '<h2 id="titulo-canais" class="canais-titulo">Outros canais</h2>' +
          '<dl class="canais">' +
            '<div><dt>E-mail</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></dd></div>' +
            '<div><dt>GitHub</dt><dd><a href="' + esc(c.github) + '" target="_blank" rel="noopener">' + esc(semProtocolo(c.github)) + '</a></dd></div>' +
            '<div><dt>LinkedIn</dt><dd><a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener">' + esc(semProtocolo(c.linkedin)) + '</a></dd></div>' +
            '<div><dt>Currículo Lattes</dt><dd><a href="' + esc(c.lattes) + '" target="_blank" rel="noopener">Abrir currículo</a></dd></div>' +
          '</dl>' +
        '</aside>' +
      '</div>' +
    '</div>';
  }

  function formularioHtml() {
    return '<form class="contato-form" novalidate>' +
      campo('nome', 'Nome', 'text', 'autocomplete="name"', 'Informe seu nome.') +
      campo('email', 'E-mail', 'email', 'autocomplete="email"', 'Informe um e-mail válido, como nome@exemplo.com.') +
      campo('assunto', 'Assunto', 'text', '', 'Informe o assunto.') +
      campo('mensagem', 'Mensagem', 'textarea', '', 'Escreva pelo menos 10 caracteres.') +
      '<p class="erro geral" role="alert" hidden></p>' +
      '<button type="submit" class="botao botao-principal">Enviar mensagem</button>' +
    '</form>';
  }

  function sucessoHtml(viaEmail) {
    return '<div class="aviso sucesso" role="status">' +
      '<h2>' + (viaEmail ? 'Mensagem pronta no seu e-mail' : 'Mensagem enviada') + '</h2>' +
      '<p>' + (viaEmail
        ? 'Seu aplicativo de e-mail foi aberto com a mensagem preenchida. É só enviar por lá.'
        : 'Obrigado pelo contato. A resposta chega no e-mail que você informou.') + '</p>' +
      '<button type="button" class="botao botao-contorno" data-nova>Escrever outra mensagem</button>' +
    '</div>';
  }

  function ligarFormulario() {
    var area = main.querySelector('.contato-area');
    var form = area.querySelector('form');
    var tocados = {};

    function valores() {
      var v = {};
      Object.keys(CAMPOS).forEach(function (k) { v[k] = form.elements[k].value; });
      return v;
    }

    function atualizarCampo(nome, mostrar) {
      var el = form.elements[nome];
      var invalido = !CAMPOS[nome].validar(el.value);
      var exibir = invalido && (mostrar || tocados[nome]);
      el.setAttribute('aria-invalid', String(exibir));
      form.querySelector('#erro-' + nome).hidden = !exibir;
      return !invalido;
    }

    Object.keys(CAMPOS).forEach(function (nome) {
      var el = form.elements[nome];
      el.addEventListener('blur', function () { tocados[nome] = true; atualizarCampo(nome); });
      el.addEventListener('input', function () { tocados[nome] = true; atualizarCampo(nome); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var erroGeral = form.querySelector('.erro.geral');
      erroGeral.hidden = true;

      var primeiroInvalido = null;
      Object.keys(CAMPOS).forEach(function (nome) {
        tocados[nome] = true;
        if (!atualizarCampo(nome, true) && !primeiroInvalido) primeiroInvalido = form.elements[nome];
      });
      if (primeiroInvalido) { primeiroInvalido.focus(); return; }

      var v = valores();
      var endpoint = dados.config && dados.config.formularioEndpoint;

      if (!endpoint) {
        var corpo = v.mensagem + '\n\n— ' + v.nome + ' <' + v.email + '>';
        location.href = 'mailto:' + dados.perfil.contatos.email +
          '?subject=' + encodeURIComponent(v.assunto) +
          '&body=' + encodeURIComponent(corpo);
        mostrarSucesso(true);
        return;
      }

      var botao = form.querySelector('button[type="submit"]');
      botao.disabled = true;
      botao.textContent = 'Enviando…';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(v),
      }).then(function (r) {
        if (!r.ok) throw new Error('status ' + r.status);
        mostrarSucesso(false);
      }).catch(function () {
        erroGeral.textContent = 'A mensagem não foi enviada porque o servidor não respondeu. Tente de novo em alguns minutos ou escreva direto para ' + dados.perfil.contatos.email + '.';
        erroGeral.hidden = false;
        botao.disabled = false;
        botao.textContent = 'Enviar mensagem';
      });
    });

    function mostrarSucesso(viaEmail) {
      area.innerHTML = sucessoHtml(viaEmail);
      area.querySelector('[data-nova]').addEventListener('click', function () {
        area.innerHTML = formularioHtml();
        ligarFormulario();
        area.querySelector('#nome').focus();
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Início                                                              */
  /* ------------------------------------------------------------------ */

  document.querySelectorAll('[data-logo]').forEach(function (el) {
    el.insertAdjacentHTML('afterbegin', logoOrbita({ tamanho: Number(el.getAttribute('data-logo')) }));
  });
  document.querySelector('.trilho-rodape').innerHTML =
    esc(dados.perfil.nome) + '<br>' + esc(dados.perfil.localizacao);

  montarMenu();
  window.addEventListener('hashchange', navegar);
  navegar();
})();
