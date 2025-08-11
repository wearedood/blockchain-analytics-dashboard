import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [networkData, setNetworkData] = useState({});

  useEffect(() => {
    // Initialize Web3 connection
    initializeWeb3();
    // Fetch initial blockchain data
    fetchBlockchainData();
  }, []);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const fetchBlockchainData = async () => {
    try {
      // Fetch real-time blockchain metrics
      const response = await fetch('/api/blockchain-metrics');
      const data = await response.json();
      setNetworkData(data);
    } catch (error) {
      console.error('Failed to fetch blockchain data:', error);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        connected={connected}
        account={account}
        onConnect={initializeWeb3}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard networkData={networkData} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/portfolio" element={<Portfolio account={account} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
