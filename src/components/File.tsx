import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { CiFileOn } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useActiveFile } from "../contexts/useActiveFile";

export const File = ({
  name,
  setFileToDelete,
}: {
  name: string;
  setFileToDelete: Dispatch<SetStateAction<string>>;
}) => {
  const activeFileContext = useActiveFile();
  const [content, setContent] = useState<string>("");
  const isActive = activeFileContext.getActiveFile() == name;
  const activeFileClassName = isActive ? "bg-slate-800" : "";

  useEffect(() => {
    if (isActive) {
      setContent(activeFileContext.getJson());
    }
  }, [activeFileContext.json]);

  useEffect(() => {
    if (isActive) {
      activeFileContext.saveJson(content);
    }
  }, [activeFileContext.activeFile]);

  return (
    <div
      className={`flex gap-2 items-center hover:bg-slate-800 p-2 rounded-md ${activeFileClassName}`}
      onClick={() => {
        activeFileContext.changeActiveFileName(name);
        activeFileContext.saveJson(content);
      }}
    >
      <CiFileOn className="text-xl" />
      <span>{name}</span>
      <div className="flex gap-2 grow items-end justify-end ">
        <RiDeleteBin6Line
          className="hover:text-red-500 hover:cursor-pointer"
          onClick={() => {
            setFileToDelete(name);
          }}
        />
      </div>
    </div>
  );
};
