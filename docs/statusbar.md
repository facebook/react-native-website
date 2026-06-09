<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yango+ - Déplacements & Livraisons</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <style>
    body { font-family: 'Segoe UI', sans-serif; }
    .card { transition: all 0.3s; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); }
  </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">

  <!-- Header -->
  <header class="bg-red-600 text-white p-4 flex items-center justify-between fixed top-0 w-full z-50">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-red-600 font-bold text-2xl">Y</div>
      <h1 class="text-2xl font-bold">Yango+</h1>
    </div>
    <div class="flex items-center gap-4">
      <button onclick="toggleLocation()" class="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
        <i class="fas fa-map-marker-alt"></i> Abidjan
      </button>
      <div class="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">👤</div>
    </div>
  </header>

  <div class="pt-20 pb-24">

    <!-- Recherche -->
    <div class="px-4 mt-4">
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow p-2 flex items-center">
        <input id="searchInput" type="text" placeholder="Où allez-vous ?" 
               class="flex-1 bg-transparent px-4 py-3 outline-none text-lg">
        <button onclick="searchRide()" 
                class="bg-red-600 text-white px-8 py-3 rounded-3xl font-semibold">Chercher</button>
      </div>
    </div>

    <!-- Services -->
    <div class="px-4 mt-8">
      <h2 class="text-xl font-semibold mb-4 px-2">Que voulez-vous faire ?</h2>
      <div class="grid grid-cols-2 gap-4">
        <div onclick="selectService('taxi')" class="card bg-white dark:bg-gray-800 p-6 rounded-3xl cursor-pointer">
          <i class="fas fa-car text-4xl text-blue-500 mb-4"></i>
          <h3 class="font-bold text-xl">Courses</h3>
          <p class="text-sm text-gray-500">Taxi • Confort+</p>
        </div>
        <div onclick="selectService('food')" class="card bg-white dark:bg-gray-800 p-6 rounded-3xl cursor-pointer">
          <i class="fas fa-utensils text-4xl text-orange-500 mb-4"></i>
          <h3 class="font-bold text-xl">Repas</h3>
          <p class="text-sm text-gray-500">Livraison rapide</p>
        </div>
        <div onclick="selectService('delivery')" class="card bg-white dark:bg-gray-800 p-6 rounded-3xl cursor-pointer">
          <i class="fas fa-box text-4xl text-green-500 mb-4"></i>
          <h3 class="font-bold text-xl">Colis</h3>
          <p class="text-sm text-gray-500">Petits & moyens</p>
        </div>
        <div onclick="selectService('truck')" class="card bg-white dark:bg-gray-800 p-6 rounded-3xl cursor-pointer border-2 border-red-500">
          <i class="fas fa-truck text-4xl text-purple-600 mb-4"></i>
          <h3 class="font-bold text-xl">Camions & Gros Colis</h3>
          <p class="text-sm text-red-500 font-medium">Nouveau • Port & Aéroport</p>
        </div>
      </div>
    </div>

    <!-- Carte simulée -->
    <div class="mx-4 mt-8 bg-gray-200 dark:bg-gray-700 h-64 rounded-3xl overflow-hidden relative">
      <div class="absolute inset-0 bg-[radial-gradient(#00000033_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
        <div class="text-center">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            <p class="text-sm text-green-600">🚗 3 min • Confort+</p>
            <p class="font-bold text-2xl mt-1">2420 F</p>
          </div>
        </div>
      </div>
      <div class="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl text-sm flex items-center gap-2">
        <i class="fas fa-map-marker-alt text-red-500"></i>
        <span>Position actuelle</span>
      </div>
    </div>

    <!-- Options rapides -->
    <div class="px-4 mt-8">
      <h3 class="font-semibold mb-3">Options populaires</h3>
      <div class="flex gap-3 overflow-x-auto pb-4">
        <button onclick="quickOption('Port')" class="bg-white dark:bg-gray-800 px-6 py-3 rounded-3xl whitespace-nowrap">Port d'Abidjan</button>
        <button onclick="quickOption('Aéroport')" class="bg-white dark:bg-gray-800 px-6 py-3 rounded-3xl whitespace-nowrap">Aéroport Félix Houphouët</button>
        <button onclick="quickOption('Camion')" class="bg-white dark:bg-gray-800 px-6 py-3 rounded-3xl whitespace-nowrap">Camion 20m³</button>
      </div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <nav class="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2">
    <div class="flex justify-around text-xs">
      <a href="#" class="flex flex-col items-center text-red-600"><i class="fas fa-home text-2xl"></i><span>Accueil</span></a>
      <a href="#" class="flex flex-col items-center"><i class="fas fa-history text-2xl"></i><span>Historique</span></a>
      <a href="#" class="flex flex-col items-center"><i class="fas fa-box text-2xl"></i><span>Commandes</span></a>
      <a href="#" class="flex flex-col items-center"><i class="fas fa-user text-2xl"></i><span>Profil</span></a>
    </div>
  </nav>

  <script>
    function searchRide() {
      const query = document.getElementById('searchInput').value;
      if (query) {
        alert(`Recherche en cours pour : ${query}\n\nPrix estimé : 1800 - 3200 F\nVéhicule le plus proche dans 2 min`);
      }
    }

    function selectService(type) {
      let msg = "";
      if (type === 'truck') {
        msg = "🚚 Mode Camions activé !\n\nOptions : Pick-up, Van 10m³, Camion 20m³\nIdéal pour Port, Aéroport et gros déménagements.";
      } else {
        msg = `Service ${type.toUpperCase()} sélectionné. Simulation de recherche en cours...`;
      }
      alert(msg);
    }

    function quickOption(place) {
      alert(`Destination : ${place}\n\nPrix estimé pour camion : 8500 - 18500 F\nTemps estimé : 25-45 min`);
    }

    function toggleLocation() {
      alert("Changement de ville disponible bientôt (Abidjan, Dakar, Lomé, etc.)");
    }

    // Mode sombre automatique
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  </script>
</body>
</html>
