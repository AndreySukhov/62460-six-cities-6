import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const MAP_CENTER = [52.38333, 4.9];
const MAP_DEFAULT_ZOOM = 12;

const Map = ({
  points,
  center = MAP_CENTER,
  zoom = MAP_DEFAULT_ZOOM,
}) => {
  const mapRef = useRef();
  useEffect(() => {
    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: false,
      marker: true,
    });

    map.setView(center, zoom);

    const icon = L.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(map);
    if (points.length) {
      const markers = points.map((point) => {
        return L.marker(point, {icon});
      });
      const markersLayer = L.featureGroup(markers).addTo(map);
      map.fitBounds(markersLayer.getBounds());
    }
    return () => {
      map.remove();
    };
  }, [points]);

  return (
    <div id="map" ref={mapRef} style={{width: `100%`, height: `100%`}} />
  );
};

Map.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.arrayOf(PropTypes.number),
  points: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }))
};

export default Map;
