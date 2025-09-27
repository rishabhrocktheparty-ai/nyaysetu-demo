import Card from '../ui/Card';

export default function CaseCard({ title, description, status, onClick }: { title: string, description?: string, status?: string, onClick?: () => void }) {
  return (
    <Card className="mb-4 cursor-pointer hover:shadow-lg" onClick={onClick}>
      <div className="flex flex-col">
        <div className="font-semibold text-lg text-blue-700">{title}</div>
        {description && <div className="text-gray-600 mt-1">{description}</div>}
        {status && <div className="mt-2 text-xs text-gray-500">Status: {status}</div>}
      </div>
    </Card>
  );
}
