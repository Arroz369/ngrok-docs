import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const isProduction = /production/i.test(process.env.NODE_ENV || "development");

const config = {
	title: "MAIK8I | Gênesis Painel",
	tagline: "Inteligência Artificial & Automação de Vendas",
	url: "https://maik8i.com.br",
	baseUrl: "/",
	onBrokenAnchors: "warn",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	trailingSlash: true,

	organizationName: "Arroz369",
	projectName: "ngrok-docs",

	i18n: {
		defaultLocale: "pt-BR",
		locales: ["pt-BR"],
	},

	// 🛰️ INJEÇÃO DE SCRIPTS EXTERNOS (Para o Tubo Inox 3D)
	scripts: [
		{
			src: "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",
			type: "module",
		},
	],

	plugins: [
		path.resolve(__dirname, "src/plugins/ngrok-parse-integrations.js"),
		"./src/plugins/tailwindcss",
	],

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					routeBasePath: "docs",
				},
				blog: false,
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		{
			image: "img/docusaurus-social-card.jpg",
			navbar: {
				title: "MAIK8I",
				logo: {
					alt: "MAIK8I Logo",
					src: "img/logo.svg",
				},
				items: [
					{
						type: "docSidebar",
						sidebarId: "docs",
						position: "left",
						label: "Documentação",
					},
					{ to: "/analytics", label: "📊 Analytics", position: "left" },
					{
						href: "https://github.com/Arroz369/ngrok-docs",
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Sistema",
						items: [
							{ label: "Visão Geral", to: "/docs/README" },
							{ label: "Configuração GCP", to: "/docs/maik8i/setup-guide" },
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} MAIK8I Gênesis Engine. Built with Docusaurus.`,
			},
			prism: {
				theme: themes.github,
				darkTheme: themes.dracula,
			},
		},
} satisfies Config;

export default config;
