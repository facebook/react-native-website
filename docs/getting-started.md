import 'package:flutter/material.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: CallPage(),
    );
  }
}

class CallPage extends StatefulWidget {
  @override
  State<CallPage> createState() => _CallPageState();
}

class _CallPageState extends State<CallPage> {
  final RTCVideoRenderer _localRenderer = RTCVideoRenderer();
  final RTCVideoRenderer _remoteRenderer = RTCVideoRenderer();
  MediaStream? _localStream;

  @override
  void initState() {
    super.initState();
    initRenderers();
    startLocalStream();
  }

  Future<void> initRenderers() async {
    await _localRenderer.initialize();
    await _remoteRenderer.initialize();
  }

  Future<void> startLocalStream() async {
    _localStream = await navigator.mediaDevices.getUserMedia({
      'audio': true,
      'video': true,
    });
    _localRenderer.srcObject = _localStream;
  }

  @override
  void dispose() {
    _localRenderer.dispose();
    _remoteRenderer.dispose();
    _localStream?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("মেসেঞ্জারের মতো কলিং অ্যাপ")),
      body: Column(
        children: [
          Expanded(child: RTCVideoView(_localRenderer)),
          SizedBox(height: 10),
          Expanded(child: RTCVideoView(_remoteRenderer)),
          SizedBox(height: 10),
          ElevatedButton(
            onPressed: () {
              // পরবর্তীতে কল শুরু / Accept / Reject যুক্ত করতে পারো
            },
            child: Text("Start Call"),
          )
        ],
      ),
    );
  }
}
