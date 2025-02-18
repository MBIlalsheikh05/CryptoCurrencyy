import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Use Routes instead of Switch
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, CryptoDetails, Cryptocurrencies, News, Exchanges } from './components';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
          Cryptoverse <br/>
          All rights reserved
        </Typography.Title>
        <space>
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          </space>
        </div>
      </div>
    </div>
  );
};
export default App;
