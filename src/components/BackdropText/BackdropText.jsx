import React, { useState } from 'react';
import './BackdropText.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../Modal/ModalComponent';
import { API_KEY, IMAGE_URL } from '../../constants/constants'

function BackdropText({ logo, title, description, movieDetails, movieOrSeries }) {
    const [imageLoaded, setImageLoaded] = useState(true);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    return (
        <div className="backdroptext text mb-5 row">
            <div className="col-md-7">
                <div className="title mb-3">
                    {imageLoaded ? <img className="name-logo" src={`${IMAGE_URL}${logo}?api_key=${API_KEY}`} alt={title} onLoad={handleImageLoad} /> : <h1>{title}</h1>}
                </div>
                <div className="description py-2">
                    <h5 className='fs-5'>{description}</h5>
                </div>
                {movieDetails && (
                    <div className="description-buttons">
                        <button type="button" className="btn btn-light btn-lg">
                            <FontAwesomeIcon icon={faPlay} className='pe-3' />Play
                        </button>
                        <ModalComponent variant="btn btn-dark btn-lg opacity-75" movieDetails={movieDetails} movieOrSeries={movieOrSeries}>
                            <FontAwesomeIcon icon={faCircleInfo} className='pe-3' />More Info
                        </ModalComponent>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BackdropText;