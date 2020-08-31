const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME

});

const sql = {
    "CUSTOMER_SELECT": process.env.SQL_CUSTOMER_SELECT,
    "CUSTOMER_SELECT_ID": process.env.SQL_CUSTOMER_SELECT_ID,
    "CUSTOMER_INSERT": process.env.SQL_CUSTOMER_INSERT,
    "CUSTOMER_UPDATE": process.env.SQL_CUSTOMER_UPDATE,
    "CUSTOMER_DELETE": process.env.SQL_CUSTOMER_DELETE,
    "PET_SELECT_BY_CUSTOMER_ID": process.env.SQL_PET_SELECT_BY_CUSTOMER_ID,
}

connection.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    connection.query(
        sql.CUSTOMER_SELECT,

        (err, rows, fields) => {
            res.send(rows);

        }
    )
});


//顧客登録
app.post('/api/customers/add', (req, res) => {
    const formData = req.body.headers.formData;
    const name = formData.name;
    const age = formData.age;
    const gender = formData.gender;
    const address = formData.address;
    const email = formData.email;
    const tel = formData.tel;
    const note = formData.note ? formData.note : null;
    try {
        connection.query(
            sql.CUSTOMER_INSERT, [name, age, gender, address, email, tel, note],
            (err, rows, fields) => {
                res.send(rows);
                return "ok";

            }
        )
    } catch (e) {
        res.send(e);
    }
});

//顧客情報獲得
app.get('/api/customers/:id', (req, res) => {
    const customerId = req.params.id;
    try {
        connection.query(
            sql.CUSTOMER_SELECT_ID, [customerId],
            (err, rows, fields) => {
                res.send(rows);
            }
        )
    } catch (e) {
        res.send(e);
    }
});


//pet情報獲得by customerId
app.get('/api/customers/:id/pets/', (req, res) => {
    const customerId = req.params.id;
    try {
        connection.query(
            sql.PET_SELECT_BY_CUSTOMER_ID, [customerId],
            (err, rows, fields) => {
                res.send(rows);
            }
        )

    } catch (e) {
        res.send(e);
    }
});


app.post('/api/customers/:id/update', (req, res) => {
    const customerId = req.params.id;
    const formData = req.body.headers.formData;
    const name = formData.name;
    const age = formData.age;
    const gender = formData.gender;
    const address = formData.address;
    const email = formData.email;
    const tel = formData.tel;
    const note = formData.note ? formData.note : null;
    const id = formData.note ? formData.note : null;

    try {
        connection.query(
            sql.CUSTOMER_UPDATE, [name, age, gender, address, email, tel, note, customerId],
            (err, rows, fields) => {
                res.send(rows);
            }
        )
    } catch (e) {
        res.send(e);
    }
});

app.post('/api/customers/:id/delete', (req, res) => {
    const customerId = req.params.id;

    try {
        connection.query(
            sql.CUSTOMER_DELETE, [customerId],
            (err, rows, fields) => {
                res.send("delete OK");
            }
        )
    } catch (e) {
        res.send(e);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

