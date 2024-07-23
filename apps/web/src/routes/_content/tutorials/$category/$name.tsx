import { Link, createFileRoute, useParams } from '@tanstack/react-router';
import { capitalize } from 'lodash-es';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import DonateLightning from '#src/assets/icons/donate_lightning.svg?react';
import Spinner from '#src/assets/spinner_orange.svg?react';
import { AuthorCard } from '#src/components/author-card.js';
import PageMeta from '#src/components/Head/PageMeta/index.js';
import { TipModal } from '#src/components/tip-modal.js';
import { TooltipWithContent } from '#src/components/tooptip-with-content.js';
import { TutorialsMarkdownBody } from '#src/components/TutorialsMarkdownBody/index.js';
import { useDisclosure } from '#src/hooks/use-disclosure.js';
import { AppContext } from '#src/providers/context.js';
import { computeAssetCdnUrl } from '#src/utils/index.js';
import { SITE_NAME } from '#src/utils/meta.js';
import { formatNameForURL } from '#src/utils/string.js';
import { type TRPCRouterOutput, trpc } from '#src/utils/trpc.js';

import { TutorialLayout } from '../-other/layout.tsx';

export const Route = createFileRoute('/_content/tutorials/$category/$name')({
  component: TutorialDetails,
});

function TutorialDetails() {
  const { t, i18n } = useTranslation();
  const { category, name } = useParams({
    from: '/tutorials/$category/$name',
  });

  const {
    open: openTipModal,
    isOpen: isTipModalOpen,
    close: closeTipModal,
  } = useDisclosure();

  const { data: tutorial, isFetched } = trpc.content.getTutorial.useQuery({
    category,
    name,
    language: i18n.language,
  });

  const { tutorials } = useContext(AppContext);
  const isFetchedTutorials = tutorials && tutorials.length > 0;

  function headerAndFooterText(creditName: string, creditUrl: string) {
    return (
      <div className="text-xs text-red-500 sm:text-base">
        {creditName && (
          <div>
            <span className="font-light">{t('tutorials.details.madeBy')}</span>
            <span className="font-semibold"> {creditName}</span>
          </div>
        )}
        {creditUrl && (
          <div>
            <span className="font-light uppercase">
              {t('tutorials.details.source')}
            </span>
            <a href={creditUrl} target="_blank" rel="noopener noreferrer">
              <span className="font-semibold"> {creditUrl}</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  function header(
    tutorial: NonNullable<TRPCRouterOutput['content']['getTutorial']>,
  ) {
    return (
      <div className="px-5 sm:px-0">
        <h1 className="border-b-[0.2rem] border-gray-400/50 py-2 text-left text-2xl font-bold uppercase text-blue-800 sm:text-4xl">
          {tutorial.title}
        </h1>
        <div className="mt-4 flex flex-row justify-between">
          {headerAndFooterText(
            tutorial.credits?.name as string,
            tutorial.credits?.link as string,
          )}
          {(tutorial.credits?.name || tutorial.credits?.link) && (
            <button onClick={openTipModal}>
              <TooltipWithContent
                text={t('tutorials.details.tipTooltip')}
                position="bottom"
              >
                <DonateLightning />
              </TooltipWithContent>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <TutorialLayout
      currentCategory={tutorial?.category}
      currentSubcategory={tutorial?.subcategory}
      currentTutorialId={tutorial?.id}
    >
      <>
        {tutorial && (
          <>
            <PageMeta
              title={`${SITE_NAME} - ${tutorial?.title}`}
              description={capitalize(
                tutorial?.description || tutorial?.rawContent,
              )}
            />
            <div className="-mt-4 w-full max-w-5xl lg:hidden">
              <span className=" mb-2 w-full text-left text-lg font-normal leading-6 text-orange-500">
                <Link to="/tutorials">{t('words.tutorials') + ` > `}</Link>
                <Link
                  to={'/tutorials/$category'}
                  params={{ category: tutorial.category }}
                  className="capitalize"
                >
                  {tutorial.category + ` > `}
                </Link>
                <span className="capitalize">{tutorial.title}</span>
              </span>
            </div>
            <div className="flex w-full flex-col items-center justify-center px-2">
              <div className="mt-4 w-full space-y-6 overflow-hidden text-blue-900 md:max-w-3xl">
                {header(tutorial)}
                {isFetchedTutorials && (
                  <TutorialsMarkdownBody
                    content={tutorial.rawContent}
                    assetPrefix={computeAssetCdnUrl(
                      tutorial.lastCommit,
                      tutorial.path,
                    )}
                    tutorials={tutorials || []}
                  />
                )}
                <div>
                  {headerAndFooterText(
                    tutorial.credits?.name as string,
                    tutorial.credits?.link as string,
                  )}
                </div>
              </div>
              {tutorial.credits?.professor?.id && (
                <div className="mt-4 flex w-full flex-col items-center space-y-2 p-5 text-blue-900 sm:px-0">
                  <h2 className="text-2xl font-semibold">
                    {t('tutorials.details.enjoyed')}
                  </h2>
                  <p className="text-xl">
                    {t('tutorials.details.checkAuthor')}
                  </p>
                  {tutorial.credits?.professor && (
                    <Link
                      to={`/professor/${formatNameForURL(tutorial.credits.professor.name)}-${tutorial.credits.professor.id}`}
                      key={tutorial.credits.professor.id}
                    >
                      <AuthorCard
                        className="py-4"
                        professor={tutorial.credits.professor}
                      ></AuthorCard>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {isTipModalOpen && (
              <TipModal
                isOpen={isTipModalOpen}
                onClose={closeTipModal}
                lightningAddress={
                  tutorial.credits?.professor?.tips.lightningAddress as string
                }
                userName={tutorial.credits?.professor?.name as string}
              />
            )}
          </>
        )}

        {!isFetched && <Spinner className="size-24 md:size-32 mx-auto" />}
      </>
    </TutorialLayout>
  );
}
