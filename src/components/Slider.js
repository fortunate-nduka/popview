import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../scss/Slider.scss';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Slider() {
	const [movies, setMovies] = useState([]);
	const rand = Math.floor(Math.random() * 5) + 1;

	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${rand}`;
	const IMG_URL = 'https://image.tmdb.org/t/p/original';
	const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios(API_URL);
				const listMovies = response.data;
				setMovies(listMovies.results);
			} catch (err) {
				<h1>Something Went Wrong</h1>;
			}
		};
		fetchMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Carousel
			infiniteLoop={true}
			interval={4000}
			showIndicator={false}
			showIndicators={false}
			showStatus={false}
			showThumbs={false}
			transitionTime={10}
			autoPlay={true}
			swipeable={false}
		>
			{movies.map((movie) => (
				<div
					key={movie.id}
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(${IMG_URL + movie.backdrop_path
							})`,
					}}
					className='carousel'
				>
					<img className="carousel-bg" style={{ display: 'none' }} src={`${IMG_URL + movie.backdrop_path
						}`} alt="" />
					<header className='carousel-header'>
						<div className='flex wrapper ai-c jc-sb'>
							<Link to="/">
								<div className='carousel-logo'>POPVIEW</div>
							</Link>
							<div className='flex carousel-header-nav ai-c jc-c'>
								<span>
									<PlaylistPlayIcon style={{ fontSize: '3.2rem' }} />
								</span>
								<span>
									<NotificationsIcon />
								</span>
							</div>
						</div>
					</header>
					<div className='flex wrapper ai-c jc-sb'>
						<div className='carousel-content'>
							<div className='carousel-title'> {movie.title} </div>
							<div className='flex carousel-timeGenre ai-c'>
								<span className='flex ai-c jc-c'>
									<StarIcon style={{ color: '#d7ab25' }} />
									{movie.vote_average}
								</span>
								<span className='divider'>|</span>
								{movie.release_date.slice(0, 4)}
								<span className='divider'>|</span>
								<span className='flex ai-c jc-c'>
									<FavoriteIcon style={{ color: '#d11d1d' }} />
									{movie.vote_count}
								</span>
							</div>
							<div className='carousel-overview'> {(movie.overview).length > 250 ? `${(movie.overview).slice(0, 250)} .....` : movie.overview}</div>
							{!movie.overview && <div className="carousel-noOverview">Sorry, Storyline not Available in Movie Database</div>}
							<Link to={`/movie/${movie.id}`}><button className="carousel-btn red">More Details <ArrowForwardIcon/></button>
							</Link>
						</div>
						<figure className='carousel-figure'>
							<img
								className='carousel-poster'
								src={POSTER_URL + movie.poster_path}
								alt=''
							/>
						</figure>
					</div>
				</div>
			))}
		</Carousel>
	);
}

export default Slider;
