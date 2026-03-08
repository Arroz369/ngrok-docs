/**
 * MAIK8I - Sincronizador Gênesis Engine
 * Este script deve ser colado no Editor de Apps Script da sua Planilha Google.
 * Ele envia os produtos da aba '500 produtos' para a Cloud Function seed-products.
 */

const CLOUD_FUNCTION_URL = "https://us-central1-SEU_PROJETO.cloudfunctions.net/seed-products";

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 MAIK8I')
      .addItem('Sincronizar com Firestore', 'syncToFirestore')
      .addToUi();
}

function syncToFirestore() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('500 produtos') || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  // Pula o cabeçalho
  const headers = data[0];
  const rows = data.slice(1);

  const products = rows.map(row => {
    return {
      id: row[0],
      name: row[1],
      link: row[2],
      price: row[3],
      status: row[6] || 'Pendente'
    };
  }).filter(p => p.name); // Remove linhas vazias

  const payload = JSON.stringify({ products: products });

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(CLOUD_FUNCTION_URL, options);
    const result = response.getContentText();

    if (response.getResponseCode() == 200) {
      SpreadsheetApp.getUi().alert('✅ Sucesso: ' + result);
    } else {
      SpreadsheetApp.getUi().alert('❌ Erro (' + response.getResponseCode() + '): ' + result);
    }
  } catch (e) {
    SpreadsheetApp.getUi().alert('❌ Erro de Conexão: ' + e.toString());
  }
}
