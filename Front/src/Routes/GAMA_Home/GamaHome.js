import { React, useRef } from 'react'
import HomeSearch from '../../components/homeSearch/homeSearch';
import HomeDoctorSearch from '../../components/homeDoctorSearch/homeDoctorSearch';
import { Carousel, Button } from 'rsuite';
import useScrollSnap from 'react-use-scroll-snap';
import "./GamaHome.css"
import { useGlobalState } from '../../index';
import NavLink from  '../../components/NavLink/Navlink';


const GamaHome = () => {
  // scroll snap feature
  const scrollRef = useRef(null);
  useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });
  // full page scroll implementation using Carausal
  const [CaruasalActiveIndex, setCaruasalActiveIndex] = useGlobalState('CaruasalActiveIndex');
  const controlCaruasal = () => {
    if (CaruasalActiveIndex === 2) {
      setCaruasalActiveIndex(0);
    }
    else {
      setCaruasalActiveIndex(CaruasalActiveIndex + 1);
    }
  }
  return (
    <section ref={scrollRef}>
      <div className='bannerSection' style={{ paddingTop: "0" }}>
        <Carousel className="custom-slider" placement="right" shape="bar" activeIndex={CaruasalActiveIndex}>
          {/* Carouel Slide one Home page */}
          <div className="carousalSlide" style={{ backgroundImage: `url(${require("../../images/HomeSlider1.jpg")})` }}>
            <h1 className='SliderText'>
              GAMA is a Healthcare Solutions Leading Company.
              <Button as={NavLink} href='/about' size="lg" appearance="primary" color="orange" style={{ marginLeft: "21%" }} >Know More</Button>
            </h1>
            <p className='sliderPtext'>
              Supporting Medical providers and
              patients with secure and high quality data across all platforms maintaining
              easy access any where for better healthcare.
            </p>
          </div>

          {/* Carousel Slide 2 Search page */}
          <div className="carousalSlide" style={{ backgroundImage: `url(${require("../../images/HomeSlider3.jpg")})` }}>
            <div id="searchSection">
              <div className='searchBar'>
                <HomeSearch />
              </div>
            </div>
            <p className='sliderP2text'>Giving you access to all kind of medical data so you can monitor all vitals
              and making sure your loved ones getting the care they need.
            </p>
          </div>
          
          {/* Carousel Slide 3 Search page */}
          <div className="carousalSlide" style={{ backgroundImage: `url(${require("../../images/homeDoc.jpg")})` }}>
            <div id="searchSection">
                <HomeDoctorSearch />
            </div>
          </div>
        </Carousel>

        <div class="arrow">
          <span onClick={controlCaruasal}></span>
        </div>
      </div>



    </section>
  )
}

export default GamaHome