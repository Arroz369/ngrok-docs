# Quickstart MAIK8I

Guia para rodar o sistema em 10-15 minutos.

## Passo 1: Configuração do GCP
Execute o script de setup para ativar as APIs e criar o banco de dados.
```bash
./scripts/setup-gcp.sh
```

## Passo 2: Configurar Variáveis
Copie o arquivo `.env.example` para `.env` e adicione sua chave da API Gemini.

## Passo 3: Deploy das Funções
Faça o deploy da Cloud Function `analyze-sheet`.
```bash
./scripts/deploy-functions.sh
```

## Passo 4: Firestore
Aplique as regras de segurança localizadas em `config/firestore.rules` via console do Firebase.

## Conclusão
Seu assistente agora está monitorando a coleção `products` no Firestore!
