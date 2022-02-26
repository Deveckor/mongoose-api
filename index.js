const express = require('express');
const app = express();
const port = 8080;
const modKoders = require('./routers/koders');
const koderRoutes = modKoders.router;
const connection = modKoders.connect;





app.listen(port, async (req, res) => {
        await connection();
        console.log(`Server listening in port ${port}`);
})








app.use(express.json());
app.use('/koders', koderRoutes);


    

