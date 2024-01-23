import React, { useState } from 'react';
import './BackdropText.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../Modal/ModalComponent';
import { API_KEY, IMAGE_URL } from '../../constants/constants'
import netFlixSeries from '../../assets/Netflix-Series.png';


function BackdropText({ logo, title, description, movieDetails, movieOrSeries }) {
    return (
        <div className="backdroptext text mb-5 row">
            {movieOrSeries === 'tv' && <div className='netflix-series mb-5'><img src={netFlixSeries} alt="netflix-series" /></div>}
            <div className="col-md-7">
                <div className="title my-5">
                    {logo ? (
                        <img className="name-logo" src={`${IMAGE_URL}${logo}?api_key=${API_KEY}`} alt={title} />
                    ) : (
                        <h1>{title}</h1>
                    )}
                </div>
                <div className="text-buttons">
                    <div className="description py-2">
                        <h5 className='fs-5'>{description}</h5>
                    </div>
                </div>
            </div>
            {
                movieDetails && (
                    <div className="description-buttons">
                        <button type="button" className="btn btn-light btn-lg">
                            <FontAwesomeIcon icon={faPlay} className='pe-3' />Play
                        </button>
                        <ModalComponent variant="btn btn-dark btn-lg opacity-75" movieDetails={movieDetails} movieOrSeries={movieOrSeries}>
                            <FontAwesomeIcon icon={faCircleInfo} className='pe-3' />More Info
                        </ModalComponent>
                    </div>
                )
            }
        </div >
    );
}

export default BackdropText;