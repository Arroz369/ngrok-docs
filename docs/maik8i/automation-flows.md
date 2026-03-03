---
id: automation-flows
title: 🔄 Fluxos de Automação
sidebar_label: Fluxos de Trabalho
---

# Fluxos de Automação de Vendas

Este documento descreve como o **MAIK8I** orquestra o movimento de dados entre as plataformas para maximizar a eficiência da **Prime Store**.

---

## 1. Fluxo de Curadoria (Planilha ➔ IA)

Este é o fluxo primário de entrada de dados, focado em transformar links brutos em material de marketing.



1.  **Entrada:** Um novo link do Mercado Livre é inserido na Planilha Gênesis.
2.  **Trigger:** O Apps Script detecta a nova linha e injeta o objeto no Firestore.
3.  **Análise:** A Cloud Function `analyze-sheet` é acionada.
4.  **Enriquecimento:** O Gemini gera:
    * Hook de 15s para Reels/TikTok.
    * Legenda com gatilhos mentais.
    * Sugestão de preço (Markup dinâmico).

---

## 2. Fluxo de Publicação (Aprovação ➔ Redes Sociais)

Nenhuma ação é tomada sem o seu comando direto (Conformidade com a diretriz [12] do sistema).

1.  **Notificação:** O painel sinaliza "Nova Decisão Pendente".
2.  **Revisão:** O Comandante visualiza a sugestão da IA no painel.
3.  **Execução:** Ao clicar em "Aprovar", o sistema dispara:
    * Envio para o Canal de Ofertas (WhatsApp/Telegram).
    * Geração de rascunho de postagem.

---

## 3. Monitoramento de Estoque e Preços

O sistema realiza varreduras periódicas para garantir que os links da Prime Store nunca apontem para produtos pausados.

| Gatilho | Ação do MAIK8I | Prioridade |
| :--- | :--- | :--- |
| **Produto Pausado** | Move o ID para 'Inativo' e oculta do painel. | 🚨 ALTA |
| **Mudança de Preço** | Recalcula o ROI e sugere ajuste no anúncio. | ⚠️ MÉDIA |
| **Nova Tendência** | Alerta sobre produtos similares em alta. | ✅ BAIXA |

---

## 🛠️ Ferramentas Integradas

* **Google Sheets API:** Interface de entrada de dados.
* **Firestore:** Memória de curto e longo prazo (Estado do sistema).
* **Webhook Gateway:** Ponte para notificações externas.

:::info Observação Técnica
O fluxo de automação é **Assíncrono**. Isso significa que o sistema não trava enquanto a IA "pensa"; ele processa em segundo plano e te avisa quando o resultado está pronto.
:::
