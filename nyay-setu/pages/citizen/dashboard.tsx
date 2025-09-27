import { useEffect, useState, type FormEvent } from 'react';
import Head from 'next/head';
import Router from 'next/router';

type CaseItem = {
  id: string;
  title: string;
  description?: string;
  status?: string;
};

type FutureAnalysis = {
  winProbability: number;
  duration: string;
  pathRecommendation: string;
  riskFlags: string[];
};

type PendingAnalysis = {
  weaknesses: string[];
  recommendations: string[];
  improvementScore: number;
};

export default function CitizenDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Aadhar
  const [aadhar, setAadhar] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Cases
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // New case
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [futureAnalysis, setFutureAnalysis] = useState<FutureAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Pending analysis
  const [pendingAnalysis, setPendingAnalysis] = useState<PendingAnalysis | null>(null);
  const [analyzingPending, setAnalyzingPending] = useState(false);

  useEffect(() => {
    // fetch basic profile to know if verified and load cases
    (async () => {
      try {
        const profileRes = await fetch('/api/auth/profile');
        if (profileRes.status === 401) return Router.replace('/citizen/login');
        const profile = await profileRes.json();
        setUser(profile.user || profile);
        setIsVerified(profile.user?.isVerified ?? profile.isVerified ?? false);
        await loadCases(profile.user?.id ?? profile.id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadCases(userId?: string) {
    try {
      const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
      const res = await fetch(`/api/citizen/cases${q}`);
      if (res.ok) {
        const json = await res.json();
        setCases(json.cases || []);
      }
    } catch (err) {
      console.error('failed to load cases', err);
    }
  }

  async function handleAadharVerify(e: FormEvent) {
    e.preventDefault();
    setVerifying(true);
    try {
      const res = await fetch('/api/citizen/aadhar/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhar }),
      });
      if (res.ok) {
        const json = await res.json();
        setIsVerified(true);
      } else {
        const err = await res.json();
        alert(err?.error || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
      alert('Verification error');
    } finally {
      setVerifying(false);
    }
  }

  async function handleFileCase(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/citizen/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, category: newCategory }),
      });
      if (res.ok) {
        const json = await res.json();
        // add to list
        setCases((s) => [json.case, ...s]);
        setNewTitle('');
        setNewDescription('');
        setNewCategory('general');
        alert('Case filed successfully');
      } else {
        const err = await res.json();
        alert(err?.error || 'Failed to file case');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  }

  async function handleAnalyzeFuture(e: FormEvent) {
    e.preventDefault();
    setAnalyzing(true);
    setFutureAnalysis(null);
    try {
      const payload = {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        advisory: true,
        requiresLegalReview: true,
      };
      // proxy via /api/citizen/cases/analyze which should call /api/ai/... internally
      const res = await fetch('/api/citizen/cases/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        setFutureAnalysis(json.analysis || json);
      } else {
        const err = await res.json();
        alert(err?.error || 'Analysis failed');
      }
    } catch (err) {
      console.error(err);
      alert('Analysis error');
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleAnalyzePending() {
    if (!selectedCaseId) return alert('Select a case');
    setAnalyzingPending(true);
    setPendingAnalysis(null);
    try {
      const res = await fetch(`/api/citizen/cases/${selectedCaseId}/analyzePending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advisory: true, requiresLegalReview: true }),
      });
      if (res.ok) {
        const json = await res.json();
        setPendingAnalysis(json.analysis || json);
      } else {
        const err = await res.json();
        alert(err?.error || 'Pending analysis failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setAnalyzingPending(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Citizen Dashboard - Nyay Setu</title>
      </Head>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block bg-white border-r">
          <div className="p-4 font-bold text-xl">Nyay Setu</div>
          <nav className="p-4 space-y-2">
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="/citizen/dashboard">Home</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#">Case Status</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#file">File New Case</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#aadhar">Aadhar Verification</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#pending">Pending Case Insights</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#notifications">Notifications</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="#profile">Profile</a>
            <a className="block py-2 px-3 rounded hover:bg-gray-100" href="/api/auth/logout">Logout</a>
          </nav>
        </aside>

        <main className="flex-1 p-4">
          {/* Top header */}
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
            <div className="flex items-center space-x-4">
              <button aria-label="notifications" className="p-2 rounded hover:bg-gray-100">
                🔔
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">{user?.name?.[0] ?? 'U'}</div>
                <div className="text-sm">{user?.name ?? 'User'}</div>
              </div>
            </div>
          </header>

          {/* Welcome / Aadhar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="col-span-1 md:col-span-2 bg-white p-4 rounded shadow">
              <h2 className="text-lg font-medium">Account</h2>
              <div className="mt-4">
                {isVerified ? (
                  <div className="flex items-center text-green-600">✅ Aadhar Verified</div>
                ) : (
                  <div id="aadhar">
                    <p className="text-sm text-gray-600">Your Aadhar is not verified. Verify to enable faster case handling.</p>
                    <form onSubmit={handleAadharVerify} className="mt-3 flex space-x-2">
                      <input className="flex-1 border rounded px-3 py-2" placeholder="Enter Aadhar number" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                      <button className="bg-blue-600 text-white px-4 rounded" disabled={verifying}>{verifying ? 'Verifying...' : 'Verify'}</button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-medium">Overview</h3>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-xl font-bold">{cases.length}</div>
                  <div className="text-xs text-gray-500">Active Cases</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-xl font-bold">—</div>
                  <div className="text-xs text-gray-500">Pending Hearings</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-xl font-bold">—</div>
                  <div className="text-xs text-gray-500">Resolved</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main area: File new case + analysis */}
          <section id="file" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2 bg-white p-4 rounded shadow">
              <h2 className="text-lg font-medium">File New Case</h2>
              <form onSubmit={handleFileCase} className="mt-4 space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Case title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={5} required />
                <select className="border rounded px-3 py-2" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  <option value="general">General</option>
                  <option value="family">Family</option>
                  <option value="land">Land</option>
                  <option value="criminal">Criminal</option>
                </select>

                <div className="flex items-center space-x-2">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">File Case</button>
                  <button type="button" onClick={handleAnalyzeFuture} className="bg-yellow-500 text-white px-4 py-2 rounded" disabled={analyzing}>{analyzing ? 'Analyzing...' : 'Analyze Case Feasibility'}</button>
                </div>
              </form>

              {/* Future analysis results */}
              {futureAnalysis && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">Future Case Analysis</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-gray-600">Win Probability</div>
                      <div className="text-xl font-bold">{Math.round(futureAnalysis.winProbability * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Estimated Duration</div>
                      <div className="text-lg">{futureAnalysis.duration}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm text-gray-600">Recommended Path</div>
                      <div className="mt-1 p-2 bg-white rounded">{futureAnalysis.pathRecommendation}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm text-gray-600">Risk Flags</div>
                      <ul className="list-disc ml-5 mt-1">
                        {futureAnalysis.riskFlags.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column: pending analysis */}
            <aside className="bg-white p-4 rounded shadow">
              <h3 className="font-medium">Pending Case Analysis</h3>
              <div className="mt-3">
                <label className="text-sm">Select your case</label>
                <select className="w-full border rounded px-3 py-2 mt-1" value={selectedCaseId ?? ''} onChange={(e) => setSelectedCaseId(e.target.value || null)}>
                  <option value="">-- choose --</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <button onClick={handleAnalyzePending} className="mt-3 w-full bg-indigo-600 text-white px-3 py-2 rounded" disabled={analyzingPending}>{analyzingPending ? 'Analyzing...' : 'Analyze Case Strength'}</button>
              </div>

              {pendingAnalysis && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-semibold">Case Strength Report</h4>
                  <div className="mt-2">
                    <div className="flex items-center"><span className="mr-2">⚖️</span><strong>Improvement Score:</strong> {pendingAnalysis.improvementScore}</div>
                    <div className="mt-2">
                      <div className="font-medium">Weaknesses</div>
                      <ul className="list-disc ml-5 mt-1 text-sm text-red-600">
                        {pendingAnalysis.weaknesses.map((w, i) => <li key={i}>❌ {w}</li>)}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium">Recommendations</div>
                      <ul className="list-disc ml-5 mt-1 text-sm text-green-700">
                        {pendingAnalysis.recommendations.map((r, i) => <li key={i}>✅ {r}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </section>

          {/* Cases list */}
          <section className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium">Your Cases</h2>
            <div className="mt-3 space-y-2">
              {cases.length === 0 && <div className="text-sm text-gray-500">No cases filed yet.</div>}
              {cases.map((c) => (
                <div key={c.id} className="p-3 border rounded hover:shadow-sm flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-gray-600">{c.description}</div>
                  </div>
                  <div className="text-sm text-gray-500">{c.status ?? 'Open'}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
