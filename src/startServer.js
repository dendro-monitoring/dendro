const startServer = () => {
  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');
  const path = require('path');

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev, dir: path.resolve(__dirname, '..') });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        app.render(req, res, '/b', query);
      } else {
        handle(req, res, parsedUrl);
      }
    }).listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });
};

module.exports = startServer;
