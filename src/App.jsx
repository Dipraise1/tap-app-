import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Clock, Activity, User, Crown,
  Target, Award, DollarSign, Zap, Rocket, Gift,
  Home, Users, Settings
} from 'lucide-react';

const Login = ({ setUser }) => {
  const handleTelegramAuth = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser({ ...tg.initDataUnsafe.user, balance: 4900 });
    } else {
      setUser({ id: 1, username: 'TestUser', photo_url: null, balance: 4900 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-900/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-purple-500/30"
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
        <h1 className="text-4xl font-bold text-white mb-4">lock in master Elite</h1>
        <p className="text-blue-200 mb-8 text-lg">Challenge yourself and earn rewards!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTelegramAuth}
          className="bg-purple-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-purple-600 transition-colors shadow-lg w-full"
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
            const newScores = [...prev, { name: user.username || 'Anonymous', score, photo_url: user.photo_url }]
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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user.photo_url ? (
              <img src={user.photo_url} alt="Profile" className="w-12 h-12 rounded-full border border-purple-500/30" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="text-white w-6 h-6" />
              </div>
            )}
            <span className="text-white font-bold text-xl">{user.username || 'Anonymous'}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-400" />
              <span className="text-white font-bold">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="text-purple-400" />
              <span className="text-white font-bold">{score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-md mx-auto p-4">
        <div className="bg-indigo-900/30 rounded-xl p-6 mb-6 border border-purple-500/30">
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
                className="bg-purple-500 text-white px-8 py-4 rounded-xl text-xl font-bold w-full"
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
                className="w-48 h-48 mx-auto relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Target size={64} className="text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-900/30 rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-sm text-gray-400">Profit per Tap</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline text-yellow-400 w-4 h-4" />
              100
            </div>
          </div>
          <div className="bg-indigo-900/30 rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-sm text-gray-400">Team Profit</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline text-yellow-400 w-4 h-4" />
              {score * 100}
            </div>
          </div>
          <div className="bg-indigo-900/30 rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-sm text-gray-400">Per Hour</div>
            <div className="text-xl font-bold">
              <DollarSign className="inline text-yellow-400 w-4 h-4" />
              250
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-indigo-900/30 rounded-xl p-6 border border-purple-500/30">
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
                className="flex justify-between items-center p-3 bg-purple-900/30 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {entry.photo_url ? (
                    <img src={entry.photo_url} alt="Avatar" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Star className="text-white w-6 h-6" />
                    </div>
                  )}
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="text-purple-400 font-bold">{entry.score}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-sm p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Link to="/balance" className="flex flex-col items-center text-purple-400">
            <Activity className="w-6 h-6" />
            <span className="text-xs">Tasks</span>
          </Link>
          <Link to="/game" className="flex flex-col items-center text-purple-400">
            <Gift className="w-6 h-6" />
            <span className="text-xs">Mine</span>
          </Link>
          <Link to="/balance" className="flex flex-col items-center text-purple-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/boosters" className="flex flex-col items-center text-purple-400">
            <Users className="w-6 h-6" />
            <span className="text-xs">Friends</span>
          </Link>
          <Link to="/balance" className="flex flex-col items-center text-purple-400">
            <Gift className="w-6 h-6" />
            <span className="text-xs">Airdrop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BalanceScreen = ({ user, balance }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold"> lock in and tap </h1>
          <p className="text-sm text-gray-400">mini app</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <motion.div
          className="bg-indigo-900/30 rounded-xl p-6 mb-6 text-center border border-purple-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-2xl font-bold mb-2">Your Balance</div>
          <div className="text-6xl font-bold text-purple-400">
            <DollarSign className="inline text-yellow-400 w-8 h-8" />
            {balance.toLocaleString()}
          </div>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.min((balance / 5000) * 100, 100).toFixed(1)}%</span>
          </div>
          <div className="bg-indigo-900/30 rounded-full h-4 overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-1000"
              style={{ width: `${Math.min((balance / 5000) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['Stacking', 'Tasks', 'Leaders', 'Airdrop'].map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-900/30 p-6 rounded-xl text-center border border-purple-500/30 cursor-pointer"
            >
              <h2 className="font-bold text-lg">{action}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BoostersScreen = () => {
  const boosters = [
    { name: 'Invite a friend and receive 20K', icon: Gift, progress: 2, total: 10 },
    { name: 'Hot Robot Autoclicker', icon: Rocket, progress: 4, total: 10 },
    { name: 'Boost for 300% energy', icon: Zap, progress: 3, total: 5 },
    { name: 'Turbo x3', icon: Trophy, progress: 0, total: 3 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-4">
      <h1 className="text-2xl font-bold text-center">Boost Boosters</h1>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {boosters.map((booster, idx) => (
          <motion.div
            key={idx}
            className="bg-indigo-900/30 p-6 rounded-xl border border-purple-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="flex items-center gap-4">
              <booster.icon size={36} className="text-yellow-400" />
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-2">{booster.name}</h2>
                <div className="bg-purple-900/30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${(booster.progress / booster.total) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-1">
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
  <div className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-sm p-4">
    <div className="flex justify-around max-w-md mx-auto">
      <Link to="/balance" className="flex flex-col items-center text-purple-400">
        <Activity className="w-6 h-6" />
        <span className="text-xs">Tasks</span>
      </Link>
      <Link to="/game" className="flex flex-col items-center text-purple-400">
        <Gift className="w-6 h-6" />
        <span className="text-xs">Mine</span>
      </Link>
      <Link to="/balance" className="flex flex-col items-center text-purple-400">
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/boosters" className="flex flex-col items-center text-purple-400">
        <Users className="w-6 h-6" />
        <span className="text-xs">Friends</span>
      </Link>
      <Link to="/balance" className="flex flex-col items-center text-purple-400">
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
    setUser(prev => ({
      ...prev,
      balance: prev.balance + points
    }));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 pb-20">
        {user && <Navigation />}
        <Routes>
          <Route
            path="/"
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/balance" replace />}
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
            element={
              user ? (
                <BoostersScreen />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;