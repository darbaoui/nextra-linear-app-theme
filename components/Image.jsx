import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Image = ({ src, alt }) => (
  <Zoom>
    <img className="rounded-md" alt={alt} src={src} />
  </Zoom>
);

export default Image;
