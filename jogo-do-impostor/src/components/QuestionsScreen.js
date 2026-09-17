import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestionsScreen({ player, currentTurn, totalTurns, onNextTurn }) {
  return (
    <View style={styles.container}>
      <View style={styles.topBadgeContainer}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>TURNO {currentTurn} DE {totalTurns}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>VEZ DE INTERROGAR</Text>
        <Text style={styles.title}>Perguntas: {player.name}</Text>
        <Text style={styles.subtitle}>
          Faça uma pergunta a todos os jogadores para descobrir pistas sem revelar a palavra secreta.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onNextTurn}>
        <Text style={styles.primaryButtonText}>PRÓXIMO TURNO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  topBadgeContainer: { marginTop: 24, alignItems: 'center' },
  pill: { backgroundColor: '#E0E7FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  pillText: { color: '#3730A3', fontSize: 12, fontWeight: '700' },
  content: { alignItems: 'center', paddingHorizontal: 16 },
  label: { fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 8, letterSpacing: 1 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#111827', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 },
  primaryButton: { backgroundColor: '#111827', height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});