import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

// import React, { useState } from "react"
// import ReactMapGl from "react-map-gl"
import './ReactMapGl.css'

const ReactMap = (props) => {
  const [viewPort, setViewPort] = React.useState({
    longitude: props.lng,
    latitude: props.lat,
    zoom: 5,
    bearing: 0,
    pitch: 0

  })
  const _updateViewport = viewport => {
    setViewPort(viewport)
  };

  return <Map className="map_dev"
    // {...viewPort}
    initialViewState={{
      longitude: props.lng,
      latitude: props.lat,
      zoom: 5,
      bearing: 0,
      pitch: 0

    }}
    onViewportChange={_updateViewport}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >

    <Marker  longitude={props.lat} latitude={props.lng} anchor="bottom" >
      <img className='pin_image' src={require("../../images/pinMid.png")} alt='pin' />
    </Marker>
  </Map>;
}

export default ReactMap

// return <Map className="map-container" 
//     initialViewState={{
//         longitude: props.lng,
//         latitude: props.lat,
//       zoom: 3.5
//     }}
//     mapStyle="mapbox://styles/mapbox/streets-v9"
//     attributionControl={false}
//   >

//     <Marker longitude={props.lng} latitude={props.lat} anchor="bottom" >
//     <img className='pin_image' src={require("../../images/pinMid.png")} alt='ss'  />
//     </Marker>
//   </Map>;




// const [viewport, setViewport] = useState({
//     longitude: props.lng,
//     latitude: props.lat,
//     height: "155px",
//     zoom: 5
// }
// );



// return (<dev>
//     <ReactMapGl
//      mapStyle="mapbox://styles/mapbox/streets-v9"

//      {...viewport} 
//      mapboxAccessToken={'pk.eyJ1IjoibWFyaW5vLXdpbGxpYW0iLCJhIjoiY2xkbGx2ZnVwMDBvNjN2bGU2YzNsejRlbyJ9.nx74RQrFKQmjhpwu3EJWuA'}
//      onViewportChange={viewport=>{
//         setViewport(viewport);
//        }}

//      >
//     marker here
//     </ReactMapGl>
// </dev>
// );