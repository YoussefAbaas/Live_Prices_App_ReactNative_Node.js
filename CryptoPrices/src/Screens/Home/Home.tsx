import {Pressable, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Crypto} from '../../models/crypto';
import {socket} from '../../../App';
import {HomeScreenNavigationProp} from '../../navigation/Models';
import styles from './Home.styles';

export const HomeScreen = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  useEffect(() => {
    socket.on('crypto', data => {
      setCryptoData(data);
    });
  }, []);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const openCryptoDetails = (id: string) => {
    navigation.navigate('Details', {id});
  };
  const renderItem = ({item}: {item: Crypto}) => {
    return (
      <Pressable
        style={styles.crypto}
        onPress={() => openCryptoDetails(item.id)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cryptoData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
