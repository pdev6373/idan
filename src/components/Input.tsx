import {
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";

type InputType = {
  label: string;
  placeHolder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type: HTMLInputTypeAttribute;
  error: boolean;
  disabled?: boolean;
  dropdown?: string[];
};

export default function Input({
  label,
  placeHolder,
  onChange,
  value,
  type,
  error,
  disabled = false,
  dropdown,
}: InputType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col gap-[8px]"
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <p className="text-black text-[16px] font-normal leading-[24.74px]">
        {label}
      </p>
      {dropdown?.length ? (
        <div className="relative">
          <p
            // tabIndex={0}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            className={`border border-[#DADADABF] rounded-[62px] text-black text-[16px] font-normal leading-[22.13px] p-4 px-[20px] cursor-pointer ${
              error ? "border-red-500 bg-red-50 animate-shake" : "border-grey"
            }}`}
          >
            {value || placeHolder}
          </p>

          {isOpen ? (
            <div
              className={`absolute top-[60px] rounded-xl left-0 right-0 overflow-hidden z-20 bg-white py-2 ${
                isOpen ? "animate-slideDown " : "animate-slideUp"
              } max-h-72 overflow-y-auto`}
            >
              {dropdown?.map((dropdown) => (
                <div
                  className={`hover:bg-grey cursor-pointer px-4 py-2 trans text-lg ${
                    value === dropdown && "bg-grey"
                  }`}
                  onClick={() => {
                    onChange(dropdown);
                    setIsOpen(false);
                  }}
                >
                  {dropdown}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
}
