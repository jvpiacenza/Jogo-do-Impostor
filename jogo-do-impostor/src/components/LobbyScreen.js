import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LobbyScreen({ names, setNames, onStartGame }) {
  const handleNameChange = (text, index) => {
    const updated = [...names];
    updated[index] = text;
    setNames(updated);
  };

  const handleAddPlayer = () => {
    if (names.length < 10) { // Limite máximo de 10 jogadores
      setNames([...names, `Jogador ${names.length + 1}`]);
    }
  };

  const handleRemovePlayer = (index) => {
    if (names.length > 3) { // Mínimo de 3 jogadores para o jogo funcionar
      const updated = names.filter((_, i) => i !== index);
      setNames(updated);
    }
  };

  const isFormValid = names.every((name) => name.trim().length > 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Text style={styles.statusDot}>•</Text>
            <Text style={styles.badgeText}>SESSÃO LOCAL • PASSE E JOGUE</Text>
          </View>
          <Text style={styles.title}>Jogo do Impostor</Text>
          <Text style={styles.subtitle}>
            Configure os participantes para a distribuição das palavras secretas.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {names.map((name, index) => (
            <View key={index} style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>Jogador {index + 1}</Text>
                {names.length > 3 && (
                  <TouchableOpacity onPress={() => handleRemovePlayer(index)}>
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
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

        {names.length < 10 && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Ionicons name="add-circle-outline" size={20} color="#2563EB" />
            <Text style={styles.addButtonText}>Adicionar Jogador</Text>
          </TouchableOpacity>
        )}

        <View style={styles.modeCard}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#2563EB" />
          <Text style={styles.modeText}>1 Impostor oculto • {names.length - 1} Cidadãos</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.primaryButton, !isFormValid && styles.disabledButton]}
        onPress={onStartGame}
        disabled={!isFormValid}
      >
        <Text style={styles.primaryButtonText}>Iniciar Jogo ({names.length} Jogadores)</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24, justifyContent: 'space-between' },
  scrollContent: { paddingBottom: 16 },
  header: { marginTop: 12 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statusDot: { color: '#2563EB', fontSize: 18, marginRight: 6 },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#6B7280', letterSpacing: 0.5 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  inputContainer: { marginVertical: 12 },
  fieldGroup: { marginBottom: 12 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  inputLabel: { fontSize: 12, color: '#374151', fontWeight: '500' },
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 8,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  addButtonText: { marginLeft: 8, color: '#2563EB', fontSize: 15, fontWeight: '600' },
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