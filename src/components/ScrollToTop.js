import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function ScrollToTop() {
 const goToTop = () => {
  window.scrollTo(0, 0);
 }

 return (
  <div onClick={goToTop} className="scrollToTop"><ArrowUpwardIcon /></div>
 )
}

export default ScrollToTop
