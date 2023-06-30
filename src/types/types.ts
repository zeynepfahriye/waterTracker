import { ViewStyle } from "react-native";

export type responseData = {
   createdAt: string;
   amount: string;
   unit: string;
   id: number;
}

export type goalResponseData = {
   dailyGoal: number;
   weeklyGoal: number;
   monthlyGoal: number;
   id: number;
   userId: number;
 }

export type selectedOptionType = {
   key: optionTypes;
   value: string;
}

export type circleProgressProps = {
   dailyGoal: number;
   weeklyGoal: number;
   monthlyGoal: number;
   goalData: goalResponseData;
   type: string;
}

export enum pageType {
   GOAL = "goal",
   HOME = "home"
}
export enum optionTypes {
   DAILY = 1,
   WEEKLY = 2,
   MONTHLY = 3
}

export type headerProps = {
   selectedOption: selectedOptionType;
   setSelectedOption: (value: selectedOptionType) => void;
   data: circleProgressProps;
   setGoal: (data: goalResponseData) => void;
   setIntakeData: (data: responseData[]) => void;
   intakeData: responseData[];
}

export type radioButtonProps = {
   selected: selectedOptionType;
   onChange: (value: selectedOptionType) => void;
   color?: string;
   style?: ViewStyle; 
   vertical?: boolean;
   disabled?: boolean; 
}

export type customModalProps = {
   visibility: boolean;
   onClose: () => void;
   cancel: () => void;
   onSave: (data: responseData) => void;
   title : string; 
   buttonFirstTitle?:string; 
   buttonSecondTitle?:string; 
}
export type longModalProps = {
   visible: boolean;
   onClose: () => void;
   onSubmit:() => void;
   inputValue: string;
   onChangeText: (number: number) => void;
   title: string;
   buttonSecondTitle? : string;
}

export type IntakeItem = {
   id: string;
   amount: number;
   unit: string;
   createdAt: string;
 }
 
 export type IntakeListProps = {
   selectedOption: selectedOptionType;
   data: responseData[];
   setData: (data: responseData[]) => void;
 }

 export type chartDataType = {
      name: string;
      color: string;
      legendFontColor: string;
      legendFontSize: number;
      population?: number;
 }

 export type HomeDataProps = {
   goalData:goalResponseData; 
   setGoalData: (data: goalResponseData) => void;
   intakeData: responseData[];
   setIntakeData : (data: responseData[]) => void;
 }

 export type GoalDataProps = {
   goalData:goalResponseData; 
   setGoalData: (data: goalResponseData) => void;
   intakeData: responseData[];
   setIntakeData : (data: responseData[]) => void;
   
 }