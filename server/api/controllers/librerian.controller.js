const db = require('../config/database.js');

exports.createLibrerian = async (req, res) => {
    try{
        const {fcs} = req.body;

        await db.query(
            "INSERT INTO librerian (fcs) VALUES ($1)",
            [ fcs ]
        );
    
        res.status(201).send({
            message: "Librerian added successfuly",
            body: {
                librerian: { fcs }
            }
        });

    }catch(e){

        console.error(e);
        res.status(500).send('failed')

    }
}

exports.fetchLibrerians = async (req, res) => {
    const response = await db.query('SELECT * FROM librerian ORDER BY fcs ASC');
    res.status(200).send(response.rows);
}

exports.deleteLibrerian = async (req, res) => {
    try {
        const {id} = req.params

        await db.query('DELETE FROM librerian WHERE id = $1',
            [ id ]
        );

        res.status(200).send({message: 'Librerian was deleted'});
    }catch(e){
        console.error(e);
        res.status(500).send('failed');
    }
}

