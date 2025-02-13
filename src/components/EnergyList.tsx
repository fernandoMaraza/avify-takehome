import React from 'react';
import useEnergyList from '../hooks/useEnergyList';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { energyColors, energyTypeMap } from '../constants/energy';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
const EnergyList = () => {
    const { 
        energyList,
        dataChart,
        options,
        isChartView,
        setIsChartView
     } = useEnergyList()
   
    if(!energyList){
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <div className="container-description">
                <p>Estos datos representan el porcentaje de energía generada por cada fuente en el Reino Unido durante el último período registrado.</p>
                <div className="container-date">
                    <p>Desde: {format(energyList.data.from,'eeee, dd MMMM yyyy HH:mm:ss', { locale: es })}</p>
                    <p>Hasta: {format(energyList.data.to,'eeee, dd MMMM yyyy HH:mm:ss', { locale: es })}</p> 
                </div>
            </div>
           
            <div className="toggle-buttons">
                <button onClick={() => setIsChartView(true)} disabled={isChartView}>Ver gráfico</button>
                <button onClick={() => setIsChartView(false)} disabled={!isChartView}>Ver Tarjetas</button>
            </div>
            {isChartView ? (
                <div className="container-chart">
                    <Doughnut data={dataChart} options={options} />  
                </div>
            ) : (
                <div className="container-cards">
                    {energyList.data.generationmix.map((mix) => (
                        <div key={mix.fuel} className="energy-card" style={{ backgroundColor: energyColors[mix.fuel] }}>
                            <h3>{energyTypeMap[mix.fuel]}</h3>
                            <p>{mix.perc}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default EnergyList;