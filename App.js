import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTimers } from './utility/useTimers';
import TimerList from './component/TimerList';
import TimerHistory from './component/TimerHistory';
import TimerForm from './component/TimerForm';


const TimerApp = () => {
  const {
    timers,
    expandedCategories,
    showForm,
    showList,
    showHistory,
    completedTimers,
    setShowForm,
    setShowList,
    setShowHistory,
    addTimer,
    toggleCategory,
    startTimer,
    pauseTimer,
    resetTimer,
    error
  } = useTimers();

  return (
    <View style={{flex:1}}>
    <ScrollView style={{ flex: 1, padding: 12 }}>
  {!showHistory && showList && (
    <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>⏳ Timer List</Text>
    <TouchableOpacity style={styles.historyButton} onPress={() => setShowHistory(!showHistory)}>
      <MaterialIcons name="history" size={30} color="#fff" />
    </TouchableOpacity>
  </View>
  
  )}

  {showForm && <TimerForm addTimer={addTimer} error={error} />}

  {showHistory ? (
    <TimerHistory completedTimers={completedTimers} setShowHistory={setShowHistory} />
  ) : (
    showList && (
      <TimerList
        timers={timers}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
    )
  )}

  
</ScrollView>
<View style={styles.floatingButtonContainer}>
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => { setShowForm(!showForm); setShowList(!showList); }}>
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>
  </View>
  </View>
  );
};

export default TimerApp;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10, 
  },
  floatingButton: {
    backgroundColor: '#ffa500',
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    borderRadius:12
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  historyButton: {
    backgroundColor: '#ffa500',
    height: 55,
    width: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

