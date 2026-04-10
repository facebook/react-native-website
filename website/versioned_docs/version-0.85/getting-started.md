---
id: gym-app
title: App de Rotina de Academia (Completo)
hide_table_of_contents: true
---
import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**Este exemplo mostra um app completo para gerenciar sua rotina de academia.**  
Você pode registrar treinos diários, organizar por semana/mês, acompanhar ganhos e definir metas.

---

## 📱 Funcionalidades

- 📅 Treinos por dia, semana e mês  
- 🏋️ Tipo de treino (peito, perna, etc.)  
- 🔢 Carga (peso levantado)  
- 🔁 Repetições  
- 📈 Ganhos (evolução)  
- 🎯 Metas  

---

## 💻 Código completo

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [dia, setDia] = useState('');
  const [semana, setSemana] = useState('');
  const [mes, setMes] = useState('');
  const [treino, setTreino] = useState('');
  const [carga, setCarga] = useState('');
  const [reps, setReps] = useState('');
  const [meta, setMeta] = useState('');
  const [ganho, setGanho] = useState('');

  const [dados, setDados] = useState([]);

  function adicionarTreino() {
    if (!dia || !semana || !mes || !treino) return;

    const novo = {
      id: Date.now().toString(),
      dia,
      semana,
      mes,
      treino,
      carga,
      reps,
      meta,
      ganho,
    };

    setDados([...dados, novo]);

    setDia('');
    setSemana('');
    setMes('');
    setTreino('');
    setCarga('');
    setReps('');
    setMeta('');
    setGanho('');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>🏋️ Registrar Treino</Text>

      <TextInput placeholder="Dia" value={dia} onChangeText={setDia} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Semana" value={semana} onChangeText={setSemana} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Mês" value={mes} onChangeText={setMes} style={{ borderWidth: 1, marginBottom: 5 }} />

      <TextInput placeholder="Treino (ex: Peito)" value={treino} onChangeText={setTreino} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Carga (kg)" value={carga} onChangeText={setCarga} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Repetições" value={reps} onChangeText={setReps} style={{ borderWidth: 1, marginBottom: 5 }} />

      <TextInput placeholder="Meta (ex: 100kg supino)" value={meta} onChangeText={setMeta} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Ganho (ex: +5kg)" value={ganho} onChangeText={setGanho} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Salvar Treino" onPress={adicionarTreino} />

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10, borderBottomWidth: 1 }}>
            <Text>📅 {item.dia} | Semana {item.semana} | {item.mes}</Text>
            <Text>🏋️ {item.treino}</Text>
            <Text>💪 Carga: {item.carga} kg</Text>
            <Text>🔁 Reps: {item.reps}</Text>
            <Text>🎯 Meta: {item.meta}</Text>
            <Text>📈 Ganho: {item.ganho}</Text>
          </View>
        )}
      />
    </View>
  );
}



