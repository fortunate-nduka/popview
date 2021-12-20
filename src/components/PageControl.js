import { Link } from 'react-scroll'
import { useContext } from 'react';
import DataContext from '../contexts/DataContext';

function PageControl() {
  const { page, setPage, searchTerm } =
    useContext(DataContext);

  const handleNext = (prevState) => {
    setPage((prevState) => prevState + 1)
    // window.scrollTo(0, 0);
  }
  const handlePrev = (prevState) => {
    setPage((prevState) => prevState - 1)
    // window.scrollTo(0, 0);
  }

  return (
    !searchTerm && (
      <div className='flex movies-button ai-c jc-c'>
        {page <= 1 ? (
          <button className='red'>Prev</button>
        ) : (
          <Link to="movies-container" spy={true} smooth={true}><button
            onClick={handlePrev}
            className='red'
          >
            Prev
          </button></Link>
        )}
        <Link to="movies-container" spy={true} smooth={true}><button
          onClick={handleNext}
          className='black'
        >
          Next
        </button></Link>
      </div>
    )
  )
}

export default PageControl
