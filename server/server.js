const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const apiKey = process.env.API_KEY;

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Hello! This is Dana's template ExpressJS with React-Vite" });
});

app.get('/api/weather', async (req, res) => {
    console.log(req.query)

    const id = parseInt(req.query.id);
    const name = req.query.user;
    try {
        console.log(id, name);
        const result = await db.query(
            "select * from users where name = $1 and id = $2", [name, id]
        )
        console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(403).end();
        }
        const params = new URLSearchParams({
            q: req.query.cityName,
            appid: apiKey,
            units: "imperial"
          });
          
          const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
          console.log(url);
          
          fetch(url)
            .then((response) => response.json())
            .then((data) => res.send(data)); 
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM users ORDER BY id ASC');
        console.log(users);
        res.json(users);
    } catch (e) {
        return res.status(400).send(String(e));
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const result = await db.query(
            "INSERT INTO users(name, fave_city) VALUES($1, $2) RETURNING *",
            [req.body.name, req.body.fave_city],
        );
        const returnObj = {
            id: result.rows[0].id,
            name: req.body.name,
            fave_city: req.body.fave_city
        }
        return res.status(200).json(returnObj);
    } catch (e) {
        return res.status(400).send(String(e));
    }
});

app.put('/api/users/:userID', async (req, res) => {
    const id = parseInt(req.params.userID);
	try {
		await db.query(
			"UPDATE users SET name = $1, fave_city = $2 WHERE id = $3 RETURNING *", 
			[req.body.name, req.body.fave_city, id]
		);
	} catch(e) {
        console.log(e);
		return res.status(400).send(String(e));
	}
	return res.end();
});

app.post('/api/validate', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    console.log(req.body);
    try {
        const result = await db.query(
            "select * from users where name = $1 and id = $2", [name, id]
        )
        if (result.rows.length === 0) {
            res.status(403).end();
        } else {
            res.status(200).end();
        }
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
});

app.delete('/api/users/:userID', async (req, res) => {
    const id = parseInt(req.params.userID);
	try {
		await db.query("DELETE FROM users WHERE id = $1", [id]);
	} catch(error) {
		return res.status(400).send(String(e));
	}
	return res.end();
});


  app.listen(PORT, () => {
    console.log(`Hello, server is listening on ${PORT}`);
});