import React, { useEffect, useState } from 'react'
import './BackgroundDrop.css'
import BackdropText from '../BackdropText/BackdropText'
import MovieRow from '../MovieRow/MovieRow'
import axios from '../../constants/axios'
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import { popularTV, topRated } from '../../constants/urls';

function BackgroundDrop() {
    const [movie, setMovie] = useState();
    const randNum = Math.floor(Math.random() * 20)
    useEffect(() => {
        axios.get(`movie/popular?language=en-US&page=1&api_key=${API_KEY}`).then((response) => {
            setMovie(response.data.results[randNum])
        })
    }, [])
    return (
        <div className='backgroundDrop'>
            <div className='background' style={{ backgroundImage: `url(${movie ? IMAGE_URL + movie.backdrop_path : ""})` }}></div>
            <div className="container-fluid">
                <BackdropText title={movie && movie.original_title} description={movie && movie.overview} />
                <div className="originals mt-5">
                    <MovieRow title="Top Rated Movies" endpoint={topRated} />
                    <MovieRow title="Popular TV Shows" endpoint={popularTV} />
                    {/* <MovieRow title="Action Movies" endpoint={actionMovies} /> */}
                </div>
            </div>
        </div>
    )
}
// backdrop_path
export default BackgroundDrop