const db = require('../config/database.js');

exports.createType = async(req, res) => {
    try{
        const {type} = req.body

        await db.query(
            "INSERT INTO type (type) VALUES ($1)",
            [ type ]
        )

        res.status(201).send({
            message: 'type added successufly',
            body: {
                type: {type}
            }
        })
    }catch(e){
        console.error(e)
        res.status(500).send('failed')
    }
}

exports.fetchTypes = async(req, res) => {
    const response = await db.query('SELECT * FROM type ORDER BY type ASC')
    res.status(200).send(response.rows);
}

exports.deleteType = async(req, res) => {
    try{
        const {id} = req.params

        await db.query('DELETE FROM type WHERE id = $1',
            [id]
        );
    
        res.status(200).send({message: 'type was deleted'})
    }catch(e){
        console.error(e)
        res.status(500).send('failed');
    }
}