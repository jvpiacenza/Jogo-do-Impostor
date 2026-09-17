import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LobbyScreen({ names, setNames, onStartGame }) {
  const handleNameChange = (text, index) => {
    const updated = [...names];
    updated[index] = text;
    setNames(updated);
  };

  const isFormValid = names.every((name) => name.trim().length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <Text style={styles.statusDot}>•</Text>
          <Text style={styles.badgeText}>SESSÃO LOCAL • PASSE E JOGUE</Text>
        </View>
        <Text style={styles.title}>Jogo do Impostor</Text>
        <Text style={styles.subtitle}>
          Configure o nome dos 4 participantes para a distribuição das palavras secretas.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {names.map((name, index) => (
          <View key={index} style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Jogador {index + 1}</Text>
              <Text style={styles.inputIndex}>0{index + 1}</Text>
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => handleNameChange(text, index)}
              placeholder={`Nome do Jogador ${index + 1}`}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        ))}
      </View>

      <View style={styles.modeCard}>
        <Ionicons name="shield-checkmark-outline" size={20} color="#2563EB" />
        <Text style={styles.modeText}>1 Impostor oculto • 3 Cidadãos</Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !isFormValid && styles.disabledButton]}
        onPress={onStartGame}
        disabled={!isFormValid}
      >
        <Text style={styles.primaryButtonText}>Iniciar Jogo</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 24 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statusDot: { color: '#2563EB', fontSize: 18, marginRight: 6 },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#6B7280', letterSpacing: 0.5 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  inputContainer: { marginVertical: 12 },
  fieldGroup: { marginBottom: 12 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  inputLabel: { fontSize: 12, color: '#374151', fontWeight: '500' },
  inputIndex: { fontSize: 12, color: '#9CA3AF' },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modeText: { marginLeft: 8, color: '#1E40AF', fontSize: 14, fontWeight: '500' },
  primaryButton: {
    backgroundColor: '#111827',
    flexDirection: 'row',
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  disabledButton: { backgroundColor: '#9CA3AF' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginRight: 8 },
});