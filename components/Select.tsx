type Props<T extends string | number> = {
  label: string;
  id: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: string) => void;
};
export const Select = <T extends string | number>({
  label,
  id,
  value,
  options,
  onChange,
}: Props<T>) => (
  <div className="flex flex-col w-[200px]">
    <label htmlFor={id} className="text-gray-400 text-xs mb-1">
      {label}
    </label>
    <select
      id={id}
      className="bg-black text-sm rounded-lg border border-gray-600 appearance-none text-white border py-2 px-3 leading-tight focus:outline-none focus:border-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
