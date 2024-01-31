type ButtonType = {
  children: JSX.Element | string;
  onClick: (val: any) => any;
  disabled?: boolean;
};
export default function Button({
  children,
  onClick,
  disabled = false,
}: ButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-[#0D267D] rounded-[62px] p-3.5 text-white text-[21px] font-bold leading-[30px] w-full justify-center items-center disabled:bg-disabled btn-trans disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
