import { Inbox } from "lucide-react";

interface NoDataBoxProps {
  title?: string;
  description?: string;
}

const NoDataBox = ({
  title = "No data to display",
  description = "It looks like there's no data available",
}: NoDataBoxProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[45vh] gap-6">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full dark:bg-gray-800">
        <Inbox className="w-10 h-10 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default NoDataBox;
