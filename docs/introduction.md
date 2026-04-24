import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function App() {
  // حالة المواقف: Available (أخضر)، Occupied (أحمر)، Reserved (أصفر)
  const [slots, setSlots] = useState([
    { id: 1, status: 'Available' },
    { id: 2, status: 'Occupied' },
    { id: 3, status: 'Available' },
    { id: 4, status: 'Available' },
  ]);

  const handlePress = (id) => {
    const newSlots = slots.map(slot => {
      if (slot.id === id && slot.status === 'Available') {
        Alert.alert("Success", `Slot ${id} has been reserved!`);
        return { ...slot, status: 'Reserved' };
      }
      return slot;
    });
    setSlots(newSlots);
  };

  // حساب عدد المواقف المتوفرة
  const availableCount = slots.filter(s => s.status === 'Available').length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🅿️ Smart Park Pro</Text>
      
      {/* ميزة العداد المبهرة */}
      <View style={styles.counterCard}>
        <Text style={styles.counterText}>{availableCount}</Text>
        <Text style={styles.counterLabel}>Available Slots</Text>
      </View>

      <View style={styles.grid}>
        {slots.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.slot, styles[item.status.toLowerCase()]]}
            onPress={() => handlePress(item.id)}
          >
            <Text style={styles.slotText}>Slot {item.id}</Text>
            <Text style={styles.statusLabel}>{item.status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.hint}>Tip: Tap an available slot to reserve it!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 28, color: '#E94560', fontWeight: 'bold', marginBottom: 20 },
  counterCard: { 
    backgroundColor: '#16213E', padding: 20, borderRadius: 15, 
    alignItems: 'center', width: '80%', marginBottom: 30, borderWidth: 1, borderColor: '#0F3460' 
  },
  counterText: { fontSize: 48, color: '#4CAF50', fontWeight: 'bold' },
  counterLabel: { color: '#FFF', fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  slot: { width: 140, height: 120, margin: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  available: { backgroundColor: '#4CAF50' },
  occupied: { backgroundColor: '#E94560' },
  reserved: { backgroundColor: '#FBC02D' },
  slotText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  statusLabel: { color: '#FFF', fontSize: 12, marginTop: 5 },
  hint: { color: '#888', marginTop: 30, fontStyle: 'italic' }
});

