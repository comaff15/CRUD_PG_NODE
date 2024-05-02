const db = require('../config/database.js');

exports.createReader = async(req, res) => {
    try{
        const {fcs, birthdate, address, passport, workplace} = req.body;

        await db.query(
            'INSERT INTO reader (fcs, birthdate, address, passport, workplace) VALUES ($1, $2, $3, $4, $5)',
            [fcs, birthdate, address, passport, workplace]
        );

        res.status(201).send({
            message: 'Reader was created',
            body:{
                reader: {
                    fcs: fcs, 
                    birthdate: birthdate,
                    address: address,
                    passport: passport,
                    workplace: workplace
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500).send('failed')
    }
}

exports.fetchReaders = async(req, res) => {
   const response = await db.query(
    'SELECT id, fcs, to_char(birthdate, \'DD.MM.YYYY\') AS birthdate, address, passport, workplace FROM reader ORDER BY fcs ASC'
  );
  res.status(200).send(response.rows);
}

exports.fetchReader = async(req, res) => {
    try{
        const {id} = req.params 
        const response = await db.query(
            `SELECT
                reader.fcs,
                to_char(reader.birthdate, 'DD.MM.YYYY') AS birthdate,
                reader.address,
                reader.passport,
                reader.workplace,
                bi.id AS issuance_id,
                bi.librerian_id,
                bi.book_id,
                to_char(bi.issue, 'DD.MM.YYYY') AS issue,
                to_char(bi.refund, 'DD.MM.YYYY') AS refund,
                bi.status
             FROM reader
             LEFT JOIN book_issuance bi ON reader.id = bi.reader_id
             WHERE reader.id = $1;`,
            [id]
        );
          
        const readerData = response.rows[0];
          
        const formattedResponse = {
            reader: {
              fcs: readerData.fcs,
              birthdate: readerData.birthdate,
              address: readerData.address,
              passport: readerData.passport,
              workplace: readerData.workplace,
              reader_issuance: response.rows.map(row => ({
                issuance_id: row.issuance_id,
                librarian_id: row.librerian_id,
                book_id: row.book_id,
                issue: row.issue,
                refund: row.refund,
                status: row.status,
              })),
            },
        };
          
        res.status(200).send(formattedResponse);
          
        
    }catch(e){
        console.error(e);
        res.status(500).send('failed')
    }
}

exports.updateReader = async(req, res) => {
    try{
        const {id} = req.params
        const {address, passport, workplace} = req.body;
    
        const response = await db.query(
            'UPDATE reader SET address = COALESCE($1, address), passport = COALESCE($2, passport),workplace = COALESCE($3,workplace) WHERE id = $4 RETURNING *',
            [address, passport, workplace, id]
        );

        const updatedReader = response.rows;

        res.status(200).send({
            message: 'Reader was updated',
            body:{
                reader: {updatedReader}
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send('failed')
    }
}

exports.deleteReader = async(req, res) => {
    try {
        const {id} = req.params

        await db.query('DELETE FROM reader WHERE id = $1',
            [ id ]
        );

        res.status(200).send({message: 'Reader was deleted'});
    }catch(e){
        console.error(e);
        res.status(500).send('failed');
    }
}