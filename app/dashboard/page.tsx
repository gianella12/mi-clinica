export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-blue-900 text-white px-8 py-4 flex items-center gap-3">
        <span className="text-2xl">🏥</span>
        <div>
          <h1 className="text-xl font-bold">Mi Clínica</h1>
          <p className="text-sm text-blue-200">Panel principal</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Bienvenido al dashboard</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span className="text-3xl">📅</span>
            <h3 className="font-semibold text-gray-700">Turnos de hoy</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span className="text-3xl">👤</span>
            <h3 className="font-semibold text-gray-700">Pacientes</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span className="text-3xl">🩺</span>
            <h3 className="font-semibold text-gray-700">Médicos</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
