
const UserIcon = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14h6m-3 3l-3-3 3-3M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg>);
const GiftIcon = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM12 12l2 2 4-4M8 12l-2 2 4 4"/></svg>);

// Navigation Links for the main features
const FEATURE_LINKS = [
  { name: 'ट्राई-ऑन 3D मॉडल', icon: TryOnIcon, path: 'tryon' },
  { name: 'ग्रोसरी', icon: GroceryIcon, path: 'grocery' },
  { name: 'कपड़े डिज़ाइन करें', icon: DesignIcon, path: 'design' },
  { name: 'एक्सपीरियंस वीडियो', icon: VideoFeedIcon, path: 'videos' },
];

// Mock data for trending slides
const TRENDING_ITEMS = [
  { id: 1, name: 'ट्रेंडी टी-शर्ट', category: 'Clothes', color: 'bg-red-500', text: 'सर्दियों का कलेक्शन' },
  { id: 2, name: 'लेटेस्ट ज्वेलरी', category: 'Jewelry', color: 'bg-yellow-500', text: 'गोल्ड प्लेटेड' },
  { id: 3, name: 'स्टाइलिश सोफा', category: 'Furniture', color: 'bg-green-500', text: 'कम दाम में' },
  { id: 4, name: 'स्मार्ट होम इक्विपमेंट', category: 'Home', color: 'bg-blue-500', text: 'ऑटोमैटिक' },
];

// --- 3. Main Feature Pages ---

