
import React from 'react';
import { Activity, Droplets, Thermometer, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface StationTelemetry {
  stationId: string;
  name: string;
  corridor: string;
  coordinates: string;
  lastSync: string;
  status: 'Aman' | 'Waspada' | 'Tercemar';
  ikaScore: number; // Indeks Kualitas Air (0-100)
  parameters: {
    label: string;
    code: string;
    value: string;
    unit: string;
    threshold: string;
    isNormal: boolean;
  }[];
}

interface WaterTelemetryHeroProps {
  station: StationTelemetry;
  stationsList: StationTelemetry[];
  onSelectStation: (id: string) => void;
}

export const WaterTelemetryHero: React.FC<WaterTelemetryHeroProps> = ({
  station,
  stationsList,
  onSelectStation,
}) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kiri: Info Stasiun & Indeks Kualitas Air */}
        <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-slate-900/10 bg-gradient-to-br from-white to-slate-50/60">
          <div className="space-y-4">
            {/* Selector Titik Stasiun */}
            <div className="flex flex-wrap gap-1.5">
              {stationsList.map((st) => (
                <button
                  key={st.stationId}
                  onClick={() => onSelectStation(st.stationId)}
                  className={`px-2.5 py-1 rounded text-[11px] transition ${
                    st.stationId === station.stationId
                      ? 'bg-emerald-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>

            <div>
              <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                {station.corridor}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                {station.name}
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Pemantauan kontinyu parameter fisikokimia air sungai menggunakan node sensor IoT partisipatif dan verifikasi uji laboratorium bulanan.
            </p>
          </div>

          {/* Skor IKA Box */}
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                Indeks Kualitas Air (IKA)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-emerald-400">
                  {station.ikaScore}
                </span>
                <span className="text-xs text-slate-400">/ 100 poin</span>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  station.status === 'Aman'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {station.status === 'Aman' ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                {station.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-2">
                Baku Mutu PP No. 22/2021 Kelas II
              </p>
            </div>
          </div>
        </div>

        {/* Kanan: Matriks Parameter Air */}
        <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              Matriks Parameter Fisikokimia
            </span>
            <span className="text-[11px] text-slate-400">
              Diperbarui {station.lastSync} · tiap 15 menit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-auto">
            {station.parameters.map((param) => (
              <div
                key={param.code}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {param.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      param.isNormal ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    title={param.isNormal ? 'Dalam Ambang Baku Mutu' : 'Melebihi Ambang'}
                  />
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                      {param.value}
                    </span>
                    <span className="text-xs text-slate-500">{param.unit}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{param.label}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-x-2 text-[10px] text-slate-400">
                  <span>Ambang: {param.threshold}</span>
                  <span className={param.isNormal ? 'text-emerald-700' : 'text-amber-700 font-semibold'}>
                    {param.isNormal ? 'Normal' : 'Tinggi'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>Metode kalibrasi: sonde multiparameter & uji titrasi lab</span>
            <span className="text-emerald-800 font-semibold">Akurasi terverifikasi 98.4%</span>
          </div>
        </div>
      </div>
    </section>
  );
};