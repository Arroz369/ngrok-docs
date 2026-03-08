import os
import logging
from datetime import datetime, timezone

import functions_framework
from google.cloud import firestore
import google.generativeai as genai

# Configuração
logging.basicConfig(level=logging.INFO)
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
db = firestore.Client()

BATCH_LIMIT = 50  # Evita timeout por excesso de produtos

@functions_framework.http
def analyze_sheet(request):
    """
    Analisa produtos com status 'Pendente' no Firestore,
    gera hooks de venda via Gemini e registra para aprovação.
    """
    try:
        # Busca produtos pendentes com limite de segurança
        products_ref = (
            db.collection("produtos_vitrine")
            .where("status", "==", "Pendente")
            .limit(BATCH_LIMIT)
            .stream()
        )

        docs = list(products_ref)

        if not docs:
            return "Nenhum produto pendente encontrado.", 200

        model = genai.GenerativeModel("gemini-1.5-flash")
        processed = 0
        errors = []

        for doc in docs:
            try:
                data = doc.to_dict()
                product_name = data.get("name", "").strip()

                if not product_name:
                    logging.warning(f"Produto {doc.id} sem nome. Pulando.")
                    continue

                # Prompt estruturado para melhor resultado
                prompt = (
                    f"Você é um copywriter especialista em marketing digital.\n"
                    f"Crie um hook de venda de 15 segundos para o produto: '{product_name}'.\n"
                    f"Formato: direto, impactante, focado em Reels do Instagram.\n"
                    f"Responda apenas com o hook, sem explicações adicionais."
                )

                response = model.generate_content(prompt)

                # Salva a decisão com metadados completos
                db.collection("decisions").add({
                    "product_id": doc.id,
                    "product_name": product_name,
                    "action": "Geração de Conteúdo",
                    "suggestion": response.text.strip(),
                    "status": "Aguardando Aprovação",
                    "created_at": datetime.now(timezone.utc),
                    "model_used": "gemini-1.5-flash",
                })

                # Atualiza status do produto para evitar reprocessamento
                doc.reference.update({"status": "Processado"})

                processed += 1
                logging.info(f"Produto '{product_name}' processado com sucesso.")

            except Exception as e:
                error_msg = f"Erro no produto {doc.id}: {str(e)}"
                logging.error(error_msg)
                errors.append(error_msg)
                continue  # Não para tudo por causa de 1 produto

        summary = f"✅ {processed} produto(s) processado(s)."
        if errors:
            summary += f" ⚠️ {len(errors)} erro(s): {'; '.join(errors)}"

        return summary, 200

    except Exception as e:
        logging.exception("Erro crítico na função analyze_sheet")
        return f"Erro crítico na missão: {str(e)}", 500
