import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../scss/Content.scss';
import StarIcon from '@material-ui/icons/Star';

function SimilarMovies() {
  const [similars, setSimilars] = useState([]);
  const { id } = useParams();
  const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
  const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  const IMG_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const similar = await axios(SIMILAR_URL);
        const similarList = similar.data;
        setSimilars(similarList.results.slice(0, 4));
      } catch (err) {
        <h1>Something Went Wrong</h1>;
      }
    };
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SIMILAR_URL]);

  const handleSimilar = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="section-title">similar movies</div>
      <div className='flex singleMovie__similar ai-c jc-c wrap'>
        {similars.map((similar) => (
          <Link to={`/movie/${similar.id}`}>
            <div onClick={handleSimilar} key={similar.id} className='singleMovie__similar-card'>
              {similar.poster_path && (
                <img src={IMG_URL + similar.poster_path} alt='' />
              )}
              <div className='movies-details'>
                <div className='movies-title'>{similar.title}</div>
                <div className='flex movies-info ai-c jc-sb'>
                  <span>
                    {similar.release_date &&
                      similar.release_date.slice(0, 4)}
                  </span>
                  <div className='flex movies-info-icons ai-c jc-c'>
                    <span>
                      <StarIcon style={{ color: '#d7ab25' }} />
                      {similar.vote_average &&
                        (similar.vote_average)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default SimilarMovies
