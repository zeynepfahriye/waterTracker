import { View } from 'react-native';
import React, {  useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { homeStyles } from '../styles/homeStyle';
import Header from '../components/Header';
import { HomeDataProps, circleProgressProps, goalResponseData, optionTypes, pageType, responseData, selectedOptionType } from '../types/types';
import IntakeList from '../components/IntakeList';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

const Home = (props: HomeDataProps) => {
   const [circularData, setCircularData] = useState<circleProgressProps>({dailyGoal: 0, weeklyGoal: 0, monthlyGoal: 0, goalData: {} as goalResponseData, type: pageType.HOME});
   const [selectedOption, setSelectedOption] = useState<selectedOptionType>({key: optionTypes.DAILY, value: 'Günlük'});

    useEffect(() => {
      if(props.intakeData.length > 0 && props.goalData) {
         const dailyGoal = props.intakeData.filter(item => isToday(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
         const weeklyGoal = props.intakeData.filter(item => isThisWeek(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
         const monthlyGoal = props.intakeData.filter(item => isThisMonth(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
         
         setCircularData({dailyGoal, weeklyGoal, monthlyGoal, goalData: props.goalData, type: pageType.HOME})
      }
    }, [props.intakeData, props.goalData])

   return (
      <GestureHandlerRootView style={homeStyles.dFlex}>
         <View style={homeStyles.dFlex}>
            <Header 
               selectedOption={selectedOption} 
               setSelectedOption={setSelectedOption} 
               data={circularData} 
               setGoal={props.setGoalData}
               setIntakeData={props.setIntakeData}
               intakeData={props.intakeData} 
            />
            <IntakeList selectedOption={selectedOption} data={props.intakeData} setData={props.setIntakeData} />
         </View>
      </GestureHandlerRootView>
   )
}

export default Home