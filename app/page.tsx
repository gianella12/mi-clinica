import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white px-8 py-4 flex items-center gap-3">
        <span className="text-2xl">🏥</span>
        <h1 className="text-xl font-bold">Mi Clínica</h1>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-12 max-w-lg w-full">
          <span className="text-5xl">🏥</span>
          <h2 className="text-3xl font-bold text-blue-900 mt-4 mb-2">Bienvenido</h2>
          <p className="text-gray-500 mb-8 text-sm">Sistema de gestión clínica. Iniciá sesión para continuar.</p>
          <Link
            href="/login"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Mi Clínica
      </footer>
    </div>
  );
}
