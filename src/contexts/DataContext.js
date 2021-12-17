import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [singleMovie, setSingleMovie] = useState([]);

	return (
		<DataContext.Provider
			value={{
				movies,
				setMovies,
				loading,
				setLoading,
				page,
				setPage,
				searchTerm,
				setSearchTerm,
				singleMovie, setSingleMovie
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
export default DataContext;
