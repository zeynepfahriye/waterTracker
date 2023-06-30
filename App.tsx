import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './src/containers/Home';
import GoalDetails from './src/containers/GoalDetails';
import { fetchGoalData, fetchIntakeData } from './src/utils/api';
import { goalResponseData, responseData } from './src/types/types';

const Tab = createMaterialTopTabNavigator();
const App = () => {
   const [goalData, setGoalData] = useState<goalResponseData>({dailyGoal: 0, weeklyGoal: 0, monthlyGoal: 0, id: 0, userId: 0});
   const [intakeData, setIntakeData] = useState<responseData[]>([]);

   useEffect(() => {
      fetchIntakeData().then(data => setIntakeData(data));
      fetchGoalData().then(data => setGoalData(data));
   },[])
  return (
         <NavigationContainer>
            <Tab.Navigator style={{ marginTop: '8%' }}>
            <Tab.Screen name="Home">
              {(props) => <Home {...props} goalData={goalData} setGoalData={setGoalData} intakeData={intakeData} setIntakeData={setIntakeData} />}
            </Tab.Screen>
            <Tab.Screen name="Goal">
              {(props) => <GoalDetails {...props} goalData={goalData} setGoalData={setGoalData} intakeData={intakeData} setIntakeData={setIntakeData} />}
            </Tab.Screen>
            </Tab.Navigator>
         </NavigationContainer>
  );
}

export default App;
