import GoogleMapReact from 'google-map-react'
import * as React from "react";

export default function Map({setCoordinates, setBounds, pubs, location}) {

    const coordinates = {lat: 49.83985851576058, lng: 24.029697439465398}

    function renderMarker(map, maps) {

        location.map((l) => {
            pubs.map((pub) => {
                new maps.Marker({
                    position: l,
                    map,
                    title: pub.name
                });
            })
        })
    }

    return (
        <div className='map'>
            {/*<h3>Карта</h3>*/}
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyAP5Q5CXmnExXciK2oL-cn9_gTGgre1whs'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e)
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                // onChildClick={''}
                onGoogleApiLoaded={({map, maps}) => {
                    renderMarker(map, maps)
                }}
            >

            </GoogleMapReact>

        </div>
    )
}
