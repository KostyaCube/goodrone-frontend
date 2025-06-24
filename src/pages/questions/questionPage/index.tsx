import { Dispatch, JSX, SetStateAction, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Empty, Spin, Image, UploadFile, Button, MenuProps, Dropdown } from 'antd';
import { Position, Heading, LightSpan, ImagesContainer, ActionButton, Content, ChipsWrapper, Wrapper, ImageDesc, MoreButton, Answers } from './styles';
import { ReachEditor } from '@src/components/reachEditor';
import { MoreOutlined } from '@ant-design/icons';
import { Edit, Remove } from '@src/assets/icons/icon-components';
import { useAppSelector } from '@src/app/store';
import { Chips, Flex, SpinnerWrapper } from '@src/shared/ui/styled components';
import { IAnswer, IFile, IKeyword } from '@src/shared/types';
import { useDeleteQuestionMutation, useGetQuestionByIdQuery, useMakeViewedMutation } from '@src/app/store/api/questions';
import { useCreateAnswerMutation } from '@src/app/store/api/question-answers';
import { fileNameExtractor } from '@src/shared/utils';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import CreateModal from '../create';
import Answer from '../answer';

type Iprops = {
  setOpenCreateModal?: Dispatch<SetStateAction<boolean>>;
  openCreateModal?: boolean;
};

function Question({ setOpenCreateModal, openCreateModal }: Iprops): JSX.Element {
  const [answerBody, setAnswerBody] = useState<string>('');
  const [answerFileList, setAnswerFileList] = useState<UploadFile[]>([]);

  let { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

  const { data, isLoading } = useGetQuestionByIdQuery(id);
  const [deleteQuestion, { isSuccess }] = useDeleteQuestionMutation();
  const { openAuthModal } = useModal();
  const { showDeletingConfirm } = useCustomModals();

  const [makeViewed] = useMakeViewedMutation();
  const [sendAnswer] = useCreateAnswerMutation();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  function answerSending() {
    const formData = new FormData();

    formData.append('body', answerBody);
    formData.append('questionId', `${id}`);

    for (let i = 0; i < answerFileList.length; i++) {
      formData.append('images', answerFileList[i].originFileObj as File);
    }

    sendAnswer(formData)
      .then(() => {})
      .catch((err: any) => {
        console.error(err?.message);
      });
    setAnswerBody('');
    setAnswerFileList([]);
  }

  function keysHandler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpenCreateModal && setOpenCreateModal(false);
      if (!openCreateModal) navigate(-1);
    }
  }

  useEffect(() => {
    const element = document.querySelector('.content');
    if (element && data) {
      element.innerHTML = data.body;
    }
  }, [data]);

  useEffect(() => {
    if (id) makeViewed(id);
  }, [id]);

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess]);

  useEffect(() => {
    document.addEventListener('keydown', keysHandler);
    return () => {
      document.removeEventListener('keydown', keysHandler);
    };
  }, []);

  const dropDownMenus: MenuProps['items'] = data
    ? [
        {
          label: (
            <ActionButton
              onClick={() => {
                showDeletingConfirm({ callback: deleteQuestion, id: `${data.id}`, text: `${t('questions.deleteConfirm')}` });
              }}
            >
              <Remove />
              <span>{t('questions.delete')}</span>
            </ActionButton>
          ),
          key: '0'
        },
        {
          label: (
            <ActionButton
              onClick={(e) => {
                e.preventDefault();
                setOpenEditModal(true);
              }}
              className="blue"
            >
              <Edit />
              <span>{t('questions.edit')}</span>
            </ActionButton>
          ),
          key: '1'
        }
      ]
    : [];

  return (
    <>
      {isLoading ? (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      ) : data ? (
        <Wrapper>
          <Flex $justify="between">
            <Flex>
              <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#553c70', gap: 4, marginRight: '8px' }} size="large">
                {data.author.firstname?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <div>
                <h4>{data.author.firstname.charAt(0).toUpperCase() + data.author.firstname.slice(1) || 'Unknown user'}</h4>
                <Position>{data.author.activity || `${t('questions.position')}`}</Position>
              </div>
            </Flex>
            {token && me && me.id === data.authorId && (
              <Dropdown trigger={['click']} menu={{ items: dropDownMenus }} placement="left">
                <MoreButton>
                  <MoreOutlined />
                </MoreButton>
              </Dropdown>
            )}
          </Flex>

          <CreateModal state={data} openCreateModal={openEditModal} setOpenCreateModal={setOpenEditModal} />

          <Heading>{data.title}</Heading>
          <div>
            <LightSpan>
              {t('questions.views')} {data.views}
            </LightSpan>
            <LightSpan className={`${data?.answers?.length && 'green'}`}>
              {t('questions.answers')} {data?.answers?.length || 0}
            </LightSpan>
          </div>

          {data.files && !!data.files.length && (
            <ImagesContainer>
              <Image.PreviewGroup>
                {data.files.map((image: IFile) => (
                  <div key={image.id} style={{ display: 'inline-block' }}>
                    <Image
                      wrapperClassName="image"
                      width={'auto'}
                      style={{ maxHeight: `${data.files.length > 2 ? '200px' : '300px'}` }}
                      src={image.link}
                    ></Image>
                    <ImageDesc>{fileNameExtractor(image.link)}</ImageDesc>
                  </div>
                ))}
              </Image.PreviewGroup>
            </ImagesContainer>
          )}

          <Content>
            <p className="content" />
          </Content>

          {!!data.keywords.length && (
            <ChipsWrapper>
              {data.keywords.map((word: IKeyword) => {
                return (
                  <Chips $events="none" key={word.id}>
                    {word.body}
                  </Chips>
                );
              })}
            </ChipsWrapper>
          )}

          <Answers>
            {!!data.answers.length && (
              <>
                {data.answers.map((answer: IAnswer) => {
                  return <Answer answer={answer} key={answer.id} me={me} />;
                })}
              </>
            )}

            {me && token ? (
              <>
                <ReachEditor
                  placeholder={t('questions.writeA')}
                  fileList={answerFileList}
                  setFileList={setAnswerFileList}
                  body={answerBody}
                  setBody={setAnswerBody}
                />
                <Button onClick={me && token ? answerSending : undefined} disabled={answerBody.trim().length < 20} style={{ marginTop: '1rem' }}>
                  {t('questions.sendA')}
                </Button>
              </>
            ) : (
              <p>
                <Link onClick={openAuthModal} to={''}>
                  {t('questions.enter')}
                </Link>
                {t('questions.toWrite')}
              </p>
            )}
          </Answers>
        </Wrapper>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}

export default Question;
