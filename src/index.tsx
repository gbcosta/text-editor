import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header.tsx";
import { TextEditor } from "./components/editor.tsx";
import { useEffect, useState } from "react";
import { useFiles } from "./useFiles.tsx";

export function Index() {
  const [fileToDelete, setFileToDelete] = useState<string>("");
  const [activeFile, setActiveFile] = useState<string>("");

  const files = useFiles();

  useEffect(() => {
    files.deleteFiles(fileToDelete);
  }, [fileToDelete]);

  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen">
      <Sidebar
        setFileToDelete={setFileToDelete}
        setActiveFile={setActiveFile}
        activeFile={activeFile}
      />
      <Header activeFile={activeFile} />
      <TextEditor />
    </div>
  );
}
