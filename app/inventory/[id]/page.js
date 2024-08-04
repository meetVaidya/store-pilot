'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function ItemDetail({ params }) {
    const [item, setItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchItem = async () => {
            const docRef = doc(db, 'inventory', params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setItem({ id: docSnap.id, ...docSnap.data() });
                setEditedItem({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log('No such document!');
            }
        };

        fetchItem();
    }, [params.id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'inventory', params.id);
            await updateDoc(docRef, editedItem);
            setItem(editedItem);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteDoc(doc(db, 'inventory', params.id));
                router.push('/inventory');
            } catch (error) {
                console.error('Error deleting document: ', error);
            }
        }
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                        className="border p-1 text-3xl font-bold"
                    />
                ) : (
                    item.name
                )}
            </h1>
            <div className="mb-4">
                <strong>Quantity:</strong>{' '}
                {isEditing ? (
                    <input
                        type="number"
                        value={editedItem.quantity}
                        onChange={(e) => setEditedItem({ ...editedItem, quantity: Number(e.target.value) })}
                        className="border p-1"
                    />
                ) : (
                    item.quantity
                )}
            </div>
            <div className="mb-4">
                <strong>Category:</strong>{' '}
                {isEditing ? (
                    <input
                        type="text"
                        value={editedItem.category}
                        onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
                        className="border p-1"
                    />
                ) : (
                    item.category
                )}
            </div>
            <div className="mb-4">
                <strong>Description:</strong>{' '}
                {isEditing ? (
                    <textarea
                        value={editedItem.description}
                        onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                        className="border p-1 w-full"
                    />
                ) : (
                    item.description
                )}
            </div>
            {isEditing ? (
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                    Save
                </button>
            ) : (
                <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Edit
                </button>
            )}
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
            </button>
        </div>
    );
}