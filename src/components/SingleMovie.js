import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/SingleMovie.scss';
import NO_IMAGE from '../images/no_image.jpg';
import '../scss/Slider.scss';
import '../scss/Content.scss';
import StarIcon from '@material-ui/icons/Star';
// import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';

function SingleMovie() {
	const [casts, setCasts] = useState([]);
	const [crews, setCrews] = useState([]);
	const [similars, setSimilars] = useState([]);
	const [movie, setMovie] = useState([]);
	const { id } = useParams();
	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const CAST_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
	const IMG_URL = 'https://image.tmdb.org/t/p/original';
	const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
	const MOVIE_URL = `
https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

	useEffect(() => {
		const fetchCast = async () => {
			try {
				const cast = await axios(CAST_URL);
				const similar = await axios(SIMILAR_URL);
				const movie = await axios(MOVIE_URL);
				const castList = cast.data;
				const similarList = similar.data;
				const movieList = movie.data;
				// console.log(similarList.results);
				console.log(castList);
				setMovie(movieList);
				setCasts(castList.cast.slice(0, 6));
				setCrews(castList.crew.slice(0, 8));
				setSimilars(similarList.results.slice(0, 3));
			} catch (err) {
				<h1>Something Went Wrong</h1>;
			}
		};
		fetchCast();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='singleMovie '>
				<div
					className='carousel'
					key={movie.id}
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${IMG_URL + movie.backdrop_path
							})`,
					}}
				>
					<header className='carousel-header'>
						<div className='wrapper flex ai-c jc-sb'>
							<Link to='/'>
								<div className='singleMovie-logo flex ai-c jc-c'>
									<KeyboardBackspaceIcon /> Go back to homepage
								</div>
							</Link>
						</div>
					</header>
					<div className='wrapper singleMovie-wrapper flex ai-c jc-sb'>
						<div className='carousel-content'>
							<div className='carousel-title'> {movie.title} </div>
							<div className='carousel-timeGenre flex ai-c'>
								<span className='flex ai-c jc-c'>
									<StarIcon style={{ color: '#d7ab25' }} />
									{movie.vote_average}
								</span>
								<span className='divider'>|</span>
								{movie.release_date}
								<span className='divider'>|</span>
								<span className='flex ai-c jc-c'>
									<FavoriteIcon style={{ color: '#d11d1d' }} />
									{movie.vote_count}
								</span>
							</div>
							<div className='carousel-overview'> {movie.overview} </div>
							<div className='carousel-button flex ai-c'>
								<button className='red'>
									<PlaylistAddIcon />
									Add List
								</button>
							</div>
						</div>
						<figure className='carousel-figure singleMovie-figure'>
							<img
								className='carousel-poster'
								src={IMG_URL + movie.poster_path}
								alt=''
							/>
						</figure>
					</div>
				</div>
			<div className='wrapper'>
			<div className="section-title">casts</div>
				<div className='singleMovie__cast flex ai-s jc-c wrap'>
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
				<div className="see-all">see all casts</div>
				<div className="section-title">crews</div>
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
				<div className="see-all">see all casts</div>
				<div className="section-title">similar movies</div>
				<div className='singleMovie__similar flex ai-c jc-c wrap'>
					{similars.map((similar) => (
						<div key={similar.id} className='singleMovie__similar-card'>
							{similar.backdrop_path ? (
								<img src={IMG_URL + similar.backdrop_path} alt='' />
							) : (
								<img src={NO_IMAGE} alt='' />
							)}
							<div className='movies-details'>
								<div className='movies-title'>{similar.title}</div>
								<div className='movies-info flex ai-c jc-sb'>
									<span>
										{similar.release_date &&
											similar.release_date.slice(0, 4)}
									</span>
									<div className='movies-info-icons flex ai-c jc-c'>
										<span>
											<StarIcon style={{ color: '#d7ab25' }} />
											{similar.vote_average}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SingleMovie;
