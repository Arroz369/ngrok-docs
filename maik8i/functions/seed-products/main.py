import logging
import functions_framework
from google.cloud import firestore

# Configuração
logging.basicConfig(level=logging.INFO)
db = firestore.Client()

@functions_framework.http
def seed_products(request):
    """
    Recebe uma lista de produtos via POST e os salva na coleção 'produtos_vitrine'.
    """
    if request.method != 'POST':
        return 'Método não permitido. Use POST.', 405

    try:
        request_json = request.get_json(silent=True)
        if not request_json or 'products' not in request_json:
            return 'Formato inválido. Esperado JSON com chave "products".', 400

        products = request_json['products']
        if not isinstance(products, list):
            return '"products" deve ser uma lista.', 400

        batch = db.batch()
        collection_ref = db.collection("produtos_vitrine")

        for product in products:
            doc_id = str(product.get('id')) if product.get('id') else None
            if doc_id:
                doc_ref = collection_ref.document(doc_id)
            else:
                doc_ref = collection_ref.document()

            # Mapeamento baseado nas colunas da planilha Gênesis
            data = {
                "name": product.get("name"),
                "link": product.get("link"),
                "price": product.get("price"),
                "hook": product.get("hook", ""),
                "script": product.get("script", ""),
                "status": product.get("status", "Pendente"),
                "updated_at": firestore.SERVER_TIMESTAMP
            }
            # Remove campos None para não poluir o Firestore
            data = {k: v for k, v in data.items() if v is not None}

            batch.set(doc_ref, data, merge=True)

        batch.commit()
        return f'✅ {len(products)} produtos processados com sucesso.', 200

    except Exception as e:
        logging.exception("Erro ao processar seed-products")
        return f'Erro interno: {str(e)}', 500
