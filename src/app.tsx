import React from 'react';
import Header from './components/Header';
import EnergyList from './components/EnergyList';
import './assets/css/global.css';
const App = () => {
    return (
        <div className="container">
            <Header/>;
            <EnergyList/>;
        </div>
    )
} 
export default App;