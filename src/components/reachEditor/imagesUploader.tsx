import { Dispatch, JSX, SetStateAction } from 'react';
import { Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { supportedImageTypes } from '@src/shared/constants';
import { getBase64 } from '@src/shared/utils';

type IUploadProps = {
  show: boolean;
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
  imagesLength: number;
  maxFiles: number;
};

function ImagesUploader({ show, fileList, setFileList, imagesLength, maxFiles }: IUploadProps): JSX.Element {
  // const { t } = useTranslation();
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
  };

  const filterFilesByType = (fileList: UploadFile[]) => {
    return fileList.filter((file: UploadFile) => {
      return file.type && supportedImageTypes.includes(file.type);
    });
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(filterFilesByType(newFileList));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      {/* <div style={{ marginTop: 8 }}>{t('common.dragFiles')}</div> */}
    </div>
  );

  if (show)
    return (
      <div className="uploader">
        <Upload
          multiple
          maxCount={maxFiles}
          beforeUpload={(file) => {
            const isImage = supportedImageTypes.includes(file.type);
            if (!isImage) {
              // message.error({
              //   type: 'error',
              //   content: t('common.onlyImages'),
              //   duration: 2
              // });
            }
            return false;
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {imagesLength >= maxFiles ? null : uploadButton}
        </Upload>
        {/* {imagesLength === maxFiles && <h6>{t('common.maxFiles')}</h6>} */}
      </div>
    );
  return <div className="uploader" />;
}

export default ImagesUploader;
