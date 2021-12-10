import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../scss/SingleMovie.scss';
import NO_IMAGE from '../images/no_image.jpg';
import { Link } from 'react-router-dom';
import '../scss/Content.scss';
import StarIcon from '@material-ui/icons/Star';

function SingleMovie() {
	const [casts, setCasts] = useState([]);
	const [similars, setSimilars] = useState([]);
	const { id } = useParams();
	const API_KEY = '2e1b1833046bb0966cc107c440e51fe6';
	const CAST_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
	const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
	const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

	useEffect(() => {
		const fetchCast = async () => {
			try {
				const cast = await axios(CAST_URL);
				const similar = await axios(SIMILAR_URL);
				const castList = cast.data;
				const similarList = similar.data;
				console.log(similarList.results);
				setCasts(castList.cast);
				setSimilars(similarList.results.slice(0, 6));
			} catch (err) {
				<h1>Something Went Wrong</h1>;
			}
		};
		fetchCast();
	}, []);
	return (
		<div className='singleMovie'>
			<div className='wrapper'>
				<div className='singleMovie__cast flex ai-c jc-c wrap'>
					{casts.map((cast) => (
						<div className='singleMovie__cast-card'>
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
					))}
				</div>
				<div className='singleMovie__similar flex ai-c jc-c wrap'>
					{similars.map((similar) => (
						<div className='singleMovie__similar-card'>
								{similar.backdrop_path ? (
									<img src={IMG_URL + similar.backdrop_path} alt='' />
								) : (
									<img src={NO_IMAGE} alt='' />
								)}
							<div className='movies-details'>
								<div className='movies-title'>{similar.title}</div>
								<div className='movies-info flex ai-c jc-sb'>
									<span>
										{similar.release_date && similar.release_date.slice(0, 4)}
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
