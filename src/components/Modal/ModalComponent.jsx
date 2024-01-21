import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import './ModalComponent.css'
import axios from '../../constants/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import videoThumb from '../../assets/images.jpeg'

function ModalComponent({ variant, children, movieDetails, movieOrSeries }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    console.log(movieOrSeries);

    const [details, setDetails] = useState({})
    const [tvEpisodes, setTvEpisodes] = useState({})
    const [tvSeasons, setTvSeasons] = useState({})



    // Fetch TV episodes
    const fetchTVEpisodes = async () => {
        if (movieOrSeries === 'tv') {
            try {
                const response3 = await axios.get(`tv/${movieDetails.id}/season/1?api_key=${API_KEY}`);
                const episodeDetails = await response3.data
                setTvEpisodes(episodeDetails.episodes)
                // console.log(episodeDetails);
                console.log(`tv/${movieDetails.id}/season/1?api_key=${API_KEY}`);
                fetchTVSeasons();
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
                setTvSeasons(seasonDetails.seasons.length - 1)
                console.log((seasonDetails.seasons.length) - 1) //get total seasons
                console.log(seasonDetails.seasons);
                console.log(`tv/${movieDetails.id}?api_key=${API_KEY}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        try {
            axios.get(`${movieOrSeries}/${movieDetails.id}?api_key=${API_KEY}`).then((response) => {
                setDetails(response.data)
                if (movieOrSeries === 'tv') {
                    fetchTVEpisodes()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    const releaseYear = details && details.release_date ? details.release_date.substring(0, 4) : '';

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
                <div className="image-header">
                    <div className="image">
                        <img src={`${IMAGE_URL}${movieDetails.backdrop_path}`} className='img-fluid poster' />
                        <button type="button" className="btn btn-light btn-lg"><FontAwesomeIcon icon={faPlay} className='px-3' />Play</button>
                    </div>
                </div>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="title fs-2 mt-2 main-title">
                                {movieDetails && movieDetails.title ? movieDetails.title : (movieDetails && movieDetails.name)}
                            </div>
                            <div className="year-details">

                                <p>{releaseYear}</p>
                            </div>
                            <p>
                                {movieDetails.overview}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <div className="title">
                                <p>Cast: Tushar Balakrishnan</p>
                            </div>
                        </div>
                    </div>
                    {/* check if is a movie or series */}
                    {movieOrSeries === 'tv' &&
                        <div className="tv-series mt-3">
                            <div className="main-head d-flex justify-content-between">
                                <h4 className='heading'>Episodes</h4>
                                <div className="dropdown">
                                    <a className="btn btn-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Season {tvSeasons}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <ul className="list-group">
                                    {Object.keys(tvEpisodes).map((key, index) => {
                                        const episode = tvEpisodes[key];
                                        return (
                                            <React.Fragment key={index}>
                                                <li className="list-group-item">
                                                    <div className="col-lg-4">
                                                        {/* {console.log(episode)} */}
                                                        <div className="episode-number mx-3">
                                                            <h1 className='mb-0'>{episode && episode.episode_number}</h1>
                                                        </div>
                                                        {episode &&
                                                            <div className="video-thumbnail">
                                                                <img src={`${IMAGE_URL}${episode.still_path}`} />
                                                            </div>}
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="episode-details mx-5">
                                                            <div className="episode-name">
                                                                <h4 className='mb-0'>{episode && episode.name}</h4>
                                                            </div>
                                                            <div className="episode-description">
                                                                <p>{episode && episode.overview}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <hr />
                                            </React.Fragment>
                                        );
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