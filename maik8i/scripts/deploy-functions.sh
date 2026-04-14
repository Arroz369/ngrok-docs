#!/bin/bash
# Script de Deploy das Cloud Functions do MAIK8I

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAIK8I_API_KEY="${MAIK8I_API_KEY:-SUA_CHAVE_AQUI}"

echo "📦 Iniciando Deploy da função analyze-sheet..."
cd "$SCRIPT_DIR/../functions/analyze-sheet"
gcloud functions deploy analyze-sheet \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=analyze_sheet \
    --trigger-http \
    --no-allow-unauthenticated \
    --set-env-vars=GEMINI_API_KEY=SUA_CHAVE_AQUI,MAIK8I_API_KEY=$MAIK8I_API_KEY

echo "📦 Iniciando Deploy da função seed-products..."
cd "$SCRIPT_DIR/../functions/seed-products"
gcloud functions deploy seed-products \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=seed_products \
    --trigger-http \
    --no-allow-unauthenticated \
    --set-env-vars=MAIK8I_API_KEY=$MAIK8I_API_KEY

echo "📦 Iniciando Deploy da função trigger-ia..."
cd "$SCRIPT_DIR/../functions/trigger-ia"
gcloud functions deploy trigger-ia \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=trigger_ia \
    --trigger-http \
    --no-allow-unauthenticated \
    --set-env-vars=MAIK8I_API_KEY=$MAIK8I_API_KEY

echo "✅ Deploy finalizado com sucesso!"
