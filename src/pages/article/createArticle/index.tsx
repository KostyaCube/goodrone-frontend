import React, { useEffect, useState } from 'react';
import { Form, Input, Button, RadioChangeEvent, Select, Image, UploadFile } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { LeftBlock, Discuss, Container } from '@src/components/articleFeed/styles';
import { ButtonsWrapper, CreateWrapper, ImagesContainer } from './styles';
import { ReachEditor } from '@src/components/reachEditor';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ImagesUploader from '@src/components/reachEditor/imagesUploader';
import { useAppSelector } from '@src/app/store';
import { useDeleteFileMutation, useGetKeywordsQuery } from '@src/app/store/api/APIbase';
import { useCreatePostMutation, useEditPostMutation } from '@src/app/store/api/articles';
import { useNotification } from '@src/app/providers/notifications';
import { IFile, IKeyword } from '@src/shared/types';
import { defaultLang, languages } from '@src/shared/constants';
import { tagRender } from '@src/shared/ui/tag render';
import { Chips } from '@src/shared/ui/styled components';
import { useCustomModals } from '@src/app/providers/modals';

function CreateArticle() {
  const location = useLocation();
  let state = location?.state?.article;

  const { showConfirm, showDeletingConfirm } = useCustomModals();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { data: keywords } = useGetKeywordsQuery(10);
  const [deleteFileRequest, { isSuccess: delSucc, isError: delErr }] = useDeleteFileMutation();
  const [create, { isSuccess, isError, data }] = useCreatePostMutation();
  const [update, { isSuccess: updtSucc, isError: updtErr }] = useEditPostMutation();
  const notify = useNotification();

  const [articleBody, setarticleBody] = useState<string>(state?.body || '');
  const [title, setTitle] = useState<string>(state?.title || '');
  const [language, setLanguage] = useState<string>(state?.lang || '');
  const [chosedkeywords, setkeywords] = useState<string[]>(state?.keywords.map((item: any) => item.body) || []);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [arrOfImageLinks, setArrOfImage] = useState<any[]>([]);

  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

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

  async function clear(soft: boolean = false): Promise<void> {
    setarticleBody('');
    setTitle('');
    setkeywords([]);
    setFileList([]);
    if (!soft) {
      const promises = arrOfImageLinks.map(async (element) => {
        return await deleteFileRequest(`${element.id}`);
      });
      await Promise.all(promises);
    }
    setArrOfImage([]);
    navigate(-1);
  }

  function deleteFile(id: string) {
    deleteFileRequest(id);
    state.files = [];
  }

  function createPost() {
    checkImagesBeforeSending(articleBody, arrOfImageLinks);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', articleBody);
    formData.append('lang', language);
    chosedkeywords.forEach((keyword) => {
      formData.append('keywords[]', `${keyword}`);
    });

    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i].originFileObj as File);
    }
    try {
      if (state) {
        update({ id: `${state.id}`, formData }).then(() => {
          navigate(`/articles/${state.id}`);
          state = null;
        });
      } else {
        token &&
          me &&
          create(formData).then((res: any) => {
            if ('data' in res) {
              navigate(`/articles/${res.data.id}`);
            }
          });
      }
    } catch (err: any) {
      notify('error', err?.message);
    }
    clear(true);
  }

  function checkImagesBeforeSending(text: string, arr: IFile[]) {
    arr.forEach((element) => {
      if (!text.includes(element.link)) {
        deleteFileRequest(`${element.id}`);
      }
    });
  }

  function handleLangChange(value: string, option?: { value: string; label: string } | { value: string; label: string }[]): void {
    setLanguage(value);
  }

  // useEffect(() => {
  //   if (isSuccess || updtSucc || delSucc) {
  //     success();
  //   }
  //   if (isError || updtErr || delErr) error();
  // }, [isSuccess, updtSucc, delSucc, isError, updtErr, delErr]);

  useEffect(() => {
    if (!token || !me) {
      navigate('/main?articles');
    }
  }, [token, me]);

  return (
    <Container style={{ margin: 0, minHeight: '87vh', paddingTop: '104px', gridTemplateColumns: '336px auto 336px' }}>
      <LeftBlock></LeftBlock>

      <CreateWrapper>
        <h2>{t('articles.create')}</h2>

        <Form size="large" layout={'vertical'} form={form}>
          <Form.Item>
            <p style={{ marginTop: '1rem', marginBottom: '4px' }}>{t('articles.title')}</p>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('articles.headingDesc')} />
          </Form.Item>

          <Form.Item>
            <p style={{ marginBottom: '4px' }}>{t('articles.lang')}</p>
            <Select
              defaultValue={language || languages.find((item) => item.id === defaultLang)?.code}
              onChange={handleLangChange}
              options={languages.map((item) => ({
                value: item.code,
                label: item.value
              }))}
            />
          </Form.Item>

          <p style={{ marginTop: '1rem', marginBottom: '4px' }}>{t('articles.cover')}</p>
          {state && state?.files && !!state?.files.length ? (
            <ImagesContainer>
              <Image.PreviewGroup>
                {state?.files.map((image: any) => (
                  <React.Fragment key={image.id}>
                    <div className="wrapper">
                      <button
                        className="remove-button"
                        onClick={() => {
                          showDeletingConfirm({ callback: deleteFile, id: `${image.id}`, text: t('articles.deleteImg') });
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
          ) : (
            <Form.Item>
              <ImagesUploader maxFiles={1} imagesLength={fileList.length} show={true} fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          )}

          <Form.Item>
            <ReachEditor textWihImages body={articleBody} setBody={setarticleBody} placeholder={t('articles.writeArticle')} setArrOfImage={setArrOfImage} />
          </Form.Item>

          <Form.Item>
            <p style={{ marginBottom: '4px' }}>{t('articles.menuTags')}</p>
            <Select
              allowClear
              mode="tags"
              suffixIcon={<></>}
              tagRender={tagRender}
              tokenSeparators={[' ']}
              onChange={onChangeKeywords}
              popupRender={() => <div style={{ display: 'none' }} />}
              placeholder={t('articles.tagsPlaceholder')}
              value={chosedkeywords as unknown as RadioChangeEvent}
              defaultValue={state?.keywords.map((word: any) => word.body) as unknown as RadioChangeEvent}
            />
            {chosedkeywords.length > 5 && <h6 style={{ marginTop: '1rem', marginBottom: '4px' }}>{t('articles.maxWords')}</h6>}
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

        <ButtonsWrapper>
          <Button style={{ marginRight: '8px' }} onClick={() => showConfirm({ callback: clear, text: t('articles.lostData') })} key="cancel">
            {t('articles.close')}
          </Button>

          <Button
            key="submit"
            type="primary"
            disabled={title.trim().length <= 0 || articleBody.trim().length < 500 || chosedkeywords.length > 5}
            onClick={me ? createPost : undefined}
          >
            {state ? t('articles.save') : t('articles.publish')}
          </Button>
        </ButtonsWrapper>
      </CreateWrapper>

      <Discuss className="create-right" style={{ background: 'transparent' }}></Discuss>
    </Container>
  );
}

export default CreateArticle;
