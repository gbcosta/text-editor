import { useCallback, useState, type ReactNode } from "react";
import { createEditor, Editor, Element, Transforms } from "slate";
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react";
import type { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { IoCode } from "react-icons/io5";

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const BoldElement = (props: RenderElementProps) => {
  return (
    <pre {...props}>
      <strong>{props.children}</strong>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button className="bg-none rounded-lg hover:bg-gray-700 cursor-pointer p-2">
      {children}
    </button>
  );
};
export const TextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <BoldElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="col-span-10 row-span-11">
      <Slate editor={editor} initialValue={initialValue}>
        <div className="flex flex-col h-full bg-gray-800 ">
          <div className="flex gap-2 p-2 text-xl border-b-2 border-b-gray-600 text-gray-400">
            <div className="flex gap-3 border-r-3 pr-2 border-r-gray-600 ">
              <Button>
                <FaBold />
              </Button>

              <Button>
                <FaItalic />
              </Button>
              <Button>
                <FaUnderline />
              </Button>

              <Button>
                <IoCode />
              </Button>
            </div>
            <div className="flex gap-4 border-r-3 border-r-gray-600 pr-2">
              <Button>
                <FaListOl />
              </Button>
              <Button>
                <FaListUl />
              </Button>
              <Button>
                <FaAlignLeft />
              </Button>
              <Button>
                <FaAlignCenter />
              </Button>
              <Button>
                <FaAlignRight />
              </Button>
              <Button>
                <FaAlignJustify />
              </Button>
            </div>
          </div>
          <Editable
            renderLeaf={renderLeaf}
            className="grow p-4 m-12 bg-slate-900 text-gray-200"
            renderElement={renderElement}
            onKeyDown={(event) => {
              if (event.ctrlKey) {
                const [match] = Editor.nodes(editor, {
                  match: (n) => Element.isElement(n) && n.type === "code",
                });

                Transforms.setNodes(
                  editor,
                  {
                    type: match ? "paragraph" : "code",
                  },
                  {
                    match: (n) =>
                      Element.isElement(n) && Editor.isBlock(editor, n),
                  },
                );
              } else if (event.key == "b") {
                event.preventDefault();
                Editor.addMark(editor, "bold", true);
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
};
