function doGet(e) {
  const url = e.parameter.url;

  if (!url) {
    return ContentService.createTextOutput("Missing URL parameter").setMimeType(ContentService.MimeType.TEXT);
  }

  const scrapedData = scrapeWebsite(url);
  if (!scrapedData) {
    return ContentService.createTextOutput("Error scraping data").setMimeType(ContentService.MimeType.TEXT);
  }

  const transformedData = transformData(scrapedData);
  loadData(transformedData);
  
  return ContentService.createTextOutput(JSON.stringify(transformedData)).setMimeType(ContentService.MimeType.JSON);
}

function scrapeWebsite(url) {
  try {
    const response = UrlFetchApp.fetch(url);
    const html = response.getContentText();
    return parseHtml(html);
  } catch (error) {
    Logger.log("Error fetching the URL: " + error.message);
    return null;
  }
}

function transformData(data) {
  // Return data as is without transforming to uppercase
  return data; 
}

function loadData(data) {
  const spreadsheetId = '1ikTxwtaQ9-cohbYrTL9GMBz1j1G0vBnasrYab_yHDk4'; // Replace with your actual spreadsheet ID
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  sheet.clear();

  data.forEach((item, index) => {
    if (item.length > 50000) {
      const chunks = item.match(/.{1,50000}/g);
      chunks.forEach((chunk, chunkIndex) => {
        sheet.getRange(index + 1 + chunkIndex, 1).setValue(chunk);
      });
    } else {
      sheet.getRange(index + 1, 1).setValue(item);
    }
  });
  Logger.log("Data loaded successfully.");
}

function parseHtml(html) {
  const data = [];
  // Add your HTML parsing logic here
  const regex = /<your-regex-pattern>/g; // Example regex, adjust as needed
  let match;
  while ((match = regex.exec(html)) !== null) {
    data.push(match[1]); // Adjust based on your regex
  }
  return data;
}
