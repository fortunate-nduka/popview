import { Carousel } from 'react-responsive-carousel';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DataContext from '../contexts/DataContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../scss/Slider.scss';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Slider() {
	const [movies, setMovies] = useState([]);
	const { page } = useContext(DataContext);

	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
	const IMG_URL = 'https://image.tmdb.org/t/p/w1280';

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
		>
			{movies.map((movie) => (
				<div
					key={movie.id}
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${
							IMG_URL + movie.backdrop_path
						})`,
					}}
					className='carousel'
				>
					<header className='carousel-header'>
						<div className='wrapper flex ai-c jc-sb'>
							<div className='carousel-logo'>POP VIEW</div>
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
							<div className='carousel-button flex ai-c'>
								<button className='red'>
									<PlaylistAddIcon />
									Add List
								</button>
							</div>
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
			))}
		</Carousel>
	);
}

export default Slider;
