const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mysql = require('mysql');
const multer = require("multer");
const path = require("path");
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
    "PET_SELECT_BY_ID": process.env.SQL_PET_SELECT_BY_ID,
    "PET_SELECT_BY_CUSTOMER_ID": process.env.SQL_PET_SELECT_BY_CUSTOMER_ID,
    "PET_INSERT": process.env.SQL_PET_INSERT,
    "PET_UPDATE": process.env.SQL_PET_UPDATE,
    "PET_UPDATE_IMG": process.env.SQL_PET_UPDATE_IMG,
    "PET_DELETE": process.env.SQL_PET_DELETE,
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


//pet情報獲得by pet id
app.get('/api/pets/:id/', (req, res) => {
    const petId = req.params.id;
    try {
        connection.query(
            sql.PET_SELECT_BY_ID, [petId],
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


//ペット登録
app.post('/api/pets/add', (req, res) => {
    const formData = req.body.headers.formData;
    const petName = formData.petName;
    const petType = formData.petType;
    const petSex = formData.petSex;
    const petBirth = formData.petBirth;
    const petNote = formData.petNote ? formData.petNote : null;
    const customerId = formData.customerId;
    const defaultImg = '/upload/hana.png'
    console.log(formData)
    try {
        connection.query(
            sql.PET_INSERT, [petName, petType, petSex, petBirth, defaultImg, petNote, customerId],
            (err, rows, fields) => {
                res.send(rows);
                return "ok";
            }
        )
    } catch (e) {
        res.send(e);
    }
});


//pet情報 Update
app.post('/api/pets/:id/update/', (req, res) => {
    const petId = req.params.id;
    const formData = req.body.headers.formData;
    const petName = formData.petName;
    const petType = formData.petType;
    const petSex = formData.petSex;
    const petBirth = formData.petBirth;
    const petNote = formData.petNote ? formData.petNote : null;


    try {
        connection.query(
            sql.PET_UPDATE, [petName, petType, petSex, petBirth, petNote, petId],
            (err, rows, fields) => {
                res.send(rows);
                console.log(rows)
            }
        )

    } catch (e) {
        res.send(e);
    }
});

//ペット登録
app.post('/api/pets/:id/delete', (req, res) => {
    const petId = req.params.id;
    try {
        connection.query(
            sql.PET_DELETE, [petId],
            (err, rows, fields) => {
                res.send("delete OK");
            }
        )
    } catch (e) {
        res.send(e);
    }
});


//img upload

const storage = multer.diskStorage({
    destination: "./public/upload/",
    filename: function (req, file, cb) {
        cb(null, "pet" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 4000000}
});

app.use(express.static('public'));

app.post("/upload", upload.single("img"), function (req, res, next) {

        const petId = req.body.petId;
        const petImg = `/upload/${req.file.filename}`;
        try {
            connection.query(
                sql.PET_UPDATE_IMG, [petImg, petId],
                (err, rows, fields) => {
                    if (err) console.log(err);
                }
            );
            res.send({
                fileName: req.file.filename
            });
        } catch (e) {
            res.send(e);
        }
    }
);


app.listen(port, () => console.log(`Listening on port ${port}`));

