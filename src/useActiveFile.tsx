import { createContext, useContext, useState, type ReactNode } from "react";

interface ActiveFileContextType {
  activeFile: string;
  json: string;
  changeActiveFileName: (name: string) => void;
  getActiveFile: () => string;
  saveJson: (name: string) => void;
  getJson: () => string;
}

const activeFileContext = createContext<ActiveFileContextType | undefined>(
  undefined,
);

export const ActiveFileProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [activeFile, setActiveFile] = useState<string>("");
  const [json, setJson] = useState<string>("");

  const changeActiveFileName = (name: string) => {
    setActiveFile(name);
  };

  const saveJson = (json: string) => {
    setJson(json);
  };

  const getActiveFile = () => activeFile;
  const getJson = () => json;

  const contextValue = {
    activeFile,
    json,
    changeActiveFileName,
    getActiveFile,
    saveJson,
    getJson,
  };

  return (
    <activeFileContext.Provider value={contextValue}>
      {children}
    </activeFileContext.Provider>
  );
};

export const useActiveFile = () => {
  const context = useContext(activeFileContext);
  if (context === undefined)
    throw new Error("useActiveFile deve ser usado dentro de um WidgetProvider");
  return context;
};
