import React, { useEffect, useState } from 'react'
import './MovieRow.css'
import cardImg from '../../assets/image-card.jpg'
import axios from '../../constants/axios'
import { API_KEY, IMAGE_URL } from '../../constants/constants'

function MovieRow({ title, endpoint }) {
    const [poster, setPoster] = useState([]);
    useEffect(() => {
        axios.get(`${endpoint}?api_key=${API_KEY}`).then((response) => {
            // console.log(response.data.results);
            setPoster(response.data.results)
            // poster_path
        })
    }, [])
    return (
        <div className='movierow my-5'>
            <h4>{title}</h4>
            <div className="movie-card card-group card-group-scroll  my-3 ">
                {poster.map((obj, index) =>
                    <div className="card border-radius-0" key={index} >
                        <img src={`${IMAGE_URL + obj.poster_path}`} className="img-fluid" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieRow