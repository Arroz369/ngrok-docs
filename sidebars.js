/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: '🚀 Início: Gênesis Painel',
      items: ['index'],
    },
    {
      type: 'category',
      label: '🧠 Inteligência MAIK8I',
      collapsed: false,
      items: [
        'maik8i/gemini-integration',
        'maik8i/automation-flows',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Infraestrutura GCP',
      items: [
        'maik8i/setup-guide',
      ],
    },
    {
      type: 'category',
      label: '📊 Gestão PRIME STORE',
      items: [
        'faq/faq',
      ],
    },
  ],
};

module.exports = sidebars;
