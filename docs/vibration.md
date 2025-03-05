
import zipfile

# Nom du fichier ZIP
zip_filename = "/mnt/data/Steesy_App.zip"

# Création et ajout des fichiers dans l'archive ZIP
with zipfile.ZipFile(zip_filename, 'w') as zipf:
    zipf.writestr("App.js", """
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as VideoEditor from 'expo-video-thumbnails';
import * as VideoProcessor from 'expo-video-processing';
import * as Speech from 'expo-speech';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [hashtags, setHashtags] = useState('');

  const handleAskAI = async () => {
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      }, {
        headers: {
          'Authorization': 'Bearer VOTRE_CLE_API',
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      setResponse('Erreur lors de la requête.');
    }
  };

  const handlePickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
    if (result.type === 'success') {
      setVideo(result);
      generateThumbnail(result.uri);
      processVideo(result.uri);
    }
  };

  const generateThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoEditor.getThumbnailAsync(videoUri, { time: 1000 });
      setThumbnail(uri);
    } catch (error) {
      console.error('Erreur lors de la génération de la miniature', error);
    }
  };

  const processVideo = async (videoUri) => {
    try {
      const processedUri = await VideoProcessor.compress(videoUri, {
        bitrate: 1000000,
        resolution: { width: 1080, height: 1920 },
      });
      setVideo({ uri: processedUri });
    } catch (error) {
      console.error('Erreur lors de la transformation de la vidéo', error);
    }
  };

  const handleGenerateHashtags = async () => {
    try {
      const res = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-3.5-turbo',
        prompt: 'Génère des hashtags populaires pour TikTok selon la tendance actuelle.',
      }, {
        headers: {
          'Authorization': 'Bearer VOTRE_CLE_API',
          'Content-Type': 'application/json',
        },
      });
      setHashtags(res.data.choices[0].text);
    } catch (error) {
      setHashtags('Erreur lors de la génération des hashtags.');
    }
  };

  const handleUploadVideo = async () => {
    if (!video) return;
    try {
      let formData = new FormData();
      formData.append('video', {
        uri: video.uri,
        name: 'video.mp4',
        type: 'video/mp4',
      });

      const res = await axios.post('https://api.tiktok.com/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse('Vidéo uploadée avec succès !');
    } catch (error) {
      setResponse('Erreur lors de l\'upload.');
    }
  };

  const speakText = (text) => {
    Speech.speak(text, { language: 'fr' });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenue sur Steesy</Text>
      
      <Text style={styles.subtitle}>Pose ta question à Steesy :</Text>
      <TextInput
        style={styles.input}
        placeholder="Tape ta question..."
        placeholderTextColor="#aaa"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.button} onPress={handleAskAI}>
        <Text style={styles.buttonText}>Demander à l'IA</Text>
      </TouchableOpacity>
      
      <Text style={styles.subtitle}>Créer et uploader une vidéo :</Text>
      <TouchableOpacity style={styles.button} onPress={handlePickVideo}>
        <Text style={styles.buttonText}>Choisir une vidéo</Text>
      </TouchableOpacity>
      {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnail} />}
      <TouchableOpacity style={styles.button} onPress={handleUploadVideo}>
        <Text style={styles.buttonText}>Uploader sur TikTok</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGenerateHashtags}>
        <Text style={styles.buttonText}>Générer des hashtags</Text>
      </TouchableOpacity>
      <Text style={styles.responseText}>{hashtags}</Text>

      <TouchableOpacity style={styles.button} onPress={() => speakText(response)}>
        <Text style={styles.buttonText}>Écouter la réponse</Text>
      </TouchableOpacity>

      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
    </View>
  );
}
    """)

# Renvoie le chemin du fichier ZIP généré
zip_filename
