import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Clock,
  Activity,
  User,
  Crown,
  Target,
  Award,
  DollarSign,
  Zap,
  Rocket,
  Gift,
  Home,
  Users,
  Settings,
} from "lucide-react";

import fuckThisImage from "./assets/re.jpeg";
import tapImage from "./assets/2-modified.png";
const Login = ({ setUser }) => {
  const handleTelegramAuth = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser({ ...tg.initDataUnsafe.user, balance: 4900 });
    } else {
      setUser({ id: 1, username: "TestUser", photo_url: null, balance: 4900 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 text-center border shadow-2xl bg-indigo-900/30 backdrop-blur-lg rounded-2xl border-purple-500/30"
      >
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            animate={{
              rotateZ: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Trophy size={48} className="mx-auto text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <Crown size={48} className="mx-auto text-purple-400" />
          </motion.div>
          <motion.div
            animate={{
              rotateZ: [0, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Award size={48} className="mx-auto text-blue-400" />
          </motion.div>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white">
          lock in master Elite
        </h1>
        <p className="mb-8 text-lg text-blue-200">
          Challenge yourself and earn rewards!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTelegramAuth}
          className="w-full px-8 py-4 text-xl font-bold text-white transition-colors bg-purple-500 shadow-lg rounded-xl hover:bg-purple-600"
        >
          Begin Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

const TapGame = ({ user, onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [tapScale, setTapScale] = useState(1);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          setHighScores((prev) => {
            const newScores = [
              ...prev,
              {
                name: user.username || "Anonymous",
                score,
                photo_url: user.photo_url,
              },
            ]
              .sort((a, b) => b.score - a.score)
              .slice(0, 10);
            return newScores;
          });
          onScoreUpdate(score * 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTap = () => {
    if (!gameActive) return;
    setScore((s) => s + 1);
    setTapScale(0.95);
    setTimeout(() => setTapScale(1), 50);
  };

  return (
    <div className="min-h-screen text-white bg-slate-900">
      {/* Top Bar */}
      <div className="p-4 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            {user.photo_url ? (
              <img
                src={user.photo_url}
                alt="Profile"
                className="w-12 h-12 border rounded-full border-purple-500/30"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <span className="text-xl font-bold text-white">
              {user.username || "Anonymous"}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-400" />
              <span className="font-bold text-white">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="text-purple-400" />
              <span className="font-bold text-white">{score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-md p-4 mx-auto">
        <div className="p-6 mb-6 border bg-indigo-900/30 rounded-xl border-purple-500/30">
          <AnimatePresence mode="wait">
            {!gameActive ? (
              <motion.button
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="w-full px-8 py-4 text-xl font-bold text-white bg-purple-500 rounded-xl"
              >
                Start Challenge
              </motion.button>
            ) : (
              <motion.button
                key="tap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: tapScale }}
                exit={{ opacity: 0 }}
                onClick={handleTap}
                className="relative w-48 h-48 mx-auto"
              >
                <div className="absolute inset-0 flex items-end justify-center w-full rounded-full">
                  <img
                    className="object-contain object-center w-full h-full rounded-full custom-shadow opacity-90 filter saturate-50 contrast-100"
                    src={tapImage}
                  />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 text-center border bg-indigo-900/30 rounded-xl border-purple-500/30">
            <div className="text-sm text-gray-400">Profit per Tap</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline w-4 h-4 text-yellow-400" />
              100
            </div>
          </div>
          <div className="p-4 text-center border bg-indigo-900/30 rounded-xl border-purple-500/30">
            <div className="text-sm text-gray-400">Team Profit</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline w-4 h-4 text-yellow-400" />
              {score * 100}
            </div>
          </div>
          <div className="p-4 text-center border bg-indigo-900/30 rounded-xl border-purple-500/30">
            <div className="text-sm text-gray-400">Per Hour</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline w-4 h-4 text-yellow-400" />
              250
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="p-6 border bg-indigo-900/30 rounded-xl border-purple-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" />
            <h2 className="text-2xl font-bold">Leaderboard</h2>
          </div>
          <div className="space-y-3">
            {highScores.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-purple-900/30"
              >
                <div className="flex items-center gap-2">
                  {entry.photo_url ? (
                    <img
                      src={entry.photo_url}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="font-bold text-purple-400">{entry.score}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BalanceScreen = ({ user, balance }) => {
  return (
    <div className="min-h-screen text-white bg-slate-900">
      {/* Top Bar */}
      <div className="p-4 bg-slate-800/50 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold"> lock in and tap </h1>
          <p className="text-sm text-gray-400">mini app</p>
        </div>
      </div>

      <div className="max-w-md p-4 mx-auto">
        <motion.div
          className="p-6 mb-6 text-center border bg-indigo-900/30 rounded-xl border-purple-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-2 text-2xl font-bold">Your Balance</div>
          <div className="text-6xl font-bold text-purple-400">
            <DollarSign className="inline w-8 h-8 text-yellow-400" />
            {balance.toLocaleString()}
          </div>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span>Progress</span>
            <span>{Math.min((balance / 5000) * 100, 100).toFixed(1)}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-indigo-900/30">
            <div
              className="h-full transition-all duration-1000 bg-purple-500"
              style={{ width: `${Math.min((balance / 5000) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["Stacking", "Tasks", "Leaders", "Airdrop"].map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 text-center border cursor-pointer bg-indigo-900/30 rounded-xl border-purple-500/30"
            >
              <h2 className="text-lg font-bold">{action}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BoostersScreen = () => {
  const boosters = [
    {
      name: "Invite a friend and receive 20K",
      icon: Gift,
      progress: 2,
      total: 10,
    },
    { name: "Hot Robot Autoclicker", icon: Rocket, progress: 4, total: 10 },
    { name: "Boost for 300% energy", icon: Zap, progress: 3, total: 5 },
    { name: "Turbo x3", icon: Trophy, progress: 0, total: 3 },
  ];

  return (
    <div className="min-h-screen text-white bg-slate-900">
      {/* Top Bar */}
      <div className="p-4 bg-slate-800/50 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center">Boost Boosters</h1>
      </div>

      <div className="max-w-md p-4 mx-auto space-y-4">
        {boosters.map((booster, idx) => (
          <motion.div
            key={idx}
            className="p-6 border bg-indigo-900/30 rounded-xl border-purple-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="flex items-center gap-4">
              <booster.icon size={36} className="text-yellow-400" />
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-bold">{booster.name}</h2>
                <div className="h-2 overflow-hidden rounded-full bg-purple-900/30">
                  <div
                    className="h-full transition-all duration-500 bg-purple-500"
                    style={{
                      width: `${(booster.progress / booster.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {booster.progress}/{booster.total} completed
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Navigation = () => (
  <div className="fixed left-0 right-0 bottom-2">
    <div className="z-40 flex justify-around max-w-md px-5 py-4 mx-auto rounded-full bg-slate-800/80 backdrop-blur-sm">
      <Link
        to="/balance"
        className="flex flex-col items-center text-purple-400"
      >
        <Activity className="w-6 h-6" />
        <span className="text-xs">Tasks</span>
      </Link>
      <Link to="/game" className="flex flex-col items-center text-purple-400">
        <Gift className="w-6 h-6" />
        <span className="text-xs">Mine</span>
      </Link>
      <Link
        to="/balance"
        className="flex flex-col items-center text-purple-400"
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/boosters"
        className="flex flex-col items-center text-purple-400"
      >
        <Users className="w-6 h-6" />
        <span className="text-xs">Friends</span>
      </Link>
      <Link
        to="/balance"
        className="flex flex-col items-center text-purple-400"
      >
        <Gift className="w-6 h-6" />
        <span className="text-xs">Airdrop</span>
      </Link>
    </div>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  const handleScoreUpdate = (points) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + points,
    }));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20 bg-slate-900">
        {user && <Navigation />}
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Login setUser={setUser} />
              ) : (
                <Navigate to="/balance" replace />
              )
            }
          />
          <Route
            path="/game"
            element={
              user ? (
                <TapGame user={user} onScoreUpdate={handleScoreUpdate} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/balance"
            element={
              user ? (
                <BalanceScreen user={user} balance={user.balance} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/boosters"
            element={user ? <BoostersScreen /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
