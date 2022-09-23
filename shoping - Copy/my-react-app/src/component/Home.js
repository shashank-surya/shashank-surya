import SimpleImageSlider from "react-simple-image-slider";
import img1 from '../Images/img.jpg'
import img2 from '../Images/img1.jpg'
import img3 from '../Images/img2.jpg'
import img4 from '../Images/img3.jpg'
const Home = () => {
    const images = [
        {url:img1},
        { url:img2 },
        { url:img3  },
        { url:img4 },
      ];
      
    return (
      <div>
        <SimpleImageSlider
          width={1400}
          height={670}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div>
    );
  }
  export default Home;