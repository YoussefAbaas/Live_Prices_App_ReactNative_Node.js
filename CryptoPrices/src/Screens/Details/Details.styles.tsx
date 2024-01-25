import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272d42',
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#000',
    height: 110,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTagLine: {
    marginTop: 10,
  },
  headerName: {
    fontSize: 24,
    color: '#fff',
  },
  headerSymbol: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#272d4c',
    color: '#fff',
  },
  headerPrice: {
    color: '#ffab00',
    fontSize: 28,
    width: 150,
    textAlign: 'right',
  },
  line: {
    color: '#fff',
    fontSize: 16,
  },
  priceChanges: {
    backgroundColor: '#000',
    height: 80,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cryptoInfo: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
  },
  cryptoInfoRow: {
    flex: 1,
    marginBottom: 10,
  },
  cryptoInfoTitle: {
    color: '#ffab00',
    fontSize: 22,
  },
  cryptoInfoText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
