import React from 'react';
import { Editor } from '@tiptap/react';
import styles from './ImageToolbar.module.scss';
import Icon from '../Icon';
import { 
  faAlignLeft, 
  faAlignCenter, 
  faAlignRight 
} from '@fortawesome/free-solid-svg-icons';

type ImageToolbarProps = {
  editor: Editor;
};

const ImageToolbar: React.FC<ImageToolbarProps> = ({ editor }) => {
  const setAlignment = (align: 'left' | 'center' | 'right') => {
    editor
      .chain()
      .focus()
      .updateAttributes('image', { 'data-align': align })
      .run();
  };

  return (
    <div className={styles.toolbar}>
      <button
        onClick={() => setAlignment('left')}
        className={
          editor.isActive('image', { 'data-align': 'left' })
            ? styles.isActive
            : ''
        }
      >
        <Icon icon={faAlignLeft} />
      </button>
      <button
        onClick={() => setAlignment('center')}
        className={
          editor.isActive('image', { 'data-align': 'center' })
            ? styles.isActive
            : ''
        }
      >
        <Icon icon={faAlignCenter} />
      </button>
      <button
        onClick={() => setAlignment('right')}
        className={
          editor.isActive('image', { 'data-align': 'right' })
            ? styles.isActive
            : ''
        }
      >
        <Icon icon={faAlignRight} />
      </button>
    </div>
  );
};

export default ImageToolbar;
