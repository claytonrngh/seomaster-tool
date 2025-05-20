import EditableItem from '../../components/EditableItem';

export default function RewordPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        AI Text Rewriter
      </h1>
      <EditableItem />
    </main>
  );
}