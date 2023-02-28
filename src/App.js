import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Disk from './Components/Disk';
import Login from './Authorization/Login';
import Register from './Authorization/Register';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Disk/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
