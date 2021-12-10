// import Content from './components/Content';
import { DataProvider } from './contexts/DataContext';
import { Routes, Route } from 'react-router-dom';
import SingleMovie from './components/SingleMovie';
import Home from './components/Home';

function App() {
	return (
		<DataProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movie/:id' element={<SingleMovie />} />
			</Routes>
		</DataProvider>
	);
}

export default App;
