import {
  BreakPointHooks,
  breakpointsTailwind,
} from '@react-hooks-library/core';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import readingRabbit from '../../../assets/resources/reading-rabbit.svg';
import { Button } from '../../../atoms/Button';
import { Card } from '../../../atoms/Card';
import { trpc } from '../../../utils';
import { notFoundRoute } from '../../misc/routes';
import { ResourceLayout } from '../layout';
import { podcastDetailsRoute } from '../routes';

const { useGreater } = BreakPointHooks(breakpointsTailwind);

export const Podcast = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { podcastId, language } = useParams({
    from: podcastDetailsRoute.id,
  });

  const { data: podcast, isFetched } = trpc.content.getPodcast.useQuery({
    id: Number(podcastId),
    language: language ?? i18n.language,
  });

  if (!podcast && isFetched) navigate({ to: notFoundRoute.id });

  const isScreenMd = useGreater('sm');

  function displayAbstract() {
    return (
      <div className="mt-6 border-l-4 border-blue-600 pl-4">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">
          {t('podcast.abstract')}
        </h3>
        <p className="mb-4 line-clamp-[20] max-w-2xl text-ellipsis whitespace-pre-line pr-4 text-justify text-sm md:pr-8">
          {podcast?.description}
        </p>
      </div>
    );
  }

  return (
    <ResourceLayout
      title={t('podcasts.pageTitle')}
      tagLine={t('podcasts.pageSubtitle')}
    >
      {podcast && (
        <div className="w-full">
          <Card className="mx-2 md:mx-auto">
            <div className="my-4 w-full grid-cols-1 grid-rows-1 sm:grid-cols-3 md:grid">
              <div className="flex flex-col items-center justify-center border-b-4 border-blue-800 md:mr-10 md:border-0">
                <img
                  className="max-h-72 sm:max-h-96"
                  alt={t('imagesAlt.bookCover')}
                  src={podcast.logo}
                />
                <div className="my-4 flex flex-row justify-evenly md:flex-col md:space-y-2 lg:flex-row lg:space-y-0">
                  {podcast?.podcast_url && (
                    <Link to={podcast.podcast_url}>
                      <Button
                        size={isScreenMd ? 's' : 'xs'}
                        variant="tertiary"
                        className="mx-2"
                      >
                        {t('podcast.discover')}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="col-span-2 my-4 flex flex-col md:mt-0">
                <div>
                  <h2 className="mb-2 max-w-lg text-2xl font-bold text-blue-800 sm:text-4xl">
                    {podcast?.name}
                  </h2>

                  <div className="mt-2 text-sm">
                    <h5 className="font-light italic">
                      {podcast.host}, {podcast.last_updated}.
                    </h5>
                  </div>
                </div>

                <div className="mt-2 text-blue-700">
                  <span className="text-xs font-light italic">
                    {t('book.topicsAddressed')}
                  </span>
                  {podcast?.tags.map((object, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {object.toUpperCase()}
                    </span>
                  ))}
                </div>
                {isScreenMd && displayAbstract()}
              </div>
            </div>
            {!isScreenMd && displayAbstract()}
          </Card>

          <div className="mx-auto my-6 flex max-w-5xl flex-row justify-between p-2">
            <img
              className="-ml-20 mr-10 mt-10 hidden h-80 max-w-[40%] flex-col sm:flex"
              src={readingRabbit}
              alt={t('imagesAlt.readingRabbit')}
            />

            <div className="flex flex-col">{!podcast.description}</div>
          </div>
        </div>
      )}
    </ResourceLayout>
  );
};
