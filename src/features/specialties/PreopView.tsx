import { useState } from 'react';
import { Clock, Pill, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function PreopView() {
  const [surgeryTimeStr, setSurgeryTimeStr] = useState<string>('08:00');

  // Calculates time back by X hours
  const calculateFastingTime = (hoursRef: number) => {
    if (!surgeryTimeStr) return '--:--';
    const [hours, minutes] = surgeryTimeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setHours(date.getHours() - hoursRef);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const medications = [
    {
      category: 'Cardiovascular',
      items: [
        { name: 'ACE Inhibitors / ARBs', instruction: 'Hold 24h prior', status: 'hold', detail: 'Significant risk of refractory intraoperative vasoplegia.' },
        { name: 'Beta Blockers', instruction: 'Continue', status: 'continue', detail: 'Take morning of surgery with sip of water. Rebound tachycardia risk.' },
        { name: 'Calcium Channel Blockers', instruction: 'Continue', status: 'continue', detail: 'Generally safe to continue to prevent hypertension.' },
        { name: 'Diuretics (Loop/Thiazide)', instruction: 'Hold morning of', status: 'hold', detail: 'Hold on the day of surgery to prevent hypovolemia and electrolyte shifts.' }
      ]
    },
    {
      category: 'Anticoagulants / Antiplatelets',
      items: [
        { name: 'Warfarin', instruction: 'Hold up to 5 days', status: 'hold', detail: 'Target INR < 1.5. Consider LMWH bridging if high risk.' },
        { name: 'DOACs (Apixaban, Rivaroxaban)', instruction: 'Hold 48-72h', status: 'hold', detail: 'Depends strictly on renal clearance (CrCl) and surgery bleeding risk.' },
        { name: 'Aspirin (Secondary Prevention)', instruction: 'Continue', status: 'continue', detail: 'Continue unless performing intracranial, middle ear, or posterior eye surgery.' },
        { name: 'Clopidogrel / P2Y12', instruction: 'Hold 5-7 days', status: 'hold', detail: 'Must weigh against stent thrombosis risk. Cardiology consult usually required.' }
      ]
    },
    {
      category: 'Endocrine',
      items: [
        { name: 'SGLT-2 Inhibitors (-gliflozins)', instruction: 'Hold 3-4 days', status: 'hold', detail: 'High risk of euglycemic diabetic ketoacidosis (DKA).' },
        { name: 'GLP-1 Agonists (Weekly)', instruction: 'Hold 1 week prior', status: 'hold', detail: 'e.g., Ozempic, Wegovy. Risk of delayed gastric emptying and massive aspiration.' },
        { name: 'GLP-1 Agonists (Daily)', instruction: 'Hold morning of', status: 'hold', detail: 'e.g., Saxenda, Liraglutide daily preparations.' },
        { name: 'Metformin', instruction: 'Hold morning of', status: 'hold', detail: 'Risk of lactic acidosis if acute kidney injury occurs perioperatively.' },
        { name: 'Long-acting Insulin', instruction: 'Reduce dose 20-50%', status: 'caution', detail: 'Base reduction on nightly fasting sugars; monitor BG morning-of.' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* NPO Fasting Calculator */}
      <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden">
        <div className="bg-indigo-50 border-b border-indigo-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              NPO Fasting Calculator
            </h3>
            <p className="text-sm text-indigo-700 mt-1">ASA Guidelines Exact Cutoff Times</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Surgery Time</label>
            <input 
              type="time" 
              value={surgeryTimeStr}
              onChange={(e) => setSurgeryTimeStr(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl border-2 border-indigo-200 outline-none focus:border-indigo-500 font-bold text-indigo-900 shadow-sm"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { hours: 2, label: 'Clear Liquids', desc: 'Water, black coffee, clear juice', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { hours: 4, label: 'Breast Milk', desc: 'Infants only', color: 'bg-blue-50 text-blue-800 border-blue-200' },
              { hours: 6, label: 'Light Meal', desc: 'Toast, clear liquid, formula', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              { hours: 8, label: 'Heavy Meal', desc: 'Meat, fried foods, fatty foods', color: 'bg-rose-50 text-rose-800 border-rose-200' }
            ].map(item => (
              <div key={item.hours} className={`p-4 rounded-2xl border ${item.color} flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-sm">{item.label}</p>
                    <span className="text-[10px] font-black tracking-widest uppercase opacity-60 bg-white/50 px-2 py-0.5 rounded">{item.hours}h</span>
                  </div>
                  <p className="text-xs opacity-80 mb-4">{item.desc}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">Stop consuming by</p>
                  <p className="text-3xl font-black">{calculateFastingTime(item.hours)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-4 flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <Info className="w-3.5 h-3.5" />
            Clear liquids can be consumed up to 1-2 hours prior depending strictly on institutional/peds allowances (e.g., 2023 ASA Peds updates).
          </p>
        </div>
      </div>

      {/* Chronic Medications Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-slate-600" />
            Chronic Medication Perioperative Rules
          </h3>
          <p className="text-sm text-slate-500 mt-1">Status instructions for typical morning-of-surgery protocols.</p>
        </div>
        
        <div className="p-0">
          {medications.map((category, idx) => (
            <div key={category.category} className={idx !== 0 ? 'border-t border-slate-100' : ''}>
              <div className="bg-slate-100 px-6 py-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category.category}</p>
              </div>
              <div className="divide-y divide-slate-50">
                {category.items.map(med => (
                  <div key={med.name} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{med.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{med.detail}</p>
                    </div>
                    
                    <div className="flex-shrink-0 flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm w-full md:w-auto">
                      {med.status === 'hold' && <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />}
                      {med.status === 'continue' && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                      {med.status === 'caution' && <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />}
                      
                      <div className="text-left md:text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Action required</p>
                        <p className={`font-black text-sm ${
                          med.status === 'hold' ? 'text-rose-600' : 
                          med.status === 'continue' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {med.instruction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
