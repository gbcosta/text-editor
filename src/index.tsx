import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header.tsx";
import { TextEditor } from "./components/editor.tsx";
import { useEffect, useState } from "react";
import { useFiles } from "./contexts/useFiles.tsx";

export function Index() {
  const [fileToDelete, setFileToDelete] = useState<string>("");
  const files = useFiles();

  useEffect(() => {
    files.deleteFiles(fileToDelete);
  }, [fileToDelete]);

  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen">
      <Sidebar setFileToDelete={setFileToDelete} />
      <Header />
      <TextEditor />
    </div>
  );
}
