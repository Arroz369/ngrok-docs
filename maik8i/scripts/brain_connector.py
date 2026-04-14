import os
import json
import time
import requests
import logging
import threading
from datetime import datetime, timezone
from google.cloud import firestore

# Configuração de Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Caminhos T430 (Polo Industrial)
METADATA_PATH = "D:/gnesis-panel/maik8i_metadata.json"
CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', 'consciousness_map.json')

# Carregar Mapa de Consciência
with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    CONTEXTO_GENESIS = json.load(f)

# Inicializar Firestore
db = firestore.Client()

def ler_metadados_reconstrucao():
    """Lê o contexto de reconstrução do Antigravity Local"""
    if os.path.exists(METADATA_PATH):
        try:
            with open(METADATA_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {"status": "Erro ao ler metadados D:"}
    return {"fase": "Reconstrução Pós-Transferência", "soberania": "Recuperando"}

def chamar_ollama(prompt_final):
    """Realiza o handshake com o Ollama local (Llama 3.2)"""
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.2",
        "prompt": prompt_final,
        "stream": False
    }

    try:
        logging.info("Enviando pulso para Ollama...")
        response = requests.post(url, json=payload, timeout=60)
        response.raise_for_status()
        return response.json().get('response', 'Sem resposta do modelo.')
    except Exception as e:
        return f"Erro na conexão com Ollama: {str(e)}"

def on_snapshot(col_snapshot, changes, read_time):
    """Callback para novos comandos no Firestore"""
    metadados = ler_metadados_reconstrucao()

    for change in changes:
        if change.type.name == 'ADDED':
            doc = change.document
            cmd_data = doc.to_dict()
            cmd_id = doc.id

            if cmd_data.get("status") == "Pendente" and cmd_data.get("type") == "despertar_ia":
                logging.info(f"⚡ [ANTIGRAVITY] Comando de Despertar (ID: {cmd_id})")

                # Constrói o prompt com Contexto de Reconstrução
                prompt_contexto = (
                    f"Sua Identidade: {json.dumps(CONTEXTO_GENESIS['identity'])}\n"
                    f"Protocolo: RECONSTRUÇÃO GÊNESIS\n"
                    f"Estado Local D:: {json.dumps(metadados)}\n"
                    f"Mensagem: {cmd_data.get('payload', 'Sincronizar.')}"
                )

                resposta = chamar_ollama(prompt_contexto)

                # Salva o resultado no Firestore
                db.collection("decisions").add({
                    "command_id": cmd_id,
                    "action": "Handshake Antigravity (Ollama)",
                    "suggestion": resposta,
                    "status": "Aguardando Aprovação",
                    "created_at": datetime.now(timezone.utc),
                    "model_used": "llama3.2 (local)",
                    "reconstruction_phase": metadados.get("fase", "Ativa")
                })

                # Atualiza status do comando
                doc.reference.update({
                    "status": "Concluído",
                    "processed_at": datetime.now(timezone.utc)
                })

                logging.info(f"✅ Handshake finalizado para o comando {cmd_id}")

def iniciar_escuta():
    """Inicia o listener de snapshot do Firestore"""
    logging.info("🚀 ANTIGRAVITY Ativo. Aguardando pulso do Gênesis...")
    col_query = db.collection("commands").where("status", "==", "Pendente")
    query_watch = col_query.on_snapshot(on_snapshot)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        query_watch.unsubscribe()
        logging.info("Hibernando...")

if __name__ == "__main__":
    iniciar_escuta()
