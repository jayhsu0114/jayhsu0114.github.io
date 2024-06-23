const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// 設置 Google Sheets API 相關信息
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = '1-qFc-yhG2Bm4VZb37tDFRBWqbxCRkfdR2-tPnr1wtKg'; // 試算表ID
const RANGE = '身份資訊庫!A:B'; // 工作表名稱和範圍

// 載入並設置客戶端憑證
async function authorize() {
  const auth = new GoogleAuth({
    scopes: SCOPES,
    keyFile: 'credentials.json', // 設置你的OAuth 2.0 憑證
  });
  const client = await auth.getClient();
  return client;
}

// 從 Google Sheets 加載數據
async function getDataFromSheets() {
  const client = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (rows.length) {
      // 此處處理從試算表獲得的數據
      rows.forEach(row => {
        const username = row[0]; // 第一列是用戶名
        const password = row[1]; // 第二列是密碼
        console.log(`Username: ${username}, Password: ${password}`);
        // 在這裡可以進行你的登入驗證邏輯，比如比對用戶輸入的用戶名和密碼
      });
    } else {
      console.log('No data found.');
    }
  } catch (err) {
    console.error('The API returned an error:', err);
  }
}

// 調用函數加載數據
getDataFromSheets();
