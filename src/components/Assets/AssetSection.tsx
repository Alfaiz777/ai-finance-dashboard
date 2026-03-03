interface AssetSectionProps {
  title: string;
  children: React.ReactNode;
}

const AssetSection = ({ title, children }: AssetSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

export default AssetSection;
