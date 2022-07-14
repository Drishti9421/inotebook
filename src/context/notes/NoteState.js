 import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[
        {
          "_id": "62b229f81a7c625ec4ad0e4e",
          "user": "62b1db10806f2f5dcc5d5070",
          "title": "ESE",
          "description": "Kuch nahi padha abhi tak",
          "tag": "27th onwards",
          "date": "2022-06-21T20:28:40.170Z",
          "__v": 0
        },
        {
          "_id": "62b22a751a7c625ec4ad0e52",
          "user": "62b1db10806f2f5dcc5d5070",
          "title": "CFG",
          "description": "25th & 26th",
          "tag": "All the best. Jai Maata Di",
          "date": "2022-06-21T20:30:45.232Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)


      // Get all notes
      const getNotes=async()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWRiMTA4MDZmMmY1ZGNjNWQ1MDcwIn0sImlhdCI6MTY1NTgzMzEwNX0.vNFF0R5FhFXfJE6Htkj4gCWZ-pt_oBSUtEdMyvLytvE"
          },
      });
      const json= await response.json()
      console.log(json)
      setNotes(json)
      }



      // Add a note
      const addNote=async(title, description, tag)=>{
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWRiMTA4MDZmMmY1ZGNjNWQ1MDcwIn0sImlhdCI6MTY1NTgzMzEwNX0.vNFF0R5FhFXfJE6Htkj4gCWZ-pt_oBSUtEdMyvLytvE"
          },
          body: JSON.stringify({title, description, tag})
      });
        const note={
          "_id": "62b22a751a7c625ec4ad0e53",
          "user": "62b1db10806f2f5dcc5d5070",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-06-21T20:30:45.232Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }
      // Delete a note
      const deleteNote=async(id)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWRiMTA4MDZmMmY1ZGNjNWQ1MDcwIn0sImlhdCI6MTY1NTgzMzEwNX0.vNFF0R5FhFXfJE6Htkj4gCWZ-pt_oBSUtEdMyvLytvE"
          },
      });
      const json=response.json()
      console.log(json)
        console.log("Deleting "+id);
        const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes)
      }

      // Edit a note
      const editNote=async(id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWRiMTA4MDZmMmY1ZGNjNWQ1MDcwIn0sImlhdCI6MTY1NTgzMzEwNX0.vNFF0R5FhFXfJE6Htkj4gCWZ-pt_oBSUtEdMyvLytvE"
          },
          body: JSON.stringify({title, description, tag})
      });

        // Logic to edit in client
        for(let index=0; index<notes.length; index++){
          const element=notes[index] 
          if(element._id===id)
          {
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }




    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;