import { LuFileText } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { useActiveFile } from "../useActiveFile";

export const Header = () => {
  const activeFile = useActiveFile();
  return (
    <header className="flex items-center bg-slate-900 col-span-10 px-8 ">
      <div className="flex gap-8 items-center">
        <LuFileText className="text-3xl text-white" />
        <div
          className="text-white font-bold text-xl p-2 rounded-md focus:ring-indigo-600
                    focus:ring-3 focus:outline-none"
        >
          {activeFile.getActiveFile()}
        </div>
      </div>
      <div className="grow flex justify-end">
        <FaGithub
          onClick={() => {
            window.open("https://github.com/gbcosta", "_blank");
          }}
          className="text-3xl text-indigo-100 cursor-pointer hover:text-indigo-600 "
        />
      </div>
    </header>
  );
};
