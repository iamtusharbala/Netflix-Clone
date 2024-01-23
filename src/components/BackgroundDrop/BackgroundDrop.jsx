import React, { useEffect, useState } from 'react';
import './BackgroundDrop.css';
import BackdropText from '../BackdropText/BackdropText';
import MovieRow from '../MovieRow/MovieRow';
import axios from '../../constants/axios';
import { API_KEY, IMAGE_URL, BASE_URL } from '../../constants/constants';
import { actionMovies, animationMovies, fantasyMovies, genresUrl, horrorMovies, popularMovies, popularTV, sciFiMovies, searchMovies, thrillerMovies, topRated, trending } from '../../constants/urls';
import netFlixSeries from '../../assets/Netflix-Series.png';

const getRandomNumber = (max) => Math.floor(Math.random() * max);
const oneOrTwo = getRandomNumber(2);
const tvOrSeries = ['tv', 'movie'];

function BackgroundDrop() {
    const [movie, setMovie] = useState('');
    const [logo, setLogo] = useState('');


    const getLogo = async (id, movieSeries) => {
        console.log(id, movieSeries);
        try {
            const response = await axios.get(`${BASE_URL}${movieSeries}/${id}/images?api_key=${API_KEY}`);
            const logos = response.data.logos;
            logos.forEach((obj) => {
                { obj.iso_639_1 === 'en' && setLogo(obj.file_path) }
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${tvOrSeries[oneOrTwo]}/popular?language=en-US&page=1&api_key=${API_KEY}`);
                const randomMovie = response.data.results[getRandomNumber(20)];

                if (randomMovie) {
                    console.log(randomMovie);
                    setMovie(prevMovie => {
                        // Make sure randomMovie is defined before accessing its properties
                        if (randomMovie.id) {
                            { randomMovie.title ? getLogo(randomMovie.id, 'movie') : getLogo(randomMovie.id, 'tv') }
                        } else {
                            console.error('Movie ID is undefined');
                        }

                        return randomMovie;
                    });
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchData();
    }, [tvOrSeries[oneOrTwo]]);


    return (
        <div className='backgroundDrop'>
            <div className='background' style={{ backgroundImage: `url(${movie ? IMAGE_URL + movie.backdrop_path : ''})` }}></div>
            <div className="container-fluid">
                <div className="backdrop-title">
                    <BackdropText
                        // movie.title for movie and movie.name for series 
                        logo={movie && logo}
                        title={movie && (movie.title || movie.name)}
                        description={movie && movie.overview}
                        movieDetails={movie}
                        movieOrSeries={tvOrSeries[oneOrTwo]}
                    />
                </div>
                {tvOrSeries[oneOrTwo] === 'tv' && movie && <div className='netflix-series mb-5'><img src={netFlixSeries} alt="netflix-series" /></div>}
                <div className="row-card">
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
        </div>
    );
}

export default BackgroundDrop;