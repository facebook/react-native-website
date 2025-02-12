import React, { useState } from "react";

const menuItems = [
  { id: "1", name: "Protein Smoothie", calories: 150, price: 25000 },
  { id: "2", name: "Low-Carb Salad", calories: 200, price: 30000 },
  { id: "3", name: "Healthy Dessert", calories: 180, price: 22000 },
  { id: "4", name: "Green Juice", calories: 120, price: 18000 },
  { id: "5", name: "Avocado Toast", calories: 250, price: 35000 },
];

const CafeDoctorApp = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItemToCart = (item) => {
    if (!selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    } else {
      alert("Diqqat! Bu mahsulot allaqachon tanlangan.");
    }
  };

  const removeItemFromCart = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setSelectedItems([]);
  };

  const totalCalories = selectedItems.reduce((acc, item) => acc + item.calories, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2>Cafe Doctor</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            {item.name} - {item.calories} kcal - {item.price.toLocaleString()} so'm
            <button onClick={() => addItemToCart(item)} style={{ marginLeft: "10px" }}>Qo'shish</button>
          </li>
        ))}
      </ul>
      <h3>Tanlangan taomlar:</h3>
      {selectedItems.length === 0 ? (
        <p>Hech narsa tanlanmagan</p>
      ) : (
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItemFromCart(item.id)} style={{ marginLeft: "10px" }}>Olib tashlash</button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Jami kaloriyalar:</strong> {totalCalories} kcal</p>
      <p><strong>Jami narx:</strong> {totalPrice.toLocaleString()} so'm</p>
      <button onClick={() => alert("Muvaffaqiyatli! Buyurtma berildi!")}>Buyurtma berish</button>
      <button onClick={clearCart} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>Tanlovni tozalash</button>
    </div>
  );
};

export default CafeDoctorApp;
