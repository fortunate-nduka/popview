import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../scss/Slider.scss';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Slider() {
	const [movies, setMovies] = useState([]);
	const rand = Math.floor(Math.random() * 5) + 1;

	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${rand}`;
	const IMG_URL = 'https://image.tmdb.org/t/p/original';
	const CAST_URL = `https://api.themoviedb.org/3/movie/${movies.id}/credits?api_key=${API_KEY}&language=en-US`;

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios(API_URL);
				const listMovies = response.data;
				setMovies(listMovies.results);
				console.log(listMovies);
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
				<Link to={`/movie/${movie.id}`}>
				<div
					key={movie.id}
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${IMG_URL + movie.backdrop_path
							})`,
					}}
					className='carousel'
				>
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
					<div className='wrapper flex ai-c jc-sb'>
						<div className='carousel-content'>
							<div className='carousel-title'> {movie.title} </div>
							<div className='carousel-timeGenre flex ai-c'>
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
							<div className='carousel-overview'> {movie.overview} </div>
							<div className="carousel-starring"></div>
						</div>
						<figure className='carousel-figure'>
							<img
								className='carousel-poster'
								src={IMG_URL + movie.poster_path}
								alt=''
							/>
						</figure>
					</div>
				</div>
				</Link>
			))}
		</Carousel>
	);
}

export default Slider;
