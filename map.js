function initMap() {
    // Rize Merkez location coordinates
    const petShopLocation = { lat: 41.0201, lng: 40.5234 }; // Coordinates for Rize Merkez

    // Create the map centered at the pet shop location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: petShopLocation,
        styles: [
            {
                featureType: "poi.business",
                stylers: [{ visibility: "on" }],
            },
        ],
    });

    // Add a marker for the pet shop
    const marker = new google.maps.Marker({
        position: petShopLocation,
        map: map,
        title: "Happy Pets - Pet Shop",
        animation: google.maps.Animation.DROP,
    });

    // Add an info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h5 style="margin: 0 0 5px 0;">Happy Pets</h5>
                <p style="margin: 0;">Rize Merkez, Örnek Cad. No:123<br>
                Tel: +90 555 123 4567</p>
            </div>
        `,
    });

    // Show info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}
