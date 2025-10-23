---Perfeito! 🇧🇷✨ Vamos criar um **app de receitas gaúchas tradicionais**, com foco em **beleza, acolhimento e cultura do Sul** — um aplicativo que pareça feito “de coração para quem ama a tradição gaúcha”. ❤️🔥

Vou te apresentar o conceito, o design e um exemplo de código base. Depois posso gerar o **projeto completo** no formato que você quiser (Android/iOS, web ou desktop).

---

## 🍖 Nome do App: **"Sabores do Sul"**

> “Um cantinho digital para quem ama o gosto do Rio Grande.”

---

### 🌿 **Conceito**

O app apresenta **receitas típicas do Rio Grande do Sul**, com **fotos autênticas**, **histórias de cada prato** e uma **mensagem de boas-vindas personalizada**, criando uma **experiência afetiva e regional**.

---

### 🧩 **Funcionalidades**

1. **Tela de boas-vindas personalizada**

   * Mostra uma mensagem com o nome do usuário:

     > “Bem-vindo, João! Prepare-se pra sentir o sabor do Sul.”
   * Fundo com paisagem dos pampas.
2. **Lista de receitas tradicionais**

   * Churrasco, carreteiro, chimarrão, cuca, entrevero, arroz de galpão etc.
   * Cada card tem foto, tempo de preparo e um selo “Tradicional Gaúcho”.
3. **Tela de receita detalhada**

   * Ingredientes, modo de preparo e curiosidades sobre o prato.
4. **Favoritos**

   * O usuário pode marcar suas receitas preferidas.
5. **Modo especial**

   * Mensagens motivacionais e curiosidades regionais quando o app é aberto.
     Ex: “O chimarrão é o símbolo da amizade, compartilhe essa tradição!”

---

### 🎨 **Estilo Visual**

* **Cores:** tons terrosos (vermelho, marrom, verde mate).
* **Tipografia:** estilo rústico, lembrando o campo.
* **Imagens:** alta resolução, mostrando pratos típicos e paisagens gaúchas.

---

### 📱 Exemplo de Código (React Native)

```javascript
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const receitas = [
  {
    id: '1',
    nome: 'Churrasco Gaúcho',
    tempo: '2h',
    imagem: 'https://example.com/churrasco-gaucho.jpg',
    ingredientes: ['Carne bovina', 'Sal grosso', 'Carvão'],
    preparo: 'Tempere com sal grosso e asse lentamente no espeto...',
    curiosidade: 'O churrasco é símbolo da hospitalidade gaúcha.',
  },
  {
    id: '2',
    nome: 'Arroz de Carreteiro',
    tempo: '1h',
    imagem: 'https://example.com/carreteiro.jpg',
    ingredientes: ['Carne seca', 'Arroz', 'Cebola', 'Alho'],
    preparo: 'Refogue a carne com cebola e alho, depois junte o arroz...',
    curiosidade: 'Prato dos tropeiros que cruzavam o Sul no século XIX.',
  },
  {
    id: '3',
    nome: 'Cuca de Uva',
    tempo: '1h 20min',
    imagem: 'https://example.com/cuca.jpg',
    ingredientes: ['Farinha', 'Uvas', 'Açúcar', 'Ovos'],
    preparo: 'Misture os ingredientes e asse até dourar...',
    curiosidade: 'Receita trazida pelos imigrantes alemães do RS.',
  },
];

export default function SaboresDoSul() {
  const [nome, setNome] = useState('');
  const [personalizado, setPersonalizado] = useState(false);

  if (!personalizado) {
    return (
      <View style={styles.boasVindas}>
        <Text style={styles.titulo}>🌾 Bem-vindo ao Sabores do Sul</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          onChangeText={setNome}
        />
        <TouchableOpacity onPress={() => setPersonalizado(true)} style={styles.botao}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, {nome}! 👋</Text>
      <Text style={styles.subtitulo}>Descubra os sabores da tradição gaúcha:</Text>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.tempo}>⏱ {item.tempo}</Text>
            <Text style={styles.curiosidade}>{item.curiosidade}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boasVindas: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff8e1', padding: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#c7a17a', width: '80%', padding: 10,
    borderRadius: 8, marginTop: 10, backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#a0522d', padding: 10, marginTop: 15, borderRadius: 8,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  container: { flex: 1, backgroundColor: '#fffdf5', padding: 15 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#5d3a1a', textAlign: 'center', marginVertical: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 15, elevation: 2 },
  imagem: { width: '100%', height: 180, borderRadius: 10 },
  nome: { fontSize: 20, marginTop: 5, fontWeight: 'bold' },
  tempo: { color: '#888' },
  curiosidade: { fontStyle: 'italic', color: '#a0522d', marginTop: 5 },
});
```

---

### ❤️ **Toque Especial**

* O app pode exibir **mensagens inspiradoras** no rodapé, como:

  > “Cuidar da tradição é manter viva a alma do gaúcho.”
  > “Cada refeição é uma celebração do nosso chão.”

---

### 🔧 **Próximos passos possíveis**

Quer que eu:

1. Gere o **projeto completo em React Native** (pronto pra rodar no celular)?
2. Crie uma **versão web responsiva** (HTML/CSS/JS ou React)?
3. Monte o **design visual completo com imagens reais** (posso gerar as fotos com IA)?

👉 Me diga o tipo de app que você quer (mobile, web ou ambos) e se quer que eu **inclua imagens reais dos pratos**, que eu monto tudo pra você agora.

id: environment-setup
title: Get Started with React Native
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native allows developers who know React to create native apps.** At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.

We believe that the best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps.

You can also use React Native without a Framework, however we’ve found that most developers benefit from using a React Native Framework like [Expo](https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.

<details>
<summary>Can I use React Native without a Framework?</summary>

Yes. You can use React Native without a Framework. **However, if you’re building a new app with React Native, we recommend using a Framework.**

In short, you’ll be able to spend time writing your app instead of writing an entire Framework yourself in addition to your app.

The React Native community has spent years refining approaches to navigation, accessing native APIs, dealing with native dependencies, and more. Most apps need these core features. A React Native Framework provides them from the start of your app.

Without a Framework, you’ll either have to write your own solutions to implement core features, or you’ll have to piece together a collection of pre-existing libraries to create a skeleton of a Framework. This takes real work, both when starting your app, then later when maintaining it.

If your app has unusual constraints that are not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio, Xcode. If you’re interested in this path, learn how to [set up your environment](set-up-your-environment) and how to [get started without a framework](getting-started-without-a-framework).

</details>

## Start a new React Native project with Expo

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>
