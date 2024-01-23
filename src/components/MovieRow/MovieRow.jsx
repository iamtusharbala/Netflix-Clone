import React, { useEffect, useState } from 'react';
import axios from '../../constants/axios';
import { API_KEY, IMAGE_URL } from '../../constants/constants';
import ModalComponent from '../Modal/ModalComponent'
import './MovieRow.css';


function MovieRow({ title, endpoint, genres = '' }) {
    const [poster, setPoster] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movieDetails, setMovieDetails] = useState();
    const [movieOrSeries, setMovieOrSeries] = useState();
    const [modalStates, setModalStates] = useState([]);


    const handleCardClick = (obj, index) => {
        // Assuming setMovieDetails and setMovieOrSeries are the state-setting functions
        const updatedModalStates = [...modalStates];
        updatedModalStates[index] = true;
        setModalStates(updatedModalStates);
        setMovieDetails(obj);
        setMovieOrSeries(obj.media_type);
        setIsModalVisible(true);
    };


    const handleCloseModal = (index) => {
        const updatedModalStates = [...modalStates];
        updatedModalStates[index] = false;
        setModalStates(updatedModalStates);
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get(`${endpoint}?api_key=${API_KEY}&${genres}`);
                setPoster(response.data.results);
            } catch (error) {
                console.error('Error fetching posters:', error);
            }
        };

        fetchPosters();
    }, [endpoint, genres]);

    return (
        <div className='movierow my-5'>
            <h3>{title}</h3>
            <div className="movie-card card-group card-group-scroll  my-3">
                {poster.map((obj, index) => obj.poster_path && (
                    <React.Fragment key={index}>
                        <div className="card border-radius-0" onClick={() => handleCardClick(obj, index)}>
                            <img src={`${IMAGE_URL + obj.poster_path}`} className="img-fluid" alt={obj.title || obj.name} />
                        </div>

                        {/* Render ModalComponent conditionally based on the modalStates */}
                        {/* {modalStates[index] && (
                            <ModalComponent
                                key={`modal-${index}`}
                                movieDetails={obj}
                                movieOrSeries={obj.media_type}
                                onClose={() => handleCloseModal(index)}
                            />
                        )} */}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default MovieRow;