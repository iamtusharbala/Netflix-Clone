import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import './ModalComponent.css'
import axios from '../../constants/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import videoUnavailable from '../../assets/video-unavailable.png'

function ModalComponent({ variant, children, movieDetails, movieOrSeries }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [details, setDetails] = useState({})
    const [tvEpisodes, setTvEpisodes] = useState({})
    const [tvSeasons, setTvSeasons] = useState({})
    const [season, setSeason] = useState(1);
    const [noOfSeasons, setNoOfSeasons] = useState(1);
    const [credits, setCredits] = useState('');

    // Fetch TV episodes
    const fetchTVEpisodes = async (season = 1) => {
        if (movieOrSeries === 'tv') {
            try {
                const response3 = await axios.get(`tv/${movieDetails.id}/season/${season}?api_key=${API_KEY}`);
                const episodeDetails = await response3.data
                setTvEpisodes(episodeDetails.episodes)
                setSeason(season)
                fetchTVSeasons();
            } catch (error) {
                console.log(error);
            }
        }
    }


    //Faetc cast & crew
    const fetchCredits = async () => {
        if (movieOrSeries === 'tv') {
            try {
                const response5 = await axios.get(`tv/${movieDetails.id}/credits?api_key=${API_KEY}`);
                const creditsData = response5.data;
                setCredits(creditsData)

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response5 = await axios.get(`movie/${movieDetails.id}/credits?api_key=${API_KEY}`);
                const creditsData = response5.data;
                setCredits(creditsData)
            } catch (error) {
                console.log(error);
            }
        }
    }

    //Fetch TV seasons
    const fetchTVSeasons = async () => {
        if (movieOrSeries === 'tv') {
            try {
                const response3 = await axios.get(`tv/${movieDetails.id}?api_key=${API_KEY}`);
                const seasonDetails = await response3.data
                setTvSeasons(seasonDetails.seasons)
                setNoOfSeasons(seasonDetails.number_of_seasons)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        try {
            axios.get(`${movieOrSeries}/${movieDetails.id}?api_key=${API_KEY}`).then((response) => {
                setDetails(response.data)
                fetchCredits();
                if (movieOrSeries === 'tv') {
                    fetchTVEpisodes()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    // console.log(details);
    const releaseYear = details && details.release_date
        ? details.release_date.substring(0, 4)
        : details && details.first_air_date
            ? details.first_air_date.substring(0, 4)
            : 'N/A';
    return (
        <>
            <Button variant={variant} onClick={() => setShow(true)}>
                {children}
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
            >
                {movieDetails && <div className="image-header">
                    <div className="image">
                        {movieDetails.backdrop_path ? <img src={`${IMAGE_URL}${movieDetails.backdrop_path}`} className='img-fluid poster' /> : videoUnavailable}
                        <button type="button" className="btn btn-light btn-lg"><FontAwesomeIcon icon={faPlay} className='px-3' />Play</button>
                    </div>
                </div>}
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="title fs-2 mt-2 main-title">
                                {movieDetails && movieDetails.title ? movieDetails.title : (movieDetails && movieDetails.name)}
                            </div>
                            <div className="year-details mb-3">
                                <span className='me-3'>{releaseYear}</span>
                                {movieOrSeries === 'tv' && <span>{noOfSeasons} Seasons</span>}
                            </div>
                            <p>
                                {movieDetails.overview}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <div className="title mt-2">
                                <p className='mb-1'>
                                    <span>
                                        {credits.cast && credits.cast.slice(0, 3).map((obj, index, array) => (
                                            <React.Fragment key={obj.id}>
                                                {index === 0 && <span>Cast:&nbsp;</span>}
                                                <span>{obj.original_name}</span>
                                                {index < array.length - 1 ? <span>, </span> : <span>. </span>}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        {credits.crew &&
                                            credits.crew
                                                .filter(crewMember => crewMember.job === 'Director')
                                                .map(director => (
                                                    <React.Fragment key={director.id}>
                                                        <span>Director:&nbsp;</span>
                                                        <span>{director.name}</span>
                                                    </React.Fragment>
                                                ))}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* check if is a movie or series */}
                    {movieOrSeries === 'tv' &&
                        <div className="tv-series mt-3">
                            <div className="main-head d-flex justify-content-between mb-5">
                                <h4 className='heading mb-0'>Episodes</h4>
                                <div className="dropdown" data-bs-theme="dark" >
                                    <a className="btn btn-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Season {season}
                                    </a>
                                    <ul className="dropdown-menu">
                                        {Object.keys(tvSeasons).map((key, index) => (
                                            <li key={index}>
                                                {tvSeasons[key].season_number !== 0 && <a className="dropdown-item" href="#" onClick={() => fetchTVEpisodes(tvSeasons[key].season_number)}>Season {tvSeasons[key].season_number}</a>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <ul className="list-group">
                                    {Object.keys(tvEpisodes).map((key, index) => {
                                        const episode = tvEpisodes[key];
                                        // Check if episode.title is present
                                        if (episode && episode.name) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <li className="list-group-item text-start">
                                                        <div className="col-lg-5">
                                                            <div className="episode-number mx-3">
                                                                <h1 className='mb-0'>{episode.episode_number}</h1>
                                                            </div>
                                                            {episode.still_path ?
                                                                <div className="video-thumbnail">
                                                                    {<img src={`${IMAGE_URL}${episode.still_path}`} alt={`Episode ${episode.episode_number}`} />}
                                                                </div> : <div className="video-thumbnail">
                                                                    {<img src={videoUnavailable} alt={`Episode ${episode.episode_number}`} />}
                                                                </div>}
                                                        </div>
                                                        <div className="col-lg-7">
                                                            <div className="episode-details mx-5">
                                                                <div className="episode-name">
                                                                    <h4 className='mb-0'>{episode.name}</h4>
                                                                </div>
                                                                <div className="episode-description">
                                                                    <p>{episode.overview}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <hr />
                                                </React.Fragment>
                                            );
                                        }

                                        // If episode.name is not present, return null (or any fallback content)
                                        return null;
                                    })}


                                </ul>
                            </div>
                        </div>}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalComponent