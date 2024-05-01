const db = require('../config/database.js');

exports.createTheme = async(req, res) => {
    try{
        const {title} = req.body

        await db.query(
            'INSERT INTO theme (title) VALUES ($1)',
            [ title ]
        )

        res.status(201).send({
            message: 'theme added successufly',
            body: {
                theme: {title}
            }
        })
    }catch(e){
        console.error(e)
        res.status(500).send('failed')
    }
}

exports.fetchTheme = async(req, res) => {
    const response = await db.query('SELECT * FROM theme ORDER BY theme ASC');
    res.status(200).send(response.rows);
}

exports.deleteTheme = async(req, res) => {
    try{
        const {id} = req.params

        await db.query(
            'DELETE FROM theme WHERE id = $1',
            [ id ]
        );

        res.status(200).send({message: 'theme was deleted'})
    }catch(e){
        console.log(e);
        res.status(500).send('failed');
    }
}