import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function CitizenLogin() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder - real auth will call API
    alert('Login submitted (placeholder)');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Citizen Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" required className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input type="password" required className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
              <a href="/" className="text-sm text-gray-600 hover:underline">Back to home</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
