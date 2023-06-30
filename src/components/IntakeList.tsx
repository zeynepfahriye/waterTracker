import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';
import { intakeStyles } from '../styles/intakeStyle';
import {  IntakeListProps, optionTypes } from '../types/types';
import LongModalPress from './LongModalPress';
import formatDate from '../utils';
import { deleteIntakeData, updateIntakeData } from '../utils/api';

const IntakeList= (props: IntakeListProps) => {
  const [input, setInput] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number>();

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '100%'], []);

  const filterDataByCategory = () => {
    if (props.selectedOption.key === optionTypes.DAILY) {
      return props.data.filter(item => isToday(new Date(item.createdAt)));
    } else if (props.selectedOption.key === optionTypes.WEEKLY) {
      return props.data.filter(item => isThisWeek(new Date(item.createdAt)));
    } else if (props.selectedOption.key === optionTypes.MONTHLY) {
      return props.data.filter(item => isThisMonth(new Date(item.createdAt)));
    } else {
      return props.data;
    }
  };

  const waterList = useMemo(() => {

    return (
      <FlatList
        data={filterDataByCategory()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => updateOrDelete(item.id)}>
            <Animatable.View
              animation="pulse"
              iterationCount={1}
              style={intakeStyles.flatListContainer}
              key={index}
            >
              <View style={intakeStyles.textContainer}>
                <Text>{item.amount}</Text>
                <Text>{item.unit}</Text>
              </View>
              <Text style={{ alignSelf: 'center' }}>{formatDate(item.createdAt)}</Text>
            </Animatable.View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }, [filterDataByCategory, props.data]);

  const handleUpdate = (id: number) => {
      setModalVisible(true);
      setSelectedItemId(id);
   };

 const handleDelete = (id: number) => {
      deleteIntakeData(id).then(response => {
        props.setData(props.data.filter(n => n.id !== id));
      })
 };

  const updateOrDelete = useCallback(
    (id: number) => {
      Alert.alert('Verilerini Güncelle', 'My Alert Msg', [
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
          style: 'cancel',
        },
        { text: 'Update', onPress: () => handleUpdate(id) },
      ]);
    },
    [handleDelete, handleUpdate]
  );

  const handleUpdateItem = () => {
    if(selectedItemId) {
      updateIntakeData(input, selectedItemId).then(response => {
        setModalVisible(false);
        props.setData(props.data.map(n => {
          if(n.id === selectedItemId) {
            return response
          }
          return n;
        }));
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BottomSheet
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#4B9CFF' }}
      >
        <View style={{ flex: 1 }}>{props.data.length > 0  && waterList}</View>
      </BottomSheet>

      <LongModalPress
        title={'veriyi güncelle'}
        buttonSecondTitle={'Update'}
        visible={modalVisible}
        inputValue={input ? input.toString() : ''}
        onChangeText={(text) => setInput(text)}
        onSubmit={handleUpdateItem}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};



export default IntakeList;
