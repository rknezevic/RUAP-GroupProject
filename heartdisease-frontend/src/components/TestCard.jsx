import React from 'react'
import "../styles/testCard.css"

export const Card = ({data, onClick}) => {

    const timeStampDate = data.data.DateCreated;
    const dateInMillis  = timeStampDate.seconds * 1000

    const date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()

    return (
        <div className='card-container' onClick={onClick}>
            <div className='title' ><h4>Test made {date}</h4> </div>
            <div className='paragraph'><p> Your likelihood of experiencing a heart attack is: <strong>{data.data.HeartDiseaseOrAttackChance}</strong></p> </div>       
        </div>
    )
}