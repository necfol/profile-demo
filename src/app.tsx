/*
 * @LastEditors: Necfol
 * @Date: 2024-05-31 23:59:11
 * @LastEditTime: 2024-06-02 22:13:02
 * @FilePath: /blocklet-project/src/app.tsx
 */
import './app.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Edit from './pages/edit';
import Home from './pages/home';

function App() {
  return (
    <div className="app w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Edit />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
