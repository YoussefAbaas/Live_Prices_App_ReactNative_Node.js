/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../../consts/app.consts';
import RenderHtml from 'react-native-render-html';
import {CryptoMarketDataInit, CryptoProfileInit} from '../../models/crypto';
import {DetailScreenRouteProp} from '../../navigation/Models';
import styles from './Details.styles';

export const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {id} = route.params;
  const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
  const [cryptoMarketData, setCryptoMarketData] =
    useState(CryptoMarketDataInit);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
      axios.get(`${API_URL}/cryptos/profile/${id}`),
    ]).then(([resMarketData, resProfileData]) => {
      setCryptoMarketData(resMarketData.data);
      setCryptoProfile(resProfileData.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#ffab00'} />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>{cryptoProfile?.name}</Text>
              <Text style={styles.headerSymbol}>{cryptoProfile?.symbol}</Text>
              <Text style={styles.headerPrice}>
                {`$ ${cryptoMarketData?.market_data.price_usd?.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.headerTagLine}>
              <Text style={styles.line}>
                {cryptoProfile?.profile?.general?.overview?.tagline}
              </Text>
            </View>
          </View>
          <View style={styles.priceChanges}>
            <View style={styles.priceChangeRow}>
              <Text style={styles.line}>Percent Change 1h</Text>
              <Text style={styles.line}>
                {'% ' +
                  cryptoMarketData?.market_data?.percent_change_usd_last_1_hour?.toFixed(
                    3,
                  )}
              </Text>
            </View>
            <View style={styles.priceChangeRow}>
              <Text style={styles.line}>Percent Change 24h</Text>
              <Text style={styles.line}>
                {'% ' +
                  cryptoMarketData?.market_data?.percent_change_usd_last_24_hours?.toFixed(
                    3,
                  )}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.cryptoInfo}>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Overview</Text>

              <RenderHtml
                contentWidth={Dimensions.get('window').width}
                source={{
                  html: `<p style='color:#fff;font-size:16px;'>
                  ${cryptoProfile?.profile?.general?.overview?.project_details}
                </p>`,
                }}
              />
            </View>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Background</Text>
              <RenderHtml
                contentWidth={Dimensions.get('window').width}
                source={{
                  html: `<p style='color:#fff;font-size:16px;'>
                  ${cryptoProfile?.profile?.general?.background?.background_details}
                </p>`,
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};
