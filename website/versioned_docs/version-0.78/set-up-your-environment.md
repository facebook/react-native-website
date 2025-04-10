import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // 假設有自定義按鈕組件

const AttendanceApp = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [records, setRecords] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [history, setHistory] = useState([]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("瀏覽器不支援定位功能");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        setIsLoading(false);
      },
      (error) => {
        alert("定位失敗: " + error.message);
        setIsLoading(false);
      }
    );
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, projectCode }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setIsAdmin(data.role === "admin");
        setStatus("登入成功");
        fetchUserHistory();
      } else {
        setStatus("登入失敗: " + data.message);
      }
    } catch (err) {
      setStatus("登入錯誤");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, projectCode }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("註冊成功，請登入");
        setShowRegister(false);
      } else {
        setStatus("註冊失敗: " + data.message);
      }
    } catch (err) {
      setStatus("註冊錯誤");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    setStatus("已登出");
  };

  const handleSign = async (type) => {
    if (!location) {
      alert("請先定位");
      return;
    }

    const response = await fetch("https://your-backend-api.com/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        location,
        time: new Date().toISOString(),
      }),
    });

    const data = await response.json();
    if (data.success) {
      setStatus(`${type === "signIn" ? "簽到" : "簽退"}成功`);
      fetchUserHistory();
    } else {
      setStatus("操作失敗");
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await fetch("https://your-backend-api.com/records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRecords(data.records);
    } catch (err) {
      setStatus("查詢失敗");
    }
  };

  const fetchUserHistory = async () => {
    try {
      const res = await fetch("https://your-backend-api.com/user/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistory(data.history);
    } catch (err) {
      console.error("讀取歷史紀錄失敗");
    }
  };

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchRecords();
    }
  }, [isLoggedIn, isAdmin]);

  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h1 className="text-xl font-bold mb-4">
          {showRegister ? "註冊新帳號" : "請先登入"}
        </h1>
        <input
          type="text"
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="工程代碼 / 密碼"
          value={projectCode}
          onChange={(e) => setProjectCode(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <Button
          onClick={showRegister ? handleRegister : handleLogin}
          className="w-full mb-2"
        >
          {showRegister ? "註冊" : "登入"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowRegister(!showRegister)}
          className="w-full"
        >
          {showRegister ? "已有帳號？登入" : "沒有帳號？註冊"}
        </Button>
        {status && <div className="text-red-600 mt-2">{status}</div>}
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">管理者後台 - 簽到紀錄查詢</h1>
        <Button onClick={handleLogout} className="mb-4">登出</Button>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">使用者</th>
              <th className="border p-2">動作</th>
              <th className="border p-2">時間</th>
              <th className="border p-2">位置</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{rec.username}</td>
                <td className="border p-2">{rec.type}</td>
                <td className="border p-2">{new Date(rec.time).toLocaleString()}</td>
                <td className="border p-2">{rec.location.lat}, {rec.location.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">工程人員簽到系統</h1>

      <Button onClick={getLocation} disabled={isLoading} className="mb-4 w-full">
        {isLoading ? "定位中..." : "取得定位"}
      </Button>

      {location && (
        <div className="text-sm text-gray-600 mb-4">
          目前位置：{location.lat}, {location.lng}
        </div>
      )}

      <Button onClick={() => handleSign("signIn")} className="mb-2 w-full">
        簽到
      </Button>
      <Button onClick={() => handleSign("signOut")} variant="secondary" className="w-full">
        簽退
      </Button>

      <h2 className="text-lg font-semibold mt-6 mb-2">今日紀錄</h2>
      <ul className="text-sm text-left">
        {history.map((h, i) => (
          <li key={i} className="mb-1">
            {new Date(h.time).toLocaleTimeString()} - {h.type} - {h.location.lat}, {h.location.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceApp;
