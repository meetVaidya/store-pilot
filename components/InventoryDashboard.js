'use client'

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function InventoryDashboard() {
    const [inventoryData, setInventoryData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [lowStockItems, setLowStockItems] = useState(0);

    useEffect(() => {
        const fetchInventory = async () => {
            const querySnapshot = await getDocs(collection(db, 'inventory'));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setInventoryData(items);
            setTotalItems(items.length);
            setLowStockItems(items.filter(item => item.quantity < 10).length);
        };

        fetchInventory();
    }, []);

    const getTop5Items = () => {
        return inventoryData
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5)
            .map(item => ({
                name: item.name,
                quantity: item.quantity,
            }));
    };

    const getCategoryData = () => {
        const categories = {};
        inventoryData.forEach(item => {
            if (item.category) {
                categories[item.category] = (categories[item.category] || 0) + 1;
            }
        });
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Inventory Overview</h2>
                <p className="text-xl mb-2">Total Items: {totalItems}</p>
                <p className="text-xl mb-2">Low Stock Items: {lowStockItems}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Top 5 Items by Quantity</h2>
                <BarChart width={400} height={300} data={getTop5Items()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Items by Category</h2>
                <PieChart width={400} height={300}>
                    <Pie
                        data={getCategoryData()}
                        cx={200}
                        cy={150}
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {getCategoryData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
}