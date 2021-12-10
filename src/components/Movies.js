import { useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../contexts/DataContext';
import '../scss/Content.scss';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import NO_IMAGE from '../images/no_image.jpg';

function Movies() {
	const { movies, page, setMovies, setPage, searchTerm, setSearchTerm } =
		useContext(DataContext);

	const IMG_URL = 'https://image.tmdb.org/t/p/original';
	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
	const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

	useEffect(() => {
		if (searchTerm) {
			const fetchMovies = async () => {
				try {
					const response = await axios(SEARCH_URL + searchTerm);
					const listMovies = response.data;
					setMovies(listMovies.results);
				} catch (err) {
					console.log(err);
				}
			};
			fetchMovies();
		} else {
			const fetchMovies = async () => {
				try {
					const response = await axios(API_URL);
					const listMovies = response.data;
					setPage(listMovies.page);
					setMovies(listMovies.results);
				} catch (err) {
					<h1>Something Went Wrong</h1>;
				}
			};
			fetchMovies();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, searchTerm]);

	return (
		<div className='movies'>
			<div className='movies-header'>
				<div className='wrapper'>
					<form className='movies-form flex ai-c jc-c'>
						<SearchIcon className='movies-form-icon' />
						<input
							type='text'
							placeholder='Search'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</form>
				</div>
			</div>
			<div className='wrapper'>
				<div className='movies-container flex wrap'>
					{movies.map((movie) => (
						<div key={movie.id} className='movies-card'>
							<NavLink to={`/movie/${movie.id}`}>
								{movie.poster_path ? (
									<img src={IMG_URL + movie.poster_path} alt='' />
								) : (
									<img src={NO_IMAGE} alt='' />
								)}
							</NavLink>
							<div className='movies-details'>
								<div className='movies-title'>
									{movie.title.length <= 20
										? movie.title
										: `${movie.title.slice(0, 20)}...`}
								</div>
								<div className='movies-info flex ai-c jc-sb'>
									<span>
										{movie.release_date && movie.release_date.slice(0, 4)}
									</span>
									<div className='movies-info-icons flex ai-c jc-c'>
										<span>
											<VisibilityIcon style={{ color: '#d11d1d' }} />
										</span>
										<span>
											<FavoriteIcon style={{ color: '#d11d1d' }} />
										</span>
										<span>
											<StarIcon style={{ color: '#d7ab25' }} />
											{movie.vote_average}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				{!searchTerm && (
					<div className='movies-button flex ai-c jc-c'>
						{page <= 1 ? (
							<button className='red'>Prev</button>
						) : (
							<button
								onClick={() => setPage((prevState) => prevState - 1)}
								className='red'
							>
								Prev
							</button>
						)}
						<button
							onClick={() => setPage((prevState) => prevState + 1)}
							className='black'
						>
							Next
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Movies;
