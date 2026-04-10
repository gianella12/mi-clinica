export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-blue-900 text-white px-8 py-5 flex items-center gap-3 shadow-md">
        <span className="text-2xl">🏥</span>
        <div>
          <h1 className="text-xl font-bold tracking-wide">Mi Clínica</h1>
          <p className="text-sm text-blue-100">Panel del médico</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Bienvenido, Doctor</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-blue-700">
            <span className="text-3xl">📅</span>
            <h3 className="font-semibold text-gray-800 text-base">Turnos de hoy</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-teal-600">
            <span className="text-3xl">👤</span>
            <h3 className="font-semibold text-gray-800 text-base">Mis Pacientes</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-indigo-600">
            <span className="text-3xl">✅</span>
            <h3 className="font-semibold text-gray-800 text-base">Consultas realizadas</h3>
            <p className="text-4xl font-bold text-blue-900">0</p>
          </div>
        </div>

        {/* Próximos turnos */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-gray-200 pb-3">
            Próximos Turnos
          </h3>
          <p className="text-gray-400 text-sm text-center py-8">No hay turnos próximos</p>
        </div>
      </main>
    </div>
  );
}