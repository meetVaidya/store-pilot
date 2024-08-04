import Link from 'next/link';

export default function InventoryItem({ item }) {
    return (
        <div className="border p-4 mb-2 rounded">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <Link href={`/inventory/${item.id}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    );
}