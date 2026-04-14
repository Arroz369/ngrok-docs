/**
 * MAIK8I - Sincronizador Gênesis Engine
 * Este script deve ser colado no Editor de Apps Script da sua Planilha Google.
 * Ele envia os produtos para a Cloud Function seed-products e gera diagnósticos.
 */

const PROJECT_ID = "maik8i-genesis"; // Ajuste para o seu ID do GCP
const CLOUD_FUNCTION_URL = `https://us-central1-${PROJECT_ID}.cloudfunctions.net/seed-products`;
const API_KEY = "SUA_CHAVE_AQUI";

/**
 * 🔒 INSTRUÇÃO DE SEGURANÇA:
 * Para funcionar com '--no-allow-unauthenticated', você deve adicionar o email
 * do proprietário da planilha como 'Cloud Functions Invoker' no console do GCP.
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 MAIK8I')
      .addItem('Sincronizar com Firestore', 'syncToFirestore')
      .addItem('Diagnóstico Jules (Antigravity)', 'comandoJulesRelatorio')
      .addToUi();
}

/**
 * DIAGNÓSTICO JULES - RELATÓRIO DE RECONSTRUÇÃO
 */
function comandoJulesRelatorio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("500produtos") || ss.getSheetByName("500 produtos") || ss.getSheets()[0];

  let status = {
    planilha: sheet ? "Detectada: " + sheet.getName() : "NÃO ENCONTRADA",
    linhas_dados: sheet ? sheet.getLastRow() : 0,
    firebase: testarConexaoFirebase() ? "Conectado" : "Falha na Autenticação",
    timestamp: new Date().toLocaleString(),
    fase: "Reconstrução Pós-Transferência"
  };

  console.log("--- RELATÓRIO JULES/ANTIGRAVITY ---");
  console.log(JSON.stringify(status, null, 2));

  // Salva o log para o Antigravity local ler depois
  PropertiesService.getScriptProperties().setProperty("ULTIMO_RELATORIO", JSON.stringify(status));

  if (SpreadsheetApp.getUi) {
    SpreadsheetApp.getUi().alert('Relatório Jules Gerado!\nStatus Firebase: ' + status.firebase);
  }

  return status;
}

function testarConexaoFirebase() {
  // Tenta um handshake simples com a Cloud Function
  try {
    const options = {
      method: 'post',
      headers: { 'X-API-KEY': API_KEY },
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(CLOUD_FUNCTION_URL + "?test=1", options);
    return response.getResponseCode() !== 401;
  } catch (e) {
    return false;
  }
}

function syncToFirestore() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('500 produtos') || ss.getSheetByName('500produtos') || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  // Pula o cabeçalho
  const rows = data.slice(1);

  const products = rows.map(row => {
    return {
      id: row[0],
      name: row[1],
      link: row[2],
      price: row[3],
      hook: row[4],
      script: row[5],
      status: row[6] || 'Pendente'
    };
  }).filter(p => p.name);

  const payload = JSON.stringify({ products: products });

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + ScriptApp.getIdentityToken(),
      'X-API-KEY': API_KEY
    },
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
