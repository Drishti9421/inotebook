import React, { useContext } from 'react'
import AddNotes from './AddNotes';
import Notes from './Notes';
const Home = () => {


  return (
    <div>
      <div className="container my-3">
        <Notes />
      </div>
    </div>
  )
}

export default Home