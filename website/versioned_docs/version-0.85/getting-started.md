import { useState } from "react"; import { Heart, MessageCircle, Share2, Home, Search, PlusSquare, User, Music2, } from "lucide-react";

export default function OGStreamApp() { const [coins] = useState(24500); const [followers] = useState("1.2M"); const [liked, setLiked] = useState(false);

const stories = [ { user: "@kingog", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", }, { user: "@vibesdaily", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop", }, { user: "@luxgirl", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop", }, ];

const videos = [ { username: "@ogcreator", caption: "Late night vibes 🔥", song: "OG Beat Mix", likes: "125K", comments: "8.4K", shares: "2.1K", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop", }, ];

return ( <div className="bg-black min-h-screen text-white font-sans overflow-hidden"> <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-zinc-800 px-4 py-3"> <div className="max-w-md mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 mb-4 shadow-2xl"> <div className="flex justify-between items-center"> <div> <p className="text-sm text-pink-100">Creator Wallet</p> <h2 className="text-3xl font-bold text-white">{coins} Coins</h2> </div>

<div className="text-right">
          <p className="text-sm text-pink-100">Followers</p>
          <h3 className="text-2xl font-bold text-white">{followers}</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <button className="bg-white/20 backdrop-blur-md py-2 rounded-xl text-sm font-semibold">
          Withdraw
        </button>

        <button className="bg-white/20 backdrop-blur-md py-2 rounded-xl text-sm font-semibold">
          Analytics
        </button>

        <button className="bg-white text-black py-2 rounded-xl text-sm font-bold">
          Go LIVE
        </button>
      </div>
    </div>
    <div className="flex justify-between items-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-pink-500">OGStream</h1>

      <div className="flex items-center gap-3">
        <button className="bg-zinc-900 px-4 py-2 rounded-xl text-sm font-semibold">
          LIVE
        </button>

        <button className="bg-pink-500 px-4 py-2 rounded-xl text-sm font-semibold text-white">
          Upload
        </button>
      </div>
    </div>

    <div className="flex gap-4 overflow-x-auto mt-4 pb-2 no-scrollbar max-w-md mx-auto">
      {stories.map((story, index) => (
        <div key={index} className="flex flex-col items-center min-w-[70px]">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
            <img
              src={story.image}
              alt={story.user}
              className="w-full h-full rounded-full object-cover border-2 border-black"
            />
          </div>

          <p className="text-xs mt-2 truncate w-full text-center">
            {story.user}
          </p>
        </div>
      ))}
    </div>
  </div>
  {videos.map((video, index) => (
    <div
      key={index}
      className="relative h-screen w-full flex items-end justify-between pt-36"
      style={{
        backgroundImage: `url(${video.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="relative z-10 p-6 w-[75%] mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
              alt="creator"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xl">{video.username}</h2>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            </div>

            <p className="text-gray-300 text-sm">Content Creator</p>
          </div>
        </div>
        <h2 className="font-bold text-xl mb-2">{video.username}</h2>

        <p className="text-sm text-gray-200 mb-3 leading-relaxed">
          {video.caption}
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 mt-4 mb-4 border border-white/10">
          <p className="text-sm text-pink-300 font-semibold mb-1">
            Trending Challenge 🔥
          </p>
          <p className="text-xs text-gray-300">
            #NightVibesChallenge • 12.4M videos
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Music2 size={16} />
          <span>{video.song}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 mr-4 mb-28">
        <div className="bg-yellow-400 text-black px-3 py-2 rounded-2xl text-xs font-bold animate-bounce">
          TOP LIVE
        </div>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300">
          Follow
        </button>
        <div className="flex flex-col items-center">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-4 rounded-full backdrop-blur-md ${
              liked ? "bg-red-500" : "bg-white/10"
            } transition-all duration-300`}
          >
            <Heart size={28} fill={liked ? "white" : "none"} />
          </button>
          <p className="text-sm mt-2">{video.likes}</p>
        </div>

        <div className="flex flex-col items-center">
          <button className="p-4 rounded-full bg-white/10 backdrop-blur-md">
            <MessageCircle size={28} />
          </button>
          <p className="text-sm mt-2">{video.comments}</p>
        </div>

        <div className="flex flex-col items-center">
          <button className="p-4 rounded-full bg-white/10 backdrop-blur-md">
            <Share2 size={28} />
          </button>
          <p className="text-sm mt-2">{video.shares}</p>
        </div>

        <div className="w-14 h-14 rounded-full border-2 border-pink-500 overflow-hidden mt-2">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute left-4 top-40 bg-black/50 backdrop-blur-md rounded-2xl px-4 py-2 border border-zinc-700 z-20">
        <p className="text-sm text-green-400 font-semibold">
          ● 24.5K Watching Live
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-zinc-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button className="flex flex-col items-center text-pink-500">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center text-gray-400">
            <Search size={24} />
            <span className="text-xs mt-1">Discover</span>
          </button>

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl px-5 py-3 font-bold hover:scale-105 transition-all duration-300 shadow-xl">
            <PlusSquare size={28} />
          </button>

          <button className="flex flex-col items-center text-gray-400">
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Inbox</span>
          </button>

          <button className="flex flex-col items-center text-gray-400">
            <div className="relative">
              <User size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full px-1">
                9+
              </span>
            </div> size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

); }
