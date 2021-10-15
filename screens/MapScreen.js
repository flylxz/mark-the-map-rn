import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import MapView, {
  Marker,
  Overlay,
  PROVIDER_GOOGLE,
  Callout,
  Polyline,
} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

import {SideBar} from '../components/SideBar';

import images from '../constants/images';
import {useGetHouseByIdQuery} from '../service/house';
import {editMarker} from '../store/houseSlice';
import {openModalAdd, openModalEdit} from '../store/modalSlice';

export const MapScreen = ({route}) => {
  const house = route.params.item;
  const {data, error, isLoading} = useGetHouseByIdQuery(house.id);

  // const {houses} = useSelector(state => state.houses);
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const markerRef = useRef([]);

  // const [[northWest, southEast], setBounds] = useState();
  const [[northWest, southEast], setBounds] = useState([]);

  const calculateBounds = () => {
    return [
      {
        latitude: (+house?.initialRegion?.latitude + 0.002).toFixed(14),
        longitude: (+house?.initialRegion?.longitude - 0.002).toFixed(14),
      },
      {
        latitude: (+house?.initialRegion?.latitude - 0.002).toFixed(14),
        longitude: (+house?.initialRegion?.longitude + 0.002).toFixed(14),
      },
    ];
  };

  useEffect(() => {
    setBounds(calculateBounds());
  }, [data]);

  const checkOutBounds = ({latitude, longitude}) => {
    if (
      latitude >= northWest.latitude ||
      latitude <= southEast.latitude ||
      longitude >= southEast.longitude ||
      longitude <= northWest.longitude
    ) {
      return true;
    }
    return false;
  };

  const mapStyle = [
    {
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  const handleCenter = coords => {
    mapRef.current.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MapView
        userInterfaceStyle="dark"
        customMapStyle={mapStyle}
        ref={map => (mapRef.current = map)}
        style={styles.screen}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={house.initialRegion}
        // onMapReady={() => mapRef.current.setMapBoundaries(...calculateBounds())}
        // onMapReady={() =>
        //   mapRef.current.setMapBoundaries([northWest, southEast])
        // }
        minZoomLevel={17}
        onLongPress={e => {
          if (checkOutBounds(e.nativeEvent.coordinate)) {
            console.log('out of bounds');
          } else {
            dispatch(
              openModalAdd({id: house.id, coords: e.nativeEvent.coordinate}),
            );
          }
        }}
        zoomControlEnabled={true}
        rotateEnabled={false}>
        {house.markers.map((mark, idx) => (
          <Marker
            key={mark.id}
            ref={el => (markerRef.current[idx] = el)}
            coordinate={mark.coords}
            // flat={true}
            title={mark.title}
            description={mark.description}
            draggable
            // onDragEnd={e => {
            //   if (checkOutBounds(e.nativeEvent.coordinate)) {
            //     Platform.OS === 'android'
            //       ? markerRef.current[idx].animateMarkerToCoordinate(
            //           mark.coords,
            //           200,
            //         )
            //       : console.log('out of bound');
            //   } else {
            //     dispatch(
            //       editMarker({...mark, coords: e.nativeEvent.coordinate}),
            //     );
            //   }
            // }}
            onCalloutPress={() => markerRef.current[idx].hideCallout()}>
            <Callout
              tooltip={false}
              onPress={() => {
                dispatch(openModalEdit(mark.id));
              }}
            />
          </Marker>
        ))}

        <Overlay
          // bearing={90}
          image={house.image}
          bounds={[
            [
              (+house.initialRegion.latitude - 0.002).toFixed(14),
              (+house.initialRegion.longitude - 0.002).toFixed(14),
            ],
            [
              (+house.initialRegion.latitude + 0.002).toFixed(14),
              (+house.initialRegion.longitude + 0.002).toFixed(14),
            ],
          ]}
        />

        {/* <Polyline
          coordinates={[
            northWest,
            {
              latitude: northWest.latitude,
              longitude: southEast.longitude,
            },
            southEast,
            {
              latitude: southEast.latitude,
              longitude: northWest.longitude,
            },
            {
              latitude: northWest.latitude,
              longitude: northWest.longitude,
            },
          ]}
        /> */}
        {/* <Polyline
          coordinates={[
            northWest,
            {
              latitude: northWest.latitude,
              longitude: southEast.longitude,
            },
            southEast,
            {
              latitude: southEast.latitude,
              longitude: northWest.longitude,
            },
            {
              latitude: northWest.latitude,
              longitude: northWest.longitude,
            },
          ]}
        /> */}
      </MapView>
      <SideBar value={data.markers} onPress={handleCenter} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
});
