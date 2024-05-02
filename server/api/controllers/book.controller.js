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

exports.getBooks = async(req, res) => {
    try{
        const response = await db.query(
            `SELECT
                book.id,
                book.author,
                book.title,
                to_char(book.publication, \'DD.MM.YYYY\') AS publication,
                theme.title AS theme,
                type.type,
                publishing.title AS publisher,
                storage.place
            FROM book
                LEFT JOIN theme ON book.theme_id = theme.id
                LEFT JOIN type ON book.type_id = type.id
                LEFT JOIN publishing ON book.publishing_id = publishing.id
                LEFT JOIN storage ON book.storage_id = storage.id`, 
        )
        res.status(200).send(response.rows)
    }catch(e){
        console.error(e);
        res.status(500).send('failed')
    }
}

exports.serchBooks = async(req, res) => {
    try{
        const {author, theme, type, title} = req.query

        const response = await db.query(
            `   SELECT 
                    book.id,
                    book.author,
                    book.title,
                    to_char(book.publication, \'DD.MM.YYYY\') AS publication,
                    theme.title AS theme,
                    type.type,
                    publishing.title AS publisher,
                    storage.place
                FROM book
                    LEFT JOIN theme ON book.theme_id = theme.id
                    LEFT JOIN type ON book.type_id = type.id
                    LEFT JOIN publishing ON book.publishing_id = publishing.id
                    LEFT JOIN storage ON book.storage_id = storage.id
                WHERE
                LOWER(book.author) LIKE LOWER('%'|| $1 ||'%')
                OR LOWER(theme.title) LIKE LOWER('%'|| $2 ||'%')
                OR LOWER(type.type) LIKE LOWER('%'|| $3 ||'%')
                OR LOWER(book.title) LIKE LOWER('%'|| $4 ||'%');
            `,[author, theme, type, title]
        )

        if(response.rows.length === 0) {
            res.status(404).send('cant found nothing');
        }
        res.status(200).send(response.rows)
    }catch(e){
        console.log(e);
        res.status(500).send('failed')
    }
}

exports.deleteBooks = async(req, res) => {
    
}