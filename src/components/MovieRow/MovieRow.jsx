import React, { useEffect, useState } from 'react';
import axios from '../../constants/axios';
import { API_KEY, IMAGE_URL } from '../../constants/constants';
import './MovieRow.css';

function MovieRow({ title, endpoint, genres = '' }) {
    const [poster, setPoster] = useState([]);

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
            <div className="movie-card card-group card-group-scroll my-3">
                {poster.map((obj, index) =>
                    obj.poster_path && (
                        <div className="card border-radius-0" key={index}>
                            <img src={`${IMAGE_URL + obj.poster_path}`} className="img-fluid" alt={obj.title || obj.name} />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default MovieRow;