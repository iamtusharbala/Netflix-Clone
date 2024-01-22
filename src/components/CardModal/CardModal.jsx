import React from 'react'
import './CardModal.css'

function CardModal() {
    return (
        <><Button variant={variant} onClick={() => setShow(true)}>
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

export default CardModal