#!/bin/bash
# Script de Deploy das Cloud Functions do MAIK8I

echo "📦 Iniciando Deploy da função analyze-sheet..."

# Garantir que o script mude para a pasta correta, independente de onde for chamado
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/../functions/analyze-sheet"

# Fazer o deploy para o GCP (Trigger HTTP)
gcloud functions deploy analyze-sheet \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=analyze_sheet \
    --trigger-http \
    --allow-unauthenticated \
    --set-env-vars=GEMINI_API_KEY=SUA_CHAVE_AQUI

echo "✅ Deploy finalizado com sucesso!"
