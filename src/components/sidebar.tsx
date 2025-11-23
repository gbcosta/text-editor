import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { CiFileOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFiles } from "../contexts//useFiles";
import { useActiveFile } from "../contexts/useActiveFile";

const File = ({
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

const NewButton = ({
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

const Dialog = ({
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
