import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useBranches } from "@/contexts/BranchesContext";

import styles from "./Map.module.css";

function Map() {
  const { branches, currentBranch } = useBranches();

  const [mapPosition, setMapPosition] = useState<[number, number]>([40.7128, 0]);

  useEffect(
    function () {
      if (currentBranch) setMapPosition(() => [currentBranch.position.lat, currentBranch.position.lng]);
      else {
        setMapPosition(() => [40.7128, 0]);
      }
    },
    [currentBranch]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition as [number, number]}
        zoom={2}
        scrollWheelZoom={true}
        className={`${styles.map} `}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        minZoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branches.map((branch) => (
          <Marker key={branch.cityName} position={[branch.position.lat, branch.position.lng]}>
            <Popup>
              <span>{branch.cityName}</span>
              <span>{branch.countryName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangView position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangView({ position }: { position: [number, number] }) {
  const map = useMap();
  const zoomLevel = position[0] === 40.7128 && position[1] === 0 ? 2 : 13;
  map.setView(position, zoomLevel);

  return null;
}

export default Map;
