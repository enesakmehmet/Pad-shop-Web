// Google Maps Implementation
let map;
let marker;
let infoWindow;

// Store map styles
const mapStyles = [
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#242f3e" }]
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242f3e" }]
    },
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#746855" }]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
    }
];

// Store location data
const locationData = {
    lat: 41.0201,
    lng: 40.5234,
    address: 'Rize Merkez, Örnek Cad. No:123',
    phone: '+90 555 123 4567',
    name: 'Happy Pets',
    openingHours: 'Her gün 09:00 - 21:00'
};

// Initialize the map
function initMap() {
    // Check if the map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    try {
        // Create map instance
        map = new google.maps.Map(mapContainer, {
            zoom: 15,
            center: { lat: locationData.lat, lng: locationData.lng },
            styles: mapStyles,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: 'cooperative',
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        });

        // Create marker
        marker = new google.maps.Marker({
            position: { lat: locationData.lat, lng: locationData.lng },
            map: map,
            title: locationData.name,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        // Create info window
        infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(),
            maxWidth: 300
        });

        // Add marker click event
        marker.addListener('click', toggleInfoWindow);

        // Add map click event to close info window
        map.addListener('click', () => {
            infoWindow.close();
        });

        // Add zoom changed event
        map.addListener('zoom_changed', () => {
            const zoomLevel = map.getZoom();
            if (zoomLevel < 12) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 1500);
            }
        });

        // Add responsive handling
        window.addEventListener('resize', () => {
            const center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });

        // Add directions button click handler
        document.getElementById('getDirections')?.addEventListener('click', () => {
            openDirections();
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        showMapError();
    }
}

// Create info window content
function createInfoWindowContent() {
    return `
        <div class="map-info-window">
            <h3 style="margin: 0 0 10px 0; color: #2c5530;">${locationData.name}</h3>
            <p style="margin: 0 0 5px 0;"><i class="fas fa-map-marker-alt"></i> ${locationData.address}</p>
            <p style="margin: 0 0 5px 0;"><i class="fas fa-phone"></i> ${locationData.phone}</p>
            <p style="margin: 0 0 10px 0;"><i class="fas fa-clock"></i> ${locationData.openingHours}</p>
            <button id="getDirections" 
                    style="background: #2c5530; color: white; border: none; 
                           padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                Yol Tarifi Al
            </button>
        </div>
    `;
}

// Toggle info window
function toggleInfoWindow() {
    if (infoWindow.getMap()) {
        infoWindow.close();
    } else {
        infoWindow.open(map, marker);
    }
}

// Open directions in Google Maps
function openDirections() {
    const destination = `${locationData.lat},${locationData.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
}

// Show error message if map fails to load
function showMapError() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ff4444;"></i>
                <h3>Harita Yüklenemedi</h3>
                <p>Lütfen internet bağlantınızı kontrol edin ve sayfayı yenileyin.</p>
                <button onclick="location.reload()" 
                        style="background: #2c5530; color: white; border: none; 
                               padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    Yenile
                </button>
            </div>
        `;
    }
}

// Add error handling for Google Maps loading
function handleGoogleMapsError() {
    console.error('Google Maps failed to load');
    showMapError();
}

// Initialize map when Google Maps API is loaded
window.initMap = initMap;
window.gm_authFailure = handleGoogleMapsError;
