import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';

void main() {
  runApp(IslamicApp());
}

class IslamicApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ChatScreen(),
    );
  }
}

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  FlutterTts flutterTts = FlutterTts();
  TextEditingController controller = TextEditingController();
  String response = "";

  Future speak(String text) async {
    await flutterTts.setLanguage("bn-BD");
    await flutterTts.speak(text);
  }

  void getIslamicAnswer(String question) {
    setState(() {
      response = "ইসলাম অনুযায়ী, $question এর উত্তর হলো: আল্লাহ আমাদের সঠিক পথে পরিচালিত করুন।";
    });

    speak(response);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("নূর আলাপ")),
      body: Column(
        children: [
          TextField(controller: controller),
          ElevatedButton(
            onPressed: () {
              getIslamicAnswer(controller.text);
            },
            child: Text("জিজ্ঞাসা করুন"),
          ),
          Text(response),
        ],
      ),
    );
  }
}
