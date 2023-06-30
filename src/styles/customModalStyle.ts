import { Dimensions, StyleSheet } from "react-native";

export const customModalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  modal: {
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: Dimensions.get("window").height / 3,
  },
  title: {
    fontSize: 17.63,
    fontWeight: '500',
    textAlign: 'center'
  },
  textInput: {
    width: 229,
    height: 40,
    alignSelf: 'center',
    fontSize: 10,
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    height: 45,
    borderWidth: 1,
    backgroundColor: 'blue',
    borderColor: 'blue',
    justifyContent: 'space-evenly',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500'
  },
  textContainer: {
    alignSelf: 'center',
    marginHorizontal: '2.5%'
  },

});
