import React, { useState, useEffect } from 'react';
import Home from './Home';
import { ScaleLoader } from 'react-spinners';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
const [loading, setLoading] = useState(false);

useEffect(() => {
setLoading(true);
setTimeout(() => setLoading(false), 3000);
}, []);

return (
<BrowserRouter>
    {loading ? (
    <div className='preloder'>
        <ScaleLoader color="var(--secondary-color)" height={100} width={10} />
    </div>
    ) : (
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
    )}
</BrowserRouter>
);
};

export default App;