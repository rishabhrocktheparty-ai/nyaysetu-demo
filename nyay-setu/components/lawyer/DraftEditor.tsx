import React, { useState } from 'react';
import Card from '../ui/Card';

export default function DraftEditor({ initialContent = '', onSave }: { initialContent?: string, onSave: (content: string) => void }) {
  const [content, setContent] = useState(initialContent);
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <textarea
        className="w-full h-40 p-2 border rounded mb-4"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your draft here..."
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => onSave(content)}
      >
        Save Draft
      </button>
    </Card>
  );
}
