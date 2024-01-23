import React from 'react'
import './EpisodeDetails.css'
import { IMAGE_URL } from '../../constants/constants'
import videoUnavailable from '../../assets/video-unavailable.png'

function EpisodeDetails({ episode, index }) {
    console.log(episode);
    return (
        <React.Fragment key={index}>
            <li className="list-group-item text-start">
                <div className="col-lg-5">
                    <div className="episode-number mx-3">
                        <h2 className='mb-0'>{episode.episode_number}</h2>
                    </div>
                    {episode.still_path ?
                        <div className="video-thumbnail">
                            {<img src={`${IMAGE_URL}${episode.still_path}`} alt={`Episode ${episode.episode_number}`} />}
                        </div> : <div className="video-thumbnail">
                            {<img src={videoUnavailable} alt={`Episode ${episode.episode_number}`} />}
                        </div>}
                </div>
                <div className="col-lg-7">
                    <div className="episode-details m-5">
                        <div className="episode-name">
                            <h5 className='mb-0'>{episode.name}</h5>
                        </div>
                        <div className="episode-description">
                            <p>{episode.overview.split(' ')
                                .slice(0, 30)
                                .join(' ')}
                                {episode.overview.split(' ').length > 30 ? '...' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
            <hr />
        </React.Fragment>
    )
}

export default EpisodeDetails