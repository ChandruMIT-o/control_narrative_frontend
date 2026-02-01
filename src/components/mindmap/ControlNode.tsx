import React, { useState } from "react";
import {
	Activity,
	Zap,
	AlertTriangle,
	Settings,
	ChevronDown,
	Info,
	Sliders,
} from "lucide-react";
import {
	PropertyGrid,
	ActionRow,
	ToggleRow,
	Sparkline,
} from "./ControlNodeWidgets";

export type NodeType = "EQUIPMENT" | "LOGIC" | "SENSOR" | "PID";

export interface NodeMetadata {
	tagId?: string;
	narrativeRef?: string;
	unit?: string;
	minValue?: number;
	maxValue?: number;
	properties?: { label: string; value: string | number }[];
	actions?: {
		label: string;
		type: "primary" | "danger" | "neutral";
		icon?: "play" | "stop" | "reset" | "ack";
	}[];
	toggles?: { label: string; checked: boolean }[];
	trendData?: number[];
}

export interface ControlNodeData {
	id: string;
	type: NodeType;
	label: string;
	status: "active" | "inactive" | "fault";
	meta: NodeMetadata;
	currentValue?: number;
}

const NodeIcon = ({ type }: { type: NodeType }) => {
	const styles = {
		EQUIPMENT: "bg-blue-100 text-blue-700",
		LOGIC: "bg-amber-100 text-amber-700",
		SENSOR: "bg-purple-100 text-purple-700",
		PID: "bg-slate-200 text-slate-700",
	};
	const Icon =
		{
			EQUIPMENT: Activity,
			LOGIC: Zap,
			SENSOR: AlertTriangle,
			PID: Settings,
		}[type] || Activity;
	return (
		<div
			className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${styles[type]}`}
		>
			<Icon className="w-6 h-6" strokeWidth={2} />
		</div>
	);
};

const StatusChip = ({ status }: { status: ControlNodeData["status"] }) => {
	const styles = {
		active: "bg-emerald-100 text-emerald-800",
		inactive: "bg-slate-100 text-slate-500",
		fault: "bg-rose-100 text-rose-800 animate-pulse",
	};
	return (
		<div
			className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${styles[status]}`}
		>
			{status}
		</div>
	);
};

interface ControlNodeProps {
	data: ControlNodeData;
}

export const ControlNode: React.FC<ControlNodeProps> = ({ data }) => {
	const [expanded, setExpanded] = useState(false);
	const [simValue, setSimValue] = useState(data.currentValue || 50);

	return (
		<div
			className={`
        relative w-[300px] h-fit
        rounded-[28px]
        border transition-all duration-300
        overflow-hidden
        ${expanded ? "bg-blue-50 border-blue-300 shadow-xl scale-[1.02] z-50" : "bg-white border-slate-200 shadow-sm"}
      `}
		>
			{/* Header */}
			<button
				onClick={() => setExpanded(!expanded)}
				className="w-full text-left p-5 focus:outline-none relative transition active:scale-[0.99]"
			>
				<div className="absolute inset-0 bg-black/[0.03] opacity-0 hover:opacity-100 transition" />
				<div className="relative flex items-start justify-between gap-4">
					<div className="flex gap-4 items-center min-w-0">
						<NodeIcon type={data.type} />
						<div className="min-w-0">
							<h3 className="text-base font-semibold text-slate-900 truncate">
								{data.label}
							</h3>
							<p className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-2">
								{data.id}
								{data.meta.unit && (
									<span className="px-1.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
										{simValue} {data.meta.unit}
									</span>
								)}
							</p>
						</div>
					</div>
					<StatusChip status={data.status} />
				</div>
				<div
					className={`flex justify-center mt-2 transition ${expanded ? "opacity-0" : "opacity-100"}`}
				>
					<ChevronDown className="w-4 h-4 text-slate-300" />
				</div>
			</button>

			{/* Content Body */}
			<div
				className={`transition-all duration-500 ease-in-out ${expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
			>
				<div className="px-5 pb-5 space-y-4">
					{/* Simulation Slider */}
					{data.meta.unit && (
						<div className="bg-white rounded-2xl p-4 border border-slate-200">
							<div className="flex justify-between mb-2">
								<div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
									<Sliders className="w-4 h-4" />
									Simulation
								</div>
								<span className="font-mono font-bold text-blue-600">
									{simValue} {data.meta.unit}
								</span>
							</div>
							<input
								type="range"
								min={data.meta.minValue || 0}
								max={data.meta.maxValue || 100}
								value={simValue}
								onChange={(e) =>
									setSimValue(Number(e.target.value))
								}
								className="w-full h-2 rounded-full bg-slate-200 appearance-none accent-blue-600"
							/>
							<div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
								<span>{data.meta.minValue || 0}</span>
								<span>{data.meta.maxValue || 100}</span>
							</div>
						</div>
					)}

					<ActionRow actions={data.meta.actions || []} />
					<ToggleRow toggles={data.meta.toggles || []} />
					<PropertyGrid items={data.meta.properties || []} />
					<Sparkline data={data.meta.trendData || []} />

					{data.meta.narrativeRef && (
						<div className="flex gap-3 items-start p-3 rounded-xl bg-blue-50 border border-blue-200">
							<Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
							<p className="text-xs text-slate-600 italic">
								"{data.meta.narrativeRef}"
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
