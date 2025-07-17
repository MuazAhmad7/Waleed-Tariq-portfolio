import { Editor, Range } from '@tiptap/core';
import { 
  faHeading,
  faListUl,
  faListOl,
  faQuoteLeft,
  faCode
} from '@fortawesome/free-solid-svg-icons';

const faH1 = faHeading;
const faH2 = faHeading;
const faH3 = faHeading;

export interface Command {
  title: string;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export const commands: Command[] = [
  {
    title: 'Heading 1',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run();
    },
    icon: faH1,
  },
  {
    title: 'Heading 2',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run();
    },
    icon: faH2,
  },
  {
    title: 'Heading 3',
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run();
    },
    icon: faH3,
  },
  {
    title: 'Bulleted List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    icon: faListUl,
  },
  {
    title: 'Numbered List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    icon: faListOl,
  },
  {
    title: 'Blockquote',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
    icon: faQuoteLeft,
  },
  {
    title: 'Code Block',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
    icon: faCode,
  },
];
