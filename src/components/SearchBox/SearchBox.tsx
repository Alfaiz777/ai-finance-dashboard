import React from "react";
import { SearchIcon } from "lucide-react";
import { Input as ShadCNInput } from "@/components/ui/input";

interface SearchBoxProps {
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({
  placeholder,
  className,
  value,
  onChange,
}: SearchBoxProps) => {
  return (
    <div className={`relative ${className || ""}`}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[17.6px] h-[17.6px] text-slate-500" />
      <ShadCNInput
        className="pl-10 py-[11px] h-auto rounded-[7.23px] border-[1.21px] border-slate-200 w-full shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
