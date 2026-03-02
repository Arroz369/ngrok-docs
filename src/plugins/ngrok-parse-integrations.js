const fs = require("fs");
const path = require("path");
const utils = require("@docusaurus/utils");

module.exports = function (context, options) {
	return {
		name: "ngrok-parse-integrations",
		async contentLoaded({ actions }) {
			const { setGlobalData } = actions;
			const integrationsDir = path.join(
				context.siteDir,
				"docs",
				"integrations",
			);
			const integrations = [];

			// Verificação de Segurança: Se a pasta não existir, aborta suavemente
			if (!fs.existsSync(integrationsDir)) {
				console.warn(
					"⚠️ [MAIK8I/Jules]: Pasta de integrações não encontrada. Pulando...",
				);
				setGlobalData([]);
				return;
			}

			try {
				const dir = await fs.promises.opendir(integrationsDir);
				for await (const dirent of dir) {
					const integrationDir = path.join(integrationsDir, dirent.name);
					const stats = fs.lstatSync(integrationDir);

					if (stats.isFile()) continue;

					const integration = {
						name: dirent.name,
						path: path.join(
							context.siteConfig.baseUrl,
							"integrations",
							dirent.name,
						),
						docs: [],
					};

					const files = fs.readdirSync(integrationDir);
					await Promise.all(
						files.map(async (x) => {
							const filePath = path.join(integrationDir, x);
							if (
								!fs.lstatSync(filePath).isFile() ||
								(!x.endsWith(".md") && !x.endsWith(".mdx"))
							)
								return;

							const fileContent = fs.readFileSync(filePath).toString();
							const fileMarkdown = await utils.parseMarkdownFile({
								filePath,
								fileContent,
								parseFrontMatter: utils.DEFAULT_PARSE_FRONT_MATTER,
							});

							if (x === "index.mdx" || x === "index.md") {
								integration.metadata = fileMarkdown.frontMatter;
							} else {
								integration.docs.push({
									path: path.join(integration.path, utils.fileToPath(x)),
									...fileMarkdown,
								});
							}
						}),
					);
					integrations.push(integration);
				}
				setGlobalData(
					integrations.sort((a, b) => a.name.localeCompare(b.name)),
				);
			} catch (err) {
				console.error("❌ Erro ao processar integrações:", err);
				setGlobalData([]);
			}
		},
	};
};
