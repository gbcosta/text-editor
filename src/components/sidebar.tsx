import { useState, type Dispatch, type SetStateAction } from "react";
import { FiLayers } from "react-icons/fi";
import { useFiles } from "../contexts//useFiles";
import { NewButton } from "./newButton";
import { Dialog } from "./dialog";

export const Sidebar = ({
  setFileToDelete,
}: {
  setFileToDelete: Dispatch<SetStateAction<string>>;
}) => {
  const filesContext = useFiles();
  const [isDialogActive, setIsDialogActive] = useState<boolean>(false);
  return (
    <aside className="flex flex-col bg-slate-900 p-4 text-gray-400 row-span-12 col-span-2">
      <Dialog
        setIsDialogActive={setIsDialogActive}
        isDialogActive={isDialogActive}
        setFileToDelete={setFileToDelete}
      />
      <div className="flex gap-2 items-center">
        <FiLayers className="text-indigo-600 text-2xl" />
        <h1 className="text-white font-bold text-xl">Zenith</h1>
      </div>
      <h2 className="mt-4 mb-1 text-sm font-semibold">PROJECT FILES</h2>
      <div className="flex-1 overflow-auto">{filesContext.files}</div>
      <NewButton setIsDialogActive={setIsDialogActive} />
    </aside>
  );
};
