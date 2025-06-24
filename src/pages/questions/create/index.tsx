import React, { Dispatch, JSX, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Button, Modal, RadioChangeEvent, Select, Image } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ReachEditor } from '@src/components/reachEditor';
import { CloseOutlined } from '@ant-design/icons';
import { Container, ImagesContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { IKeyword, IQuestion } from '@src/shared/types';
import { useDeleteFileMutation, useGetKeywordsQuery } from '@src/app/store/api/APIbase';
import { useAppSelector } from '@src/app/store';
import { useCreateQuestionMutation, useUpdateQuestionMutation } from '@src/app/store/api/questions';
import { Chips } from '@src/shared/ui/styled components';
import { useCustomModals } from '@src/app/providers/modals';
import { tagRender } from '@src/shared/ui/tag render';

interface ModalProps {
  openCreateModal: boolean;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  state?: IQuestion;
}

function CreateModal({ openCreateModal, setOpenCreateModal, state }: ModalProps): JSX.Element {
  const me = useAppSelector((state) => state.login.user);
  const [form] = Form.useForm();

  const [body, setBody] = useState<string>(state?.body || '');
  const [title, setTitle] = useState<string>(state?.title || '');
  const [chosedkeywords, setkeywords] = useState<string[]>(state?.keywords.map((item) => item.body) || []);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { t } = useTranslation();
  const { data: keywords } = useGetKeywordsQuery(10);
  const [create, { isSuccess, isError }] = useCreateQuestionMutation();
  const [update, { isSuccess: updtSucc, isError: updtErr }] = useUpdateQuestionMutation();
  const [deleteFileRequest, { isSuccess: delSucc, isError: delErr }] = useDeleteFileMutation();

  const { showConfirm, showDeletingConfirm } = useCustomModals();

  const notEmpty = title.trim().length > 0 || body.trim().length > 11;

  function keysHandler(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      setOpenCreateModal(false);
    }
  }

  function clear(): void {
    setOpenCreateModal(false);
    setBody('');
    setTitle('');
    setkeywords([]);
    setFileList([]);
  }

  function deleteFile(id: string) {
    deleteFileRequest(id);
    if (state) {
      state.files = [];
    }
  }

  function createQuestionSending() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    chosedkeywords.forEach((keyword) => {
      formData.append('keywords[]', `${keyword}`);
    });

    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i].originFileObj as File);
    }
    try {
      if (state) {
        update({ id: `${state.id}`, formData });
      } else {
        create(formData).then((res) => {
          if ('data' in res) {
            // if (socket && name) {
            //   const newMessage = {
            //     id: `${Date.now()}`,
            //     user: name,
            //     actionType: ActionType.question,
            //     link: ''
            //   };
            //   if (res.data && res.data.id) newMessage.link = `questions/${res.data.id}`;
            //   socket.emit('message', newMessage, commonAppRoomId);
            //   try {
            //     createMessage({ user: myUUID, type: ActionType.question });
            //   } catch (err) {
            //     console.error(err);
            //   }
            // }
            clear();
          } else {
            console.error('error:', res.error);
          }
        });
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  const onChangeKeywords = (e: RadioChangeEvent) => {
    setkeywords(e as unknown as string[]);
  };

  function toggleKeywords(keyword: string) {
    const keyIndex = chosedkeywords.findIndex((kw) => kw === keyword);
    if (keyIndex === -1) {
      setkeywords([...chosedkeywords, keyword]);
    } else {
      const updatedKeywords = [...chosedkeywords];
      updatedKeywords.splice(keyIndex, 1);
      setkeywords(updatedKeywords);
    }
  }

  // useEffect(() => {
  //   if (isSuccess || updtSucc || delSucc) {
  //     success();
  //   }
  //   if (isError || updtErr || delErr) error();
  // }, [isSuccess, updtSucc, delSucc, isError, updtErr, delErr]);

  useEffect(() => {
    document.addEventListener('keydown', keysHandler);
    return () => {
      document.removeEventListener('keydown', keysHandler);
    };
  }, []);

  return (
    <Modal
      title={t('questions.askQ')}
      centered
      open={openCreateModal}
      onOk={() => setOpenCreateModal(false)}
      onCancel={() => {
        setOpenCreateModal(false);
      }}
      width={686}
      footer={[
        <Button
          onClick={
            !notEmpty
              ? () => {
                  clear();
                }
              : () => showConfirm({ callback: clear, text: t('questions.lostData') })
          }
          key="cancel"
        >
          {t('questions.close')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={title.trim().length <= 0 || body.trim().length <= 0 || chosedkeywords.length === 0 || chosedkeywords.length > 5}
          onClick={me ? createQuestionSending : undefined}
        >
          {state ? t('questions.save') : t('questions.publish')}
        </Button>
      ]}
    >
      <Container>
        <Form size="large" layout={'vertical'} form={form}>
          <Form.Item>
            <p style={{ marginTop: '1rem', marginBottom: '4px' }}>{t('questions.heading')}</p>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('questions.headingDesc')} />
          </Form.Item>
          {state && state?.files && !!state?.files.length && (
            <ImagesContainer>
              <Image.PreviewGroup>
                {state?.files.map((image) => (
                  <React.Fragment key={image.id}>
                    <div className="wrapper">
                      <button
                        className="remove-button"
                        onClick={() => {
                          showDeletingConfirm({ callback: deleteFile, id: `${image.id}`, text: t('questions.deleteImg') });
                        }}
                      >
                        <CloseOutlined />
                      </button>
                      <Image wrapperClassName="stateimage" key={image.id} width={'auto'} height={100} src={image.link}></Image>
                    </div>
                  </React.Fragment>
                ))}
              </Image.PreviewGroup>
            </ImagesContainer>
          )}

          <Form.Item>
            <ReachEditor placeholder={t('questions.askQP')} body={body} setBody={setBody} fileList={fileList} setFileList={setFileList} />
          </Form.Item>
          <Form.Item>
            <p style={{ marginBottom: '4px' }}>{t('questions.menuTags')}</p>
            <Select
              allowClear
              mode="tags"
              suffixIcon={<></>}
              tagRender={tagRender}
              tokenSeparators={[' ']}
              onChange={onChangeKeywords}
              // popupRender={() => <div style={{ display: 'none' }} />}
              dropdownStyle={{ display: 'none' }}
              placeholder={t('questions.tagsPlaceholder')}
              value={chosedkeywords as unknown as RadioChangeEvent}
              defaultValue={state?.keywords.map((word) => word.body) as unknown as RadioChangeEvent}
            />
            {chosedkeywords.length > 5 && <h6 style={{ marginTop: '1rem', marginBottom: '4px' }}>{t('questions.maxWords')}</h6>}
            <div style={{ marginTop: '10px' }} className="chips">
              {!!keywords?.length &&
                keywords.map((item: IKeyword) => {
                  return (
                    <Chips key={item.id} onClick={() => toggleKeywords(item.body)} $pressed={`${chosedkeywords.includes(item.body) && 'true'}`}>
                      {item.body}
                    </Chips>
                  );
                })}
            </div>
          </Form.Item>
        </Form>
      </Container>
    </Modal>
  );
}

export default CreateModal;
