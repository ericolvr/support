import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

export const EquipmentChart = ({ data }) => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

    
    const backgroundColors = data.map((value) => {
        if (value === 0) return "#23CFCF" // "Boa" (verde)
        if (value === 1) return "#FFC235" // "Regular" (amarelo)
        if (value === 2) return "#FF3F69" // "Ruim" (vermelho)
        return "#000000"; // Fallback para qualquer outro valor
    });

    const resetChart = () => {
        return {
            labels: [],
            datasets: [{
                label: 'Qualidade',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                barThickness: 20,
            }]
        }
    }

    const fixedData = data.map(() => 1);  // Define um valor fixo de 1 para todas as barras
    const chartData = {
        labels: data.map((_, index) => index + 1), 
        datasets: [
            {
                label: 'Qualidade',
                data: fixedData,  
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1,
                // barThickness: 20,
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false, // Ocultando legenda para simplificação
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        const originalValue = data[context.dataIndex]
                        return `Qualidade: ${originalValue}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,  
                min: 0,
                max: 0.5,
                ticks: {
                    display: false,
                }
            }
        }
    }

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    )
}
