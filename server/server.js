const dotenv = require('dotenv');
const app = require('./api/app.js')

//const CreateTable = require('./api/models/createTables.js')

dotenv.config({path: './api/config/.env'});

app.listen(process.env.PORT, () => {
    //CreateTable()
    console.log(`server was started on port: ${process.env.PORT}`);
})