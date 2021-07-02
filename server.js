const express = require("express");
const { renderToString } = require("react-dom/server");
const fs = require('fs');
const path = require('path');

let routes = fs.readdirSync('./public/routes');
routes = routes.filter(e => e.endsWith('.js'));
routes = routes.map(e => '/' + e.slice(0, -3));

const app = express();

app.use(express.static("public"));
routes.forEach(route => {
  app.get(route, (req, res) => {
    const fileName = req.path;
    if (!routes.find(e => e === fileName)) return '';
    const filePath = path.join(__dirname, './public/routes', fileName + '.js');
    const module = require(filePath);
    const moduleName = fileName.slice(1);
    // const Component = module.default(); // webpack 5
    const Component = module[moduleName](); // webpack 4
    const content = renderToString(Component);
    console.log('content', content.length, content);

    const html = `
      <html>
        <head></head>
        <body>
          <div id="root">${content}</div>
        </body>
      </html>
    `;

    res.send(html);
  });
});

app.listen(8001, () => {
  console.log("listening on port 8001");
});
