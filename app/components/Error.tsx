'use client';

export const Error = ({error, callback}: {error: string; callback: () => void}) => {
  return (
    <div className="p-4 text-red-600">
      <p>Error: {error}</p>
      <button onClick={() => callback()} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Dismiss
      </button>
    </div>
  );
};
