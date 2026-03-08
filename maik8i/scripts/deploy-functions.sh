#!/bin/bash
# Script de Deploy das Cloud Functions do MAIK8I

echo "📦 Iniciando Deploy da função analyze-sheet..."

# Garantir que o script mude para a pasta correta, independente de onde for chamado
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/../functions/analyze-sheet"

# Fazer o deploy para o GCP (Trigger HTTP)
# Nota: Usamos --allow-unauthenticated para facilitar a integração com Apps Script,
# mas protegemos a aplicação com X-API-KEY no header.
gcloud functions deploy analyze-sheet \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=analyze_sheet \
    --trigger-http \
    --allow-unauthenticated \
    --set-env-vars=GEMINI_API_KEY=SUA_CHAVE_AQUI,MAIK8I_API_KEY=maik8i-secure-token-2026

echo "📦 Iniciando Deploy da função seed-products..."
cd "$SCRIPT_DIR/../functions/seed-products"

gcloud functions deploy seed-products \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=seed_products \
    --trigger-http \
    --allow-unauthenticated \
    --set-env-vars=MAIK8I_API_KEY=maik8i-secure-token-2026

echo "✅ Deploy finalizado com sucesso!"
