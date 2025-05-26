import { Dispatch, SetStateAction, useMemo, useRef, useState, useEffect, JSX } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { ImageIcon } from '@src/assets/icons/icon-components';
import { UploadFile } from 'antd';
import ImagesUploader from '@src/components/reachEditor/imagesUploader';
import { InputContainer } from './styles';
import 'react-quill-new/dist/quill.snow.css';

import { IFile } from '@src/shared/types';

Quill.register('modules/imageUploader', ImagesUploader);

type IProps = {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  placeholder: string;
  fileList?: UploadFile[];
  setFileList?: Dispatch<SetStateAction<UploadFile[]>>;
  simple?: boolean;
  textWihImages?: boolean;
  setArrOfImage?: Dispatch<SetStateAction<IFile[]>>;
};

export const ReachEditor = ({ fileList, setFileList, body, setBody, placeholder, simple, textWihImages, setArrOfImage }: IProps): JSX.Element => {
  const [showUploader, setshowUploader] = useState<boolean>(false);
  const [areaFocus, setareaFocus] = useState<boolean>(false);

  const [toolbarNode, setToolbarNode] = useState<HTMLDivElement | null>();

  const reactQuillRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const end = useRef<any>(null);

  const modules = useMemo(() => {
    const config = {
      toolbar: {
        container: toolbarNode
      },
      imageUploader: textWihImages
        ? {
            upload: (file: any) => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);

                fetch(`${import.meta.env.VITE_API_BASE_URL}file/image-upload`, {
                  method: 'POST',
                  body: formData
                })
                  .then((response) => response.text())
                  .then((result) => {
                    setArrOfImage && setArrOfImage((prevArray) => [...prevArray, JSON.parse(result)]);
                    resolve(JSON.parse(result).link);
                  })
                  .catch((error) => {
                    reject('Upload failed');
                    console.error('Error:', error);
                  });
              });
            }
          }
        : null
    };
    return config;
  }, [toolbarNode]);

  const handleFileSelected = (event: any) => {
    const file = event.target.files[0];
    if (file && modules.imageUploader) {
      const uploadPromise = modules.imageUploader.upload(file);
      uploadPromise
        .then((url) => {
          if (reactQuillRef && reactQuillRef.current) {
            const editor = reactQuillRef.current.getEditor();

            const range = editor.getSelection();
            if (range) {
              editor.insertEmbed(range.index, 'image', url);
            } else {
              editor.insertEmbed(editor.getLength(), 'image', url);
            }
          }
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
        });
    }
  };

  const handleImageClick = () => {
    if (textWihImages) {
      if (fileInputRef && fileInputRef.current) fileInputRef.current.click();
    } else {
      setshowUploader((prev) => !prev);
    }
  };

  const executeScroll = () => {
    if (end.current) {
      const container = end.current;
      container.scrollTop = container.scrollIntoView();
    }
  };

  useEffect(() => {
    executeScroll();
  }, [body]);

  return (
    <div className="text-editor">
      <InputContainer focus={`${areaFocus}`} gray={`${textWihImages}`}>
        <div ref={setToolbarNode}>
          {!simple && (
            <>
              <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
              </span>

              <span className="ql-formats">
                <button className="ql-link" />
                <button onClick={handleImageClick} className="image-button">
                  <ImageIcon />
                </button>
              </span>
              <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <select className="ql-align" />
              </span>
            </>
          )}
        </div>
        {textWihImages && <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelected} />}

        {!textWihImages && fileList && setFileList && (
          <ImagesUploader maxFiles={5} imagesLength={fileList.length} show={showUploader} fileList={fileList} setFileList={setFileList} />
        )}

        {!!toolbarNode && (
          <ReactQuill
            ref={reactQuillRef}
            value={body}
            onChange={setBody}
            placeholder={placeholder}
            modules={modules}
            onFocus={() => setareaFocus(true)}
            onBlur={() => setareaFocus(false)}
          />
        )}
      </InputContainer>
      <div ref={end} />
    </div>
  );
};
