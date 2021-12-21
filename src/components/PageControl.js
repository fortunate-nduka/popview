import { Link } from 'react-scroll'
import { useContext } from 'react';
import DataContext from '../contexts/DataContext';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function PageControl() {
  const { page, setPage, searchTerm } =
    useContext(DataContext);

  const handleNext = (prevState) => {
    setPage((prevState) => prevState + 1)
  }
  const handlePrev = (prevState) => {
    setPage((prevState) => prevState - 1)
  }

  return (
    !searchTerm && (
      <div className='flex movies-button ai-c jc-c'>
        {page <= 1 ? (
          <button style={{ opacity: '.4',paddingLeft: '2rem', paddingRight: "2rem", marginRight: 0 }} className='red'><ArrowBackIcon className="arrBck" /> Prev</button>
        ) : (
          <Link to="movies-container" spy={true}>
              <button style={{ paddingLeft: '2rem', paddingRight: "2rem", marginRight: 0 }} onClick={handlePrev} className='red'>
              <ArrowBackIcon className="arrBck" /> Prev
            </button>
          </Link>
        )}
        <div style={{ padding: '0 2rem' }} className="page-number">Page {page}</div>
        <Link to="movies-container" spy={true}>
          <button style={{ paddingLeft: '2rem', paddingRight: "2rem" }} onClick={handleNext} className='red'>
            Next <ArrowForwardIcon className="arrFor" />
          </button>
        </Link>
      </div>
    )
  )
}

export default PageControl
