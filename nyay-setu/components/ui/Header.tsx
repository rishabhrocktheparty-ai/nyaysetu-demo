export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white shadow flex items-center justify-between">
      <div className="font-bold text-xl text-blue-700">NYAY Setu</div>
      <nav className="space-x-4">
        <a href="/citizen/dashboard" className="text-blue-600 hover:underline">Citizen</a>
        <a href="/court-employee/dashboard" className="text-green-600 hover:underline">Court</a>
        <a href="/lawyer/dashboard" className="text-purple-600 hover:underline">Lawyer</a>
        <a href="/judge/dashboard" className="text-yellow-600 hover:underline">Judge</a>
      </nav>
    </header>
  );
}
