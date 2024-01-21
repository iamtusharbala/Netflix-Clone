import React, { useEffect, useState } from 'react'
import './BackgroundDrop.css'
import BackdropText from '../BackdropText/BackdropText'
import MovieRow from '../MovieRow/MovieRow'
import axios from '../../constants/axios'
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import { actionMovies, animationMovies, fantasyMovies, genresUrl, horrorMovies, popularMovies, popularTV, sciFiMovies, searchMovies, thrillerMovies, topRated, trending } from '../../constants/urls';
const randNum = Math.floor(Math.random() * 20);
const oneOrTwo = Math.floor(Math.random() * 2);
const tvOrSeries = ['tv', 'movie'];
const isMovie = tvOrSeries[oneOrTwo];

function BackgroundDrop() {
    const [movie, setMovie] = useState();
    useEffect(() => {
        axios.get(`${tvOrSeries[oneOrTwo]}/popular?language=en-US&page=1&api_key=${API_KEY}`).then((response) => {
            setMovie(response.data.results[randNum])
        })
    }, [isMovie])
    return (
        <div className='backgroundDrop'>
            <div className='background' style={{ backgroundImage: `url(${movie ? IMAGE_URL + movie.backdrop_path : ""})` }}></div>
            <div className="container-fluid">
                <BackdropText
                    title={movie && movie.title ? movie.title : (movie && movie.name)}
                    description={movie && movie.overview}
                    movieDetails={movie && movie}
                    movieOrSeries={tvOrSeries[oneOrTwo]} />
                <div className="originals mt-5">
                    <MovieRow title={movie && "Trending Now"} endpoint={trending} />
                    <MovieRow title={movie && "Top Rated Movies"} endpoint={topRated} />
                    <MovieRow title={movie && "Popular TV Shows"} endpoint={popularTV} />
                    <MovieRow title={movie && "From The Harry Potter Universe"} endpoint={searchMovies} genres="query=harry%20potter" />
                    <MovieRow title={movie && "Action Movies"} endpoint={genresUrl} genres={actionMovies} />
                    <MovieRow title={movie && "Sci-Fi Movies"} endpoint={genresUrl} genres={sciFiMovies} />
                    <MovieRow title={movie && "Animation Movies"} endpoint={genresUrl} genres={animationMovies} />
                    <MovieRow title={movie && "Thriller Movies"} endpoint={genresUrl} genres={thrillerMovies} />
                    <MovieRow title={movie && "Horror Movies"} endpoint={genresUrl} genres={horrorMovies} />
                    <MovieRow title={movie && "Fantasy Movies"} endpoint={genresUrl} genres={fantasyMovies} />
                    <MovieRow title={movie && "Popular Movies"} endpoint={genresUrl} genres={popularMovies} />
                </div>
            </div>
        </div>
    )
}
// backdrop_path
export default BackgroundDrop