import React, {
  useEffect,
  Suspense,
  useState,
  useRef,
  useContext,
} from 'react';
import axios from 'axios';
import mapboxGl from 'mapbox-gl';
import HandLoader from '../../assets/animations/HandLoader';
import GLobalContext from '../../contexts/AppContext/Context';

const Map = (props) => {
  const [Map, setMap] = useState(false);
  // add ref to map
  const mapRef = useRef();
  const { width, height } = props;
  const [Data, setData] = useState(false);

  // get app context
  const { globalState, actions } = useContext(GLobalContext);

  async function getAsset() {
    try {
      await axios.get('https://ms-proto.herokuapp.com/asset/').then((res) => {
        setData(res.data);
        console.log(res);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  // data effect
  useEffect(() => {
    getAsset();
  }, []);

  useEffect(() => {
    //   set mapbox token
    mapboxGl.accessToken =
      'sk.eyJ1Ijoib2RkZmVlbGluZyIsImEiOiJja3lscTcwZjAzOHRoMnhwYmRjOGRxMGV5In0.zDVFIZLB60dsnRkxAzOYGw';

    setMap(
      new mapboxGl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center:
          (Data && Data[0].location.coordinatesBefore) ||
          globalState.map.center,
        zoom: 5 || globalState.map.zoom,
        pitch: 50,
      })

        .addControl(
          new mapboxGl.NavigationControl({ visualizePitch: true }),
          'bottom-right'
        )
        .addControl(
          new mapboxGl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            showUserHeading: true,
            showUserLocation: true,
            trackUserLocation: true,
          }),
          'bottom-right'
        )
    );
  }, []);

  // Add markers to map
  useEffect(() => {
    actions.setProject(Data);
    // marker colors
    const colors = {
      finished: '#5BAF5F',
      inProgress: '#18BCD1',
      noStarted: '#E9423F',
      attention: '#FD9913',
    };

    if (Data) {
      for (const data of Data) {
        // check status to set color
        let MarkerColor = colors.inProgress;
        if (data.maintenance[0].condition === 'Critical')
          MarkerColor = colors.noStarted;
        if (data.maintenance[0].condition === 'Important')
          MarkerColor = colors.finished;
        if (data.maintenance[0].condition === 'Low')
          MarkerColor = colors.attention;

        // add the marker to map
        new mapboxGl.Marker({ color: MarkerColor })
          .setLngLat(data.location.coordinatesBefore)
          .addTo(Map) // add popups to markers
          .setPopup(
            new mapboxGl.Popup({ offset: 25 }).setHTML(
              `<img src = ${data.image} alt = ''/>
              <h2>${data.title}</h2>
              <p><b>Start Date: </b> ${data.maintenance[0].condition}</p>
              <p><b>Category:</b> ${data.category}</p>
              <p>${data.description}</p>`
            )
          );
      }
    }
  }, [Data]);

  // handle map center
  useEffect(() => {
    if (Map) Map.setCenter(globalState.map.center);
    console.log(globalState.map.center);
  }, [globalState.map.center]);

  // container style
  const MapStyles = {
    width: width,
    height: height,
    flexShrink: 0,
    minHeight: '400px',
    boxShadow: '3px 6px 22px rgba(0,0,0,0.2)',
  };
  return (
    <Suspense fallback={<HandLoader />}>
      <div ref={mapRef} style={{ ...MapStyles }} />
      <button
        style={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '10vh',
          boxShadow: '3px 6px 9px rgba(0,0,0,0.1)',
        }}
        onClick={getAsset}
      >
        R
      </button>
    </Suspense>
  );
};

export default Map;
