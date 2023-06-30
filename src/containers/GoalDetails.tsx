import { View, Dimensions, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  PieChart } from 'react-native-chart-kit';
import { GoalDataProps, circleProgressProps, goalResponseData, optionTypes, pageType, selectedOptionType } from '../types/types';
import Header from '../components/Header';
import { chartDataType } from '../types/types';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';
;

const GoalDetails = (props: GoalDataProps) => {
  const [selectedOption, setSelectedOption] = useState<selectedOptionType>({key: optionTypes.DAILY, value: 'Gunluk'});
  const [circularData, setCircularData] = useState<circleProgressProps>({dailyGoal: 0, weeklyGoal: 0, monthlyGoal: 0, goalData: {} as goalResponseData, type: pageType.HOME});


  useEffect(() => {
   if(props.intakeData.length > 0 && props.goalData) {
      const dailyGoal = props.intakeData.filter(item => isToday(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
      const weeklyGoal = props.intakeData.filter(item => isThisWeek(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
      const monthlyGoal = props.intakeData.filter(item => isThisMonth(new Date(item.createdAt))).reduce((total, data) => total + parseInt(data.amount), 0);
      setCircularData({dailyGoal, weeklyGoal, monthlyGoal, goalData: props.goalData, type: pageType.GOAL})
   }
  }, [props.goalData, props.intakeData])

   const renderChart = () => {
      let chartData = [] as chartDataType[];
      
      if (selectedOption.key === optionTypes.DAILY) {
         chartData = [
            {
               name: "Günlük Hedef",
               population: props.goalData.dailyGoal,
               color: "rgba(131, 167, 234, 1)",
               legendFontColor: "#7F7F7F",
               legendFontSize: 10
            },
            {
               name: "Ulaşılan hedef",
               population: circularData.dailyGoal,
               color: "red",
               legendFontColor: "#7F7F7F",
               legendFontSize: 10,
             }
         ];
      } else if (selectedOption?.key === optionTypes.WEEKLY) {
         chartData = [
            {
               name: "Haftalık Hedef",
               population: props.goalData.weeklyGoal,
               color: "rgba(131, 234, 131, 1)",
               legendFontColor:  "#7F7F7F",
               legendFontSize: 10
            },
            {
               name: "Ulaşılan Hedef",
               population: circularData.weeklyGoal,
               color: "red",
               legendFontColor: "#7F7F7F",
               legendFontSize: 10
             }
         ];
      } else if (selectedOption?.key === optionTypes.MONTHLY) {
         chartData = [
            {
               name: "Aylık Hedef",
               population: props.goalData.monthlyGoal,
               color: "rgba(234, 167, 131, 1)",
               legendFontColor:  "#7F7F7F",
               legendFontSize: 10
            },
            {
               name: "Ulaşılan hedef",
               population: circularData.monthlyGoal,
               color: "red",
               legendFontColor: "#7F7F7F",
               legendFontSize: 10
             }
         ];
      }

      return chartData;
   };
   return (
      <View style={{ flex: 1 }}>
      <ScrollView>
         <Header 
         selectedOption={selectedOption} 
         setSelectedOption={setSelectedOption} 
         data={circularData} 
         setGoal={props.setGoalData}
         setIntakeData={props.setIntakeData}
         intakeData={props.intakeData} 
         />
 
         <PieChart
            data={renderChart()}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height / 4}
            chartConfig={{    
               decimalPlaces: 2,
               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft='0'
            absolute
         />

      </ScrollView>
      </View>
   )
   }

export default GoalDetails;