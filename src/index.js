const express = require('express');
const app = express();
//settings of server
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(express.json());//formato de envio de datos
//Routes
app.use(require('./routes/employees'));
//starting server
app.listen(app.get('port'), () =>{
    console.log("Server on port:",app.get('port'));
});