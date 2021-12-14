import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');

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
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
export default DataContext;
