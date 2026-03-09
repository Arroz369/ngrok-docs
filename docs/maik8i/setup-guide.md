---
id: setup-guide
title: 🚀 Guia de Configuração (Setup)
sidebar_label: Guia de Setup
---

# Guia de Configuração do MAIK8I

Este guia descreve os passos necessários para implantar o sistema **MAIK8I** do zero no seu ambiente Google Cloud Platform (GCP).

---

## 📋 Pré-requisitos

1.  Uma conta ativa no **Google Cloud Platform**.
2.  O utilitário **gcloud CLI** instalado e autenticado.
3.  Uma chave de API do **Google Gemini** (obtida no Google AI Studio).

---

## 🛠️ Passo 1: Configuração do Projeto GCP

O MAIK8I automatiza a ativação de APIs e a criação do banco de dados. Execute o script de setup:

```bash
# Navegue até a pasta de scripts
cd maik8i/scripts

# Dê permissão de execução
chmod +x setup-gcp.sh

# Execute o setup
./setup-gcp.sh
```

**O que este script faz:**
*   Ativa as APIs de Cloud Functions, Firestore, Gemini e Secret Manager.
*   Cria o banco de dados Firestore no modo Nativo.
*   Configura as permissões de IAM para a conta de serviço.

---

## 📦 Passo 2: Implantação da Cloud Function

Com o ambiente pronto, envie o código da função de análise para a nuvem:

1.  Abra o arquivo `maik8i/scripts/deploy-functions.sh`.
2.  Substitua `SUA_CHAVE_AQUI` pela sua **GEMINI_API_KEY**.
3.  Execute o deploy:

```bash
./deploy-functions.sh
```

---

## 🔐 Passo 3: Regras de Segurança do Firestore

Para garantir que seus dados fiquem protegidos:

1.  Acesse o **Console do Firebase** > Firestore Database.
2.  Vá na aba **Rules**.
3.  Copie o conteúdo de `maik8i/config/firestore.rules` e cole no console.
4.  Clique em **Publish**.

---

## ✅ Passo 4: Validação

Para testar se tudo está funcionando:
1.  Insira um documento na coleção `produtos_vitrine` do Firestore com o campo `status: "Pendente"`.
2.  Aguarde alguns segundos e verifique a coleção `decisions` para ver o insight gerado pela IA.
3.  O status do produto deve mudar para `Processado`.

:::tip Dica
Você pode monitorar os logs em tempo real através do Cloud Logging no console do GCP para depurar qualquer erro de execução.
:::
