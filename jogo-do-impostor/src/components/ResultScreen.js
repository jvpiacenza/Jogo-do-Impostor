import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResultScreen({ players, impostor, wordPair, onPlayAgain, onBackToMenu }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badgeText}>PARTIDA FINALIZADA</Text>
        <Text style={styles.titleLabel}>IDENTIDADE REVELADA</Text>
        <Text style={styles.impostorText}>O IMPOSTOR ERA</Text>
        <Text style={styles.impostorName}>{impostor.name.toUpperCase()}</Text>
      </View>

      <View style={styles.wordCards}>
        <View style={styles.wordCard}>
          <Text style={styles.wordLabel}>PALAVRA SECRETA</Text>
          <Text style={styles.wordValue}>{wordPair.citizen}</Text>
        </View>
        <View style={styles.wordCard}>
          <Text style={styles.wordLabel}>VARIAÇÃO / PISTA</Text>
          <Text style={[styles.wordValue, { color: '#EF4444' }]}>{wordPair.impostor}</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>RESUMO DA SALA</Text>
        {players.map((p) => (
          <View key={p.id} style={styles.summaryRow}>
            <Text style={styles.pName}>{p.name}</Text>
            <Text style={[styles.pRole, p.isImpostor && { color: '#EF4444' }]}>
              {p.isImpostor ? 'Impostor' : 'Cidadão'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={onPlayAgain}>
          <Text style={styles.primaryButtonText}>JOGAR NOVAMENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onBackToMenu}>
          <Text style={styles.secondaryButtonText}>VOLTAR AO MENU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 24, alignItems: 'center' },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 12 },
  titleLabel: { fontSize: 12, fontWeight: '600', color: '#9CA3AF', letterSpacing: 1 },
  impostorText: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginTop: 4 },
  impostorName: { fontSize: 28, fontWeight: 'bold', color: '#EF4444', textDecorationLine: 'underline', marginTop: 2 },
  wordCards: { gap: 8 },
  wordCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  wordLabel: { fontSize: 10, fontWeight: '700', color: '#6B7280', marginBottom: 4 },
  wordValue: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  summaryContainer: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  summaryTitle: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  pName: { fontSize: 14, fontWeight: '500', color: '#111827' },
  pRole: { fontSize: 14, fontWeight: '600', color: '#2563EB' },
  actions: { gap: 8, marginBottom: 12 },
  primaryButton: { backgroundColor: '#111827', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  secondaryButton: { backgroundColor: '#E5E7EB', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#374151', fontSize: 15, fontWeight: '600' },
});