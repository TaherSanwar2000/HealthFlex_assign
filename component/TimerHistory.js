import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TimerHistory = ({ completedTimers, setShowHistory }) => {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#000' }}>Completed Timers</Text>
        <TouchableOpacity onPress={() => setShowHistory(false)}>
          <MaterialIcons name="close" size={28} color="#ff4500" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={completedTimers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>Duration: {item.duration} sec</Text>
            <Text style={{ fontSize: 14, color: '#28a745' }}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TimerHistory;
