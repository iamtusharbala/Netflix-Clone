import React, { useEffect, useState } from 'react'
import './BackgroundDrop.css'
import BackdropText from '../BackdropText/BackdropText'
import MovieRow from '../MovieRow/MovieRow'
import axios from '../../constants/axios'
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import { actionMovies, fantasyMovies, genresUrl, horrorMovies, popularTV, sciFiMovies, thrillerMovies, topRated } from '../../constants/urls';

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
                    <MovieRow title={movie && "Top Rated Movies"} endpoint={topRated} />
                    <MovieRow title={movie && "Popular TV Shows"} endpoint={popularTV} />
                    <MovieRow title={movie && "Action Movies"} endpoint={genresUrl} genres={actionMovies} />
                    <MovieRow title={movie && "Sci-Fi Movies"} endpoint={genresUrl} genres={sciFiMovies} />
                    <MovieRow title={movie && "Thriller Movies"} endpoint={genresUrl} genres={thrillerMovies} />
                    <MovieRow title={movie && "Horror Movies"} endpoint={genresUrl} genres={horrorMovies} />
                    <MovieRow title={movie && "Fantasy Movies"} endpoint={genresUrl} genres={fantasyMovies} />
                </div>
            </div>
        </div>
    )
}
// backdrop_path
export default BackgroundDrop