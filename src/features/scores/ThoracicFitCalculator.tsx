import { useState, useMemo } from 'react';
import { 
  Wind, 
  Activity, 
  Flame, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LungSegment {
  id: string;
  name: string;
  count: number;
}

const LUNG_LOBES = [
  {
    id: 'rul',
    name: 'Right Upper Lobe',
    segments: 3,
    lung: 'Right'
  },
  {
    id: 'rml',
    name: 'Right Middle Lobe',
    segments: 2,
    lung: 'Right'
  },
  {
    id: 'rll',
    name: 'Right Lower Lobe',
    segments: 5,
    lung: 'Right'
  },
  {
    id: 'lul',
    name: 'Left Upper Lobe (inc. Lingula)',
    segments: 5,
    lung: 'Left'
  },
  {
    id: 'lll',
    name: 'Left Lower Lobe',
    segments: 4,
    lung: 'Left'
  }
];

const TOTAL_SEGMENTS = 19;

export default function ThoracicFitCalculator() {
  // Inputs
  const [preopFEV1, setPreopFEV1] = useState<number | ''>(80);
  const [preopDLCO, setPreopDLCO] = useState<number | ''>(80);
  const [resectedSegments, setResectedSegments] = useState<number>(0);
  
  // Reserve Inputs
  const [reserveType, setReserveType] = useState<'vo2' | 'stairs' | '6mwt'>('vo2');
  const [vo2max, setVo2max] = useState<number | ''>(18);
  const [stairs, setStairs] = useState<number | ''>(20);
  const [walkDistance, setWalkDistance] = useState<number | ''>(450);

  // Calculations
  const ppoFEV1 = useMemo(() => {
    if (preopFEV1 === '') return 0;
    return Math.max(0, preopFEV1 * (1 - resectedSegments / TOTAL_SEGMENTS));
  }, [preopFEV1, resectedSegments]);

  const ppoDLCO = useMemo(() => {
    if (preopDLCO === '') return 0;
    return Math.max(0, preopDLCO * (1 - resectedSegments / TOTAL_SEGMENTS));
  }, [preopDLCO, resectedSegments]);

  // Risk Assessment Logic
  const getLegStatus = (value: number, type: 'mechanics' | 'parenchyma' | 'reserve') => {
    if (type === 'mechanics' || type === 'parenchyma') {
      if (value >= 40) return { label: 'Low Risk', color: 'text-green-500', bg: 'bg-green-500', status: 'pass' };
      if (value >= 30) return { label: 'Moderate Risk', color: 'text-amber-500', bg: 'bg-amber-500', status: 'caution' };
      return { label: 'High Risk', color: 'text-rose-500', bg: 'bg-rose-500', status: 'fail' };
    }
    
    if (reserveType === 'vo2') {
      const v = typeof vo2max === 'number' ? vo2max : 0;
      if (v > 20) return { label: 'Low Risk', color: 'text-green-500', bg: 'bg-green-500', status: 'pass' };
      if (v >= 10) return { label: 'Moderate Risk', color: 'text-amber-500', bg: 'bg-amber-500', status: 'caution' };
      return { label: 'High Risk', color: 'text-rose-500', bg: 'bg-rose-500', status: 'fail' };
    } else if (reserveType === 'stairs') {
      const s = typeof stairs === 'number' ? stairs : 0;
      if (s > 22) return { label: 'Low Risk', color: 'text-green-500', bg: 'bg-green-500', status: 'pass' };
      if (s >= 12) return { label: 'Moderate Risk', color: 'text-amber-500', bg: 'bg-amber-500', status: 'caution' };
      return { label: 'High Risk', color: 'text-rose-500', bg: 'bg-rose-500', status: 'fail' };
    } else {
      const w = typeof walkDistance === 'number' ? walkDistance : 0;
      if (w > 400) return { label: 'Low Risk', color: 'text-green-500', bg: 'bg-green-500', status: 'pass' };
      return { label: 'High Risk', color: 'text-rose-500', bg: 'bg-rose-500', status: 'fail' };
    }
  };

  const mechanicsStatus = getLegStatus(ppoFEV1, 'mechanics');
  const parenchymaStatus = getLegStatus(ppoDLCO, 'parenchyma');
  const reserveStatus = getLegStatus(0, 'reserve');

  const overallAssessment = useMemo(() => {
    const statuses = [mechanicsStatus.status, parenchymaStatus.status, reserveStatus.status];
    if (statuses.includes('fail')) return { label: 'High Risk / Potentially Unfit', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (statuses.includes('caution')) return { label: 'Moderate Risk / Borderline', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { label: 'Low Risk / Fit for Resection', color: 'bg-green-50 text-green-700 border-green-200' };
  }, [mechanicsStatus, parenchymaStatus, reserveStatus]);

  const handleLobeSelect = (segments: number) => {
    setResectedSegments(segments);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="space-y-6">
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Surgical Resection
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Select Procedure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleLobeSelect(10)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${resectedSegments === 10 ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-medical-accent'}`}
                  >
                    Right Pneumonectomy
                  </button>
                  <button 
                    onClick={() => handleLobeSelect(9)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${resectedSegments === 9 ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-medical-accent'}`}
                  >
                    Left Pneumonectomy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Or Select Lobes / Segments
                </label>
                <div className="flex flex-wrap gap-2">
                  {LUNG_LOBES.map((lobe) => (
                    <button
                      key={lobe.id}
                      onClick={() => setResectedSegments(lobe.segments)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${resectedSegments === lobe.segments ? 'bg-medical-accent/10 border-medical-accent text-medical-accent' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      {lobe.name} ({lobe.segments})
                    </button>
                  ))}
                  <div className="flex items-center gap-2 w-full mt-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="19" 
                      value={resectedSegments}
                      onChange={(e) => setResectedSegments(parseInt(e.target.value))}
                      className="flex-1 accent-medical-accent"
                    />
                    <span className="text-xs font-bold text-medical-primary w-8">{resectedSegments}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Wind className="w-4 h-4" />
              Preoperative Function
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  FEV1 (% predicted)
                </label>
                <input
                  type="number"
                  value={preopFEV1}
                  onChange={(e) => setPreopFEV1(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  DLCO (% predicted)
                </label>
                <input
                  type="number"
                  value={preopDLCO}
                  onChange={(e) => setPreopDLCO(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Cardiorespiratory Reserve
            </h3>
            <div className="flex gap-2 mb-4 p-1 bg-white rounded-xl border border-slate-100">
              {(['vo2', 'stairs', '6mwt'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setReserveType(type)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${reserveType === type ? 'bg-medical-primary text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {type === 'vo2' ? 'VO2 Max' : type === 'stairs' ? 'Stairs' : '6MWT'}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {reserveType === 'vo2' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                    VO2 Max (ml/kg/min)
                  </label>
                  <input
                    type="number"
                    value={vo2max}
                    onChange={(e) => setVo2max(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                  />
                </motion.div>
              )}
              {reserveType === 'stairs' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Stair Climbing (meters)
                  </label>
                  <input
                    type="number"
                    value={stairs}
                    onChange={(e) => setStairs(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                  />
                </motion.div>
              )}
              {reserveType === '6mwt' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                    6-Minute Walk Distance (m)
                  </label>
                  <input
                    type="number"
                    value={walkDistance}
                    onChange={(e) => setWalkDistance(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border-2 border-medical-border shadow-xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity className="w-32 h-32 text-medical-primary" />
            </div>

            <h2 className="text-xl font-bold text-medical-primary mb-8 pb-4 border-b border-slate-100 uppercase tracking-tight">
              Assessment Results
            </h2>

            <div className="space-y-10 relative">
              {/* Mechanics Leg */}
              <div className="relative pl-12 group transition-all duration-300">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-medical-primary border border-slate-200 group-hover:scale-110 transition-transform">
                  <Wind className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Leg 1: Mechanics</h4>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">Predicted Postoperative FEV1</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-medical-primary">{ppoFEV1.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${mechanicsStatus.bg} text-white`}>
                    {mechanicsStatus.label}
                  </div>
                </div>
                <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (ppoFEV1 / 80) * 100)}%` }}
                    className={`h-full ${mechanicsStatus.bg}`}
                  />
                </div>
              </div>

              {/* Parenchyma Leg */}
              <div className="relative pl-12 group transition-all duration-300">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-medical-primary border border-slate-200 group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Leg 2: Parenchyma</h4>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">Predicted Postoperative DLCO</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-medical-primary">{ppoDLCO.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${parenchymaStatus.bg} text-white`}>
                    {parenchymaStatus.label}
                  </div>
                </div>
                <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (ppoDLCO / 80) * 100)}%` }}
                    className={`h-full ${parenchymaStatus.bg}`}
                  />
                </div>
              </div>

              {/* Reserve Leg */}
              <div className="relative pl-12 group transition-all duration-300">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-medical-primary border border-slate-200 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Leg 3: Reserve</h4>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                      {reserveType === 'vo2' ? 'VO2 Max' : reserveType === 'stairs' ? 'Stair Climbing' : '6-Minute Walk'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-medical-primary">
                      {reserveType === 'vo2' ? vo2max : reserveType === 'stairs' ? stairs : walkDistance}
                      <span className="text-xs ml-1 opacity-50 font-medium">{reserveType === 'vo2' ? 'ml/kg' : 'm'}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${reserveStatus.bg} text-white`}>
                    {reserveStatus.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Assessment Banner */}
            <div className={`mt-10 p-6 rounded-2xl border-2 transition-all ${overallAssessment.color}`}>
              <div className="flex items-center gap-3">
                {mechanicsStatus.status === 'pass' && parenchymaStatus.status === 'pass' && reserveStatus.status === 'pass' ? (
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                )}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Thoracic Interpretation</p>
                  <h3 className="text-lg font-black tracking-tight leading-none">{overallAssessment.label}</h3>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-[10px] text-slate-500 font-medium leading-relaxed">
              <Info className="w-4 h-4 shrink-0 text-medical-accent" />
              <p>
                Calculations assume 19 functional lung segments (10 Right, 9 Left). ppoValues &lt; 40% indicate increased risk. VO2 Max &lt; 10 ml/kg/min or Stair Climbing &lt; 12m suggest high cardiorespiratory risk. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
