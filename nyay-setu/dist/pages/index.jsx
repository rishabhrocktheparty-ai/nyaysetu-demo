import Head from 'next/head';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
export default function Home() {
    return (<>
      <Head>
        <title>NYAY Setu</title>
        <meta name="description" content="NYAY Setu - Justice for All"/>
      </Head>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to NYAY Setu</h1>
        <p className="text-lg text-gray-700 mb-8">A digital bridge to justice for all citizens, courts, lawyers, and judges.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/citizen/login" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Citizen Portal</a>
          <a href="/court-employee/login" className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700">Court Employee</a>
          <a href="/lawyer/login" className="px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700">Lawyer</a>
          <a href="/judge/login" className="px-6 py-3 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700">Judge</a>
        </div>
      </main>
      <Footer />
    </>);
}
