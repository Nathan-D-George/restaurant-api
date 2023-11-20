require('dotenv').config();
const express    = require('express');
const app        = express();
const { logger } = require('./middleware/logHandler');
const errorHandler = require('./middleware/errorHandler');

app.use(logger);
app.use( express.json())

app.use( express.json() );

const port = process.env.PORT || 5000;

app.use('/',      require( './routes/rootRoutes' ));
app.use('/about', require( './routes/aboutRoutes'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
      res.json({ 'error': '404 Not Found'});
    } else {
      res.type('txt').setDefaultEncoding("404 Not Found");
    }
  }
);

app.use(errorHandler);
app.listen( port, () => console.log(`Server running on http://localhost:${port}`) );
