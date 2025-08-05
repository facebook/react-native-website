import React, { useState, useEffect } from 'react';
import { MapPin, Play, Square, Plus, Fuel, DollarSign, Download, Save, Trash2 } from 'lucide-react';

const ExpenseTracker = () => {
  // Estados principales
  const [activeTrip, setActiveTrip] = useState(null);
  const [gpsPositions, setGpsPositions] = useState([]);
  const [tollRecords, setTollRecords] = useState([]);
  const [fuelRecords, setFuelRecords] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Estados para checklist y autenticación
  const [showPreTripModal, setShowPreTripModal] = useState(false);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [checklist, setChecklist] = useState({
    lights: false,
    brakes: false,
    fluids: false,
    tires: false,
    fuel: false
  });
  const [checklistComments, setChecklistComments] = useState({
    lights: '',
    brakes: '',
    fluids: '',
    tires: '',
    fuel: ''
  });

  // Estados para formularios
  const [tollAmount, setTollAmount] = useState('');
  const [fuelData, setFuelData] = useState({
    totalAmount: '',
    gallons: '',
    odometer: ''
  });

  // Estados para gastos diarios
  const [dailyExpense, setDailyExpense] = useState({
    description: '',
    amount: '',
    category: 'Combustible'
  });

  // Función para capturar foto del conductor
  const captureDriverPhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // Crear modal para mostrar la cámara
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 1000;
      `;
      
      const container = document.createElement('div');
      container.style.cssText = `
        background: white; padding: 20px; border-radius: 10px;
        text-align: center; max-width: 400px;
      `;
      
      video.style.cssText = 'width: 100%; max-width: 300px; border-radius: 10px;';
      
      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capturar Foto';
      captureBtn.style.cssText = `
        background: #059669; color: white; border: none;
        padding: 10px 20px; margin: 10px 5px; border-radius: 5px;
        cursor: pointer;
      `;
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.style.cssText = `
        background: #dc2626; color: white; border: none;
        padding: 10px 20px; margin: 10px 5px; border-radius: 5px;
        cursor: pointer;
      `;
      
      container.appendChild(video);
      container.appendChild(document.createElement('br'));
      container.appendChild(captureBtn);
      container.appendChild(cancelBtn);
      modal.appendChild(container);
      document.body.appendChild(modal);
      
      return new Promise((resolve, reject) => {
        captureBtn.onclick = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0);
          
          const photoData = canvas.toDataURL('image/jpeg', 0.8);
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
          resolve(photoData);
        };
        
        cancelBtn.onclick = () => {
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
          reject(new Error('Captura cancelada'));
        };
      });
      
    } catch (error) {
      throw new Error('Error al acceder a la cámara: ' + error.message);
    }
  };

  // Función para resetear checklist
  const resetChecklist = () => {
    setChecklist({
      lights: false,
      brakes: false,
      fluids: false,
      tires: false,
      fuel: false
    });
    setChecklistComments({
      lights: '',
      brakes: '',
      fluids: '',
      tires: '',
      fuel: ''
    });
    setDriverPhoto(null);
  };

  // Validar checklist completo
  const isChecklistComplete = () => {
    return Object.values(checklist).every(item => item === true) && driverPhoto;
  };

  // Función para obtener posición GPS
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString(),
            accuracy: position.coords.accuracy
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  // Iniciar recorrido con checklist obligatorio
  const initiatePreTrip = () => {
    resetChecklist();
    setShowPreTripModal(true);
  };

  // Iniciar recorrido después del checklist
  const startTrip = async () => {
    if (!isChecklistComplete()) {
      alert('Debe completar todos los puntos del checklist y tomar la foto del conductor');
      return;
    }

    const initialKm = prompt('Ingrese kilometraje inicial:');
    if (!initialKm) return;

    try {
      const position = await getCurrentPosition();
      const trip = {
        id: Date.now(),
        startTime: new Date().toISOString(),
        initialKm: parseFloat(initialKm),
        startPosition: position,
        isActive: true,
        driverPhoto: driverPhoto,
        preTrip: {
          checklist: {...checklist},
          comments: {...checklistComments},
          timestamp: new Date().toISOString()
        }
      };
      
      setActiveTrip(trip);
      setGpsPositions([position]);
      setShowPreTripModal(false);
      alert('Recorrido iniciado exitosamente');
    } catch (error) {
      alert('Error al obtener ubicación GPS: ' + error.message);
    }
  };

  // Finalizar recorrido
  const endTrip = async () => {
    if (!activeTrip) return;
    
    const finalKm = prompt('Ingrese kilometraje final:');
    if (!finalKm) return;

    try {
      const position = await getCurrentPosition();
      const updatedTrip = {
        ...activeTrip,
        endTime: new Date().toISOString(),
        finalKm: parseFloat(finalKm),
        endPosition: position,
        totalKm: parseFloat(finalKm) - activeTrip.initialKm,
        isActive: false,
        route: gpsPositions
      };
      
      // Generar archivo GPX
      generateGPXFile(updatedTrip);
      
      setActiveTrip(null);
      setGpsPositions([]);
      alert(`Recorrido finalizado. Total: ${updatedTrip.totalKm.toFixed(2)} km`);
    } catch (error) {
      alert('Error al finalizar recorrido: ' + error.message);
    }
  };

  // Generar archivo GPX para GPS
  const generateGPXFile = (trip) => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Expense Tracker">
  <trk>
    <name>Recorrido ${new Date(trip.startTime).toLocaleDateString()}</name>
    <trkseg>
      ${trip.route.map(pos => `
      <trkpt lat="${pos.lat}" lon="${pos.lng}">
        <time>${pos.timestamp}</time>
      </trkpt>`).join('')}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recorrido_${new Date(trip.startTime).toISOString().split('T')[0]}.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Registrar peaje
  const addTollRecord = () => {
    if (!tollAmount || isNaN(tollAmount)) {
      alert('Ingrese un valor válido para el peaje');
      return;
    }

    const toll = {
      id: Date.now(),
      amount: parseFloat(tollAmount),
      timestamp: new Date().toISOString(),
      date: currentDate
    };

    setTollRecords([...tollRecords, toll]);
    setTollAmount('');
    alert('Peaje registrado exitosamente');
  };

  // Registrar combustible
  const addFuelRecord = () => {
    if (!fuelData.totalAmount || !fuelData.gallons || !fuelData.odometer) {
      alert('Complete todos los campos de combustible');
      return;
    }

    const fuel = {
      id: Date.now(),
      totalAmount: parseFloat(fuelData.totalAmount),
      gallons: parseFloat(fuelData.gallons),
      odometer: parseFloat(fuelData.odometer),
      pricePerGallon: parseFloat(fuelData.totalAmount) / parseFloat(fuelData.gallons),
      timestamp: new Date().toISOString(),
      date: currentDate
    };

    setFuelRecords([...fuelRecords, fuel]);
    setFuelData({ totalAmount: '', gallons: '', odometer: '' });
    alert('Registro de combustible guardado');
  };

  // Agregar gasto diario
  const addDailyExpense = () => {
    if (!dailyExpense.description || !dailyExpense.amount) {
      alert('Complete descripción y monto');
      return;
    }

    const expense = {
      id: Date.now(),
      description: dailyExpense.description,
      amount: parseFloat(dailyExpense.amount),
      category: dailyExpense.category,
      timestamp: new Date().toISOString(),
      date: currentDate
    };

    setDailyExpenses([...dailyExpenses, expense]);
    setDailyExpense({ description: '', amount: '', category: 'Combustible' });
    alert('Gasto registrado exitosamente');
  };

  // Calcular totales del día
  const getDailyTotals = () => {
    const tollTotal = tollRecords
      .filter(toll => toll.date === currentDate)
      .reduce((sum, toll) => sum + toll.amount, 0);
    
    const fuelTotal = fuelRecords
      .filter(fuel => fuel.date === currentDate)
      .reduce((sum, fuel) => sum + fuel.totalAmount, 0);
    
    const expenseTotal = dailyExpenses
      .filter(expense => expense.date === currentDate)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      tolls: tollTotal,
      fuel: fuelTotal,
      expenses: expenseTotal,
      total: tollTotal + fuelTotal + expenseTotal
    };
  };

  // Seguimiento GPS activo
  useEffect(() => {
    let intervalId;
    
    if (activeTrip) {
      intervalId = setInterval(async () => {
        try {
          const position = await getCurrentPosition();
          setGpsPositions(prev => [...prev, position]);
        } catch (error) {
          console.error('Error obteniendo posición:', error);
        }
      }, 30000); // Cada 30 segundos
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTrip]);

  const totals = getDailyTotals();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Control de Gastos Diarios
        </h1>
        
        {/* Selector de fecha */}
        <div className="mb-6 text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de trabajo:
          </label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Control de Recorrido GPS */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2" size={20} />
          Control de Recorrido GPS
        </h2>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={initiatePreTrip}
            disabled={activeTrip}
            className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
              activeTrip 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Play className="mr-2" size={16} />
            Iniciar Recorrido
          </button>
          
          <button
            onClick={endTrip}
            disabled={!activeTrip}
            className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
              !activeTrip 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <Square className="mr-2" size={16} />
            Finalizar Recorrido
          </button>
        </div>
        
        {activeTrip && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-800 font-medium">
              🟢 Recorrido activo - Km inicial: {activeTrip.initialKm}
            </p>
            <p className="text-sm text-green-600">
              Puntos GPS registrados: {gpsPositions.length}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Checklist Pre-Viaje */}
      {showPreTripModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
              <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Checklist Pre-Viaje Obligatorio
                </h2>
                
                {/* Foto del conductor */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">1. Foto del Conductor</h3>
                  {driverPhoto ? (
                    <div>
                      <img src={driverPhoto} alt="Conductor" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-2 sm:mb-3 object-cover" />
                      <p className="text-green-600 font-medium text-sm sm:text-base">✓ Foto capturada</p>
                      <button
                        onClick={() => captureDriverPhoto().then(setDriverPhoto).catch(console.error)}
                        className="mt-2 px-3 py-2 sm:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                      >
                        Tomar nueva foto
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">Capture una selfie para autenticación</p>
                      <button
                        onClick={() => captureDriverPhoto().then(setDriverPhoto).catch(err => alert(err.message))}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm sm:text-base"
                      >
                        📸 Tomar Selfie
                      </button>
                    </div>
                  )}
                </div>

                {/* Checklist de inspección */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">2. Inspección del Vehículo</h3>
                  
                  {[
                    { key: 'lights', label: '💡 Luces (direccionales, frenos, reversa)', icon: '💡' },
                    { key: 'brakes', label: '🛑 Frenos (pedal, freno de mano)', icon: '🛑' },
                    { key: 'fluids', label: '🛢️ Líquidos (aceite, refrigerante, dirección)', icon: '🛢️' },
                    { key: 'tires', label: '🚗 Llantas (presión, estado, llanta de repuesto)', icon: '🚗' },
                    { key: 'fuel', label: '⛽ Combustible (nivel suficiente)', icon: '⛽' }
                  ].map(item => (
                    <div key={item.key} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <input
                          type="checkbox"
                          id={item.key}
                          checked={checklist[item.key]}
                          onChange={(e) => setChecklist({...checklist, [item.key]: e.target.checked})}
                          className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded flex-shrink-0"
                        />
                        <label htmlFor={item.key} className="flex-1 font-medium text-gray-800 text-sm sm:text-base">
                          {item.label}
                        </label>
                        <span className={`text-xl sm:text-2xl ${checklist[item.key] ? 'text-green-500' : 'text-gray-300'} flex-shrink-0`}>
                          {checklist[item.key] ? '✅' : '⭕'}
                        </span>
                      </div>
                      <textarea
                        placeholder="Comentarios u observaciones (opcional)"
                        value={checklistComments[item.key]}
                        onChange={(e) => setChecklistComments({...checklistComments, [item.key]: e.target.value})}
                        className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                  <button
                    onClick={() => setShowPreTripModal(false)}
                    className="w-full sm:flex-1 px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium text-sm sm:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={startTrip}
                    disabled={!isChecklistComplete()}
                    className={`w-full sm:flex-1 px-4 py-3 rounded-md font-medium text-sm sm:text-base ${
                      isChecklistComplete()
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isChecklistComplete() ? '🚀 Iniciar Recorrido' : 'Complete todos los puntos'}
                  </button>
                </div>
                
                {!isChecklistComplete() && (
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 text-xs sm:text-sm">
                      <strong>Pendiente:</strong>
                      {!driverPhoto && ' Foto del conductor.'}
                      {Object.entries(checklist).filter(([_, checked]) => !checked).length > 0 && 
                        ` Checklist: ${Object.entries(checklist)
                          .filter(([_, checked]) => !checked)
                          .map(([key, _]) => {
                            const labels = {lights: 'Luces', brakes: 'Frenos', fluids: 'Líquidos', tires: 'Llantas', fuel: 'Combustible'};
                            return labels[key];
                          }).join(', ')}.`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registro de Peajes */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <DollarSign className="mr-2" size={20} />
          Registro de Peajes
        </h2>
        
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            placeholder="Valor del peaje"
            value={tollAmount}
            onChange={(e) => setTollAmount(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTollRecord}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="mr-2" size={16} />
            Registrar Peaje
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-blue-800 font-medium">
            Total peajes hoy: ${totals.tolls.toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">
            Peajes registrados: {tollRecords.filter(t => t.date === currentDate).length}
          </p>
        </div>
      </div>

      {/* Registro de Combustible */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Fuel className="mr-2" size={20} />
          Registro de Combustible
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Valor total tanqueo"
            value={fuelData.totalAmount}
            onChange={(e) => setFuelData({...fuelData, totalAmount: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Galones tanqueados"
            value={fuelData.gallons}
            onChange={(e) => setFuelData({...fuelData, gallons: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Kilometraje actual"
            value={fuelData.odometer}
            onChange={(e) => setFuelData({...fuelData, odometer: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={addFuelRecord}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 mb-4"
        >
          <Save className="mr-2" size={16} />
          Registrar Combustible
        </button>
        
        <div className="bg-orange-50 p-4 rounded-md">
          <p className="text-orange-800 font-medium">
            Total combustible hoy: ${totals.fuel.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Gastos Diarios Adicionales */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Gastos Adicionales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Descripción del gasto"
            value={dailyExpense.description}
            onChange={(e) => setDailyExpense({...dailyExpense, description: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Monto"
            value={dailyExpense.amount}
            onChange={(e) => setDailyExpense({...dailyExpense, amount: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={dailyExpense.category}
            onChange={(e) => setDailyExpense({...dailyExpense, category: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Combustible">Combustible</option>
            <option value="Alimentación">Alimentación</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Peaje">Peaje</option>
            <option value="Parqueadero">Parqueadero</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        
        <button
          onClick={addDailyExpense}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 mb-4"
        >
          <Plus className="mr-2" size={16} />
          Agregar Gasto
        </button>
      </div>

      {/* Resumen Diario */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Resumen del Día - {new Date(currentDate).toLocaleDateString()}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-md text-center">
            <p className="text-sm text-blue-600">Peajes</p>
            <p className="text-xl font-bold text-blue-800">
              ${totals.tolls.toLocaleString()}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-md text-center">
            <p className="text-sm text-orange-600">Combustible</p>
            <p className="text-xl font-bold text-orange-800">
              ${totals.fuel.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md text-center">
            <p className="text-sm text-purple-600">Otros Gastos</p>
            <p className="text-xl font-bold text-purple-800">
              ${totals.expenses.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="text-sm text-green-600">Total Día</p>
            <p className="text-2xl font-bold text-green-800">
              ${totals.total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Lista de gastos del día */}
        <div className="space-y-2">
          {dailyExpenses
            .filter(expense => expense.date === currentDate)
            .map(expense => (
              <div key={expense.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <div>
                  <span className="font-medium">{expense.description}</span>
                  <span className="text-sm text-gray-500 ml-2">({expense.category})</span>
                </div>
                <span className="font-bold text-green-600">
                  ${expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
