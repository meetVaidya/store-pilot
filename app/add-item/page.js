import AddItemForm from '../../components/AddItemForm';

export default function AddItem() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Add New Item</h1>
            <AddItemForm />
        </div>
    );
}