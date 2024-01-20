import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import './ModalComponent.css'
import axios from '../../constants/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function ModalComponent({ variant, children, movieDetails }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [details, setDetails] = useState({})
    const [imdbDetails, setImdbDetails] = useState({})

    const fetchImdbData = async (passData) => {
        const response2 = await axios.get(`find/${passData.imdb_id}?external_source=imdb_id&api_key=${API_KEY}`);
        const detailsFromImdb = response2.data;
        console.log(detailsFromImdb);
        setImdbDetails(detailsFromImdb)

    }


    useEffect(() => {
        axios.get(`/movie/${movieDetails.id}?api_key=${API_KEY}`).then((response) => {
            setDetails(response.data)
            fetchImdbData(response.data)
        })
    }, [])

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

                <Modal.Header>
                    {/* <Modal.Title id="example-custom-modal-styling-title">
                        {movieDetails.title}
                    </Modal.Title> */}
                </Modal.Header>
                <div className="image-header">
                    <div className="image">
                        <img src={`${IMAGE_URL}${movieDetails.backdrop_path}`} className='img-fluid poster' />
                        <button type="button" className="btn btn-light btn-lg"><FontAwesomeIcon icon={faPlay} className='px-3' />Play</button>
                    </div>
                </div>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="title fs-2 my-2">
                                {movieDetails.title}
                            </div>
                            <div className="year-details">
                                <p>{details.release_date}</p>
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
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalComponent