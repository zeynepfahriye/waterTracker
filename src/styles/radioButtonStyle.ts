import { StyleSheet } from 'react-native';

export const radioButtonStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: '2%',
	},
	radio: {
		width: 15,
		height: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
	},
	selectedRadio: {
		width: 8,
		height: 8,
		borderRadius: 5,
		backgroundColor:'blue',
	},
	label: {
		fontSize: 12.36,
		fontWeight: '400'
	},
});