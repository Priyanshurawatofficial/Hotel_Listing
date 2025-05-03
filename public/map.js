  mapboxgl.accessToken = mapToken;


    const map = new mapboxgl.Map({
        container:'map', 
        center: listing1.geometry.coordinates, 
        zoom: 9 
    });
    
    const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(listing1.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset:25})
    
    .setHTML(`<h4>${listing1.location}</h4><p>Exact location provided after booking</p>`))
    .addTo(map);


    