import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, AlertTriangle, Info, Plus, X, Pill, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ANESTHESIA_DRUGS, ANESTHESIA_INTERACTIONS, DrugItem, DrugInteraction, SeverityLevel } from './interactionData';
import SearchInput from '../../components/SearchInput';

export default function InteractionChecker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugIds, setSelectedDrugIds] = useState<Set<string>>(new Set());

  // Available drugs filtered by search and excluding already selected
  const availableDrugs = useMemo(() => {
    return ANESTHESIA_DRUGS.filter(d => 
      !selectedDrugIds.has(d.id) && 
      (searchTerm === '' || d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5); // show top 5 matches
  }, [searchTerm, selectedDrugIds]);

  const selectedDrugs = useMemo(() => {
    return Array.from(selectedDrugIds).map(id => ANESTHESIA_DRUGS.find(d => d.id === id)!).filter(Boolean);
  }, [selectedDrugIds]);

  const toggleDrug = (id: string) => {
    const newSet = new Set(selectedDrugIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedDrugIds(newSet);
    setSearchTerm(''); // clear search on add
  };

  const clearAll = () => {
    setSelectedDrugIds(new Set());
    setSearchTerm('');
  };

  const activeInteractions = useMemo(() => {
    return ANESTHESIA_INTERACTIONS.filter(interaction => 
      interaction.drugIds.every(id => selectedDrugIds.has(id))
    );
  }, [selectedDrugIds]);

  const potentialInteractingDrugs = useMemo(() => {
    if (selectedDrugIds.size === 0) return [];
    
    const interactingSet = new Set<string>();
    
    ANESTHESIA_INTERACTIONS.forEach(interaction => {
      const involvesSelected = interaction.drugIds.some(id => selectedDrugIds.has(id));
      if (involvesSelected) {
        interaction.drugIds.forEach(id => {
          if (!selectedDrugIds.has(id)) {
            interactingSet.add(id);
          }
        });
      }
    });

    return Array.from(interactingSet).map(id => ANESTHESIA_DRUGS.find(d => d.id === id)!).filter(Boolean);
  }, [selectedDrugIds]);

  const getSeverityConfig = (severity: SeverityLevel) => {
    switch (severity) {
      case 'severe':
        return { icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', titleColor: 'text-rose-900', label: 'Severe Interaction' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', titleColor: 'text-amber-900', label: 'Warning' };
      case 'beneficial':
      case 'mild':
        return { icon: Info, color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200', titleColor: 'text-sky-900', label: severity === 'beneficial' ? 'Beneficial Synergy' : 'Mild Interaction' };
      default:
        return { icon: AlertCircle, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', titleColor: 'text-slate-900', label: 'Notice' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Selection Area */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Pill className="w-5 h-5 text-medical-primary" />
              Patient Drug List
            </h2>
            <p className="text-sm text-slate-500 mt-1">Add medications to check for intraoperative interactions.</p>
          </div>
          {selectedDrugs.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-wider px-3 py-1 bg-rose-50 rounded-lg transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Selected Drugs Chips */}
        <div className="min-h-[60px] p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap gap-2 mb-6">
          <AnimatePresence>
            {selectedDrugs.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-sm text-slate-400 italic flex items-center h-full m-auto"
              >
                No drugs selected yet.
              </motion.p>
            ) : (
              selectedDrugs.map(drug => (
                <motion.div
                  key={drug.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, width: 0, padding: 0, margin: 0 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl shadow-sm pr-1"
                >
                  <span className="text-sm font-bold">{drug.name}</span>
                  <button 
                    onClick={() => toggleDrug(drug.id)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Potential Interacting Drugs */}
        <AnimatePresence>
          {potentialInteractingDrugs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 space-y-3 -mt-2 overflow-hidden"
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Quick Add: Known Interactions
              </h3>
              <div className="flex flex-wrap gap-2">
                {potentialInteractingDrugs.map(drug => (
                  <button
                    key={'potential-' + drug.id}
                    onClick={() => toggleDrug(drug.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl hover:bg-amber-100 transition-colors shadow-sm group"
                  >
                    <span className="text-[11px] font-bold">{drug.name}</span>
                    <Plus className="w-3 h-3 text-amber-500 group-hover:text-amber-700" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Input */}
        <div className="relative">
          <SearchInput 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an anesthetic, vasopressor, or home med..."
            className="border border-slate-200 bg-white shadow-sm"
          />
          
          {/* Quick Add Suggestions */}
          {searchTerm.length > 0 && availableDrugs.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 z-10 overflow-hidden">
              {availableDrugs.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => toggleDrug(drug.id)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <p className="font-bold text-slate-800">{drug.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">{drug.category}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-medical-primary group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      <AnimatePresence mode="wait">
        {selectedDrugIds.size > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">Interaction Analysis</h3>
            
            {activeInteractions.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="font-bold text-emerald-900 text-lg">No Known Major Interactions</p>
                <p className="text-sm text-emerald-700 mt-1">Based on our anesthesia-specific database, these agents do not have significant adverse synergies.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {activeInteractions.map(interaction => {
                  const config = getSeverityConfig(interaction.severity);
                  const Icon = config.icon;
                  const relevantDrugs = interaction.drugIds.map(id => ANESTHESIA_DRUGS.find(d => d.id === id)?.name || id).join(' + ');

                  return (
                    <motion.div 
                      key={interaction.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row gap-4 sm:items-start ${config.bg} ${config.border}`}
                    >
                      <div className={`p-3 rounded-xl bg-white ${config.color} shadow-sm shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white ${config.color} border border-inherit`}>
                              {config.label}
                            </span>
                          </div>
                          <h4 className={`text-lg font-bold ${config.titleColor}`}>{relevantDrugs}</h4>
                        </div>
                        <p className={`text-sm font-medium ${config.titleColor} opacity-90 leading-relaxed`}>
                          {interaction.description}
                        </p>
                        <div className="bg-white/60 p-4 rounded-xl border border-white mt-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 shadow-sm">Management</p>
                          <p className={`text-sm ${config.titleColor} font-semibold leading-relaxed`}>{interaction.management}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
