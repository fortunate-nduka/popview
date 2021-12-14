import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../scss/SingleMovie.scss';
import NO_IMAGE from '../images/no_image.jpg';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import NotificationsIcon from '@material-ui/icons/Notifications';

function Crews() {
  const [crews, setCrews] = useState([])
  const { id } = useParams();

  const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
  const CAST_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const IMG_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const crew = await axios(CAST_URL);
        const castList = crew.data;
        setCrews(castList.crew);
      } catch (err) {
        <h1>Something Went Wrong</h1>;
      }
    };
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className='carousel-header'>
        <div className='wrapper flex ai-c jc-sb'>
          <Link to="/">
            <div className='carousel-logo'>POPVIEW</div>
          </Link>
          <div className='carousel-header-nav flex ai-c jc-c'>
            <span>
              <PlaylistPlayIcon style={{ fontSize: '3.2rem' }} />
            </span>
            <span>
              <NotificationsIcon />
            </span>
          </div>
        </div>
      </header>
      <div className="wrapper" style={{ padding: '4rem 0' }}>
        <div className="section-title" style={{ marginTop: 0 }}>crews</div>
        <div className='singleMovie__cast flex ai-s jc-c wrap'>
          {crews.map((crew) => (
            <>
              {crew.profile_path && (
                <div key={crew.id} className='singleMovie__cast-card'>
                  {crew.profile_path ? (
                    <img src={IMG_URL + crew.profile_path} alt='' />
                  ) : (
                    <img src={NO_IMAGE} alt='' />
                  )}
                  <div className='singleMovie__cast-name'>
                    <span>Name: </span>
                    {crew.name}
                  </div>
                  <div className='singleMovie__cast-gender'>
                    <span>Department: </span>
                    {crew.department}
                  </div>
                  <div className='singleMovie__cast-character'>
                    <span>Job: </span> {crew.job}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Crews
