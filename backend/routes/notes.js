const express = require("express");
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require(`../models/Notes`)
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })

        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnotes". login required
router.post('/addnotes', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);  // validationResult(req) extracts the validation errors from a request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenotes". login required
// the id passed in the url is the id of the note you want to update
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // create a newNote object
        const newNote = {}
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }
        // find the note you want to update and update it
        let note = await Notes.findById(req.params.id)//take the id mentioned in the url
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow updation only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // {new: true} means that if there comes a new object then it will be created
        note = await Notes.findOneAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

// ROUTE 4: Delete a Note using: DELETE "/api/notes/deletenotes". login required
// the id passed in the url is the id of the note you want to update
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {

        // create a newNote object
        const newNote = {}
        // find the note you want to delete and delete it
        let note = await Notes.findById(req.params.id)//req.params.id is the id mentioned in the url
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findOneAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router