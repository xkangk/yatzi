import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    backgroundColor: '#748949',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 50,
    backgroundColor: '#748949',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',

    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  total: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },

  flex: {
    flexDirection: "row",
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 45,
    padding: 10,
    backgroundColor: "#B8C3A1",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
    
});