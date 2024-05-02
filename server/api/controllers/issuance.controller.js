const { response } = require('express');
const db = require('../config/database.js');

exports.createIssuance = async(req, res) => {
    try{
        const {librerianID, readerID, bookID} = req.body
        const response = await db.query(
            `INSERT INTO book_issuance (librerian_id, reader_id, book_id, issue, refund) VALUES($1, $2, $3, CURRENT_DATE, CURRENT_DATE + INTERVAL '2' MONTH RETURNING issue, refund)`,
            [librerianID, readerID, bookID]
        )

        const issuanse = response.rows

        res.status(201).send({
            body: {
                refundDate: issuanse
            }
        })
    }catch(e){
        console.log(e)
        res.status(500).send('failed')
    }
}

exports.updateStatusIssuances = async(req, res) => {
    try{
        const {id} = req.params
        const {status} = req.body

        await db.query(
            'UPDATE book_issuance SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        )

        const updated = response.rows;

        res.status(200).send({
            message: 'Book was refundet',
            body:{
                bookIssuance: updated
            }
        })
    }catch(e){
        console.error(e)
        res.status(500).send('failed')
    }
}

exports.deleteIssuances = async(req, res) => {
    try{
        await db.query(
            `DELETE FROM book_issuance WHERE status = 'returned' AND refund < CURRENT_DATE - INTERVAL '12' MONTH;`
        )

        res.status(200).send('issuances was deleted');
    }catch(e){
        console.error(e)
        res.status(500).send('something went wrong')
    }
}