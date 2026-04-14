import os
import logging
from datetime import datetime, timezone

import functions_framework
from google.cloud import firestore

# Configuração
logging.basicConfig(level=logging.INFO)
db = firestore.Client()
API_KEY = os.environ.get("MAIK8I_API_KEY")

@functions_framework.http
def trigger_ia(request):
    """
    Recebe um sinal do site e enfileira um comando para o script local no T430.
    """
    # Validação de Segurança
    if request.headers.get("X-API-KEY") != API_KEY:
        logging.warning("Tentativa de acesso não autorizado ao Trigger IA.")
        return 'Não autorizado.', 401

    try:
        # Cria o comando de despertar no Firestore
        command_ref = db.collection("commands").add({
            "type": "despertar_ia",
            "status": "Pendente",
            "created_at": datetime.now(timezone.utc),
            "payload": "Solicitação de sincronização via Painel Administrativo Gênesis."
        })

        logging.info(f"Comando de despertar enfileirado com sucesso: {command_ref[1].id}")
        return f"Sinal enviado! O T430 foi notificado (ID: {command_ref[1].id})", 200

    except Exception as e:
        logging.exception("Erro ao enfileirar comando de IA")
        return f"Erro ao despertar a IA: {str(e)}", 500
