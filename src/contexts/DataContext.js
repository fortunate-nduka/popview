import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState();
	const [searchTerm, setSearchTerm] = useState('');
	const [totalPages, setTotalPages] = useState();

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
				totalPages,
				setTotalPages,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
export default DataContext;
