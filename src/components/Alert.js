import React from 'react'
// import './Alert.css'
const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
            
        </div>
        
    )
}

export default Alert