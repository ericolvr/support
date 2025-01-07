import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'


export const BatteryChart = ({ data }) => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    const chartData = {
        labels: ["Boa", "Regular", "Ruim"],
        datasets: [
            {
                data: [data.ok, data.medium, data.bad],
                backgroundColor: ["#23CFCF", "#FFC235", "#FF3F69"],
            }
        ]
    }

    const totalTextPlugin = {
        id: 'centerTotal',
        afterDraw(chart) {
            const { width, height, ctx } = chart;
            const totalSum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0); // Calcula o total baseado nos dados do gráfico
            
            ctx.save();  
            ctx.font = '30px Arial';
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'start';
    
            const text = `${totalSum}`;
            ctx.fillText(text, width / 2, height / 2);
            ctx.restore();
        }
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                color: 'black',  
                font: {
                    weight: 'bold',
                    size: 17,
                },
                formatter: (value, context) => {
                    return `${value}`;
                }
            }
        },
    };

    return (
        <div>
            <Doughnut data={chartData} options={options} plugins={[totalTextPlugin]} />
        </div>
    );
};



