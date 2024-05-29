import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomBarItem}>
      <Icon name="information-outline" size={28} color="white" />
        <Caption style={styles.bottomBarItemText}>Info</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarItem}>
      <Icon name="pencil" size={28} color="white" />
        <Caption style={styles.bottomBarItemText}>Notes</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarItem}>
      <Icon name="calendar-plus" size={28} color="white" />
        <Caption style={styles.bottomBarItemText}>Tâches</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarItem}>
      <Icon name="console-network" size={28} color="white" />
        <Caption style={styles.bottomBarItemText}>Affairs</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarItem}>
      <Icon name="menu" size={28} color="white" />
        <Caption style={styles.bottomBarItemText}>Autres</Caption>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9da9b4',
    paddingVertical: 5,
    paddingHorizontal:-5,
    position:"absolute",
    bottom:0
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomBarItemText: {
    fontSize: 16,
    color: 'white',
  },
});

export default BottomBar;