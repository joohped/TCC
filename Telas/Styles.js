import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
    overflow: 'hidden', 
  },


  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
    width: 100,
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: '#388388',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },



  backgroundImage1: {
    position: 'absolute',
    top: 13,
    left: -60,
    width: 90,
    height: 90,

  },
  backgroundImage2: {
    position: 'absolute',
    bottom: 10,
    right: -10,
    width: 50,
    height: 80,

  },


});