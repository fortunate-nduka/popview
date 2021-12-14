import { DataProvider } from './contexts/DataContext';
import { Routes, Route } from 'react-router-dom';
import SingleMovie from './components/SingleMovie';
import Home from './components/Home';
import Casts from './components/Casts';
import Crews from './components/Crews';

function App() {
	return (
		<DataProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movie/:id' element={<SingleMovie />} />
				<Route path='/cast/:id' element={<Casts />} />
				<Route path='/crew/:id' element={<Crews />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</DataProvider>
	);
}

export default App;
