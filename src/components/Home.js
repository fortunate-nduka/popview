import Movies from './Movies';
import Carousel from './Slider';
import { DataProvider } from '../contexts/DataContext';

function App() {
	return (
		<DataProvider>
			<Carousel />
			<Movies />
		</DataProvider>
	);
}

export default App;
