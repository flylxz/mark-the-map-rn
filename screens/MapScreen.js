import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MapView, {
  Marker,
  Overlay,
  PROVIDER_GOOGLE,
  Callout,
  Polyline,
} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

import {SideBar} from '../components/SideBar';

import icons from '../constants/icons';
import {openModalAdd, openModalEdit} from '../store/modalSlice';

export const MapScreen = ({route}) => {
  const {initialRegion, markers} = useSelector(state => state.markers);
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const calloutRef = useRef([]);

  const calculateBounds = () => {
    return [
      {
        latitude: +(initialRegion.latitude + 0.002).toFixed(14),
        longitude: +(initialRegion.longitude - 0.002).toFixed(14),
      },
      {
        latitude: +(initialRegion.latitude - 0.002).toFixed(14),
        longitude: +(initialRegion.longitude + 0.002).toFixed(14),
      },
    ];
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
      <MapView
        customMapStyle={mapStyle}
        ref={map => (mapRef.current = map)}
        style={styles.screen}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        onMapReady={() => mapRef.current.setMapBoundaries(...calculateBounds())}
        // showsMyLocationButton={true}
        minZoomLevel={17}
        // maxZoomLevel={15}
        onLongPress={e => {
          // console.log(e.nativeEvent);
          dispatch(openModalAdd(e.nativeEvent.coordinate));
        }}
        zoomControlEnabled={true}>
        {markers.map((mark, idx) => (
          <Marker
            key={mark.id}
            coordinate={mark.coords}
            title={mark.title}
            description={mark.description}
            draggable
            // onPress={e => openModal(e, mark)}
            // onDragStart={()=>openModal(mark)}
            // onDragEnd={e => onDragEnd(mark.id, e.nativeEvent.coordinate)}
            ref={el => (calloutRef.current[idx] = el)}
            onCalloutPress={() => calloutRef.current[idx].hideCallout()}>
            <Callout
              tooltip={false}
              onPress={() => {
                dispatch(openModalEdit(mark.id));
              }}
            />
          </Marker>
        ))}

        <Overlay
          image={icons.house1}
          bounds={[
            [
              +(initialRegion.latitude - 0.0007).toFixed(14),
              +(initialRegion.longitude - 0.0009).toFixed(14),
            ],
            [
              +(initialRegion.latitude + 0.0009).toFixed(14),
              +(initialRegion.longitude + 0.0009).toFixed(14),
            ],
          ]}
          // bounds={[
          //   [50.0312, 36.2214],
          //   [50.0321, 36.223],
          // ]}
        />

        <Polyline
          coordinates={[
            calculateBounds()[0],
            {
              latitude: calculateBounds()[0].latitude,
              longitude: calculateBounds()[1].longitude,
            },
            calculateBounds()[1],
            {
              latitude: calculateBounds()[1].latitude,
              longitude: calculateBounds()[0].longitude,
            },
            {
              latitude: calculateBounds()[0].latitude,
              longitude: calculateBounds()[0].longitude,
            },
          ]}
        />
      </MapView>
      <SideBar value={markers} onPress={handleCenter} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
});
