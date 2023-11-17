import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  earnings: number;
}

const myData: DataPoint[] = [
  { month: "Jan", earnings: 15 },
  { month: "Feb", earnings: 18 },
  { month: "Mar", earnings: 12 },
  { month: "Apr", earnings: 17 },
  { month: "May", earnings: 20 },
  { month: "Jun", earnings: 9 },
  { month: "Jul", earnings: 14 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="earnings ">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

interface EarningsProps {
  data?: DataPoint[]; // Define the data prop
}

const Earnings = ({ data = myData }: EarningsProps) => {
  const totalEarnings = data.reduce((sum, point) => sum + point.earnings, 0);
  const formatYAxisTick = (value: number) => `$${value}`;
  return (
    <div className="container mx-auto flex h-auto w-full max-w-[531px] flex-col rounded-lg bg-gray py-6 shadow">
      <div className="flex justify-between mb-6">
        <div className="px-8 text-lg font-semibold font-primary text-darkgray">
          Total Earings
        </div>
        <div className="px-6 text-xs font-normal font-primary text-darkgray">
          ${totalEarnings}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={196}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: "Nunito",
              color: "#7E8FAA",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: "Nunito",
              color: "#7E8FAA",
              fontSize: 12,
              fontWeight: 500,
            }}
            tickFormatter={formatYAxisTick}
          />
          <Bar
            dataKey="earnings"
            radius={[7, 7, 7, 7]}
            fill="#55C0C3"
            barSize={24}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Earnings;
