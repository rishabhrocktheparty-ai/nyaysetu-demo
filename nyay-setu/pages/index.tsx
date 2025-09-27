import Head from 'next/head';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { useState } from 'react';
import Router from 'next/router';

export default function Home() {
  const [mode, setMode] = useState<'select' | 'register' | 'verify'>('select');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined, phone: phone || undefined, password }),
      });
      if (res.ok) {
        // server returns otp in dev
        setMode('verify');
      } else {
        const j = await res.json();
        alert(j?.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined, phone: phone || undefined, otp }),
      });
      if (res.ok) {
        // cookie set by server; redirect to dashboard
        Router.replace('/citizen/dashboard');
      } else {
        const j = await res.json();
        alert(j?.error || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>NYAY Setu</title>
        <meta name="description" content="NYAY Setu - Justice for All" />
      </Head>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to NYAY Setu</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">A digital bridge to justice for all citizens, courts, lawyers, and judges.</p>

          {mode === 'select' && (
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button onClick={() => Router.push('/citizen/dashboard')} className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Open Citizen Portal</button>
              <button onClick={() => setMode('register')} className="px-6 py-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">Register / Login (OTP)</button>
              <a href="/court-employee/login" className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700">Court Employee</a>
              <a href="/lawyer/login" className="px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700">Lawyer</a>
              <a href="/judge/login" className="px-6 py-3 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700">Judge</a>
            </div>
          )}

          {mode === 'register' && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4">Register / Login (OTP)</h2>
              <form onSubmit={handleRegister} className="space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Email (or leave blank to use phone)" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex items-center space-x-2">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Please wait...' : 'Register / Request OTP'}</button>
                  <button type="button" className="text-sm text-gray-600" onClick={() => setMode('select')}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {mode === 'verify' && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
              <form onSubmit={handleVerify} className="space-y-3">
                <p className="text-sm text-gray-600">We sent an OTP to the email or phone you provided. For demo use OTP <strong>123456</strong>.</p>
                <input className="w-full border rounded px-3 py-2" placeholder="Email (or leave blank if using phone)" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className="flex items-center space-x-2">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Login'}</button>
                  <button type="button" className="text-sm text-gray-600" onClick={() => setMode('register')}>Back</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
