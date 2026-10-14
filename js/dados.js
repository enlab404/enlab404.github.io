/*
 * Conteúdo do portfólio.
 * Edite este arquivo para mudar textos, projetos, pesquisas e contatos.
 * Tudo que estiver marcado com "(exemplo)" ou [colchetes] ainda é provisório.
 *
 * Tipos de projeto: 'comercial' | 'academico' | 'extensao'
 * Situação do projeto: 'Em produção' | 'Em andamento' | 'Concluído'
 * Situação da pesquisa: 'Em andamento' | 'Concluída' | 'Publicada'
 */
window.ENLAB = {
  config: {
    // Opcional: endereço de um serviço de formulário (ex.: https://formspree.io/f/xxxxxx).
    // Vazio = o botão "Enviar mensagem" abre o aplicativo de e-mail do visitante com a mensagem pronta.
    formularioEndpoint: '',
  },

  perfil: {
    nome: 'Efraim José Negreiros dos Santos',
    titulo: 'Desenvolvedor e pesquisador',
    localizacao: 'Recife, PE',
    resumo: [
      'Construo sistemas web para empresas e órgãos públicos e investigo como aprendizado de máquina pode resolver problemas de redes e localização.',
      'O EN lab reúne esse trabalho: produtos em produção, projetos de sala de aula, ações de extensão e pesquisa acadêmica.',
    ],
    formacao: [
      {
        curso: 'Bacharelado em Sistemas de Informação',
        instituicao: 'Centro de Informática (CIn), Universidade Federal de Pernambuco (UFPE)',
        inicio: 2026,
        fim: 2029,
        situacao: 'Em andamento',
        descricao: 'Curso que une Informática e Administração para aplicar Tecnologia da Informação e Comunicação na solução de problemas organizacionais, com foco em gestão, tecnologia da informação e relações humanas. Quatro anos, 3.000 horas. Pesquisa desde agosto de 2026, orientada por Victor Wanderley Costa de Medeiros, sobre localização de animais a pasto com LoRa, e extensão no Serviço Integrado de Saúde (SIS) da UFPE.',
      },
      {
        curso: 'Tecnólogo em Ciência de Dados',
        instituicao: 'Gran Faculdade',
        inicio: 2026,
        fim: 2028,
        situacao: 'Em andamento',
        descricao: 'Formação com metodologias ativas e problemas reais, nos eixos de banco de dados, visualização de dados, inteligência artificial e linguagens de programação. Ênfases opcionais em Big Data e Inteligência Artificial e em Business Intelligence.',
      },
      {
        curso: 'Técnico Integrado ao Ensino Médio em Desenvolvimento de Sistemas',
        instituicao: 'Instituto Federal de Pernambuco (IFPE), Campus Jaboatão dos Guararapes',
        inicio: 2023,
        fim: 2025,
        situacao: 'Concluído',
        descricao: 'Formação em programação, banco de dados e engenharia de software. Bolsista PIBEX em 2025 e monitor de Programação 1 em 2024.',
      },
    ],
    experiencias: [
      {
        cargo: 'Monitor de Programação 1',
        instituicao: 'IFPE, Campus Jaboatão dos Guararapes',
        periodo: '2024.1',
        descricao: 'Monitoria do componente de introdução à programação no Técnico Integrado em Desenvolvimento de Sistemas, pelo Programa Institucional de Monitoria, com 150 horas, sob orientação da professora Havana Diogo Alves Andrade.',
      },
      {
        cargo: 'Desenvolvedor I, bolsista PIBEX',
        instituicao: 'IFPE, projeto da farmácia do Abrigo de Idosos Cristo Redentor',
        periodo: 'fev/2025 a dez/2025',
        descricao: 'Desenvolvimento de solução para gestão da farmácia do abrigo, sob orientação do professor Eric de Luna Sales.',
      },
    ],
    competencias: [
      { grupo: 'Front-end', itens: ['Angular', 'React', 'TypeScript', 'CSS'] },
      { grupo: 'Back-end', itens: ['NestJS', 'Node.js', 'PostgreSQL', 'Sequelize'] },
      { grupo: 'Dados e IA', itens: ['Python', 'PyTorch', 'Pandas', 'scikit-learn'] },
      { grupo: 'Infraestrutura', itens: ['Docker', 'Railway', 'Git', 'Linux'] },
    ],
    contatos: {
      email: 'enlab404@gmail.com',
      github: 'https://github.com/efraimjnegreiros',
      linkedin: 'https://www.linkedin.com/in/efraim-jos%C3%A9-negreiros-dos-santos-3ba3412b0',
      lattes: 'https://lattes.cnpq.br/5882837410759362',
    },
  },

  projetos: [
    // ---------------- Comerciais ----------------
    {
      slug: 'inout',
      tipo: 'comercial',
      titulo: 'Inout: operação e finanças',
      resumo: 'Sistema de gestão que reúne clientes, pedidos, demandas e todo o financeiro da operação em um só lugar.',
      descricao: 'Cadastro de clientes, grupos empresariais, colaboradores, fornecedores e produtos e serviços. Fichas de acompanhamento de demandas geram pedidos e notas fiscais. O módulo financeiro cobre contas a pagar e a receber, comissões, cartões de crédito, caixinha, investimentos, contratos, budget e forecast, fluxo de caixa, DRE e curva ABC, com relatórios em PDF e permissões por perfil de usuário.',
      ano: 2026,
      papel: 'Desenvolvimento full stack',
      parceiro: 'Gerens Partners',
      stack: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'JWT', 'CASL', 'Recharts', 'jsPDF'],
      situacao: 'Em produção',
      links: { demo: 'https://www.inoutsistema.com.br' },
    },
    {
      slug: 'gic-im',
      tipo: 'comercial',
      titulo: 'GIC IM: inteligência de mercado',
      resumo: 'CRM com funis em kanban para acompanhar o relacionamento com clientes e prospects.',
      descricao: 'Cada empresa organiza seus projetos em funis com etapas configuráveis e grupos de etapas padrão. Os cards seguem modelos com campos personalizados, recebem etiquetas e responsáveis e guardam um histórico com texto formatado. O sistema avisa os usuários por notificações, gera o relatório do funil em PDF e controla o acesso com permissões por usuário.',
      ano: 2026,
      papel: 'Desenvolvimento full stack',
      parceiro: 'Gerens Partners',
      stack: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'TipTap', 'jsPDF'],
      situacao: 'Em produção',
      links: { demo: 'https://gic.gerenspartners.com.br/login' },
    },
    {
      slug: 'gic-projetos',
      tipo: 'comercial',
      titulo: 'GIC Projetos: fluxos e entregas',
      resumo: 'Gestão de fluxos, prazos e entregas de cada projeto em quadros kanban.',
      descricao: 'Quadros kanban configuráveis por projeto, com etapas, modelos de card por empresa, etiquetas, responsáveis e anexos de arquivos nos cards. A equipe acompanha prazos e entregas pelo quadro, recebe notificações e cada usuário vê apenas o que suas permissões liberam.',
      ano: 2026,
      papel: 'Desenvolvimento full stack',
      parceiro: 'Gerens Partners',
      stack: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL'],
      situacao: 'Em produção',
      links: { demo: 'https://projetos.gerenspartners.com.br/login' },
    },
    {
      slug: 'portal-gerens',
      tipo: 'comercial',
      titulo: 'Portal Gerens Partners',
      resumo: 'Página de acesso aos sistemas da Gerens, com painel administrativo para editar os cards.',
      descricao: 'Site estático em HTML, CSS e JavaScript que monta os cards de acesso a partir de um arquivo JSON. O painel /admin permite criar, editar, reordenar e desativar sistemas e publica as mudanças direto no repositório pela API do GitHub, sem depender de desenvolvedor. Deploy em contêiner Docker com nginx.',
      ano: 2026,
      papel: 'Desenvolvimento e deploy',
      parceiro: 'Gerens Partners',
      stack: ['HTML', 'CSS', 'JavaScript', 'GitHub API', 'Docker', 'nginx'],
      situacao: 'Em produção',
      links: {},
    },
    {
      slug: 'placar-maker',
      tipo: 'comercial',
      titulo: 'Placar +Maker',
      resumo: 'Ranking de turmas por pontuação nas aulas de robótica, com módulo de inventário de equipamentos.',
      descricao: 'Professores registram cada aula com um critério de pontuação e o placar mostra a posição das turmas, com filtros por escola, professor, turma e período. Alunos veem só a pontuação da própria turma. O módulo de inventário controla equipamentos por unidade e por quantidade, empréstimos a professores com devolução parcial, conferências físicas, alertas de estoque e atraso e relatórios.',
      ano: 2026,
      papel: 'Desenvolvimento full stack',
      parceiro: '+Maker',
      stack: ['NestJS', 'TypeORM', 'PostgreSQL', 'React', 'Vite', 'JWT'],
      situacao: 'Em andamento',
      links: {},
    },

    // ---------------- Acadêmicos ----------------
    {
      slug: 'localizacao-lora-pastagem',
      tipo: 'academico',
      titulo: 'Localização de animais a pasto com LoRa: ML versus métodos analíticos',
      resumo: 'Pesquisa no CIn/UFPE que compara fingerprinting com RSSI/SNR e métodos clássicos (TDOA, trilateração) em pastagens com topografia irregular.',
      descricao: 'Hipótese: métodos de aprendizado de máquina (fingerprinting com RSSI/SNR) superam abordagens analíticas clássicas em ambientes rurais com topografia irregular e cobertura esparsa de gateways, ao custo de mais dados de calibração e maior complexidade de implantação. O estudo mede o erro médio de localização de RSSI trilateração, TDOA, KNN, random forest e redes neurais sob diferentes densidades de gateways; analisa como a variabilidade do sinal LoRa ao longo do dia (temperatura, umidade, vegetação) afeta a estabilidade dos modelos; estima o esforço mínimo de calibração para um desempenho adequado ao monitoramento animal; e identifica em que condições (topografia, cobertura arbórea, número de gateways) a vantagem do ML se torna significativa.',
      ano: 2026,
      papel: 'Pesquisador, sob orientação de Victor Wanderley Costa de Medeiros',
      parceiro: 'Centro de Informática (CIn), UFPE',
      stack: ['Python', 'scikit-learn', 'PyTorch', 'Pandas', 'LoRa'],
      situacao: 'Em andamento',
      links: {},
    },

    // ---------------- Extensão ----------------
    {
      slug: 'farmacia-abrigo-cristo-redentor',
      tipo: 'extensao',
      titulo: 'Gestão da farmácia do Abrigo de Idosos Cristo Redentor',
      resumo: 'Solução de software para a gestão da farmácia de um abrigo de idosos, desenvolvida como bolsista do PIBEX.',
      descricao: 'Projeto de extensão PIBEX do IFPE, "Desenvolvimento de solução para gestão da farmácia do Abrigo de Idosos Cristo Redentor", realizado de fevereiro a dezembro de 2025, durante o 3º ano do curso Técnico Integrado ao Ensino Médio em Desenvolvimento de Sistemas. Atuação como Desenvolvedor I, com orientação do professor Eric de Luna Sales.',
      ano: 2025,
      papel: 'Desenvolvedor I (bolsista PIBEX)',
      parceiro: 'Abrigo de Idosos Cristo Redentor / IFPE',
      stack: ['Sistema web'], // ajuste com as tecnologias usadas
      situacao: 'Concluído',
      links: {},
    },
    {
      slug: 'biblioteca-comunitaria-sis',
      tipo: 'extensao',
      titulo: 'Biblioteca comunitária do Serviço Integrado de Saúde (SIS)',
      resumo: 'Implementação da biblioteca comunitária do SIS, da UFPE.',
      descricao: 'Projeto de extensão da UFPE para implementar a biblioteca comunitária do Serviço Integrado de Saúde (SIS), em andamento desde abril de 2026.',
      ano: 2026,
      papel: 'Participante', // ajuste com sua função
      parceiro: 'Serviço Integrado de Saúde (SIS), UFPE',
      stack: ['A definir'], // ajuste
      situacao: 'Em andamento',
      links: {},
    },
  ],

  pesquisas: [
    {
      slug: 'localizacao-lora-pastagem',
      titulo: 'Localização de animais a pasto com LoRa: aprendizado de máquina versus métodos analíticos',
      modalidade: 'Pesquisa acadêmica',
      ano: 2026,
      orientacao: 'Prof. Victor Wanderley Costa de Medeiros (CIn, UFPE)',
      resumo: 'Compara fingerprinting com RSSI/SNR (KNN, random forest e redes neurais) a métodos analíticos clássicos (trilateração por RSSI e TDOA) em pastagens com topografia irregular e cobertura esparsa de gateways. Avalia o erro médio de localização conforme a densidade de gateways, o efeito da variabilidade do sinal ao longo do dia (temperatura, umidade, vegetação), o esforço mínimo de calibração e as condições em que a vantagem do aprendizado de máquina se torna significativa.',
      palavrasChave: ['LoRa', 'fingerprinting', 'RSSI', 'SNR', 'TDOA', 'monitoramento animal', 'aprendizado de máquina'],
      situacao: 'Em andamento',
    },
  ],
};
