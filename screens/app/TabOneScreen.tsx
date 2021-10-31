import * as React from 'react';
import { useEffect, useState } from 'react';

import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import tailwind from 'tailwind-rn';

import { View } from '../../components/Themed';

const API_BASE_URL = 'http://localhost:5001/ocw-app-79b61/us-central1/';
const GET_COURSES_FUNCTION_NAME = 'getCourses';

const makeAPIURL = (functionName: string) => {
  return `${API_BASE_URL}${functionName}`;
};

function Course({ data }: { data: any }) {
  return (
    <View style={tailwind('mb-4 border border-gray-200 rounded-lg overflow-hidden flex justify-center items-center flex-row-reverse')}>
      <View style={tailwind('w-28 flex-initial')}>
        <Image
          style={tailwind('w-full h-40')}
          source={{
            uri: data.imageURL,
          }}
        />
      </View>
      <View style={tailwind('flex-1 px-4 py-3 border-l border-gray-200')}>
        <Text style={tailwind('text-xl mb-2')}>{data.title}</Text>
        <View style={tailwind('flex flex-row')}>
          {data.instructors.map((e: string) => (
            <View key={e} style={tailwind('bg-gray-200 px-3 py-1 rounded-full mr-2')}>
              <Text style={tailwind('text-gray-700 text-sm')}>{e}</Text>
            </View>
          ))}
        </View>
        <Text style={tailwind('text-gray-500')}>{data.description.slice(0, 100)}...</Text>
      </View>
    </View>
  );
}

export default function TabOneScreen({ navigation }: { navigation: any }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(makeAPIURL(GET_COURSES_FUNCTION_NAME), {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
        setCourses(json.courses as any);
      });
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        {courses && courses.length > 0 ? courses.map((e: any) => <Course key={e.id} data={e} />) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 42,
  },
});
