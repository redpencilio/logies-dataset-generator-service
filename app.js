import { app, query, errorHandler } from 'mu';

app.get('/datasets/:id/subsets', function(req, res) {
  res.send('Hello mu-javascript-template.....');
} );

app.use(errorHandler);
