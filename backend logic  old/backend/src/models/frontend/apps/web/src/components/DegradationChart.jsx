import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DegradationChart = ({ data, currentRul }) => {
  let strokeColor = 'hsl(var(--primary))';
  if (currentRul < 30) strokeColor = 'hsl(var(--destructive))';
  else if (currentRul <= 70) strokeColor = 'hsl(var(--secondary))';

  return (
    <div className="w-full h-[300px] bg-card rounded-2xl border border-border p-6">
      <h3 className="text-lg font-medium text-muted-foreground mb-6">30-Day Degradation History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--popover-foreground))'
            }}
            itemStyle={{ color: strokeColor }}
          />
          <Line 
            type="monotone" 
            dataKey="rul" 
            stroke={strokeColor} 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: strokeColor, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DegradationChart;