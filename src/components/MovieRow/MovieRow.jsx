import React, { useEffect, useState } from 'react'
import axios from '../../constants/axios'
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import './MovieRow.css'

function MovieRow({ title, endpoint, genres }) {
    const [poster, setPoster] = useState([]);
    useEffect(() => {
        axios.get(`${endpoint}?api_key=${API_KEY}` + `&${genres}`).then((response) => {
            // console.log(response.data.results);
            console.log(`${endpoint}?api_key=${API_KEY}` + `&${genres}`);
            setPoster(response.data.results)
        })
    }, [])
    return (
        <div className='movierow my-5'>
            <h3>{title}</h3>
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