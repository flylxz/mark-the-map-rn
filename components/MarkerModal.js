import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addMarkerAsync, editMarker, removeMarker} from '../store/houseSlice';
import {closeModal} from '../store/modalSlice';

export const MarkerModal = () => {
  const {markerId, newCoords, houseId, visible} = useSelector(
    state => state.modal,
  );
  const {markers} = useSelector(state => state.houses);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (!!markerId) {
      const mark = markers.find(i => i.id === markerId);
      setTitle(mark.title);
      setDescription(mark.description);
      setCoords(mark.coords);
      setId(mark.id);
    } else if (!markerId) {
      setCoords(newCoords);
    }
  }, [markerId, newCoords]);

  const onSave = () => {
    addNewMarker();
    dispatch(closeModal());
  };

  const onDelete = id => {
    dispatch(removeMarker(id));
    dispatch(closeModal());
  };

  const onCloseModal = () => {
    setTitle('');
    setDescription('');
    setCoords({});
    setId('');
    dispatch(closeModal());
  };

  const addNewMarker = e => {
    if (!markerId) {
      const newMark = {
        title,
        description,
        coords,
        id: Date.now(),
      };
      dispatch(addMarkerAsync({houseId, newMark}));
    } else {
      const newMark = {
        title,
        description,
        coords,
        id,
      };
      dispatch(editMarker(newMark));
    }
    setTitle('');
    setDescription('');
    setCoords({});
    setId('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}
      onRequestClose={() => onCloseModal()}>
      <Pressable onPress={() => onCloseModal()}>
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
            onPress={onCloseModal}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginVertical: Dimensions.get('window').height / 3,
    marginHorizontal: 20,
    height: 350,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal: {
    flex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    marginBottom: 10,
  },
});
