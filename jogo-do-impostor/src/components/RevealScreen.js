import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RevealScreen({ player, currentStep, totalSteps, onNext }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>JOGADOR {currentStep} DE {totalSteps}</Text>
        <Text style={styles.title}>Vez de {player.name}</Text>
        <Text style={styles.subtitle}>Garanta que ninguém próximo esteja olhando para a sua tela.</Text>
      </View>

      <Pressable
        style={[styles.revealBox, isRevealed && styles.revealBoxActive]}
        onPressIn={() => setIsRevealed(true)}
        onPressOut={() => setIsRevealed(false)}
      >
        <View style={styles.iconCircle}>
          <Ionicons name={isRevealed ? "eye-outline" : "finger-print-outline"} size={32} color="#2563EB" />
        </View>
        <Text style={styles.boxTitle}>
          {isRevealed ? player.word : "Pressione e segure para ver a palavra"}
        </Text>
        <Text style={styles.boxSub}>
          {isRevealed ? "Sua palavra secreta" : "Mantenha o dedo na tela até memorizar a instrução."}
        </Text>
      </Pressable>

      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Passei a vez</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 24, alignItems: 'center' },
  stepText: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  revealBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
  },
  revealBoxActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  boxTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 8 },
  boxSub: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
  nextButton: { backgroundColor: '#9CA3AF', height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});