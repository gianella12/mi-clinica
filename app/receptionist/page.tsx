export default function ReceptionistPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-900 text-white px-8 py-4 flex items-center gap-3">
        <span className="text-2xl">🏥</span>
        <div>
          <h1 className="text-xl font-bold">Mi Clínica</h1>
          <p className="text-sm text-blue-200">Panel de recepción</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Bienvenido, Recepcionista</h2>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-400 text-sm">No hay contenido todavía.</p>
        </div>
      </main>
    </div>
  );
}
