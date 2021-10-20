import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, StyleSheet, Text, View} from 'react-native';

import MapView, {
  Marker,
  Overlay,
  PROVIDER_GOOGLE,
  Callout,
  Polyline,
  AnimatedRegion,
} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

import {SideBar} from '../components/SideBar';
import {useGetHouseByIdQuery, useUpdateMarkerMutation} from '../service/house';

export const MapScreen = ({route, navigation}) => {
  const house = route.params.item;
  const {data, error, isLoading} = useGetHouseByIdQuery(house.id, {
    // pollingInterval: 1000,
  });
  const [updateMarker, {isLoading: isUpdating}] = useUpdateMarkerMutation();

  const mapRef = useRef(null);
  const markerRef = useRef([]);

  const [[northWest, southEast], setBounds] = useState([]);

  // const meterToDegree = meter => (meter / 111000).toFixed(14);

  const calculateBounds = () => {
    return [
      {
        latitude: +(+house?.initialRegion?.latitude + 0.002).toFixed(14),
        longitude: +(+house?.initialRegion?.longitude - 0.004).toFixed(14),
      },
      {
        latitude: +(+house?.initialRegion?.latitude - 0.002).toFixed(14),
        longitude: +(+house?.initialRegion?.longitude + 0.004).toFixed(14),
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

  return (
    <View style={styles.screen}>
      {!!error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : !!data ? (
        <MapView
          userInterfaceStyle="dark"
          customMapStyle={mapStyle}
          ref={map => (mapRef.current = map)}
          style={styles.screen}
          mapType="standard"
          provider={PROVIDER_GOOGLE}
          initialRegion={house.initialRegion}
          onMapReady={() =>
            mapRef.current.setMapBoundaries(...calculateBounds())
          }
          minZoomLevel={15}
          onLongPress={e => {
            if (checkOutBounds(e.nativeEvent.coordinate)) {
              console.warn('out of bounds');
            } else {
              navigation.navigate('AddEdit', {
                house: data,
                newCoords: e.nativeEvent.coordinate,
              });
            }
          }}
          zoomControlEnabled={true}
          rotateEnabled={false}>
          {data.markers.map((mark, idx) => (
            <Marker
              key={mark.id}
              ref={el => (markerRef.current[idx] = el)}
              coordinate={mark.coords}
              // flat={true}
              title={mark.title}
              description={mark.description}
              draggable
              onDragEnd={e => {
                if (checkOutBounds(e.nativeEvent.coordinate)) {
                  Platform.OS === 'android'
                    ? markerRef.current[idx].animateMarkerToCoordinate(
                        mark.coords,
                        500,
                      )
                    : console.log('out of bound');
                } else {
                  updateMarker({
                    id: data.id,
                    body: {
                      ...data,
                      markers: data.markers.map(m =>
                        m.id === mark.id
                          ? {...m, coords: e.nativeEvent.coordinate}
                          : m,
                      ),
                    },
                  });
                }
              }}
              onCalloutPress={() => markerRef.current[idx].hideCallout()}>
              <Callout
                tooltip={false}
                onPress={() =>
                  navigation.navigate('AddEdit', {
                    markerId: mark.id,
                    house: data,
                  })
                }
              />
            </Marker>
          ))}

          <Overlay
            // bearing={90}
            image={house.image}
            // image={require('../assets/images/this.png')}
            bounds={[
              [
                +(+house?.initialRegion.latitude - 0.002).toFixed(14),
                +(+house?.initialRegion.longitude - 0.004).toFixed(14),
              ],
              [
                +(+house.initialRegion.latitude + 0.002).toFixed(14),
                +(+house.initialRegion.longitude + 0.004).toFixed(14),
              ],
            ]}
          />

          {/* <Polyline
            coordinates={[
              northWest,
              {
                latitude: northWest?.latitude,
                longitude: southEast?.longitude,
              },
              southEast,
              {
                latitude: southEast?.latitude,
                longitude: northWest?.longitude,
              },
              {
                latitude: northWest?.latitude,
                longitude: northWest?.longitude,
              },
            ]}
          /> */}
        </MapView>
      ) : (
        <Text>unexpected</Text>
      )}
      {data && <SideBar value={data.markers} onPress={handleCenter} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
});
