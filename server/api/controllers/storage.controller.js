const db = require('../config/database.js');

exports.createStorage = async(req, res) => {
    try{
        const {place} = req.body;

        await db.query('INSERT INTO storage (place) VALUES ($1)',
            [place]
        )

        res.status(201).send({
            message: 'place added successufly',
            body: {
                storage: {place}
            }
        })
    }catch(e){
        console.error(e);
        res.status(500).send('failed');
    }
}

exports.fetchStorage = async(req, res) => {
    const responce = await db.query('SELECT * FROM storage ORDER BY place ASC')
    res.status(200).send(responce.rows);
}

exports.deleteStroage = async(req, res) => {
    try{
        const {id} = req.params

        await db.query('DELETE FROM storage WHERE id = $1',
            [id]
        )

        res.status(200).send('storage was deleted');
    }catch(e){
        console.error(e);
        res.status(500).send({message: 'failed'})
    }
}
