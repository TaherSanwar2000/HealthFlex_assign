import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TimerList = ({ timers, expandedCategories, toggleCategory, startTimer, pauseTimer, resetTimer }) => {
    const groupedTimers = timers.reduce((acc, timer) => {
      acc[timer.category] = acc[timer.category] || [];
      acc[timer.category].push(timer);
      return acc;
    }, {});
  
    return (
      <View>
        {Object.keys(groupedTimers).map((category) => {
          const categoryTimers = groupedTimers[category];
          const totalDuration = categoryTimers.reduce((sum, timer) => sum + timer.duration, 0);
          const totalRemainingTime = categoryTimers.reduce((sum, timer) => sum + timer.remainingTime, 0);
          const progress = totalDuration > 0 ? (totalRemainingTime / totalDuration) * 100 : 0;
  
          return (
            <View key={category} style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.categoryHeader}>
                <Text style={styles.categoryText}>{category}</Text>
                <Icon
                  name={expandedCategories[category] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
                {!expandedCategories[category] && (
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
              )}
                {expandedCategories[category] && (
                    <View style={styles.listContainer}>
                        {categoryTimers.map((item) => (
                        <View key={item.id} style={styles.timerItem}>
                            <Text style={styles.nameContainer}>Name: {item.name}</Text>
                            <Text style={styles.timerText}>Time remains: {item.remainingTime}</Text>
                            <Text style={styles.statusText}>
                            Status:{' '}
                            <Text style={{ color: item.status === 'Completed' ? 'green' : item.status === 'Paused' ? 'red' : '#000' }}>
                                {item.status}
                            </Text>
                            </Text>
                            <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={() => startTimer(item.id)}>
                                <Text style={styles.buttonText}>Start</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#f0ad4e' }]} onPress={() => pauseTimer(item.id)}>
                                <Text style={styles.buttonText}>Pause</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#d9534f' }]} onPress={() => resetTimer(item.id)}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        ))}
                    </View>
                    )}
            </View>
          );
        })}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    categoryContainer: {
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        elevation: 2,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#000',
    },
    progressBarContainer: {
      width: '100%',
      height: 8,
      backgroundColor: '#ddd',
      borderRadius: 4,
      marginTop: 6,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#ffa500',
      borderRadius: 4,
    },
    listContainer: {
      flexGrow: 1,
      paddingVertical: 10,
    },
    timerItem: {
      marginTop: 10,
    },
    nameContainer:{
        fontSize: 18,
        color: '#000',
        fontWeight:'800'
    },
    timerText: {
      fontSize: 16,
      color: '#000',
      fontWeight:'500'
    },
    statusText: {
      fontSize: 16,
      color: '#000',
      fontWeight:'500'
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '4%',
    },
    button: {
      width: '30%',
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
  export default TimerList;
  

