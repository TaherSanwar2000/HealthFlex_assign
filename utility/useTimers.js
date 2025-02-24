import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTimers = () => {
  const [timers, setTimers] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [completedTimers, setCompletedTimers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTimers();
    loadCompletedTimers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.running && timer.remainingTime > 0) {
            return { ...timer, remainingTime: timer.remainingTime - 1, status: 'Running' };
          }
          if (timer.running && timer.remainingTime === 0) {
            markTimerComplete(timer.id);
            return { ...timer, running: false, status: 'Completed' };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTimers = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error('Failed to load timers', error);
    }
  };

  const loadCompletedTimers = async () => {
    try {
      const storedCompleted = await AsyncStorage.getItem('completedTimers');
      if (storedCompleted) {
        setCompletedTimers(JSON.parse(storedCompleted));
      }
    } catch (error) {
      console.error('Failed to load completed timers', error);
    }
  };

  const saveTimers = async (newTimers) => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
    } catch (error) {
      console.error('Failed to save timers', error);
    }
  };

  const saveCompletedTimers = async (newCompleted) => {
    try {
      await AsyncStorage.setItem('completedTimers', JSON.stringify(newCompleted));
    } catch (error) {
      console.error('Failed to save completed timers', error);
    }
  };

  const addTimer = (name, duration, category) => {
    setError('');

    if (!name.trim() || !category.trim()) {
      setError('Name and category are required.');
      return;
    }

    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      setError('Duration must be a valid positive number.');
      return;
    }
    
    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration, 10),
      remainingTime: parseInt(duration, 10),
      category,
      running: false,
      status: 'Paused',
    };
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
    setShowForm(false);
    setShowList(true);
  };

  const markTimerComplete = (id) => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) =>
        timer.id === id ? { ...timer, running: false, status: 'Completed' } : timer
      );

      const completed = updatedTimers.find((t) => t.id === id);
      if (completed) {
        const updatedCompletedTimers = [...completedTimers, completed];
        setCompletedTimers(updatedCompletedTimers);
        saveCompletedTimers(updatedCompletedTimers);
      }

      saveTimers(updatedTimers);
      return updatedTimers;
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const startTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, running: true, status: 'Running' } : timer
      )
    );
  };

  const pauseTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, running: false, status: 'Paused' } : timer
      )
    );
  };

  const resetTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, remainingTime: timer.duration, running: false, status: 'Paused' } : timer
      )
    );
  };

  return {
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
  };
};
