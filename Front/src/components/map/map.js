import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker } from 'react-map-gl';

import './map.css'


mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW5vLXdpbGxpYW0iLCJhIjoiY2xkbGx2ZnVwMDBvNjN2bGU2YzNsejRlbyJ9.nx74RQrFKQmjhpwu3EJWuA';


const Map = (props) => {


    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [props.lng, props.lat],
            zoom: zoom

        });
        
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div className="sidebar">
                Doctor's Location
            </div>

            <div ref={mapContainer} className="map-container" />
        </div>
    );
}




export default Map






