import { Dimensions, StyleSheet } from "react-native";

export const intakeStyles = StyleSheet.create({
   flatListContainer: {
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     height: Dimensions.get('window').height / 14,
     borderWidth: 1,
     borderRadius: 16,
     marginVertical: '4%',
     marginHorizontal: '5%',
     backgroundColor: '#90C7FF',
     borderColor: '#90C7FF',
   },
   textContainer: {
     flexDirection: 'row',
     alignSelf: 'center',
   },
 });