const TryOnCustomization = ({ setModalState }) => {
  const [modelSettings, setModelSettings] = useState({
    faceUploaded: false,
    fat: 50,
    muscle: 50,
    skinTone: 'Medium',
    hairStyle: 'Short',
  });

  const handleModify = (key, value) => {
    setModelSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFaceScan = () => {
    // Mocking face scan/upload process
    setModalState({
      isOpen: true,
      title: 'फेस स्कैन अनिवार्य',
      message: 'आगे बढ़ने के लिए आपको अपना चेहरा स्कैन या फोटो अपलोड करना होगा। (यह सुविधा केवल डेमो के लिए है)',
      onClose: () => handleModify('faceUploaded', true),
      primaryAction: { label: 'फोटो अपलोड करें', handler: () => handleModify('faceUploaded', true) }
    });
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">3D मॉडल और ट्राई-ऑन स्टूडियो</h2>

      {/* 3D Model View Placeholder */}
      <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        <span className="text-gray-500 text-lg font-medium">
          3D मॉडल रेंडरिंग एरिया
          {modelSettings.faceUploaded ? (
            <span className="block text-sm text-green-600"> (फेस लॉक है)</span>
          ) : (
            <span className="block text-sm text-red-600"> (फेस स्कैन बाकी है!)</span>
          )}
        </span>
        <UserIcon className="w-16 h-16 text-gray-400 absolute opacity-50"/>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-indigo-600">मॉडल को मॉडिफाई करें</h3>

        {!modelSettings.faceUploaded && (
          <button
            onClick={handleFaceScan}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md"
          >
            फेस स्कैन / फोटो अपलोड करें (अनिवार्य)
          </button>
        )}

        <label className="block pt-2">वसा (Fat) स्तर: {modelSettings.fat}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={modelSettings.fat}
          onChange={(e) => handleModify('fat', e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          disabled={!modelSettings.faceUploaded}
        />

        <label className="block">मांसपेशी (Muscle) स्तर: {modelSettings.muscle}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={modelSettings.muscle}
          onChange={(e) => handleModify('muscle', e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          disabled={!modelSettings.faceUploaded}
        />

        <div className="flex space-x-4">
          <label className="block flex-1">
            स्किन टोन:
            <select
              value={modelSettings.skinTone}
              onChange={(e) => handleModify('skinTone', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2"
              disabled={!modelSettings.faceUploaded}
            >
              <option>हल्का</option>
              <option>मध्यम</option>
              <option>गहरा</option>
            </select>
          </label>
          <label className="block flex-1">
            हेयर स्टाइल:
            <select
              value={modelSettings.hairStyle}
              onChange={(e) => handleModify('hairStyle', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2"
              disabled={!modelSettings.faceUploaded}
            >
              <option>छोटे</option>
              <option>लम्बे</option>
              <option>घुंघराले</option>
            </select>
          </label>
        </div>

        <button
          className={w-full py-3 font-bold rounded-lg transition shadow-md ${
            modelSettings.faceUploaded
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }}
          disabled={!modelSettings.faceUploaded}
          onClick={() => setModalState({ isOpen: true, title: 'सफलता', message: 'मॉडल सेटिंग्स सेव हो गई हैं! अब आप वर्चुअल ट्राई-ऑन शुरू कर सकते हैं।', onClose: () => setModalState({ isOpen: false }) })}
        >
          सेटिंग्स सेव करें
        </button>
      </div>
    </div>
  );
};

const ExperienceVideos = () => (
  <div className="p-4 space-y-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
      <VideoFeedIcon className="mr-2"/> Hyper एक्सपीरियंस वीडियो फ़ीड
    </h2>
    <p className="text-gray-600">यहाँ ग्राहक 'Hyper' के साथ अपने अनुभवों के बारे में शॉर्ट वीडियो डाल सकते हैं।</p>
    
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg shadow-inner flex flex-col justify-end p-2 transition hover:shadow-xl cursor-pointer">
          <p className="text-xs text-white bg-black bg-opacity-40 p-1 rounded-sm">यूज़र {i}</p>
          <span className="text-white text-sm font-semibold mt-1">खरीदारी का अनुभव</span>
        </div>
      ))}
    </div>

    <button className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition shadow-md">
      अपना वीडियो अपलोड करें
    </button>
  </div>
);

const CustomClothesDesign = () => (
  <div className="p-4 space-y-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
      <DesignIcon className="mr-2"/> अपने कपड़े डिज़ाइन करें
    </h2>
    <p className="text-gray-600 mb-6">यह सेक्शन छोटे-बड़े टी-शर्ट प्रिंटिंग बिज़नेस को भी फायदा पहुँचाएगा, क्योंकि वे यहाँ से कस्टम ऑर्डर ले सकते हैं!</p>

    <div className="relative h-48 bg-gray-100 border border-dashed border-indigo-400 rounded-xl flex items-center justify-center mb-4">
      <span className="text-indigo-600 font-medium">डिज़ाइन एडिटिंग कैनवास</span>
    </div>

    <div className="space-y-3">
      <input type="text" placeholder="अपना टेक्स्ट/लोगो डालें" className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/><input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
      <select className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        <option>उत्पाद चुनें: टी-शर्ट</option>
        <option>हुडी</option>
        <option>मग</option>
      </select>
    </div>

    <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md">
      डिज़ाइन पूरा करें और ऑर्डर दें
    </button>
  </div>
);

const GrocerySection = () => (
  <div className="p-4 space-y-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
      <GroceryIcon className="mr-2"/> Hyper ग्रोसरी स्टोर
    </h2>
    <p className="text-gray-600 mb-6">हर प्रकार की ग्रोसरी यहाँ उपलब्ध है, तुरंत डिलीवरी के साथ।</p>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {['फल और सब्जियां', 'डेयरी उत्पाद', 'अनाज और दालें', 'स्नैक्स', 'पेय पदार्थ', 'पर्सनल केयर'].map(item => (
        <div key={item} className="p-3 bg-indigo-50 rounded-lg text-center shadow-sm hover:shadow-md transition cursor-pointer">
          <span className="text-indigo-800 font-medium text-sm">{item}</span>
        </div>
      ))}
    </div>

    <button className="w-full py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-md">
      शॉपिंग शुरू करें
    </button>
  </div>
);


// --- 4. Main App Component (App) ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', onClose: () => setModalState({ isOpen: false }), primaryAction: null });
  const [birthday, setBirthday] = useState('');

  // Mock function to check birthday (In a real app, this would check today's date)
  const checkBirthday = useCallback(() => {
    if (!birthday) return;
    const today = new Date();
    const dob = new Date(birthday);

    if (dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate()) {
      // Unique and beautiful Hindi message (शुभकामना संदेश)
      const message = "जन्मदिन मुबारक! Hyper परिवार की ओर से, हम आपके जीवन के इस विशेष दिन पर ढेर सारी खुशियाँ, सफलता और अपार प्रेम की कामना करते हैं। आपकी हर इच्छा पूरी हो! आपके लिए एक विशेष गिफ्ट (20% डिस्काउंट कूपन) आपके अकाउंट में भेज दिया गया है।";
      setModalState({
        isOpen: true,
        title: "जन्मदिन की हार्दिक शुभकामनाएँ!",
        message: message,
        onClose: () => setModalState({ isOpen: false }),
        primaryAction: {
          label: 'गिफ्ट भेजें',
          handler: () => setModalState({ isOpen: true, title: 'गिफ्ट भेजें', message: 'यह सुविधा आपको अपने दोस्तों को वर्चुअल गिफ्ट भेजने की अनुमति देती है।', onClose: () => setModalState({ isOpen: false }) })
        }
      });
    }
  }, [birthday]);

  useEffect(() => {
    checkBirthday();
  }, [checkBirthday]);

  // Render the current page content
  const renderContent = () => {
    switch (currentPage) {
      case 'tryon':
        return <TryOnCustomization setModalState={setModalState} />;
      case 'grocery':
        return <GrocerySection />;
      case 'design':
        return <CustomClothesDesign />;
      case 'videos':
        return <ExperienceVideos />;
      case 'user':
        return (
          <div className="p-4 space-y-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">यूजर प्रोफाइल</h2>
            <label className="block text-gray-700 font-medium">अपनी जन्मतिथि (Birthday) दर्ज करें:</label>
            <input type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">हम आपके जन्मदिन पर एक सुंदर और अनोखा मैसेज भेजेंगे!</p>
            {birthday && (
               <button
                  onClick={checkBirthday}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md mt-4"
                >
                  जन्मदिन चेक करें
                </button>
            )}
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-6">
            <div className="bg-indigo-100 p-6 rounded-xl shadow-lg">
              <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">Hyper</h1>
              <p className="text-indigo-600 font-medium">{SLOGAN}</p>
            </div>
            
            {/* Trending Slides (Horizontal Scroll) */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-gray-800">ट्रेंडिंग चीज़ें 🔥</h2>
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {TRENDING_ITEMS.map(item => (
                  <div key={item.id} className="flex-none w-48 rounded-xl shadow-md overflow-hidden transform transition hover:scale-[1.02] cursor-pointer">
                    <div className={h-24 ${item.color} flex items-center justify-center}>
                      <span className="text-white font-semibold text-lg">{item.category}</span>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Product Categories (Styled like Flipkart) */}
            <h2 className="text-xl font-bold text-gray-800 pt-2">खरीदारी की मुख्य श्रेणियां</h2>
            <div className="grid grid-cols-2 gap-4">
              {['कपड़े', 'एक्सेसरीज़', 'ज्वेलरी', 'फर्नीचर', 'होम इक्विपमेंट', 'गिफ्ट्स'].map(category => (
                <div
                  key={category}
                  className="bg-white p-4 rounded-xl shadow-lg text-center transition transform hover:bg-gray-50 hover:shadow-xl cursor-pointer"
                >
                  <p className="text-lg font-semibold text-gray-700">{category}</p>
                  <p className="text-xs text-indigo-500 mt-1">अभी खरीदें</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      {/* Custom Modal */}
      <Modal {...modalState} />

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <div className="max-w-xl mx-auto flex justify-between items-center p-4">
          <HyperLogo />
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentPage('user')} className="text-gray-600 hover:text-indigo-600 transition">
              <UserIcon />
            </button>
            <button onClick={() => setModalState({ isOpen: true, title: 'गिफ्ट भेजें', message: 'यह सुविधा आपको अपने दोस्तों को वर्चुअल या फिजिकल गिफ्ट भेजने की अनुमति देगी।', onClose: () => setModalState({ isOpen: false }) })} className="text-gray-600 hover:text-indigo-600 transition">
              <GiftIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area (Fluid Width, Mobile Focused) */}
      <main className="flex-grow w-full max-w-xl p-4 mt-20 mb-20">
        {renderContent()}
      </main> {/* Bottom Navigation Bar (Fixed for Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t shadow-2xl">
        <div className="max-w-xl mx-auto flex justify-around items-center h-16">
          <button
            onClick={() => setCurrentPage('home')}
            className={flex flex-col items-center text-xs font-medium transition ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}}
          >
            <HomeIcon className="w-6 h-6 mb-0.5" />
            होम
          </button>
          {FEATURE_LINKS.map(link => (
            <button
              key={link.path}
