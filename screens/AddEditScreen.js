import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateMarkerMutation, useGetHouseByIdQuery} from '../service/house';
import {addMarkerAsync} from '../store/houseSlice';

export const AddEditScreen = ({navigation, route}) => {
  const {markerId, newCoords, house} = route.params;
  const [updateMarker, {isLoading: isUpdating}] = useUpdateMarkerMutation();

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (!!markerId) {
      const mark = house?.markers?.find(i => i.id === markerId);
      setTitle(mark?.title);
      setDescription(mark?.description);
      setCoords(mark?.coords);
      setId(mark?.id);
    } else if (!markerId) {
      setCoords(newCoords);
      //   console.log(coord, newCoords);
    }
  }, [house, markerId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!markerId ? 'Edit mark' : 'Add new mark',
    });
  }, [navigation, markerId]);

  const onSave = () => {
    if (!markerId) {
      const newMark = {
        title,
        description,
        coords,
        id: Date.now(),
      };
      updateMarker({
        id: house.id,
        body: {
          ...house,
          markers: [...house.markers, newMark],
        },
      });
    } else {
      const newMark = {
        title,
        description,
        coords,
        id,
      };
      updateMarker({
        id: house.id,
        body: {
          ...house,
          markers: house.markers.map(mark =>
            mark.id === markerId ? newMark : mark,
          ),
        },
      });
    }
    setTitle('');
    setDescription('');
    setCoords({});
    setId('');

    navigation.goBack();
  };

  const onDelete = id => {
    updateMarker({
      id: house.id,
      body: {
        ...house,
        markers: house.markers.filter(m => m.id !== id),
      },
    });
    navigation.goBack();
  };

  const onClose = () => {
    setTitle('');
    setDescription('');
    setCoords({});
    setId('');
    navigation.goBack();
  };

  // const addNewMarker = e => {
  //   if (!markerId) {
  //     const newMark = {
  //       title,
  //       description,
  //       coords,
  //       id: Date.now(),
  //     };
  //     //   console.log(house);
  //     dispatch(
  //       addMarkerAsync({
  //         houseId: house.id,
  //         newMark: {...house, markers: [...house.markers, newMark]},
  //       }),
  //     );
  //   } else {
  //     const newMark = {
  //       title,
  //       description,
  //       coords,
  //       id,
  //     };
  //     dispatch(editMarker(newMark));
  //   }
  //   setTitle('');
  //   setDescription('');
  //   setCoords({});
  //   setId('');
  // };

  return (
    <View style={styles.screen}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          {!!markerId ? 'Edit mark' : 'Add new mark'}
        </Text>
        <TextInput
          placeholder="title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onSave}>
            <Text style={styles.textStyle}>Save Mark</Text>
          </Pressable>
          {!!markerId && (
            <Pressable
              style={[styles.button, styles.buttonRemove]}
              onPress={() => onDelete(markerId)}>
              <Text style={styles.textStyle}>Remove Mark</Text>
            </Pressable>
          )}
        </View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onClose}>
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  buttonRemove: {
    backgroundColor: '#F19455',
    marginLeft: 30,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
  },
  input: {
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    marginBottom: 20,
  },
});
