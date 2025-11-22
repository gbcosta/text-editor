import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  isValidElement,
} from "react";

interface FilesContextType {
  files: ReactNode[];
  addFiles: (newWidget: ReactNode) => void;
  deleteFiles: (name: string) => void;
  fileExist: (name: string) => boolean;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<ReactNode[]>([]);

  const addFiles = (newFiles: ReactNode) => {
    setFiles((prevFiles) => [...prevFiles, newFiles]);
  };

  const deleteFiles = (name: string) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((n) => {
        if (isValidElement<{ name: string }>(n) && n.props.name != name) {
          return n;
        }
      });
    });
  };
  const fileExist = (name: string) => {
    const values = files.filter((n) => {
      if (isValidElement<{ name: string }>(n) && n.props.name == name) {
        return n;
      }
    });
    if (values[0]) return true;
    return false;
  };

  const contextValue = { files, addFiles, deleteFiles, fileExist };

  return (
    <FilesContext.Provider value={contextValue}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FilesContext);
  if (context === undefined) {
    throw new Error("useFiles deve ser usado dentro de um WidgetProvider");
  }
  return context;
};
