import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function LawyerDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Lawyer Dashboard</h1>
          <p className="text-gray-700">Welcome. This is a placeholder dashboard for lawyers.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
