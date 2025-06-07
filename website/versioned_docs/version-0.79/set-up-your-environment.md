import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function App() {
  const [detectedNumbers, setDetectedNumbers] = useState('รอดูตัวเลขจากกล้อง...');

  const handleTextRecognized = async ({ textBlocks }) => {
    try {
      let numbers = [];

      textBlocks.forEach(block => {
        // กรองข้อความเฉพาะตัวเลขและจุดทศนิยม
        const filtered = block.text.replace(/[^0-9.]/g, '');
        if (filtered.length > 0) {
          numbers.push(filtered);
        }
      });

      if (numbers.length > 0) {
        setDetectedNumbers(numbers.join(', '));
      } else {
        setDetectedNumbers('ไม่พบตัวเลข');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front} // กล้องหน้า
        captureAudio={false}
        onTextRecognized={handleTextRecognized}
        androidCameraPermissionOptions={{
          title: 'ขออนุญาตใช้กล้อง',
          message: 'แอปต้องการใช้กล้องเพื่ออ่านข้อความตัวเลข',
          buttonPositive: 'ตกลง',
          buttonNegative: 'ยกเลิก',
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.detectedText}>{detectedNumbers}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  detectedText: {
    fontSize: 24,
    color: 'lime',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
