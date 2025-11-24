import { type Dispatch, type SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

export const NewButton = ({
  setIsDialogActive,
}: {
  setIsDialogActive: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="flex items-center gap-2 justify-center py-2 bg-indigo-600
            text-white font-bold rounded-md w-full cursor-pointer hover:bg-indigo-800"
      onClick={() => {
        setIsDialogActive(true);
      }}
    >
      <FaPlus />
      <span> New File</span>
    </button>
  );
};
