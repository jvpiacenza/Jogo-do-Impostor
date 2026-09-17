import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VotingScreen({ players, onConfirmVote }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badgeText}>RODADA DE ELIMINAÇÃO</Text>
        <Text style={styles.title}>Votação: Quem é o impostor?</Text>
        <Text style={styles.subtitle}>Selecione o suspeito antes do encerramento da rodada.</Text>
      </View>

      <View style={styles.list}>
        {players.map((p, index) => {
          const isSelected = selectedId === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => setSelectedId(p.id)}
            >
              <View style={styles.cardInfo}>
                <Ionicons
                  name={isSelected ? "radio-button-on" : "radio-button-off"}
                  size={20}
                  color={isSelected ? "#2563EB" : "#9CA3AF"}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.playerName}>{p.name}</Text>
                  <Text style={styles.playerSub}>0{index + 1} • {isSelected ? "VOTO SELECIONADO" : "SUSPEITO"}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !selectedId && styles.disabledButton]}
        disabled={!selectedId}
        onPress={() => onConfirmVote(selectedId)}
      >
        <Text style={styles.primaryButtonText}>CONFIRMAR VOTO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 24 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#2563EB', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280' },
  list: { marginVertical: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCard: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  cardInfo: { flexDirection: 'row', alignItems: 'center' },
  playerName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  playerSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  primaryButton: { backgroundColor: '#111827', height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  disabledButton: { backgroundColor: '#9CA3AF' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});