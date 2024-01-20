import React from 'react'
import './BackdropText.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../Modal/ModalComponent'

function BackdropText({ title, description, movieDetails }) {
    return (
        <div className="backdroptext text mb-5">
            <div className="col-md-7">
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="description py-2">
                    <h5 className='fs-5'>{description}</h5>
                </div>
                {title && <div className="description-buttons">
                    <button type="button" className="btn btn-light btn-lg"><FontAwesomeIcon icon={faPlay} className='pe-3' />Play</button>
                    <ModalComponent variant="btn btn-dark btn-lg opacity-75" movieDetails={movieDetails}><FontAwesomeIcon icon={faCircleInfo} className='pe-3' />More Info</ModalComponent>
                </div>}
            </div>
        </div>
    )
}

export default BackdropText