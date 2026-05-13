import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogoComponent } from '../components/LogoComponent';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoComponent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;