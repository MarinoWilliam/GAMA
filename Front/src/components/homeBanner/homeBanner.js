import React from 'react'
import { Carousel } from 'rsuite';
import HomeSearch from '../homeSearch/homeSearch';


const homeBanner = () => {
  return (
    <div className='homeBanner'>
        <Carousel autoplay className="custom-slider">
            <img src="http://res.cloudinary.com/imap2/image/upload/c_fill,g_auto,h_630,q_auto:eco,w_1200/v1508233134/industries/industry-healthcare.jpg" height="250" alt='banner'/>
            <img src="http://res.cloudinary.com/imap2/image/upload/c_fill,g_auto,h_630,q_auto:eco,w_1200/v1508233134/industries/industry-healthcare.jpg" height="250" alt='banner'/>
            <img src="http://res.cloudinary.com/imap2/image/upload/c_fill,g_auto,h_630,q_auto:eco,w_1200/v1508233134/industries/industry-healthcare.jpg" height="250" alt='banner'/>
            <img src="http://res.cloudinary.com/imap2/image/upload/c_fill,g_auto,h_630,q_auto:eco,w_1200/v1508233134/industries/industry-healthcare.jpg" height="250" alt='banner'/>
            <img src="http://res.cloudinary.com/imap2/image/upload/c_fill,g_auto,h_630,q_auto:eco,w_1200/v1508233134/industries/industry-healthcare.jpg" height="250" alt='banner'/>
        </Carousel>
        <div className=''>
            <HomeSearch />
        </div>
    </div>
  )
}

export default homeBanner