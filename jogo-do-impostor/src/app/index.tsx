import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WORD_PAIRS } from '../data/words';
import LobbyScreen from '../components/LobbyScreen';
import RevealScreen from '../components/RevealScreen';
import QuestionsScreen from '../components/QuestionsScreen';
import VotingScreen from '../components/VotingScreen';
import ResultScreen from '../components/ResultScreen';

export default function HomeScreen() {
  const [phase, setPhase] = useState('LOBBY');
  
  const [playerNames, setPlayerNames] = useState([
    'Jogador 1',
    'Jogador 2',
    'Jogador 3',
    'Jogador 4',
  ]);
  
  const [players, setPlayers] = useState<any[]>([]);
  const [currentPair, setCurrentPair] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [usedWordIndices, setUsedWordIndices] = useState<number[]>([]);
  const [lastImpostorIndex, setLastImpostorIndex] = useState<number | null>(null);

  const startGame = () => {
    let availableWordIndices = WORD_PAIRS.map((_, i) => i).filter(
      (i) => !usedWordIndices.includes(i)
    );

    if (availableWordIndices.length === 0) {
      availableWordIndices = WORD_PAIRS.map((_, i) => i);
      setUsedWordIndices([]);
    }

    const randomWordIndex =
      availableWordIndices[Math.floor(Math.random() * availableWordIndices.length)];
    const pair = WORD_PAIRS[randomWordIndex];
    setUsedWordIndices((prev) => [...prev, randomWordIndex]);

    // Sorteio dinâmico do Impostor de acordo com o tamanho atual da lista
    let impostorIndex: number;
    do {
      impostorIndex = Math.floor(Math.random() * playerNames.length);
    } while (impostorIndex === lastImpostorIndex && playerNames.length > 1);

    setLastImpostorIndex(impostorIndex);

    const initialPlayers = playerNames.map((name, idx) => ({
      id: idx + 1,
      name: name.trim() || `Jogador ${idx + 1}`,
      isImpostor: idx === impostorIndex,
      word: idx === impostorIndex ? pair.impostor : pair.citizen,
    }));

    setCurrentPair(pair);
    setPlayers(initialPlayers);
    setCurrentIndex(0);
    setPhase('REVEAL');
  };

  const handleNextReveal = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      setPhase('QUESTIONS');
    }
  };

  const handleNextQuestionTurn = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase('VOTING');
    }
  };

  const handleConfirmVote = (votedId: number) => {
    setPhase('RESULT');
  };

  const resetGame = () => {
    startGame();
  };

  const backToMenu = () => {
    setPhase('LOBBY');
  };

  const impostorPlayer = players.find((p) => p.isImpostor);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      {phase === 'LOBBY' && (
        <LobbyScreen names={playerNames} setNames={setPlayerNames} onStartGame={startGame} />
      )}
      {phase === 'REVEAL' && (
        <RevealScreen
          player={players[currentIndex]}
          currentStep={currentIndex + 1}
          totalSteps={players.length}
          onNext={handleNextReveal}
        />
      )}
      {phase === 'QUESTIONS' && (
        <QuestionsScreen
          player={players[currentIndex]}
          currentTurn={currentIndex + 1}
          totalTurns={players.length}
          onNextTurn={handleNextQuestionTurn}
        />
      )}
      {phase === 'VOTING' && (
        <VotingScreen players={players} onConfirmVote={handleConfirmVote} />
      )}
      {phase === 'RESULT' && (
        <ResultScreen
          players={players}
          impostor={impostorPlayer}
          wordPair={currentPair}
          onPlayAgain={resetGame}
          onBackToMenu={backToMenu}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
});