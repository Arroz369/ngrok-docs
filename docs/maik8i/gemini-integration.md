---
title: 🧠 Integração Gemini AI
sidebar_label: Inteligência Gemini
---

# Integração com Gemini 1.5 Flash

O **MAIK8I** utiliza o modelo `gemini-1.5-flash` para processar dados de produtos em tempo real e gerar estratégias de marketing automatizadas. Esta integração é o núcleo de inteligência que transforma links do Mercado Livre em conteúdo de venda.

---

## 🛠️ Arquitetura do Fluxo de Dados

A inteligência opera em quatro camadas distintas:

1.  **Ingestão:** O sistema detecta novos registros na coleção `products` do Firestore (via Planilha ou API).
2.  **Processamento:** A Cloud Function `analyze-sheet` é disparada via gatilho HTTP/Eventarc.
3.  **Inferência:** O prompt estruturado é enviado ao Gemini 1.5 Flash, contendo o contexto do produto e a persona da **Prime Store**.
4.  **Ação:** O retorno da IA é salvo na coleção `decisions`, aguardando a aprovação do Comandante para publicação.

---

## 📝 Estrutura do Prompt (O "Motor")

Para garantir ganchos (Hooks) de alta conversão, o MAIK8I utiliza a técnica de **Chain-of-Thought**. O prompt enviado à IA segue este modelo:

> "Você é o especialista de marketing da Prime Store. Analise o produto [NOME] do link [URL]. Gere um Hook de 15 segundos para Reels focado em curiosidade e escassez. Use uma linguagem dinâmica e direta."

---

## ⚙️ Configuração de Parâmetros

Para manter a consistência, utilizamos os seguintes hiperparâmetros na API:

| Parâmetro | Valor | Descrição |
| :--- | :--- | :--- |
| **Temperature** | 0.7 | Equilíbrio entre criatividade e precisão técnica. |
| **TopP** | 0.95 | Garante diversidade no vocabulário de vendas. |
| **Max Output Tokens** | 1024 | Suficiente para roteiros e descrições detalhadas. |

---

## 🔐 Segurança e Custos

* **Chaves de API:** Gerenciadas via `Secret Manager` do GCP para evitar vazamentos no código.
* **Tier Gratuito:** O sistema é otimizado para rodar dentro das 1.500 requisições gratuitas mensais do Google, garantindo custo zero na fase de validação.

---

:::tip Dica do Comandante
Sempre que o desempenho de um Hook for baixo, ajuste a `Temperature` no arquivo `main.py` para valores mais baixos (0.4) para obter textos mais diretos e técnicos.
:::
