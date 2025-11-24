import React, { useState, type Dispatch, type SetStateAction } from "react";
import { useFiles } from "../contexts//useFiles";
import { useActiveFile } from "../contexts/useActiveFile";
import { File } from "./File";

export const Dialog = ({
  isDialogActive,
  setIsDialogActive,
  setFileToDelete,
}: {
  isDialogActive: boolean;
  setIsDialogActive: Dispatch<React.SetStateAction<boolean>>;
  setFileToDelete: Dispatch<SetStateAction<string>>;
}) => {
  const activeFileContext = useActiveFile();
  const [value, setValue] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);
  const filesContext = useFiles();
  const createFile = () => {
    if (value == "") return;
    if (filesContext.fileExist(value)) {
      setWarning(true);
      return;
    }
    filesContext.addFiles(
      <File name={value} key={value} setFileToDelete={setFileToDelete} />,
    );
    setValue("");
    setIsDialogActive(false);
    setWarning(false);
    activeFileContext.changeActiveFileName(value);
    activeFileContext.saveJson("");
  };

  return (
    <div
      style={{
        display: isDialogActive ? "flex" : "none",
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          createFile();
        }
      }}
    >
      <div className="w-screen h-screen bg-black absolute left-0 top-0 opacity-50 z-[9]" />
      <div
        className="w-64 h-44 bg-slate-950 absolute top-1/2 left-1/2 z-10 translate-x-[-50%]
            translate-y-[-50%] flex flex-col py-3 px-8 rounded-md gap-2 
            justify-center items-center opacity-95"
      >
        <label className="text-white font-semibold text-lg text-center">
          Name
        </label>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="outline-none border-3 border-indigo-600 rounded-md text-white p-1 w-full"
        />
        <span
          className="text-red-500 font-semibold"
          style={{ display: warning ? "block" : "none" }}
        >
          That name alredy exists
        </span>
        <div className="flex gap-4 flex-1 flex-row items-end w-full">
          <button
            className="font-bold bg-red-600 text-white p-2 rounded-md cursor-pointer w-full
                    hover:bg-red-700 active:bg-red-800"
            onClick={() => {
              setIsDialogActive(false);
              setValue("");
              setWarning(false);
            }}
          >
            Cancel
          </button>
          <button
            className="font-bold bg-green-600 text-white p-2 rounded-md cursor-pointer w-full 
                    hover:bg-green-700 active:bg-green-800"
            onClick={createFile}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};
