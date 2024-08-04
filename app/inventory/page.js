'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

export default function InventoryList() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'inventory'));
        const itemList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemList);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === 'All' || item.status === filter)
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Inventory</h1>
            <div className="flex justify-between mb-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border p-2 mr-2"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2"
                    >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
                <Link href="/add-item" className="bg-blue-500 text-white px-4 py-2 rounded">
                    New Product
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-center">Product Name</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">SKU</th>


                        <th className="text-center">Price</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                            <td className="text-center">{item.name}</td>
                            <td className="text-center">{item.category}</td>

                            <td className="text-center">${item.sku}</td>

                            <td className="text-center">${item.price}</td>
                            <td className="text-center">
                                <span className={`px-3 py-1 rounded ${item.status === 'Active' ? 'bg-green-200' : 'bg-red-200'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="text-center">
                                <Link href={`/inventory/${item.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}