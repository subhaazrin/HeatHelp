import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';

const API_KEY = 'a15be60ccb7c7fae02c936a5aa36e940'; // will make secret later
const CITY_NAME = 'Toronto';

export default function TabOneScreen() {

  /* 1. loading is initialized to true
     2. Inside useEffect, the fetch function is used to make an asynchronous API call.
     3. Response is converted to JSON using response.json()
     4. Then the setTemperature function updates the temperature state with the temperature value from the API
     5. setLoading function is then called with false to indicate that the data loading is complete
     6. in case of error, the catch block logs an error message and sets loading to false to indicate that the loading process is complete. 
  */

  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  /* api documentation: https://weatherstack.com/documentation */
  
  useEffect(() => {
    fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY_NAME}`)
      .then(response => response.json())
      .then(data => {
        setCurrentWeather(data.current.temperature);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting weather data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.temperature}>{`Current Temperature: ${currentWeather}°C`}</Text>
        </View>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  temperature: {
    fontSize: 18,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
