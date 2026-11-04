import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileCode2,
  GitBranch,
  Github,
  KeyRound,
  LayoutDashboard,
  Menu,
  Moon,
  Package,
  Search,
  ShieldCheck,
  Smartphone,
  Sun,
  X,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import releasesData from "../content/releases.json";
import databaseData from "../content/database.json";
import modulesData from "../content/modules.json";
import architectureDoc from "../content/docs/architecture.md?raw";
import flowsDoc from "../content/docs/flows.md?raw";
import securityDoc from "../content/docs/security.md?raw";
import historyDoc from "../content/docs/history.md?raw";
import architectureDiagram from "../content/diagrams/architecture.mmd?raw";
import databaseDiagram from "../content/diagrams/database.mmd?raw";

type Icon = ComponentType<LucideProps>;
type Release = {
  version: string;
  releaseDate: string | null;
  status: "planned" | "published";
  title: string;
  description: string;
  downloadUrl: string | null;
  changes: string[];
  fixes: string[];
};
const releases = releasesData as Release[];
const appRepo = "https://github.com/AndryusLucas/Validapp_Dev";
const portalRepo = "https://github.com/NicolasPortugal/Validapp_Architecture";
const appBranch = "passo-1-interface-e-perfil";
const fileUrl = (file: string) => `${appRepo}/blob/${appBranch}/${file}`;
const published = releases
  .filter(
    (release) =>
      release.status === "published" &&
      release.releaseDate &&
      release.downloadUrl,
  )
  .sort((a, b) => b.releaseDate!.localeCompare(a.releaseDate!));
const planned = releases.filter((release) => release.status === "planned");

const navigation: {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: Icon;
}[] = [
  {
    path: "/",
    title: "Visão geral",
    eyebrow: "COMECE AQUI",
    description: "O sistema em uma página",
    icon: LayoutDashboard,
  },
  {
    path: "/arquitetura",
    title: "Arquitetura",
    eyebrow: "ESTRUTURA",
    description: "Camadas e dependências",
    icon: Boxes,
  },
  {
    path: "/codigo",
    title: "Código-fonte",
    eyebrow: "REPOSITÓRIO",
    description: "Módulos e arquivos",
    icon: Code2,
  },
  {
    path: "/banco",
    title: "Banco de dados",
    eyebrow: "DADOS",
    description: "Tabelas e relacionamentos",
    icon: Database,
  },
  {
    path: "/fluxos",
    title: "Fluxos",
    eyebrow: "FUNCIONALIDADES",
    description: "Caminhos do usuário",
    icon: GitBranch,
  },
  {
    path: "/seguranca",
    title: "Segurança",
    eyebrow: "ACESSO",
    description: "Sessões e permissões",
    icon: ShieldCheck,
  },
  {
    path: "/historico",
    title: "Histórico técnico",
    eyebrow: "EVOLUÇÃO",
    description: "Decisões registradas",
    icon: Clock3,
  },
  {
    path: "/versoes",
    title: "Versões do App",
    eyebrow: "ANDROID",
    description: "Lançamentos e APKs",
    icon: ArrowDownToLine,
  },
];

function Brand() {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="ValidApp Architecture, página inicial"
    >
      <span className="brand-symbol">
        <Package size={22} strokeWidth={2.1} />
        <span className="brand-spark" />
      </span>
      <span className="brand-text">
        <strong>ValidApp</strong>
        <small>ARCHITECTURE</small>
      </span>
    </Link>
  );
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="icon-button"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
    >
      {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {aside}
    </div>
  );
}

function Panel({
  title,
  icon: IconComponent,
  children,
  className = "",
}: {
  title?: string;
  icon?: Icon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {title && (
        <div className="panel-heading">
          {IconComponent && <IconComponent size={17} />}
          <h2>{title}</h2>
        </div>
      )}
      {children}
    </section>
  );
}

