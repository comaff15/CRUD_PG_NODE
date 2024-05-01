const db = require('../config/database.js');

exports.createBook = async(req, res) => {
    try{
        const {theme_id, type_id, publishing_id, storage_id, author, title, publication, pages, amount} = req.body

        for(let i = 0; i < amount; i++){
            await db.query(
                `INSERT INTO book (theme_id, type_id, publishing_id, storage_id, author, title, publication, pages) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [theme_id, type_id, publishing_id, storage_id, author, title, publication, pages]
            )
        }

        res.status(201).send({message: 'books was created'})
    }catch(e){
        console.error(e);
        res.status(500).send('failed');
    }
}

exports.getAllBooks = async(req, res) => {
    const response = await db.query(
        'SELECT id ,theme_id, type_id, publishing_id, storage_id, author, title, to_char(publication, \'DD.MM.YYYY\') AS publication, pages FROM book ORDER BY title ASC'
    )

    res.status(200).send(response.rows);
}

exports.getOneBook = async(req, res) => {
    try{
        const {id} = req.params;

        const response = await db.query(
            `SELECT
                book.*,
                theme.title AS theme,
                type.type,
                publishing.title AS publisher,
                storage.place
             FROM book WHERE id = $1
             JOIN theme ON book.theme_id = theme.id
             JOIN type ON book.type_id = type.id
             JOIN publishing ON book.publishing_id = publishing.id
             JOIN storage ON book.storage_id = storage.id`,
            [id]
        )

        res.status(200).send(response.rows)
    }catch(e){
        console.error(e);
        res.status(500).send('failed')
    }
}   