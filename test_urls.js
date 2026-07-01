const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541462608141-2f52c934f1df?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=1200&q=80'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`URL: ${url} -> Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`URL: ${url} -> Error: ${err.message}`);
  });
});
