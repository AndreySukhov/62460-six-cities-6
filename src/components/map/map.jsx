import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

import {MAP_DATA} from '../../util/constants';

import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: MAP_DATA.ICONS.default,
  iconSize: [30, 30]
});

const activeIcon = L.icon({
  iconUrl: MAP_DATA.ICONS.active,
  iconSize: [30, 30]
});

const Map = ({
  points,
  activeMarkerId,
  center,
  zoom,
}) => {
  const mapRef = useRef();
  const [mapInstance, setMapInstance] = useState(null);
  const [markersInstance, setMarkersInstance] = useState(null);

  useEffect(() => {
    if (!mapInstance) {
      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: false,
        marker: true,
      });

      map.setView(center, zoom);
      L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      }).addTo(map);
      setMapInstance(map);
    }
  }, [points]);

  useEffect(() => {

    if (mapInstance) {
      if (points.length) {
        const markers = points.map((point) => {
          return L.marker({
            lat: point.lat, lng: point.lng
          }, {defaultIcon, offerId: point.offerId});
        });
        const markersLayer = L.featureGroup(markers).addTo(mapInstance);
        mapInstance.fitBounds(markersLayer.getBounds());
        setMarkersInstance(markers);
      }
    }
  }, [points, mapInstance]);

  useEffect(() => {
    if (markersInstance) {
      markersInstance.forEach((marker) => {
        const isActive = marker.options.offerId === activeMarkerId;
        marker.setIcon(isActive ? activeIcon : defaultIcon);
      });
    }
  }, [markersInstance, activeMarkerId]);

  return (
    <div id="map" ref={mapRef} style={{width: `100%`, height: `100%`}} />
  );
};

Map.propTypes = {
  zoom: PropTypes.number,
  activeMarkerId: PropTypes.number,
  center: PropTypes.arrayOf(PropTypes.number),
  points: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }))
};

Map.defaultProps = {
  center: MAP_DATA.CENTER,
  zoom: MAP_DATA.DEFAULT_ZOOM,
};

export default Map;