function SourceLink({ file, label }: { file: string; label?: string }) {
  return (
    <a
      href={fileUrl(file)}
      target="_blank"
      rel="noreferrer"
      className="source-link"
    >
      <FileCode2 size={15} />
      <span>{label || file}</span>
      <ExternalLink size={13} />
    </a>
  );
}

function ExternalButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="button button-outline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ExternalLink size={15} />
    </a>
  );
}

function Document({ markdown }: { markdown: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

function Diagram({
  source,
  label,
  theme,
}: {
  source: string;
  label: string;
  theme: "light" | "dark";
}) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: theme === "dark" ? "#1c2c49" : "#e8f1ff",
            primaryTextColor: theme === "dark" ? "#e9f1ff" : "#17233b",
            primaryBorderColor: theme === "dark" ? "#456290" : "#98b8ed",
            lineColor: theme === "dark" ? "#82a7e8" : "#4779cc",
            tertiaryColor: theme === "dark" ? "#152238" : "#f4f8ff",
            background: theme === "dark" ? "#111b2e" : "#ffffff",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        });
        const id = `diagram-${Math.random().toString(36).slice(2)}`;
        return mermaid.render(id, source);
      })
      .then((result) => {
        if (active) {
          setSvg(result.svg);
          setError(false);
        }
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [source, theme]);
  return (
    <div className="diagram" role="img" aria-label={label}>
      {error ? (
        <div className="empty-state">
          Diagrama indisponível. Consulte a descrição logo abaixo.
        </div>
      ) : svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="diagram-loading">Carregando diagrama…</div>
      )}
    </div>
  );
}

function SectionFooter() {
  return (
    <div className="section-footer">
      <span>
        <Activity size={14} /> Documentação inicial · verificada em 04/11/2026
      </span>
      <a href={portalRepo} target="_blank" rel="noreferrer">
        Sugerir correção <ArrowRight size={14} />
      </a>
    </div>
  );
}

