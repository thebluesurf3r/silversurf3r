function parseHtml(html) {
  const data = []; // Array to hold extracted data

  // Regex patterns for various common HTML elements
  const patterns = [
    /<h1>(.*?)<\/h1>/g, // Capture <h1> tags
    /<h2>(.*?)<\/h2>/g, // Capture <h2> tags
    /<h3>(.*?)<\/h3>/g, // Capture <h3> tags
    /<h4>(.*?)<\/h4>/g, // Capture <h4> tags
    /<h5>(.*?)<\/h5>/g, // Capture <h5> tags
    /<h6>(.*?)<\/h6>/g, // Capture <h6> tags
    /<p>(.*?)<\/p>/g,   // Capture <p> tags
    /<a[^>]*>(.*?)<\/a>/g, // Capture <a> tags (with any attributes)
    /<li>(.*?)<\/li>/g, // Capture <li> tags
    /<blockquote>(.*?)<\/blockquote>/g, // Capture <blockquote> tags
    /<strong>(.*?)<\/strong>/g, // Capture <strong> tags
    /<em>(.*?)<\/em>/g, // Capture <em> tags
    /<span>(.*?)<\/span>/g, // Capture <span> tags
    /<div>(.*?)<\/div>/g, // Capture <div> tags
    /<table>(.*?)<\/table>/g, // Capture <table> tags (note: this captures the entire table)
    /<tr>(.*?)<\/tr>/g, // Capture <tr> tags
    /<td>(.*?)<\/td>/g, // Capture <td> tags
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const extractedValue = match[1]; // Capture the text inside the tags
      data.push(extractedValue);
      Logger.log("Extracted Value: " + extractedValue); // Log the extracted value
    }
  });

  return data;
}