import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type MainStackParamList = {
  Home: undefined;
  Details: {id: string};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Home'
>;

export type DetailScreenRouteProp = RouteProp<MainStackParamList, 'Details'>;
