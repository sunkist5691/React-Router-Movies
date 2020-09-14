import React, { useState, useEffect } from 'react';
import { Route, useParams, useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';


const Links = styled.div `

  display: flex;
  justify-content: flex-start;
  margin-bottom: 2%;

`

export default function Movie({props}) {
  const [movie, setMovie] = useState();
  const routeMatch = useRouteMatch();
  const param = useParams();

  

  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL

  // const [id, setId] = useState('1')

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${param.id}`) // Study this endpoint with Postman
      .then(response => {
        // Study this response with a breakpoint or log statements
        // and set the response data as the 'movie' slice of state
        setMovie(response.data)

        // setId(param.id)

      })
      .catch(error => {
        console.error(error);
      });
    // This effect should run every time time
    // the `id` changes... How could we do this?
  }, [ /*id*/ ]);

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => { }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>
        <Links>
          <Link to={`${routeMatch.url}/star`} style={{color: 'grey', textDecoration: 'none'}}>More</Link>
        </Links>

        {
          stars.map( star =>
            (<Route exact path={`${routeMatch.url}/star`}><div key={star} className="movie-star">{star}</div></Route>)
          )
        }
      <Link to={`${routeMatch.url}`} style={{color: 'grey', textDecoration: 'none', marginTop: '2%'}}>Hide</Link>
      </div>
      <div className="save-button">Save</div>
    </div>
  );
}
