import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  crypto: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'black',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    backgroundColor: '#272d42',
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 24,
  },
  price: {
    color: '#ffab00',
    fontSize: 28,
  },
});

export default styles;
