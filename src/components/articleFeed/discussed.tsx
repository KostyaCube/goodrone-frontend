import { RightSide } from './styles';
import ActionButtons from './actions/articleButtons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetPostsQuery } from '@src/app/store/api/articles';
import i18n from '@src/shared/localization/config';
import { extractTextFromHTML } from '@src/shared/utils';

function Discussed() {
  const { data } = useGetPostsQuery({ order: 'rating', lang: i18n.language });
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <RightSide>
      <h5>{t('Articles.discuss')}</h5>
      {!!(data && data.length) &&
        data.map((item, index) => {
          if (index < 3)
            return (
              <div className="wrapper" key={item.id}>
                <h6 onClick={() => navigate(`/articles/${item.id}`)} className="title">
                  {item.title}
                </h6>
                <p className="content">{extractTextFromHTML(item.body)}</p>
                <ActionButtons article={item} />
              </div>
            );
        })}
    </RightSide>
  );
}

export default Discussed;
