import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SEU_AUTH",
  projectId: "SEU_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_MSG",
  appId: "SEU_APP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Tab = createBottomTabNavigator();

/* ================= HOME ================= */
function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>🏠 Mercado Prime</Text>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "#fff",
            padding: 10,
            marginVertical: 10,
            borderRadius: 10
          }}>
            <Image source={{ uri: item.image }} style={{ height: 150 }} />
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>R$ {item.price}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Cart", { item })}
              style={{ backgroundColor: "orange", padding: 10, marginTop: 10 }}
            >
              <Text>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

/* ================= CART ================= */
function Cart({ route }) {
  const item = route?.params?.item;

  const checkout = async () => {
    const platformFee = item.price * 0.1;
    const sellerEarnings = item.price - platformFee;

    await addDoc(collection(db, "orders"), {
      productId: item.id,
      name: item.name,
      total: item.price,
      platformFee,
      sellerEarnings,
      status: "Pedido recebido",
      createdAt: Date.now(),
    });

    Alert.alert("Sucesso", "Compra realizada com PIX simulado!");
  };

  if (!item) {
    return (
      <View style={{ padding: 20 }}>
        <Text>🛒 Carrinho vazio</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
      <Text>R$ {item.price}</Text>

      <TouchableOpacity
        onPress={checkout}
        style={{ backgroundColor: "green", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "#fff" }}>Finalizar compra (PIX)</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= ORDERS ================= */
function Orders() {
  return (
    <View style={{ padding: 20 }}>
      <Text>📦 Seus pedidos aparecerão aqui</Text>
    </View>
  );
}

/* ================= SELLER ================= */
function Seller() {

  const createProduct = async () => {
    await addDoc(collection(db, "products"), {
      name: "Produto teste",
      price: 100,
      image: "https://picsum.photos/300",
      description: "Produto demo",
      category: "geral",
      sellerId: "seller1",
    });

    Alert.alert("OK", "Produto criado!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>🏪 Painel do Vendedor</Text>

      <TouchableOpacity
        onPress={createProduct}
        style={{ backgroundColor: "black", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "#fff" }}>Criar produto demo</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Seller" component={Seller} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
