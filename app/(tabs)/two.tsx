
import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Configuration, OpenAIApi } from "openai"; //for chatgpt

const OPENAI_API_KEY = "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";
//https://platform.openai.com/docs/api-reference/introduction


export default function TabTwoScreen() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const beginRequest = async () => {
    setLoading(true);

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "we have intense heat and high temperature. I am getting stomach aches. How to treat?" }],
        model: "gpt-3.5-turbo-1106",
      });
      setAnswer(completion.choices[0]); 
      console.log(completion.data.choices[0].text);
    } catch (error) {
      setAnswer('An error occurred while processing your request.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    beginRequest();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnose and Treat Yourself!</Text>
      <Text style={styles.description}>
        Click the button below to begin your self-assessment.
      </Text>

      {/* Improved styled button using TouchableOpacity for feedback */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#2a5d72' : '#3498db' },
        ]}
        onPress={() => alert(answer)}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </Pressable>

      {/* Separator */}
      <View style={styles.separator} />

      {/* You can keep the EditScreenInfo component if needed */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'yellow',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
  },
});
