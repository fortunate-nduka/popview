import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../scss/SingleMovie.scss';
import '../scss/Slider.scss';
import NO_IMAGE from '../images/no_image.jpg';
import  KeyboardBackspaceIcon  from "@material-ui/icons/KeyboardBackspace";
import DataContext from "../contexts/DataContext";
import Spinner from './Spinner'
import '../scss/Spinner.scss'

function Casts() {
  const { loading, setLoading } = useContext(DataContext)
  const [casts, setCasts] = useState([])
  const { id } = useParams();

  const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
  const CAST_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const IMG_URL = 'https://image.tmdb.org/t/p/w185';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await axios(CAST_URL);
        const castList = cast.data;
        setCasts(castList.cast);
        setLoading(false)
      } catch (err) {
        <h1>Something Went Wrong</h1>;
      }
    };
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    loading? <Spinner/> :
    <>
      <header className='carousel-header'>
        <div className='flex wrapper ai-c jc-sb'>
          <Link to={`/movie/${id}`}>
            <div className="flex ai-c jc-c"><KeyboardBackspaceIcon style={{marginRight: '.9rem', fontSize: '2rem'}}/> Go Back</div>
          </Link>
        </div>
      </header>
      <div className='wrapper' style={{ padding: '4rem 0' }}>
        <div className="section-title" style={{ marginTop: 0 }}>casts</div>
        <div className='flex singleMovie__cast ai-s jc-c wrap'>
          {casts.map((cast) => (
            <>
              {cast.profile_path && (
                <div key={cast.id} className='singleMovie__cast-card'>
                  {cast.profile_path ? (
                    <img src={IMG_URL + cast.profile_path} alt='' />
                  ) : (
                    <img src={NO_IMAGE} alt='' />
                  )}
                  <div className='singleMovie__cast-name'>
                    <span>Name: </span>
                    {cast.name}
                  </div>
                  <div className='singleMovie__cast-gender'>
                    <span>Gender: </span>
                    {cast.gender === 1 ? 'Female' : 'Male'}
                  </div>
                  <div className='singleMovie__cast-character'>
                    <span>Character: </span> {cast.character}
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

export default Casts
