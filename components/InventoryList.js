'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import InventoryItem from './InventoryItem';

export default function InventoryList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'inventory'));
            const itemList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemList);
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inventory List</h2>
            {items.map(item => (
                <InventoryItem key={item.id} item={item} />
            ))}
        </div>
    );
}