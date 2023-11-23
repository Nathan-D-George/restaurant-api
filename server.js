require('dotenv').config();
const mongoose   = require('mongoose');
const path       = require('path');
const express    = require('express');
const app        = express();
const { logger } = require(  './middleware/logHandler'  );
const errorHandler = require('./middleware/errorHandler');
const verifyJWT  = require(  './middleware/verifyJWT'   );
const connectDB  = require(  './config/dbConnection'    );


const port = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use( express.json() ); 

app.use(cookieParser);

app.use('/',      require( './routes/rootRoutes' ));
app.use('/about', require( './routes/aboutRoutes'));
app.use('/meals', require( './routes/mealRoutes' ));
app.use(verifyJWT);
app.use('/users', require( './routes/userRoutes' ));


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

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen( port, () => console.log(`Server running on http://localhost:${port}`) );
  }
);