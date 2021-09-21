import * as React from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';
import tailwind from 'tailwind-rn';

import { View } from '../../components/Themed';

export default function TabOneScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={tailwind('items-center')}>
        <View style={tailwind('px-3 py-2 border-b border-gray-200 w-96')}>
          <Text style={tailwind('font-semibold text-2xl text-center')}>OCW App</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