function Dashboard({ theme }: { theme: "light" | "dark" }) {
  const quick = navigation.slice(1, 7);
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="live-dot" /> CENTRAL DE ENGENHARIA{" "}
            <span className="hero-divider" /> MVP 0.1
          </div>
          <h1>
            Entenda o ValidApp.
            <br />
            <span>Do código ao produto.</span>
          </h1>
          <p>
            Uma visão clara de como o app organiza produtos, acompanha validade
            e conecta pessoas, dados e serviços.
          </p>
          <div className="hero-actions">
            <Link to="/arquitetura" className="button button-primary">
              Explorar arquitetura <ArrowRight size={16} />
            </Link>
            <ExternalButton href={appRepo}>Ver código do app</ExternalButton>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="orbit-node node-top">
            <Smartphone size={21} />
          </span>
          <span className="orbit-node node-right">
            <Database size={21} />
          </span>
          <span className="orbit-node node-bottom">
            <KeyRound size={21} />
          </span>
          <div className="hero-app-icon">
            <Package size={46} strokeWidth={1.55} />
            <span className="hero-check">
              <Check size={13} strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>
      <div className="section-intro">
        <div>
          <span className="overline">O PROJETO EM FOCO</span>
          <h2>Um mapa para quem constrói</h2>
        </div>
        <p>
          Informações verificadas no repositório do app e nos metadados do
          Supabase.
        </p>
      </div>
      <div className="metric-grid">
        <div className="metric-card">
          <span className="metric-icon blue">
            <Smartphone size={21} />
          </span>
          <strong>Expo + React Native</strong>
          <small>Aplicativo móvel</small>
        </div>
        <div className="metric-card">
          <span className="metric-icon violet">
            <Database size={21} />
          </span>
          <strong>Supabase</strong>
          <small>Auth, Postgres e Storage</small>
        </div>
        <div className="metric-card">
          <span className="metric-icon mint">
            <Boxes size={21} />
          </span>
          <strong>4 tabelas públicas</strong>
          <small>Esquema consultado em leitura</small>
        </div>
        <div className="metric-card">
          <span className="metric-icon amber">
            <GitBranch size={21} />
          </span>
          <strong>2 modos de acesso</strong>
          <small>Conta ou visitante local</small>
        </div>
      </div>
      <div className="content-grid">
        <Panel
          title="Arquitetura em um olhar"
          icon={Braces}
          className="wide-panel"
        >
          <Diagram
            source={architectureDiagram}
            label="Diagrama da arquitetura do ValidApp"
            theme={theme}
          />
          <Link className="text-link" to="/arquitetura">
            Entender as conexões <ArrowRight size={15} />
          </Link>
        </Panel>
        <Panel title="Versão Android" icon={ArrowDownToLine}>
          <div className="release-mini">
            <span
              className={`status ${published.length ? "status-live" : "status-planned"}`}
            >
              {published.length ? "DISPONÍVEL" : "EM PREPARAÇÃO"}
            </span>
            <h3>
              {published.length
                ? `ValidApp ${published[0].version}`
                : "Primeiro APK em breve"}
            </h3>
            <p>
              {published.length
                ? published[0].description
                : planned.length
                  ? `A versão ${planned[0].version} está planejada. Quando o pacote de testes for publicado, o download aparecerá aqui.`
                  : "Ainda não existe versão Android publicada."}
            </p>
            <Link className="text-link" to="/versoes">
              Ver versões <ArrowRight size={15} />
            </Link>
          </div>
        </Panel>
      </div>
      <div className="section-intro compact">
        <div>
          <span className="overline">EXPLORE</span>
          <h2>Documentação por área</h2>
        </div>
      </div>
      <div className="quick-grid">
        {quick.map((item) => (
          <Link className="quick-card" to={item.path} key={item.path}>
            <span className="quick-icon">
              <item.icon size={21} />
            </span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
            <ArrowRight className="quick-arrow" size={16} />
          </Link>
        ))}
      </div>
      <div className="repo-strip">
        <div>
          <Github size={20} />
          <span>
            <strong>Código aberto à revisão</strong>
            <small>Fontes do aplicativo e deste portal no GitHub</small>
          </span>
        </div>
        <div>
          <a href={appRepo} target="_blank" rel="noreferrer">
            App <ExternalLink size={14} />
          </a>
          <a href={portalRepo} target="_blank" rel="noreferrer">
            Portal <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </>
  );
}

function Architecture({ theme }: { theme: "light" | "dark" }) {
  return (
    <>
      <PageHeader
        eyebrow="ESTRUTURA DO SISTEMA"
        title="Arquitetura"
        description="As camadas do aplicativo e o caminho que os dados percorrem."
      />
      <Panel title="Mapa de componentes" icon={Boxes}>
        <Diagram
          source={architectureDiagram}
          label="Aplicativo, provedores e serviços do ValidApp"
          theme={theme}
        />
        <div className="caption">
          Fluxo simplificado baseado em App.js, ProductContext.js, supabase.js e
          profileService.js.
        </div>
      </Panel>
      <div className="doc-panel">
        <Document markdown={architectureDoc} />
        <div className="source-row">
          <SourceLink file="App.js" />
          <SourceLink file="products/ProductContext.js" />
          <SourceLink file="supabase.js" />
        </div>
      </div>
      <SectionFooter />
    </>
  );
}

