const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerSpec, swaggerUi } = require('./swagger');

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of hotels.
 *     responses:
 *       '200':
 *         description: A JSON array of hotels.
 */

app.get('/', (req, res) => {
    const query = `
    SELECT h.hotel_id, h.hotel_name, h.thumbnail_url, hotel_location, 
    price_start
    FROM hotels h
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
            res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
        res.send(result);
    });
});

/**
 * @swagger
 * /result:
 *   get:
 *     summary: Search for hotels based on a query.
 *     parameters:
 *       - name: search_query
 *         in: query
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string 
 *     responses:
 *       '200':
 *         description: A JSON array of hotels.
 */

app.get('/result', (req, res) => {
    const {search_query} = req.query;

    const query = `
    SELECT h.hotel_id, h.hotel_name, h.thumbnail_url, hotel_location, 
    price_start
    FROM hotels h
    WHERE h.hotel_name LIKE ? OR hotel_location LIKE ?;
    `;

    db.query(query, [`%${search_query}`, `%${search_query}`], (err, result) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
            res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
        } else {
            res.json(result);
        }        
    });
});

/**
 * @swagger
 * /hotel:
 *   get:
 *     summary: Retrieve details of a specific video.
 *     parameters:
 *       - name: h
 *         in: query
 *         required: true
 *         description: The hotel ID.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of hotels.
 */

app.get('/hotel', (req,res) => {
    console.log(req.query);
    const {h} = req.query;
    if (!h) {
        res.status(400).send('Invalid hotel parameter')
        return;
    }

    const query = `
    SELECT h.hotel_id, h.hotel_name, h.thumbnail_url, hotel_location, 
    price_start
    FROM hotels h
    WHERE h.hotel_id = ?;
    `;

    db.query(query, [h, h], (err, result) => {
        if (err) {
            console.err('เกิดข้อผิดพลาดในการค้นหา');
        } else {
            const hotel = result[0];
            res.json([hotel]);
        }
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});