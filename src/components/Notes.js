import React, {useContext, useEffect} from 'react'
import noteContext from "../context/notes/noteContext"
import AddNotes from './AddNotes';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
      getNotes()
    
    }, [])
    
    return (
        <>
        <div className='row my-3'>
        <AddNotes/>
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>;
                
            })}
        </div>
        </>
    )
}

export default Notes