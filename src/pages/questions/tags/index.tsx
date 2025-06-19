import { useNavigate } from 'react-router-dom';
import { Container } from './styles';
import { useTranslation } from 'react-i18next';
import { JSX } from 'react';
import { useGetKeywordsQuery } from '@src/app/store/api/APIbase';
import { IKeyword } from '@src/shared/types';
import { Chips } from '@src/shared/ui/styled components';

function Tags(): JSX.Element {
  const { data } = useGetKeywordsQuery(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <h2>{t('questions.menuTags')}</h2>
      <p>{t('questions.tagDesc')}</p>
      <div>
        {data &&
          data.map((keyword: IKeyword) => (
            <Chips
              onClick={() => {
                navigate('/questions', { state: { chosed: keyword } });
              }}
              key={keyword.id}
            >
              {keyword.body}
            </Chips>
          ))}
      </div>
    </Container>
  );
}

export default Tags;
