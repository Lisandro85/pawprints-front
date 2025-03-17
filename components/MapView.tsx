import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getAddressFromLatLng = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  const data = await response.json();
  return data.display_name;
};

const SetViewToUserLocation = ({
  position,
}: {
  position: [number, number];
}) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

const MapView = ({
  onAddressChange,
}: {
  onAddressChange: (address: string) => void;
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(13);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPosition: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(userPosition);

          getAddressFromLatLng(userPosition[0], userPosition[1]).then(
            (address) => {
              setAddress(address);
              onAddressChange(address);
            }
          );
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
        }
      );
    }
  }, []);

  const handleMarkerDrag = async (e: L.DragEndEvent) => {
    const newPosition = e.target.getLatLng();
    setPosition([newPosition.lat, newPosition.lng]);

    const newAddress = await getAddressFromLatLng(
      newPosition.lat,
      newPosition.lng
    );
    setAddress(newAddress);
    onAddressChange(newAddress);
  };

  const handleZoom = (e: L.LeafletEvent) => {
    setZoom(e.target.getZoom());
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("zoomend", handleZoom);
    }
  }, []);

  return (
    <div
      className="leaflet-container-wrapper"
      style={{ height: "300px", width: "100%" }}
    >
      <MapContainer
        center={position || [51.505, -0.09]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="leaflet-container"
        whenReady={() => {
          if (mapRef.current) {
            console.log("Mapa listo");
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <SetViewToUserLocation position={position} />}
        {position && (
          <Marker
            position={position}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
          >
            <Popup>¡Estás aquí!</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapView), { ssr: false });
