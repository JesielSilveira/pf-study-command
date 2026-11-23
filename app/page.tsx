
'use client';

import { useEffect, useMemo, useState } from 'react';

type Topic = {
  id: string;
  subject: string;
  title: string;
  detail?: string;
};

type TAFItem = {
  id: string;
  name: string;
  male: string;
  female: string;
  detail: string;
};

const syllabus: Record<string, string[]> = {
  'Língua Portuguesa': [
    'Compreensão e interpretação de textos de gêneros variados.',
    'Reconhecimento de tipos e gêneros textuais.',
    'Domínio da ortografia oficial.',
    'Mecanismos de coesão textual: referenciação, substituição, repetição, conectores e outros elementos de sequenciação textual.',
    'Emprego de tempos e modos verbais.',
    'Estrutura morfossintática do período: emprego das classes de palavras.',
    'Relações de coordenação entre orações e entre termos da oração.',
    'Relações de subordinação entre orações e entre termos da oração.',
    'Emprego dos sinais de pontuação.',
    'Concordância verbal e nominal.',
    'Regência verbal e nominal.',
    'Emprego do sinal indicativo de crase.',
    'Colocação dos pronomes átonos.',
    'Reescrita de frases e parágrafos: significação das palavras.',
    'Reescrita: substituição de palavras ou de trechos de texto.',
    'Reescrita: reorganização da estrutura de orações e períodos.',
    'Reescrita de textos de diferentes gêneros e níveis de formalidade.',
    'Correspondência oficial conforme o Manual de Redação da Presidência da República.',
    'Redação oficial: aspectos gerais.',
    'Redação oficial: finalidade dos expedientes oficiais.',
    'Redação oficial: adequação da linguagem ao tipo de documento.',
    'Redação oficial: adequação do formato do texto ao gênero.'
  ],

  'Noções de Direito Administrativo': [
    'Organização administrativa: centralização, descentralização, concentração e desconcentração.',
    'Administração direta e indireta.',
    'Autarquias, fundações, empresas públicas e sociedades de economia mista.',
    'Ato administrativo: conceito, requisitos, atributos, classificação e espécies.',
    'Agentes públicos: Lei nº 8.112/1990 e suas alterações.',
    'Agentes públicos: disposições constitucionais aplicáveis.',
    'Agentes públicos: conceito e espécies.',
    'Agentes públicos: cargo, emprego e função pública.',
    'Poderes administrativos: hierárquico, disciplinar, regulamentar e de polícia.',
    'Uso e abuso do poder.',
    'Licitação: princípios.',
    'Licitação: contratação direta, dispensa e inexigibilidade.',
    'Licitação: modalidades, tipos e procedimento.',
    'Controle da Administração Pública: controle exercido pela própria Administração.',
    'Controle judicial da Administração Pública.',
    'Controle legislativo da Administração Pública.',
    'Responsabilidade civil do Estado no direito brasileiro.',
    'Responsabilidade civil do Estado por ato comissivo.',
    'Responsabilidade civil do Estado por omissão.',
    'Requisitos para a demonstração da responsabilidade do Estado.',
    'Causas excludentes e atenuantes da responsabilidade do Estado.',
    'Regime jurídico-administrativo: conceito.',
    'Princípios expressos e implícitos da Administração Pública.'
  ],

  'Noções de Direito Constitucional': [
    'Direitos e garantias fundamentais: direitos e deveres individuais e coletivos.',
    'Direitos à vida, à liberdade, à igualdade, à segurança e à propriedade.',
    'Direitos sociais.',
    'Nacionalidade.',
    'Cidadania e direitos políticos.',
    'Partidos políticos.',
    'Garantias constitucionais individuais.',
    'Garantias dos direitos coletivos, sociais e políticos.',
    'Poder Executivo: forma e sistema de governo.',
    'Poder Executivo: chefia de Estado e chefia de governo.',
    'Defesa do Estado e das instituições democráticas.',
    'Segurança pública e organização da segurança pública.',
    'Ordem social: bases e objetivos.',
    'Seguridade social.',
    'Meio ambiente.',
    'Família, criança, adolescente, idoso e indígenas.'
  ],

  'Noções de Direito Penal e Processual Penal': [
    'Princípios básicos do Direito Penal e do Direito Processual Penal.',
    'Aplicação da lei penal no tempo e no espaço.',
    'Tempo e lugar do crime.',
    'Territorialidade e extraterritorialidade da lei penal.',
    'Fato típico e seus elementos.',
    'Crime consumado e tentado.',
    'Ilicitude e causas de exclusão.',
    'Excesso punível.',
    'Crimes contra a pessoa.',
    'Crimes contra o patrimônio.',
    'Crimes contra a fé pública.',
    'Crimes contra a Administração Pública.',
    'Inquérito policial: histórico, natureza, conceito e finalidade.',
    'Inquérito policial: características, fundamento, titularidade e grau de cognição.',
    'Inquérito policial: valor probatório.',
    'Inquérito policial: formas de instauração.',
    'Notitia criminis e delatio criminis.',
    'Inquérito policial: procedimentos investigativos.',
    'Inquérito policial: indiciamento e garantias do investigado.',
    'Inquérito policial: conclusão.',
    'Prova: preservação do local de crime.',
    'Prova: requisitos e ônus da prova.',
    'Prova: nulidade.',
    'Documentos de prova.',
    'Reconhecimento de pessoas e coisas.',
    'Acareação.',
    'Indícios.',
    'Busca e apreensão.',
    'Restrição de liberdade: prisão em flagrante.'
  ],

  'Direitos Humanos': [
    'Direitos humanos na Constituição Federal de 1988.',
    'Sistema internacional de proteção dos direitos humanos.',
    'Convenção para a Prevenção e Punição ao Crime de Genocídio.',
    'Convenção Relativa ao Estatuto dos Refugiados.',
    'Protocolo sobre o Estatuto dos Refugiados.',
    'Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial.',
    'Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher.',
    'Convenção contra a Tortura e Outros Tratamentos ou Penas Cruéis, Desumanos ou Degradantes.',
    'Convenção Internacional para a Proteção de Todas as Pessoas contra o Desaparecimento Forçado.',
    'Regras mínimas da ONU para o tratamento de pessoas presas.',
    'Princípios Básicos sobre o Uso da Força e Armas de Fogo — Havana, 1990.',
    'Lei nº 13.060/2014: uso de instrumentos de menor potencial ofensivo pelos agentes de segurança pública.',
    'Decreto nº 12.341/2024: uso da força e de instrumentos de menor potencial ofensivo pelos profissionais de segurança pública.'
  ],

  'Legislação Especial': [
    'Lei nº 14.967/2024: Estatuto da Segurança Privada e da Segurança das Instituições Financeiras.',
    'Lei nº 10.357/2001: normas de controle e fiscalização de produtos químicos.',
    'Lei nº 13.445/2017: Lei de Migração.',
    'Lei nº 11.343/2006: normas de repressão ao tráfico ilícito de drogas e alterações — aspectos penais e processuais penais.',
    'Lei nº 9.455/1997: crimes de tortura e alterações — aspectos penais e processuais penais.',
    'Lei nº 8.069/1990: Estatuto da Criança e do Adolescente e alterações — aspectos penais e processuais penais.',
    'Lei nº 10.826/2003: registro, posse e comercialização de armas de fogo e alterações — aspectos penais e processuais penais.',
    'Lei nº 9.605/1998: infrações ambientais e alterações — aspectos penais e processuais penais.',
    'Lei nº 10.446/2002: infrações de repercussão interestadual ou internacional e alterações.',
    'Lei nº 13.444/2017: Identificação Civil Nacional.',
    'Lei nº 14.534/2023: adoção do CPF como número único de identificação.',
    'Lei nº 7.116/1983: Carteira de Identidade.',
    'Decreto nº 10.977/2022: regulamentação da Lei nº 7.116/1983.',
    'Decreto nº 11.797/2023: Serviço de Identificação do Cidadão.',
    'Lei nº 9.454/1997: número único de Registro de Identidade Civil.',
    'Decreto nº 11.491/2023: Convenção sobre o Crime Cibernético.'
  ],

  'Estatística': [
    'Estatística descritiva e análise exploratória: gráficos, diagramas e tabelas.',
    'Medidas descritivas: posição, dispersão, assimetria e curtose.',
    'Probabilidade: conceitos básicos, definições e axiomas.',
    'Cálculo de probabilidades e probabilidade condicional.',
    'Independência de eventos e de variáveis aleatórias.',
    'Variáveis aleatórias discretas e contínuas.',
    'Distribuições de probabilidade.',
    'Função de probabilidade e função densidade de probabilidade.',
    'Esperança e momentos.',
    'Distribuições especiais.',
    'Distribuições condicionais e independência.',
    'Transformação de variáveis.',
    'Leis dos grandes números.',
    'Teorema central do limite.',
    'Amostras aleatórias e distribuições amostrais.',
    'Regra de Bayes e teorema da probabilidade total.',
    'Variáveis aleatórias: definições e exemplos.',
    'Função de probabilidade para variáveis discretas e função densidade para variáveis contínuas.',
    'Distribuições uniforme, de Bernoulli, binomial e normal.',
    'Média aritmética, ponderada, geométrica e harmônica.',
    'Mediana e moda.',
    'Amplitude, variância, desvio padrão e coeficiente de variação.',
    'Coeficiente de correlação de Pearson: conceito e cálculo.',
    'Teorema central do limite: importância para a distribuição amostral da média.',
    'Regra empírica dos três sigma da distribuição normal.',
    'Aproximação da dispersão dos dados na distribuição normal.',
    'Técnicas de amostragem.',
    'Amostragem aleatória simples, estratificada, sistemática e por conglomerados.',
    'Conceitos básicos para determinação do tamanho amostral.',
    'Inferência estatística: estimação pontual.',
    'Métodos de estimação, propriedades dos estimadores e suficiência.',
    'Estimação intervalar: intervalos de confiança e de credibilidade.',
    'Testes de hipóteses simples e compostas.',
    'Níveis de significância e potência de um teste.',
    'Teste t de Student e teste qui-quadrado.',
    'Análise de regressão linear.',
    'Critérios de mínimos quadrados e de máxima verossimilhança.',
    'Modelos de regressão linear.',
    'Inferência sobre os parâmetros do modelo.',
    'Análise de variância.',
    'Análise de resíduos.',
    'Técnicas de amostragem e tamanho amostral.'
  ],

  'Raciocínio Lógico': [
    'Estruturas lógicas.',
    'Lógica de argumentação: analogias, inferências, deduções e conclusões.',
    'Lógica sentencial ou proposicional.',
    'Proposições simples e compostas.',
    'Tabelas-verdade.',
    'Equivalências lógicas.',
    'Leis de De Morgan.',
    'Diagramas lógicos.',
    'Lógica de primeira ordem.',
    'Princípios de contagem e probabilidade.',
    'Operações com conjuntos.',
    'Problemas aritméticos, geométricos e matriciais.'
  ],

  'Informática': [
    'Conceito de internet e intranet.',
    'Tecnologias, ferramentas, aplicativos e procedimentos associados à internet e intranet.',
    'Navegadores, correio eletrônico, grupos de discussão, busca, pesquisa e redes sociais.',
    'Sistemas operacionais Linux e Windows.',
    'Acesso remoto, transferência de informação e arquivos.',
    'Aplicativos de áudio, vídeo e multimídia.',
    'Edição de textos, planilhas e apresentações: Microsoft Office e LibreOffice.',
    'Redes de computadores: formação de endereços IPv4 e IPv6.',
    'Proteção e segurança: vírus, worms e pragas virtuais.',
    'Aplicativos de segurança: antivírus, firewall, anti-spyware e similares.',
    'Computação na nuvem — cloud computing.',
    'Teoria Geral de Sistemas: camadas de aplicação, processos, frontend e backend.',
    'Sistemas de informação: fases e etapas.',
    'Sistemas de informação: análise de requisitos, especificação, testes, homologação, produção e suporte.',
    'Teoria da informação: informação, dados, representação de dados e conhecimentos, segurança e inteligência.',
    'Banco de dados: base de dados, documentação e prototipação.',
    'Modelagem conceitual: abstração e modelo entidade-relacionamento.',
    'Análise funcional e administração de dados.',
    'Dados estruturados e não estruturados.',
    'Bancos relacionais: conceitos, características, chaves e relacionamentos.',
    'Mineração de dados: conceituação e características.',
    'Aprendizado de máquina.',
    'Big Data: conceito, premissas e aplicação.',
    'Redes de comunicação: introdução a redes de computação e telecomunicações.',
    'Camada física, camada de enlace de dados e subcamada de acesso ao meio.',
    'Transmissão de dados: tipos de enlace, códigos, modos e meios de transmissão.',
    'Redes locais, metropolitanas e de longa distância.',
    'Terminologia, aplicações e topologias de redes.',
    'Modelos OSI/ISO e TCP/IP: arquitetura e protocolos.',
    'Interconexão de redes e nível de transporte.',
    'Programação: noções de Python e R.',
    'Metadados de arquivos.',
    'Formatos de intercâmbio entre sistemas biométricos: NIST, XML e JSON.',
    'Testes de acurácia do NIST.GOV.',
    'Falso positivo e falso negativo: FPIR e FNIR.',
    'Inteligência Artificial: conceitos de Machine Learning.',
    'Ferramentas de IA: Copilot, ChatGPT e META.',
    'Sistemas Linux e Windows; acesso remoto e transferência de arquivos.',
    'Comunicação multimídia e colaboração online: Microsoft Teams.',
    'Internet e intranet: arquitetura e princípios de funcionamento das redes.',
    'Tipos de redes: LAN, MAN e WAN.',
    'Modelos OSI/ISO e TCP/IP: camadas, funções e protocolos associados.',
    'Protocolos: Ethernet, IP, IPv4, IPv6, TCP, UDP, DNS, DHCP e SNMP.',
    'Protocolos e mecanismos de segurança: VPN e SSL/TLS.',
    'Redes sem fio: IEEE 802.11, WPA/WPA2, segurança e boas práticas.',
    'Computação em nuvem: definição e características de nuvens privadas e públicas.',
    'Modelos de serviço em nuvem: IaaS, PaaS e SaaS.',
    'Ameaças digitais e malwares: vírus, worms, trojans, ransomware, spyware, rootkits e botnets.',
    'Ferramentas e técnicas de segurança: antivírus, firewall, anti-spyware e MFA.',
    'Criptografia e proteção de dados: hashes MD5, SHA-1 e SHA-256.',
    'Assinaturas digitais.',
    'Controle de acesso e autenticação.',
    'Banco de dados relacionais: conceitos básicos e características.',
    'Noções de linguagem SQL.',
    'Modelagem conceitual: entidades, atributos e relacionamentos.',
    'Dados estruturados e não estruturados.',
    'Data Warehouse, Data Mart, Data Lake e Data Mesh.',
    'Metadados.',
    'Análise de dados e mineração de dados.',
    'Business Intelligence: ferramentas e aplicabilidade.',
    'Aprendizado de máquina e inteligência artificial.',
    'Big Data: conceito, premissas e aplicação.',
    'Programação em Python.',
    'API — Application Programming Interface.',
    'ETL/ELT — Extract, Transform, Load.'
  ],

  'Contabilidade Geral': [
    'Conceitos, objetivos e finalidades da contabilidade.',
    'Patrimônio: componentes, equação fundamental, situação líquida e representação gráfica.',
    'Atos e fatos administrativos: conceitos, fatos permutativos, modificativos e mistos.',
    'Contas: conceitos, contas de débitos, créditos e saldos.',
    'Plano de contas: conceitos, elenco, função e funcionamento das contas.',
    'Escrituração: conceitos e lançamentos contábeis.',
    'Escrituração: elementos essenciais e fórmulas de lançamentos.',
    'Livros de escrituração, métodos e processos.',
    'Regime de competência e regime de caixa.',
    'Contabilização: juros, descontos, tributos e aluguéis.',
    'Variação monetária e cambial.',
    'Folha de pagamento.',
    'Compras, vendas e provisões.',
    'Depreciações e baixa de bens.',
    'Balancete de verificação: conceitos, modelos e técnicas de elaboração.',
    'Balanço patrimonial: conceitos, objetivo e composição.',
    'Demonstração do resultado do exercício: conceito, objetivo e composição.',
    'Lei nº 6.404/1976 e suas alterações.',
    'Legislação complementar e pronunciamentos do Comitê de Pronunciamentos Contábeis — CPC.',
    'NBC TSP Estrutura Conceitual, de 23 de setembro de 2016.'
  ],

  'Arquivologia': [
    'Arquivística: princípios e conceitos.',
    'Políticas públicas de arquivo e legislação arquivística.',
    'Normas nacionais e internacionais de arquivo.',
    'Sistemas e redes de arquivo.',
    'Gestão de documentos.',
    'Implementação de programas de gestão de documentos.',
    'Diagnóstico da situação arquivística e realidade arquivística brasileira.',
    'Protocolo: recebimento, registro, distribuição, tramitação e expedição de documentos.',
    'Funções arquivísticas: criação de documentos.',
    'Funções arquivísticas: aquisição de documentos.',
    'Funções arquivísticas: classificação de documentos.',
    'Funções arquivísticas: avaliação de documentos.',
    'Funções arquivísticas: difusão de documentos.',
    'Funções arquivísticas: descrição de documentos.',
    'Funções arquivísticas: preservação de documentos.',
    'Análise tipológica dos documentos de arquivo.',
    'Políticas de acesso aos documentos de arquivo.',
    'Sistemas informatizados de gestão arquivística de documentos.',
    'Documentos digitais: requisitos e metadados.',
    'Microfilmagem de documentos de arquivo.'
  ]
};

