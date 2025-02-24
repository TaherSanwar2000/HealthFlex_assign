import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TimerForm = ({ addTimer, error }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    addTimer(name, duration, category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Timer</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Duration (seconds)" 
        value={duration} 
        onChangeText={setDuration} 
        keyboardType="numeric" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Category" 
        value={category} 
        onChangeText={setCategory} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  heading: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#ffa500',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimerForm;
