import Link from 'next/link';
import InventoryDashboard from '../components/InventoryDashboard';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-8">Inventory Management System</h1>
            <InventoryDashboard />
            <div className="mt-8">
                <Link href="/inventory" className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600">
                    View Full Inventory
                </Link>
                <Link href="/add-item" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add New Item
                </Link>
            </div>
        </main>
    );
}