function CodePage() {
  return (
    <>
      <PageHeader
        eyebrow="MAPA DO REPOSITÓRIO"
        title="Código-fonte"
        description="Encontre a responsabilidade de cada módulo e abra os arquivos da branch analisada."
        aside={
          <ExternalButton href={`${appRepo}/tree/${appBranch}`}>
            Abrir repositório
          </ExternalButton>
        }
      />
      <div className="notice">
        <GitBranch size={18} />
        <span>
          Referências da branch <code>{appBranch}</code>, confirmada no GitHub
          em 04/11/2026. A branch <code>main</code> pode estar em outro estágio.
          O GitHub pode exigir acesso ao repositório do app para abrir os
          arquivos.
        </span>
      </div>
      <div className="module-list">
        {modulesData.map((module, i) => (
          <Panel key={module.group} className="module-panel">
            <div className="module-top">
              <span className="module-index">0{i + 1}</span>
              <div>
                <h2>{module.group}</h2>
                <p>{module.summary}</p>
              </div>
            </div>
            <div className="file-list">
              {module.files.map(([file, summary]) => (
                <div className="file-row" key={file}>
                  <SourceLink file={file} />
                  <span>{summary}</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
      <SectionFooter />
    </>
  );
}

function DatabasePage({ theme }: { theme: "light" | "dark" }) {
  return (
    <>
      <PageHeader
        eyebrow="METADADOS DO SUPABASE"
        title="Banco de dados"
        description="Estrutura das tabelas públicas, chaves e regras de acesso verificadas em leitura."
      />
      <div className="notice">
        <Database size={18} />
        <span>
          Dados estruturais consultados em {databaseData.verifiedAt}. Nenhum
          registro pessoal foi lido ou incluído neste portal.
        </span>
      </div>
      <Panel title="Relacionamentos" icon={GitBranch}>
        <Diagram
          source={databaseDiagram}
          label="Diagrama entidade-relacionamento do banco"
          theme={theme}
        />
        <div className="caption">
          O diagrama resume chaves estrangeiras verificadas. `auth.users`
          aparece apenas como referência, sem expor dados de usuários.
        </div>
      </Panel>
      <div className="section-intro compact">
        <div>
          <span className="overline">SCHEMA PUBLIC</span>
          <h2>Tabelas e colunas</h2>
        </div>
        <p>4 tabelas · os campos abaixo vêm de metadados do banco.</p>
      </div>
      <div className="table-grid">
        {databaseData.tables.map((table) => (
          <details
            className="table-card"
            key={table.name}
            open={table.name === "products"}
          >
            <summary>
              <div>
                <span className="table-schema">{table.schema}</span>
                <h3>{table.name}</h3>
                <p>{table.usage}</p>
              </div>
              <ChevronDown size={19} />
            </summary>
            <div className="table-details">
              <div className="column-heading">
                <span>COLUNA</span>
                <span>TIPO</span>
                <span>REGRA</span>
              </div>
              {table.columns.map(([name, type, note]) => (
                <div className="column-row" key={name}>
                  <code>{name}</code>
                  <span>{type}</span>
                  <small>{note}</small>
                </div>
              ))}
              <div className="access-note">
                <ShieldCheck size={16} />
                <span>{table.access}</span>
              </div>
            </div>
          </details>
        ))}
      </div>
      <Panel title="Funções identificadas" icon={Braces}>
        <div className="function-list">
          {databaseData.functions.map((fn) => (
            <div key={fn.name}>
              <code>{fn.name}</code>
              <p>{fn.description}</p>
            </div>
          ))}
        </div>
      </Panel>
      <SectionFooter />
    </>
  );
}

function DocPage({ kind }: { kind: "flows" | "security" | "history" }) {
  const data = {
    flows: {
      eyebrow: "JORNADAS DO APP",
      title: "Fluxos",
      description: "O que acontece do toque na tela à persistência dos dados.",
      markdown: flowsDoc,
      icon: GitBranch,
      files: [
        "auth/authService.js",
        "products/ProductContext.js",
        "ScannerScreen.js",
      ],
    },
    security: {
      eyebrow: "ACESSO E PROTEÇÃO",
      title: "Segurança",
      description: "Sessões, permissões e limites do que foi verificado.",
      markdown: securityDoc,
      icon: ShieldCheck,
      files: [
        "auth/secureSessionStorage.js",
        "auth/profileService.js",
        "supabase/migrations/20261104183257_avatars_privados.sql",
      ],
    },
    history: {
      eyebrow: "REGISTRO DE EVOLUÇÃO",
      title: "Histórico técnico",
      description:
        "Decisões observadas e espaço para documentar os próximos passos.",
      markdown: historyDoc,
      icon: Clock3,
      files: ["App.js", "products/ProductContext.js"],
    },
  }[kind];
  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
      />
      <div className="doc-panel">
        <Document markdown={data.markdown} />
        <div className="source-row">
          {data.files.map((file) => (
            <SourceLink file={file} key={file} />
          ))}
        </div>
      </div>
      <SectionFooter />
    </>
  );
}

function ReleaseCard({
  release,
  latest,
}: {
  release: Release;
  latest: boolean;
}) {
  const isAvailable =
    release.status === "published" &&
    !!release.downloadUrl &&
    !!release.releaseDate;
  return (
    <article className={`release-card ${latest ? "release-featured" : ""}`}>
      <div className="release-card-head">
        <div>
          <span
            className={`status ${isAvailable ? "status-live" : "status-planned"}`}
          >
            {isAvailable ? (latest ? "MAIS RECENTE" : "LANÇADA") : "PLANEJADA"}
          </span>
          <h2>ValidApp {release.version}</h2>
          <p>{release.title}</p>
        </div>
        <div className="release-date">
          {isAvailable
            ? new Date(`${release.releaseDate}T12:00:00`).toLocaleDateString(
                "pt-BR",
              )
            : "Data a definir"}
        </div>
      </div>
      <p className="release-description">{release.description}</p>
      <div className="release-lists">
        <div>
          <strong>Novidades</strong>
          <ul>
            {release.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </div>
        {release.fixes.length > 0 && (
          <div>
            <strong>Correções</strong>
            <ul>
              {release.fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isAvailable ? (
        <a
          className="button button-primary"
          href={release.downloadUrl!}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowDownToLine size={17} /> Baixar APK {release.version}
        </a>
      ) : (
        <div className="download-pending">
          <Clock3 size={17} /> Download disponível após a publicação do APK
        </div>
      )}
    </article>
  );
}

function Versions() {
  return (
    <>
      <PageHeader
        eyebrow="LANÇAMENTOS ANDROID"
        title="Versões do App"
        description="Pacotes de desenvolvimento e histórico de atualizações do ValidApp."
      />
      <div className="notice">
        <Smartphone size={18} />
        <span>
          Os APKs desta página são versões de desenvolvimento/teste. Instale
          apenas arquivos publicados nos Releases oficiais do projeto.
        </span>
      </div>
      {published.length ? (
        <>
          <div className="section-intro compact">
            <div>
              <span className="overline">DISPONÍVEL AGORA</span>
              <h2>Última versão publicada</h2>
            </div>
          </div>
          <ReleaseCard release={published[0]} latest />
          {published.length > 1 && (
            <>
              <div className="section-intro compact">
                <div>
                  <span className="overline">ARQUIVO</span>
                  <h2>Versões anteriores</h2>
                </div>
              </div>
              <div className="releases-stack">
                {published.slice(1).map((release) => (
                  <ReleaseCard
                    release={release}
                    latest={false}
                    key={release.version}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="empty-release">
          <span>
            <ArrowDownToLine size={28} />
          </span>
          <h2>O primeiro APK ainda não foi publicado</h2>
          <p>
            A página está pronta para receber o link oficial. Até lá, não há
            arquivo para baixar.
          </p>
        </div>
      )}
      {planned.length > 0 && (
        <>
          <div className="section-intro compact">
            <div>
              <span className="overline">ROADMAP</span>
              <h2>Em preparação</h2>
            </div>
          </div>
          <div className="releases-stack">
            {planned.map((release) => (
              <ReleaseCard
                release={release}
                latest={false}
                key={release.version}
              />
            ))}
          </div>
        </>
      )}
      <Panel title="Como adicionar uma versão" icon={BookOpen}>
        <ol className="steps">
          <li>
            Publique o APK como asset de uma GitHub Release do aplicativo.
          </li>
          <li>
            Adicione um item em <code>content/releases.json</code> com versão,
            data, novidades, correções e URL do asset.
          </li>
          <li>
            Defina <code>status</code> como <code>published</code> e confirme
            que o link abre o APK antes de publicar o portal.
          </li>
        </ol>
        <a
          className="text-link"
          href={`${appRepo}/releases`}
          target="_blank"
          rel="noreferrer"
        >
          Ver Releases do aplicativo <ExternalLink size={14} />
        </a>
      </Panel>
      <SectionFooter />
    </>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço não faz parte desta documentação.</p>
      <Link className="button button-primary" to="/">
        Voltar à visão geral <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("validapp-architecture-theme");
    return saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const current = navigation.find((item) => item.path === location.pathname);
  const searchResults = useMemo(
    () =>
      navigation.filter((item) =>
        `${item.title} ${item.description} ${item.eyebrow}`
          .toLocaleLowerCase("pt-BR")
          .includes(query.toLocaleLowerCase("pt-BR")),
      ),
    [query],
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("validapp-architecture-theme", theme);
  }, [theme]);
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("portal-search")?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          type="button"
          className="mobile-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            type="button"
            className="icon-button sidebar-close"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-label">NAVEGAÇÃO</div>
        <nav aria-label="Navegação principal">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-active" : ""}`
              }
            >
              <item.icon size={19} strokeWidth={1.9} />
              <span>{item.title}</span>
              {item.path === "/versoes" && published.length === 0 && (
                <i aria-label="Em breve" />
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-context">
            <span className="context-icon">
              <Activity size={17} />
            </span>
            <div>
              <strong>Documentação viva</strong>
              <small>Atualizada com o projeto</small>
            </div>
          </div>
          <a href={appRepo} target="_blank" rel="noreferrer">
            <Github size={18} /> Repositório do app <ExternalLink size={14} />
          </a>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="icon-button menu-button"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>
            <div className="breadcrumb">
              <span>ValidApp Architecture</span>
              <span className="slash">/</span>
              <strong>{current?.title || "Página"}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="search-wrap">
              <Search size={17} />
              <input
                id="portal-search"
                aria-label="Buscar seções"
                placeholder="Buscar na documentação..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() =>
                  window.setTimeout(() => setSearchOpen(false), 150)
                }
              />
              <kbd>⌘ K</kbd>
              {searchOpen && (
                <div
                  className="search-popover"
                  role="listbox"
                  aria-label="Resultados da busca"
                >
                  {searchResults.length ? (
                    searchResults.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setQuery("");
                          setSearchOpen(false);
                        }}
                      >
                        <item.icon size={17} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                        <ArrowRight size={14} />
                      </Link>
                    ))
                  ) : (
                    <div className="search-empty">Nenhuma seção encontrada</div>
                  )}
                </div>
              )}
            </div>
            <ThemeToggle
              theme={theme}
              onToggle={() =>
                setTheme((previous) => (previous === "dark" ? "light" : "dark"))
              }
            />
            <a
              href={portalRepo}
              className="icon-button github-button"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir repositório do portal"
            >
              <Github size={19} />
            </a>
          </div>
        </header>
        <main
          className={`main-content ${location.pathname === "/" ? "dashboard-content" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Dashboard theme={theme} />} />
            <Route
              path="/arquitetura"
              element={<Architecture theme={theme} />}
            />
            <Route path="/codigo" element={<CodePage />} />
            <Route path="/banco" element={<DatabasePage theme={theme} />} />
            <Route path="/fluxos" element={<DocPage kind="flows" />} />
            <Route path="/seguranca" element={<DocPage kind="security" />} />
            <Route path="/historico" element={<DocPage kind="history" />} />
            <Route path="/versoes" element={<Versions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} ValidApp Architecture</span>
          <span>Feito para tornar o sistema mais claro.</span>
        </footer>
      </div>
    </div>
  );
}
