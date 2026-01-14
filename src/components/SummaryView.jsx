import { Activity, ShieldAlert, Cpu, Tag, Settings } from "lucide-react";

export default function SummaryView({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. System Description - Hero Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold uppercase tracking-wide text-xs">
          <Activity size={16} /> System Description
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {data.system_description || "No system description available."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2. Operational Modes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 text-purple-600 font-semibold uppercase tracking-wide text-xs">
            <Settings size={16} /> Operational Modes
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 text-purple-900 font-medium">
            {data.operational_modes || "None identified"}
          </div>
        </div>

        {/* 3. Safety Interlocks - Highlighted for visibility */}
        <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center gap-2 mb-4 text-red-700 font-semibold uppercase tracking-wide text-xs">
            <ShieldAlert size={16} /> Safety Interlocks
          </div>
          <p className="text-red-900 leading-relaxed">
            {data.safety_interlocks_overview || "No specific safety interlocks extracted."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 4. Major Control Functions (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 text-gray-600 font-semibold uppercase tracking-wide text-xs">
            <Cpu size={16} /> Control Functions
          </div>
          {data.major_control_functions?.length > 0 ? (
            <ul className="space-y-3">
              {data.major_control_functions.map((func, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{func}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 italic text-sm">No control functions listed.</div>
          )}
        </div>

        {/* 5. Equipment Tags (Takes up 1 column) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 text-gray-600 font-semibold uppercase tracking-wide text-xs">
            <Tag size={16} /> Equipment Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {data.primary_equipment_tags?.length > 0 ? (
              data.primary_equipment_tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-mono border border-gray-200">
                  {tag}
                </span>
              ))
            ) : (
              <div className="text-gray-400 italic text-sm">No tags found.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}