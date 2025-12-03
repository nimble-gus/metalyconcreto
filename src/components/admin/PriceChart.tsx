'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface PriceData {
    date: string;
    price: number;
}

interface PriceChartProps {
    data: PriceData[];
    materialName: string;
}

export default function PriceChart({ data, materialName }: PriceChartProps) {
    return (
        <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Tendencia de Precios: {materialName}
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `Q${value}`}
                    />
                    <Tooltip
                        formatter={(value: number) => [`Q${value}`, 'Precio']}
                        labelStyle={{ color: '#374151' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#DC2626" // brand-red
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
