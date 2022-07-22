import ContentLoader from 'react-content-loader';
import './loader.scss';

function Loader() {
  return (
    <ContentLoader
      className="loader"
      speed={1.5}
      viewBox="0 0 502 135"
      backgroundColor="#ffffff"
      foregroundColor="#2196f3"
    >
      <rect x="0" y="0" rx="0" ry="0" width="502" height="135" />
    </ContentLoader>
  );
}

export default Loader;
