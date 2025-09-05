import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

import data from "./data.json"; // 위 JSON 파일

export default function App() {
  const [search, setSearch] = useState("");

  const filtered = data.sections.filter(item =>
    item.title.includes(search) || item.content.includes(search)
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        📖 묵호파출소 주요업무 참고자료
      </Text>

      {/* 검색창 */}
      <TextInput
        placeholder="검색어 입력"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginBottom: 12,
          borderRadius: 8
        }}
      />

      {/* 리스트 */}
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: "#555" }} numberOfLines={2}>
              {item.content}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
