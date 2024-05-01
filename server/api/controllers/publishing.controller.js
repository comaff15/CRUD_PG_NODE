const db = require('../config/database.js');

exports.createPublishing = async(req, res) => {
    try{
        const {title, city} = req.body

        await db.query(
            'INSERT INTO publishing (title, city) VALUES ($1, $2)',
            [title, city]
        );

        res.status(201).send({
            message: 'publishing was created',
            body: {
                publishing: {
                    title: title,
                    city: city
                }
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send('failed');
    }
}

exports.fetchPublishings = async(req, res) => {
    const response = await db.query(
        'SELECT * FROM publishing ORDER BY title ASC'
    )
    res.status(200).send(response.rows);
}

exports.deletePublishing = async(req, res) => {
    try{
        const {id} = req.params

        await db.query('DELETE FROM publishing WHERE id = $1',
            [ id ]
        );

        res.status(201).send({message: 'Publishing was deleted'});
    }catch(e){
        console.error(e);
        res.status(500).send('failed')
    }
}