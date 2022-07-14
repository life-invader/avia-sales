import ContentLoader from 'react-content-loader';
import './loader.scss';

function Loader() {
  return (
    <ContentLoader
      className="loader ticket"
      speed={1}
      width={502}
      height={135}
      viewBox="0 0 502 135"
      backgroundColor="#ffffff"
      foregroundColor="#2e2828"
    >
      <rect x="0" y="80" rx="3" ry="3" width="462" height="18" />
      <rect x="0" y="110" rx="3" ry="3" width="462" height="21" />
      <rect x="362" y="20" rx="3" ry="3" width="110" height="36" />
      <rect x="0" y="20" rx="3" ry="3" width="82" height="21" />
    </ContentLoader>
  );
}

export default Loader;
