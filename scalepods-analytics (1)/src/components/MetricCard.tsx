interface MetricCardProps {
  label: string;
  value: string;
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{label}</span>
      <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
    </div>
  );
}
