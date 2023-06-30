import { Text, View, Share, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/AntDesign'

import { headerProps, optionTypes } from '../types/types';
import { headerStyles } from '../styles/headerStyle';
import RadioButton from './RadioButton';
import LongModalPress from './LongModalPress';
import CustomModal from './CustomModal';
import { updateGoalData } from '../utils/api';

const Header = (props: headerProps) => {
   //state
   const [inputValue, setInputValue] = useState<number>(props.data.dailyGoal);
   const [shortPressModalVisible, setShortPressModalVisible] = useState(false);
   const [longPressModalVisible, setLongPressModalVisible] = useState(false);

   //modal
   const handleLongPressModalOpen = () => {
      setLongPressModalVisible(true);
   };
   const handleLongPressModalClose = () => {
      setLongPressModalVisible(false);
   };
   const handleShortPressModalOpen = () => {
      setShortPressModalVisible(true);
   };
   const handleShortPressModalClose = () => {
      setShortPressModalVisible(false);
   };

   //share button
   const onShare = async () => {
      try {
         const result = await Share.share({
            message: 'Su takibinizi paylaşmak ister misiniz ? ',
         });
         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            }
         } else if (result.action === Share.dismissedAction) {
            // dismissed
         }
      } catch (error: any) {
         Alert.alert(error.message);
      }
   };

   const handleButtonPress = () => {
         updateGoalData({"dailyGoal": inputValue, "weeklyGoal": inputValue * 7, "monthlyGoal": inputValue * 28 }).then(data => {
            props.setGoal(data);
            handleShortPressModalClose()
         })
   };

   // Progress
   const getProgressValue = () => {
      let data = 0;
      switch (props.selectedOption.key) {
         case optionTypes.DAILY:
            data = (props.data.dailyGoal / props.data.goalData.dailyGoal) * 100;
            break; // Günlük değer
         case optionTypes.WEEKLY:
            data = (props.data.weeklyGoal / props.data.goalData.weeklyGoal) * 100;
            break; // Haftalık değer
         case optionTypes.MONTHLY:
            data = (props.data.monthlyGoal / props.data.goalData.monthlyGoal) * 100;
            break; // Aylık değer
         default:
            data = 0;
      }

      if(data > 100) return 100;
      return data;
   };

   return (
      <View style={{ backgroundColor: 'white' }}>
         <TouchableOpacity style={{ alignItems: 'flex-end', marginHorizontal: '5%', marginVertical: '5%' }} onPress={onShare}>
            <Icon name="sharealt" size={30} color="black" />
         </TouchableOpacity>
         <View style={{ alignSelf: 'center' }}>
            <CircularProgress
               value={getProgressValue()}
               radius={100}
               maxValue={100}
               duration={2000}
               progressValueColor={'black'}
               showProgressValue={false}
               title={
                  props.selectedOption.key === optionTypes.DAILY ? 
                  `${props.data.dailyGoal} ml` : 
                  props.selectedOption.key === optionTypes.WEEKLY ? 
                  `${props.data.weeklyGoal} ml` : `${props.data.monthlyGoal} ml`
               }
               subtitleStyle={{color: 'black'}}
               subtitle={
                  props.selectedOption.key === optionTypes.DAILY ? 
                  `${props.data.goalData.dailyGoal} ml` : 
                  props.selectedOption.key === optionTypes.WEEKLY ? 
                  `${props.data.goalData.weeklyGoal} ml` : `${props.data.goalData.monthlyGoal} ml`
               }
            />
         </View>
         <RadioButton
            selected={props.selectedOption}
            onChange={props.setSelectedOption}
         />
         <View style={headerStyles.circleContainer}>
            <TouchableOpacity onLongPress={handleShortPressModalOpen} style={headerStyles.circle} onPress={handleLongPressModalOpen}>
               <Text style={{ fontSize: 22 }}>+</Text>
            </TouchableOpacity>
         </View>
         <LongModalPress
            title={'Lutfen hedefinizi girin'}
            visible={shortPressModalVisible}
            onClose={handleShortPressModalClose}
            buttonSecondTitle={'Gönder'}
            onSubmit={handleButtonPress}
            inputValue={inputValue ? inputValue.toString() : ''}
            onChangeText={(text: number) => setInputValue(text)}
         />
         <CustomModal
            title={"Su alım miktarını gir"}
            visibility={longPressModalVisible}
            cancel={handleLongPressModalClose}
            onClose={handleLongPressModalClose}
            buttonFirstTitle={"cancel"}
            buttonSecondTitle={"save"}
            onSave={(data) => {
               const updatedIntakeData = [...props.intakeData]; 
               updatedIntakeData.push(data); 
           
               props.setIntakeData(updatedIntakeData);
             }}
         />
      </View>
   )
}

export default Header