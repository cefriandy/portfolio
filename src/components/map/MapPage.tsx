import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

// Fix for default marker icon issue
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage: React.FC = () => {
    const position: [number, number] = [-0.5634, 100.2793]; // Coordinates for Kecamatan Tambusai, Riau, Indonesia

    return (
        <div className="container">
            <h1 className="mb-4">Map Page</h1>
            <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Your location: Kecamatan Tambusai, Riau, Indonesia
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapPage;