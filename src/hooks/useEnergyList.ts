import { useEffect,useState } from 'react';
import energyGeneration from "../services/energyGeneration";
import { IEnergyList } from '../interfaces/energyList.interface';
import { energyColors, energyTypeMap } from '../constants/energy';

const useEnergyList = () => {
    const [energyList,setEnergyList] = useState<IEnergyList | null>(null);
    const labels = energyList?.data.generationmix.map((mix) => energyTypeMap[mix.fuel] || mix.fuel) || []; 
    const dataValues = energyList?.data.generationmix.map((mix) => mix.perc) || []; 
    const backgroundColors = energyList?.data.generationmix.map((mix)=> energyColors[mix.fuel]) || [];
    const [isChartView, setIsChartView] = useState(true);
    const getEneryList = async () => {
        const response = await energyGeneration.getAsync()
        console.log(response)
        setEnergyList(response)
    }
    const dataChart = {
        labels: labels,
        datasets: [
            {
            label: 'Energy Generation Mix',
            data: dataValues,
            backgroundColor: backgroundColors,
            borderWidth: 1,
            },
        ],
        };
    const options = {
        responsive: true,
        plugins: {
        legend: {
        position: 'bottom' as const,
        }, 
        tooltip: {
        callbacks: {
            label: (tooltipItem: any) => {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                },
            },
        },
        },
    };
    useEffect(() => {
      getEneryList()
    }, [])
    
    return {
        energyList,
        dataChart,
        options,
        isChartView,
        setIsChartView
    }
}
export default useEnergyList;