require('dotenv').config();
const router = require('express').Router();
const getDB = require('../db');

// get events
router.get("/events",async (req,res)=>{
    const db = await getDB();
    
    const [rows] = await db.query("SELECT * FROM events");
    
    res.json(rows);
});

// post events
router.post("/add-event" , async (req,res)=>{
    const db = await getDB();
    const {title , description} = req.body;

    await db.query("INSERT INTO events(title,description) VALUES (?,?)",[title,description]);

    res.json({message : "Event Registered / added successfully..!"});
});

// add user
router.post("/register-user", async(req,res)=>{
    const db = await getDB();
    const {name, email} = req.body;

    await db.query("INSERT INTO users(name,email) VALUES(?,?)",[name,email]);
    res.json({
        message : "Inserted and Created User",
    });

});

// register event
router.post("/register-event" , async (req,res)=>{
    const db = await getDB();
    const {user_id , event_id} = req.body;

    await db.query("INSERT INTO registrations(user_id,event_id) VALUES(?,?)",[user_id,event_id]);
    res.json({message : "Registered"});
});

module.exports = router;
