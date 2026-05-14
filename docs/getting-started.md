---
id: environment-setup
title: Get Started with Reactexport default function CuidaAlToonGame() {
  const { useState } = React;

  const characters = [
    {
      name: "Astro",
      world: "Dandy's World",
      emoji: "⭐",
      room: "from-pink-200 to-yellow-100",
    },
    {
      name: "Shelly",
      world: "Dandy's World",
      emoji: "🐚",
      room: "from-cyan-200 to-blue-100",
    },
    {
      name: "Guest 133",
      world: "Forsaken",
      emoji: "👻",
      room: "from-purple-200 to-gray-200",
    },
    {
      name: "Noob",
      world: "Forsaken",
      emoji: "🧱",
      room: "from-yellow-200 to-orange-100",
    },
  ];

  const wallpapers = [
    "from-pink-200 to-pink-100",
    "from-blue-200 to-cyan-100",
    "from-purple-200 to-indigo-100",
    "from-green-200 to-lime-100",
    "from-yellow-200 to-orange-100",
  ];

  const shopItems = [
    { name: "Cupcake", price: 20, emoji: "🧁" },
    { name: "Pelota", price: 30, emoji: "⚽" },
    { name: "Patito", price: 25, emoji: "🦆" },
    { name: "Osito", price: 50, emoji: "🧸" },
  ];

  const [pet, setPet] = useState(characters[0]);
  const [coins, setCoins] = useState(120);
  const [food, setFood] = useState(90);
  const [fun, setFun] = useState(80);
  const [clean, setClean] = useState(75);
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  const [inventory, setInventory] = useState([]);
  const [room, setRoom] = useState("Habitación");
  const [message, setMessage] = useState("¡Tu toon está feliz! ✨");

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function feedPet() {
    setFood((v) => clamp(v + 15));
    setMessage(`${pet.name} comió algo delicioso 🍓`);
  }

  function playPet() {
    setFun((v) => clamp(v + 15));
    setCoins((c) => c + 10);
    setMessage(`${pet.name} jugó contigo 🎮`);
  }

  function bathPet() {
    setClean((v) => clamp(v + 20));
    setMessage(`${pet.name} quedó súper limpio 🫧`);
  }

  function buyItem(item) {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setInventory([...inventory, item]);
      setMessage(`Compraste ${item.name} ${item.emoji}`);
    } else {
      setMessage("No tienes suficientes monedas 💸");
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${wallpaper} p-6 font-sans`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
          <h1 className="text-4xl font-black text-pink-500 text-center">
            Cuida al Toon 💖
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Cuida a tus personajes favoritos y decora sus habitaciones ✨
          </p>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Elige tu avatar</h2>
            <div className="grid grid-cols-2 gap-3">
              {characters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => {
                    setPet(char);
                    setWallpaper(char.room);
                    setMessage(`Ahora estás cuidando a ${char.name}!`);
                  }}
                  className="bg-pink-100 hover:bg-pink-200 rounded-2xl p-3 transition"
                >
                  <div className="text-4xl">{char.emoji}</div>
                  <div className="font-bold">{char.name}</div>
                  <div className="text-xs text-gray-500">{char.world}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Fondos del cuarto</h2>
            <div className="flex gap-2 flex-wrap">
              {wallpapers.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setWallpaper(bg)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${bg} border-4 border-white shadow`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${pet.room} rounded-3xl p-5 shadow-2xl flex flex-col items-center justify-center relative`}>
          <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 font-bold shadow">
            🪙 {coins}
          </div>

          <div className="text-8xl animate-bounce">{pet.emoji}</div>
          <h2 className="text-3xl font-black mt-3 text-pink-600">
            {pet.name}
          </h2>
          <p className="text-gray-700 font-semibold">{room}</p>

          <div className="w-full mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Comida 🍔</span>
                <span>{food}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-pink-400 h-4" style={{ width: `${food}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Diversión 🎈</span>
                <span>{fun}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-yellow-400 h-4" style={{ width: `${fun}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Limpieza 🛁</span>
                <span>{clean}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-cyan-400 h-4" style={{ width: `${clean}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 w-full">
            <button onClick={feedPet} className="bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl py-3">
              Dar comida 🍓
            </button>

            <button onClick={playPet} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl py-3">
              Jugar 🎮
            </button>

            <button onClick={bathPet} className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-2xl py-3">
              Bañar 🫧
            </button>
          </div>

          <div className="mt-6 bg-white/80 rounded-2xl p-4 text-center font-bold text-pink-600 w-full shadow">
            {message}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-pink-500 mb-4">
              Supermercado 🛒
            </h2>

            <div className="space-y-3">
              {shopItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-pink-100 rounded-2xl p-3">
                  <div>
                    <div className="font-bold">
                      {item.emoji} {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.price} monedas
                    </div>
                  </div>

                  <button onClick={() => buyItem(item)} className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-4 py-2 font-bold">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-purple-500 mb-4">
              Habitaciones 🏡
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {["Habitación", "Baño", "Cocina", "Sala de juegos"].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    setRoom(place);
                    setMessage(`Entraste a ${place} ✨`);
                  }}
                  className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-4 font-bold"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-cyan-500 mb-4">
              Inventario 🎁
            </h2>

            {inventory.length === 0 ? (
              <p className="text-gray-500">Todavía no compras nada.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {inventory.map((item, index) => (
                  <div key={index} className="bg-cyan-100 rounded-2xl px-4 py-3 font-bold">
                    {item.emoji} {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CuidaAlToonGame() {
  const { useState } = React;

  const characters = [
    {
      name: "Astro",
      world: "Dandy's World",
      emoji: "⭐",
      room: "from-pink-200 to-yellow-100",
    },
    {
      name: "Shelly",
      world: "Dandy's World",
      emoji: "🐚",
      room: "from-cyan-200 to-blue-100",
    },
    {
      name: "Guest 133",
      world: "Forsaken",
      emoji: "👻",
      room: "from-purple-200 to-gray-200",
    },
    {
      name: "Noob",
      world: "Forsaken",
      emoji: "🧱",
      room: "from-yellow-200 to-orange-100",
    },
  ];

  const wallpapers = [
    "from-pink-200 to-pink-100",
    "from-blue-200 to-cyan-100",
    "from-purple-200 to-indigo-100",
    "from-green-200 to-lime-100",
    "from-yellow-200 to-orange-100",
  ];

  const shopItems = [
    { name: "Cupcake", price: 20, emoji: "🧁" },
    { name: "Pelota", price: 30, emoji: "⚽" },
    { name: "Patito", price: 25, emoji: "🦆" },
    { name: "Osito", price: 50, emoji: "🧸" },
  ];

  const [pet, setPet] = useState(characters[0]);
  const [coins, setCoins] = useState(120);
  const [food, setFood] = useState(90);
  const [fun, setFun] = useState(80);
  const [clean, setClean] = useState(75);
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  const [inventory, setInventory] = useState([]);
  const [room, setRoom] = useState("Habitación");
  const [message, setMessage] = useState("¡Tu toon está feliz! ✨");

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function feedPet() {
    setFood((v) => clamp(v + 15));
    setMessage(`${pet.name} comió algo delicioso 🍓`);
  }

  function playPet() {
    setFun((v) => clamp(v + 15));
    setCoins((c) => c + 10);
    setMessage(`${pet.name} jugó contigo 🎮`);
  }

  function bathPet() {
    setClean((v) => clamp(v + 20));
    setMessage(`${pet.name} quedó súper limpio 🫧`);
  }

  function buyItem(item) {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setInventory([...inventory, item]);
      setMessage(`Compraste ${item.name} ${item.emoji}`);
    } else {
      setMessage("No tienes suficientes monedas 💸");
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${wallpaper} p-6 font-sans`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
          <h1 className="text-4xl font-black text-pink-500 text-center">
            Cuida al Toon 💖
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Cuida a tus personajes favoritos y decora sus habitaciones ✨
          </p>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Elige tu avatar</h2>
            <div className="grid grid-cols-2 gap-3">
              {characters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => {
                    setPet(char);
                    setWallpaper(char.room);
                    setMessage(`Ahora estás cuidando a ${char.name}!`);
                  }}
                  className="bg-pink-100 hover:bg-pink-200 rounded-2xl p-3 transition"
                >
                  <div className="text-4xl">{char.emoji}</div>
                  <div className="font-bold">{char.name}</div>
                  <div className="text-xs text-gray-500">{char.world}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Fondos del cuarto</h2>
            <div className="flex gap-2 flex-wrap">
              {wallpapers.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setWallpaper(bg)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${bg} border-4 border-white shadow`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${pet.room} rounded-3xl p-5 shadow-2xl flex flex-col items-center justify-center relative`}>
          <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 font-bold shadow">
            🪙 {coins}
          </div>

          <div className="text-8xl animate-bounce">{pet.emoji}</div>
          <h2 className="text-3xl font-black mt-3 text-pink-600">
            {pet.name}
          </h2>
          <p className="text-gray-700 font-semibold">{room}</p>

          <div className="w-full mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Comida 🍔</span>
                <span>{food}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-pink-400 h-4" style={{ width: `${food}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Diversión 🎈</span>
                <span>{fun}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-yellow-400 h-4" style={{ width: `${fun}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Limpieza 🛁</span>
                <span>{clean}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-cyan-400 h-4" style={{ width: `${clean}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 w-full">
            <button onClick={feedPet} className="bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl py-3">
              Dar comida 🍓
            </button>

            <button onClick={playPet} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl py-3">
              Jugar 🎮
            </button>

            <button onClick={bathPet} className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-2xl py-3">
              Bañar 🫧
            </button>
          </div>

          <div className="mt-6 bg-white/80 rounded-2xl p-4 text-center font-bold text-pink-600 w-full shadow">
            {message}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-pink-500 mb-4">
              Supermercado 🛒
            </h2>

            <div className="space-y-3">
              {shopItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-pink-100 rounded-2xl p-3">
                  <div>
                    <div className="font-bold">
                      {item.emoji} {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.price} monedas
                    </div>
                  </div>

                  <button onClick={() => buyItem(item)} className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-4 py-2 font-bold">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-purple-500 mb-4">
              Habitaciones 🏡
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {["Habitación", "Baño", "Cocina", "Sala de juegos"].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    setRoom(place);
                    setMessage(`Entraste a ${place} ✨`);
                  }}
                  className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-4 font-bold"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-cyan-500 mb-4">
              Inventario 🎁
            </h2>

            {inventory.length === 0 ? (
              <p className="text-gray-500">Todavía no compras nada.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {inventory.map((item, index) => (
                  <div key={index} className="bg-cyan-100 rounded-2xl px-4 py-3 font-bold">
                    {item.emoji} {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CuidaAlToonGame() {
  const { useState } = React;

  const characters = [
    {
      name: "Astro",
      world: "Dandy's World",
      emoji: "⭐",
      room: "from-pink-200 to-yellow-100",
    },
    {
      name: "Shelly",
      world: "Dandy's World",
      emoji: "🐚",
      room: "from-cyan-200 to-blue-100",
    },
    {
      name: "Guest 133",
      world: "Forsaken",
      emoji: "👻",
      room: "from-purple-200 to-gray-200",
    },
    {
      name: "Noob",
      world: "Forsaken",
      emoji: "🧱",
      room: "from-yellow-200 to-orange-100",
    },
  ];

  const wallpapers = [
    "from-pink-200 to-pink-100",
    "from-blue-200 to-cyan-100",
    "from-purple-200 to-indigo-100",
    "from-green-200 to-lime-100",
    "from-yellow-200 to-orange-100",
  ];

  const shopItems = [
    { name: "Cupcake", price: 20, emoji: "🧁" },
    { name: "Pelota", price: 30, emoji: "⚽" },
    { name: "Patito", price: 25, emoji: "🦆" },
    { name: "Osito", price: 50, emoji: "🧸" },
  ];

  const [pet, setPet] = useState(characters[0]);
  const [coins, setCoins] = useState(120);
  const [food, setFood] = useState(90);
  const [fun, setFun] = useState(80);
  const [clean, setClean] = useState(75);
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  const [inventory, setInventory] = useState([]);
  const [room, setRoom] = useState("Habitación");
  const [message, setMessage] = useState("¡Tu toon está feliz! ✨");

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function feedPet() {
    setFood((v) => clamp(v + 15));
    setMessage(`${pet.name} comió algo delicioso 🍓`);
  }

  function playPet() {
    setFun((v) => clamp(v + 15));
    setCoins((c) => c + 10);
    setMessage(`${pet.name} jugó contigo 🎮`);
  }

  function bathPet() {
    setClean((v) => clamp(v + 20));
    setMessage(`${pet.name} quedó súper limpio 🫧`);
  }

  function buyItem(item) {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setInventory([...inventory, item]);
      setMessage(`Compraste ${item.name} ${item.emoji}`);
    } else {
      setMessage("No tienes suficientes monedas 💸");
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${wallpaper} p-6 font-sans`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
          <h1 className="text-4xl font-black text-pink-500 text-center">
            Cuida al Toon 💖
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Cuida a tus personajes favoritos y decora sus habitaciones ✨
          </p>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Elige tu avatar</h2>
            <div className="grid grid-cols-2 gap-3">
              {characters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => {
                    setPet(char);
                    setWallpaper(char.room);
                    setMessage(`Ahora estás cuidando a ${char.name}!`);
                  }}
                  className="bg-pink-100 hover:bg-pink-200 rounded-2xl p-3 transition"
                >
                  <div className="text-4xl">{char.emoji}</div>
                  <div className="font-bold">{char.name}</div>
                  <div className="text-xs text-gray-500">{char.world}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-3">Fondos del cuarto</h2>
            <div className="flex gap-2 flex-wrap">
              {wallpapers.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setWallpaper(bg)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${bg} border-4 border-white shadow`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${pet.room} rounded-3xl p-5 shadow-2xl flex flex-col items-center justify-center relative`}>
          <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 font-bold shadow">
            🪙 {coins}
          </div>

          <div className="text-8xl animate-bounce">{pet.emoji}</div>
          <h2 className="text-3xl font-black mt-3 text-pink-600">
            {pet.name}
          </h2>
          <p className="text-gray-700 font-semibold">{room}</p>

          <div className="w-full mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Comida 🍔</span>
                <span>{food}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-pink-400 h-4" style={{ width: `${food}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Diversión 🎈</span>
                <span>{fun}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-yellow-400 h-4" style={{ width: `${fun}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold">
                <span>Limpieza 🛁</span>
                <span>{clean}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div className="bg-cyan-400 h-4" style={{ width: `${clean}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 w-full">
            <button onClick={feedPet} className="bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl py-3">
              Dar comida 🍓
            </button>

            <button onClick={playPet} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl py-3">
              Jugar 🎮
            </button>

            <button onClick={bathPet} className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-2xl py-3">
              Bañar 🫧
            </button>
          </div>

          <div className="mt-6 bg-white/80 rounded-2xl p-4 text-center font-bold text-pink-600 w-full shadow">
            {message}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-pink-500 mb-4">
              Supermercado 🛒
            </h2>

            <div className="space-y-3">
              {shopItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-pink-100 rounded-2xl p-3">
                  <div>
                    <div className="font-bold">
                      {item.emoji} {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.price} monedas
                    </div>
                  </div>

                  <button onClick={() => buyItem(item)} className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-4 py-2 font-bold">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-purple-500 mb-4">
              Habitaciones 🏡
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {["Habitación", "Baño", "Cocina", "Sala de juegos"].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    setRoom(place);
                    setMessage(`Entraste a ${place} ✨`);
                  }}
                  className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-4 font-bold"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <h2 className="text-2xl font-black text-cyan-500 mb-4">
              Inventario 🎁
            </h2>

            {inventory.length === 0 ? (
              <p className="text-gray-500">Todavía no compras nada.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {inventory.map((item, index) => (
                  <div key={index} className="bg-cyan-100 rounded-2xl px-4 py-3 font-bold">
                    {item.emoji} {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 Native
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