const topics: Topic[] = Object.entries(syllabus).flatMap(([subject, items]) =>
  items.map((title, index) => ({
    id: `${Object.keys(syllabus).indexOf(subject)}-${index}`,
    subject,
    title
  }))
);

const subjects = ['Todas', ...Object.keys(syllabus)];

const taf: TAFItem[] = [
  {
    id: 'barra',
    name: 'Barra fixa',
    male: '5 flexões completas',
    female: '15 segundos em suspensão',
    detail: 'Masculino: flexões completas. Feminino: sustentação estática com o queixo acima da barra.'
  },
  {
    id: 'impulsao',
    name: 'Impulsão horizontal',
    male: '2,05 metros',
    female: '1,56 metros',
    detail: 'São permitidas duas tentativas. Vale a melhor marca.'
  },
  {
    id: 'natacao',
    name: 'Natação — 50 metros',
    male: 'Até 56 segundos',
    female: 'Até 64 segundos',
    detail: 'Nado livre, qualquer estilo. São permitidas duas tentativas.'
  },
  {
    id: 'corrida',
    name: 'Corrida — 12 minutos',
    male: '2.300 metros',
    female: '1.800 metros',
    detail: 'Uma tentativa. É permitido correr ou caminhar durante o teste.'
  }
];

export default function Home() {
  const [done, setDone] = useState<string[]>([]);
  const [tafDone, setTafDone] = useState<string[]>([]);
  const [minutes, setMinutes] = useState(0);
  const [filter, setFilter] = useState('Todas');
  const [notes, setNotes] = useState('');
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [tab, setTab] = useState<'conteudo' | 'taf'>('conteudo');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pfsc-v1');
      if (saved) {
        const data = JSON.parse(saved);
        setDone(data.done || []);
        setMinutes(data.minutes || 0);
        setNotes(data.notes || '');
        setTafDone(data.tafDone || []);
      }
    } catch {
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        'pfsc-v1',
        JSON.stringify({ done, minutes, notes, tafDone })
      );
    } catch {}
  }, [done, minutes, notes, tafDone, loaded]);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  const visible = useMemo(
    () => topics.filter(t => filter === 'Todas' || t.subject === filter),
    [filter]
  );

  const pct = Math.round((done.length / topics.length) * 100);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  function toggle(id: string) {
    setDone(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  }

  function toggleTaf(id: string) {
    setTafDone(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  }

  function finishPomodoro() {
    setMinutes(m => m + 25);
    setSeconds(25 * 60);
    setRunning(false);
  }

  function resetDailyGoal() {
    setMinutes(0);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">PF</div>
          <div>
            <strong>Rotina do Agente</strong>
            <span>PAINEL DE MISSÃO · AGENTE DE POLÍCIA FEDERAL</span>
          </div>
        </div>
        <div className="status"><i /> SISTEMA OPERACIONAL</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">CENTRO DE COMANDO · EDITAL PF 2025</p>
          <h1>A missão é clara.<br /><em>Ser Agente da PF.</em></h1>
          <p className="intro">
            Conteúdo programático organizado em checklist. Marque cada tópico
            estudado e acompanhe sua preparação.
          </p>
        </div>

        <div className="goal-card">
          <span className="card-label">META DIÁRIA</span>
          <strong>02:00</strong>
          <span>HORAS DE ESTUDO</span>
          <div className="goal-line">
            <b style={{ width: `${Math.min(100, minutes / 120 * 100)}%` }} />
          </div>
          <small>{Math.min(minutes, 120)} de 120 minutos concluídos hoje</small>

          <button
            type="button"
            className="secondary"
            onClick={resetDailyGoal}
          >
            ZERAR META DIÁRIA
          </button>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <span>CONTEÚDOS CONCLUÍDOS</span>
          <strong>{done.length}<small> / {topics.length}</small></strong>
        </div>
        <div className="stat">
          <span>PROGRESSO DO EDITAL-BASE</span>
          <strong>{pct}<small>%</small></strong>
        </div>
        <div className="stat">
          <span>TEMPO REGISTRADO</span>
          <strong>{hours}<small>h </small>{mins}<small>min</small></strong>
        </div>
      </section>

      <div className="progress-track">
        <div style={{ width: `${pct}%` }} />
      </div>

      <section className="content-grid">
        <div className="panel syllabus">
          <div className="panel-head">
            <div>
              <p className="eyebrow">PLANO DE OPERAÇÃO</p>
              <h2>Conteúdo & TAF</h2>
            </div>
            <span className="count">{done.length}/{topics.length}</span>
          </div>

          <div className="filters">
            <button
              className={tab === 'conteudo' ? 'filter active' : 'filter'}
              onClick={() => setTab('conteudo')}
            >
              Conteúdo programático
            </button>
            <button
              className={tab === 'taf' ? 'filter active' : 'filter'}
              onClick={() => setTab('taf')}
            >
              TAF
            </button>
          </div>

          {tab === 'conteudo' ? (
            <>
              <div className="filters">
                {subjects.map(s => (
                  <button
                    key={s}
                    className={filter === s ? 'filter active' : 'filter'}
                    onClick={() => setFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="topic-list">
                {visible.map(t => (
                  <label
                    className={`topic ${done.includes(t.id) ? 'completed' : ''}`}
                    key={t.id}
                  >
                    <input
                      type="checkbox"
                      checked={done.includes(t.id)}
                      onChange={() => toggle(t.id)}
                    />
                    <span className="checkmark">
                      {done.includes(t.id) ? '✓' : ''}
                    </span>
                    <span className="topic-copy">
                      <b>{t.title}</b>
                      <small>{t.subject}</small>
                    </span>
                  </label>
                ))}
              </div>

              <p className="disclaimer">
                Baseado no conteúdo programático do Cargo 16 — Agente de
                Polícia Federal, Edital nº 1 — PF — Policial, de 20 de maio
                de 2025, atualizado até a retificação nº 2. A lista deve ser
                conferida com o próximo edital quando publicado.
              </p>
            </>
          ) : (
            <>
              <p className="intro taf-intro">
                Índices mínimos do edital de 2025. É necessário atingir o
                mínimo em cada teste. Marque os testes em que você já alcança
                o índice exigido.
              </p>

              <div className="topic-list">
                {taf.map(t => (
                  <label
                    className={`topic ${tafDone.includes(t.id) ? 'completed' : ''}`}
                    key={t.id}
                  >
                    <input
                      type="checkbox"
                      checked={tafDone.includes(t.id)}
                      onChange={() => toggleTaf(t.id)}
                    />
                    <span className="checkmark">
                      {tafDone.includes(t.id) ? '✓' : ''}
                    </span>
                    <span className="topic-copy">
                      <b>{t.name}</b>
                      <small>Masculino: {t.male}</small>
                      <small>Feminino: {t.female}</small>
                      <span>{t.detail}</span>
                    </span>
                  </label>
                ))}
              </div>

              <p className="disclaimer">
                O TAF é eliminatório e todos os quatro testes são obrigatórios.
                Confira as regras de execução do edital vigente. Treine com
                orientação adequada e não force o corpo diante de dor ou
                sintomas.
              </p>
            </>
          )}
        </div>

        <aside className="side">
          <div className="panel timer-panel">
            <p className="eyebrow">FOCO TOTAL</p>
            <h2>Ciclo de estudo</h2>
            <div className="timer">{clock}</div>
            <p className="timer-caption">Pomodoro · 25 minutos</p>

            <div className="timer-actions">
              <button
                className="primary"
                onClick={() => {
                  if (seconds === 0) setSeconds(25 * 60);
                  setRunning(!running);
                }}
              >
                {running ? 'PAUSAR' : 'INICIAR'}
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setRunning(false);
                  setSeconds(25 * 60);
                }}
              >
                REINICIAR
              </button>
            </div>

            <button className="finish" onClick={finishPomodoro}>
              Concluir sessão de 25 min + registrar
            </button>
            <p className="hint">
              Ao concluir, 25 minutos são somados à sua meta diária.
            </p>
          </div>

          <div className="panel notes-panel">
            <p className="eyebrow">REGISTRO DE MISSÃO</p>
            <h2>Anotações de hoje</h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="O que estudei? O que preciso revisar? Quais dúvidas ficaram?"
            />
            <p className="hint">Salvo automaticamente neste navegador.</p>
          </div>

          <div className="quote">
            “Missão dada é missão cumprida.”
            <span>— FOCO NA APROVAÇÃO</span>
          </div>
        </aside>
      </section>

      <footer>
        PF STUDY COMMAND <span>·</span> VERSÃO 2.0 <span>·</span>
        PROGRESSO SALVO NESTE DISPOSITIVO
      </footer>
    </main>
  );
}
