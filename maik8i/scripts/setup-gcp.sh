#!/bin/bash
# Script de Configuração Inicial do Projeto MAIK8I no GCP

PROJECT_ID=$(gcloud config get-value project)

echo "🚀 Iniciando configuração do projeto: $PROJECT_ID"

# 1. Ativar APIs Necessárias
echo "✅ Ativando APIs..."
gcloud services enable \
    cloudfunctions.googleapis.com \
    cloudbuild.googleapis.com \
    firestore.googleapis.com \
    generativelanguage.googleapis.com \
    logging.googleapis.com \
    secretmanager.googleapis.com

# 2. Criar Banco de Dados Firestore (se não existir)
echo "✅ Configurando Firestore..."
gcloud alpha firestore databases create --location=nam5 --type=firestore-native || echo "Firestore já ativo."

# 3. Configurar permissões para a Cloud Function acessar a IA
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='get(projectNumber)')
SERVICE_ACCOUNT="${PROJECT_ID}@appspot.gserviceaccount.com"

echo "✅ Ajustando permissões da conta de serviço..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/datastore.user"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/iam.serviceAccountTokenCreator"

echo "🎯 Configuração Concluída! O terreno está pronto para o deploy."
