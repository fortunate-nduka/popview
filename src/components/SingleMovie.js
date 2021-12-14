import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/SingleMovie.scss';
import NO_IMAGE from '../images/no_image.jpg';
import '../scss/Slider.scss';
import '../scss/Content.scss';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DataContext from '../contexts/DataContext';

function SingleMovie() {
	const { singleMovie, setSingleMovie } = useContext(DataContext)
	const [casts, setCasts] = useState([]);
	const [crews, setCrews] = useState([]);
	const [similars, setSimilars] = useState([]);
	const { id } = useParams();
	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const PEOPLE_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
	const IMG_URL = 'https://image.tmdb.org/t/p/original';
	const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
	const MOVIE_URL = `
https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
	// const TRAILER_URL = `https://api.themoviedb.org/3/movie/157336?api_key=2e1b1833046bb0966cc107c440e51fe6&append_to_response=videos`

	useEffect(() => {
		const fetchCast = async () => {
			try {
				const people = await axios(PEOPLE_URL);
				const similar = await axios(SIMILAR_URL);
				const movie = await axios(MOVIE_URL);
				// const trailer = await axios(TRAILER_URL);
				const peopleList = people.data;
				const similarList = similar.data;
				const movieList = movie.data;
				console.log(movieList);
				setSingleMovie(movieList);
				setCasts(peopleList.cast.slice(0, 4));
				setCrews(peopleList.crew.slice(0, 4));
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
		<div className='singleMovie '>
			<div
				className='carousel'
				key={singleMovie.id}
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${IMG_URL + singleMovie.backdrop_path
						})`,
				}}
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
				<div className='wrapper singleMovie-wrapper flex ai-c jc-sb'>
					<div className='carousel-content'>
						<div className='carousel-title'> {singleMovie.title} </div>
						<div className='carousel-tagline'> {singleMovie.tagline} </div>
						{singleMovie.genres &&
							<div className="carousel-genres flex ai-c wrap">
								{singleMovie.genres.map(genre => <div className="carousel-genre">{genre.name}</div>)}
							</div>
						}
						<div className='carousel-timeGenre flex ai-c'>
							<span className='flex ai-c jc-c'>
								<StarIcon style={{ color: '#d7ab25' }} />
								{singleMovie.vote_average}
							</span>
							<span className='divider'>|</span>
							{singleMovie.release_date}
							<span className='divider'>|</span>
							<span className='flex ai-c jc-c'>
								<FavoriteIcon style={{ color: '#d11d1d' }} />
								{singleMovie.vote_count}
							</span>
						</div>
						<div className='carousel-overview'> {singleMovie.overview} </div>
					</div>
					<figure className='carousel-figure singleMovie-figure'>
						<img
							className='carousel-poster'
							src={IMG_URL + singleMovie.poster_path}
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
				{casts && <Link to={`/cast/${id}`}>
					<button className="red see-all">See all cast</button>
				</Link>}
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
				{crews && <Link to={`/crew/${id}`}>
					<button className="red see-all">See all crew</button>
				</Link>}
				<div className="section-title">similar movies</div>
				<div className='singleMovie__similar flex ai-c jc-c wrap'>
					{similars.map((similar) => (
						<Link to={`/movie/${similar.id}`}>
							<div onClick={handleSimilar} key={similar.id} className='singleMovie__similar-card'>
								{similar.poster_path ? (
									<img src={IMG_URL + similar.poster_path} alt='' />
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
			</div>
		</div>
	);
}

export default SingleMovie;
