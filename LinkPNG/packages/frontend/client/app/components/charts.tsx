"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock Data for Charts
const salesPerformanceData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const trafficSourcesData = [
  { name: 'Direct', value: 45 },
  { name: 'Search', value: 32 },
  { name: 'Social', value: 18 },
  { name: 'Referrals', value: 5 },
];

const trustScoreTrendData = [
    { name: 'Jan', score: 85 },
    { name: 'Feb', score: 88 },
    { name: 'Mar', score: 87 },
    { name: 'Apr', score: 90 },
    { name: 'May', score: 92 },
    { name: 'Jun', score: 92 },
];

export function SalesPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesPerformanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrafficSourcesChart() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={trafficSourcesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
}

export function TrustScoreTrendChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trustScoreTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[80, 100]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
    );
}
