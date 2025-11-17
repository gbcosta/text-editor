import { CiFileOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const File = ({ children }: { children: string }) => {
  return (
    <div className="flex gap-2 items-center hover:bg-slate-800 p-2 rounded-md">
      <CiFileOn />
      <span>{children}</span>
      <div className="flex gap-2 grow items-end justify-end ">
        <RiDeleteBin6Line className="hover:text-red-500 hover:cursor-pointer" />
      </div>
    </div>
  );
};

const NewButton = () => {
  return (
    <button
      className="flex items-center gap-2 justify-center py-2 bg-indigo-600
            text-white font-bold rounded-md w-full cursor-pointer hover:bg-indigo-800"
    >
      <FaPlus />
      <span> New File</span>
    </button>
  );
};

export const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-slate-900 p-4 text-gray-400 row-span-12 col-span-2">
      <div className="flex gap-2 items-center">
        <FiLayers className="text-indigo-600 text-2xl" />
        <h1 className="text-white font-bold text-xl">Zenith</h1>
      </div>
      <h2 className="mt-4 mb-1 text-sm font-semibold">PROJECT FILES</h2>
      <div className="flex-1 overflow-auto">
        <File>intro</File>
      </div>
      <NewButton />
    </aside>
  );
};
