interface AssetSectionProps {
  title: string;
  children: React.ReactNode;
}

const AssetSection = ({ title, children }: AssetSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="h-px flex-1 ml-4 bg-border/40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default AssetSection;
