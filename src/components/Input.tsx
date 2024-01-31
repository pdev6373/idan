import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

type InputType = {
  label: string;
  placeHolder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type: HTMLInputTypeAttribute;
  error: boolean;
  disabled?: boolean;
};

export default function Input({
  label,
  placeHolder,
  onChange,
  value,
  type,
  error,
  disabled = false,
}: InputType) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-black text-[16px] font-normal leading-[24.74px]">
        {label}
      </p>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-[#DADADABF] rounded-[62px] text-black text-[16px] font-normal leading-[22.13px] p-4 px-[20px] ${
          error ? "border-red-500 bg-red-50 animate-shake" : "border-grey"
        }}`}
      />
    </div>
  );
}
