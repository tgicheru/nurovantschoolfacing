import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

// Define the type for our item objects
type ItemType = {
  id: string | number;
  title: string;
  type: string;
};

// Define the props for our component
interface SearchableSelectProps {
  items: any[];
  onSelect: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  items,
  onSelect,
  className,
  placeholder,
  disabled = false,
}: SearchableSelectProps) {
  // Transform the items array into the format expected by Ant Design Select
  const options: SelectProps["options"] = items?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder={placeholder || "Search for an item"}
        size="large"
        optionFilterProp="children"
        className={className}
        onChange={onSelect}
        filterOption={(input, option) =>
          ((option?.label as string) ?? "")
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={options}
        disabled={disabled}
      />
    </div>
  );
}
