import { useTranslation } from 'react-i18next';

import { cn } from '@sovereign-university/ui';

import poster from '../../../assets/resources/bet/21poster.webp';
import anil from '../../../assets/resources/bet/anil.webp';
import artistes from '../../../assets/resources/bet/artiste.webp';
import bookscover from '../../../assets/resources/bet/bookcover.webp';
import btcHere from '../../../assets/resources/bet/btcacceptedhere.webp';
import dbCourses from '../../../assets/resources/bet/dbcourses.webp';
import mpbitcoin from '../../../assets/resources/bet/diplomampb.webp';
import gifcollection from '../../../assets/resources/bet/gifcollection.webp';
import history from '../../../assets/resources/bet/history.webp';
import hyperinflation from '../../../assets/resources/bet/hyperinflation.webp';
import logosCompanies from '../../../assets/resources/bet/logos.webp';
import meme from '../../../assets/resources/bet/meme.webp';
import propaganda from '../../../assets/resources/bet/propaganda.webp';
import scams from '../../../assets/resources/bet/scams.webp';
import { ResourceLayout } from '../layout.tsx';

const LinkBox = ({
  title,
  description,
  figmaUrl,
  imgFig,
  cardColor,
  hoverColor,
}: {
  title: string;
  description: string;
  figmaUrl: string;
  imgFig: string;
  cardColor: string;
  hoverColor: string;
}) => {
  return (
    <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
      <div
        className={cn(
          'shrink-0 h-full rounded-lg bg-red-600 p-3 shadow-md hover:bg-blue-600 sm:p-4',
          cardColor,
          hoverColor,
        )}
      >
        <img
          src={imgFig}
          alt={title}
          className="mb-4 h-32 w-full object-cover"
        />
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-xs sm:text-sm">{description}</p>
      </div>
    </a>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

const SectionTitle = ({ children }: { children: string }) => {
  return (
    <h2 className="text-xl font-normal underline decoration-orange-600 decoration-[3px] underline-offset-[5px] sm:text-2xl">
      {children}
    </h2>
  );
};

const SectionDescription = ({ children }: { children: string }) => {
  return <p className="text-xs font-light italic sm:text-base">{children}</p>;
};

const SectionGrid = ({
  elements,
  cardColor,
  hoverColor,
}: {
  elements: Array<{
    title: string;
    description: string;
    figmaUrl: string;
    imgFig: string;
  }>;
  cardColor: string;
  hoverColor: string;
}) => {
  return (
    <div className="overflow-x-auto py-6">
      <div className="grid grid-cols-2 gap-4 sm:w-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {elements.map((item, index) => (
          <LinkBox
            key={index}
            {...item}
            cardColor={cardColor}
            hoverColor={hoverColor}
          />
        ))}
      </div>
    </div>
  );
};

export const BET = () => {
  const { t } = useTranslation();

  // The Links and the images are updated.
  const EDUCATIONAL_CONTENT = [
    {
      title: 'All of PlanB courses',
      description: 'DecouvreBitcoin',
      figmaUrl:
        'https://github.com/DecouvreBitcoin/sovereign-university-data/tree/dev/courses',
      imgFig: dbCourses,
    },
    {
      title: 'Anil Illustrations',
      description: 'Example',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A1055&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: anil,
    },
    {
      title: ' 21 Posters',
      description: 'Rogzy',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=0%3A1&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: poster,
    },
    {
      title: 'Bitcoin Diploma ',
      description: 'Mi Primer Bitcoin',
      figmaUrl: 'https://github.com/MyFirstBitcoin',
      imgFig: mpbitcoin,
    },
  ];

  const VISUAL_CONTENT = [
    {
      title: 'Bitcoin accepted here',
      description: 'Team DB',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A338&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: btcHere,
    },
    {
      title: 'Bitcoin meme',
      description: 'Anonymous',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A818&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: meme,
    },
    {
      title: 'Propaganda Posters',
      description: 'Propaganda Bitcoin posters',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A106&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: propaganda,
    },
    {
      title: 'Hyperinflations Bills',
      description: 'David Saint Onge',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A71&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: hyperinflation,
    },
    {
      title: 'Bitcoin book',
      description: 'Bitcoin Guides',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A230&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: bookscover,
    },
    {
      title: 'Company and project logos',
      description: 'Bitcoin Companies Logo',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2-621&mode=design',
      imgFig: logosCompanies,
    },
    {
      title: 'BTC Gift ',
      description: 'Anonymous',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=3%3A454&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: gifcollection,
    },

    {
      title: 'Scam',
      description: 'Anonymous',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=3%3A287&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: scams,
    },
    {
      title: 'BTC History',
      description: 'Image Database',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=8-574&mode=design',
      imgFig: history,
    },
    {
      title: 'BTC Artistes Gallery ',
      description: '',
      figmaUrl:
        'https://www.figma.com/file/pzyUU3bcrdokNnLdI3o0aX/Bitcoin-Educational-ToolKit-2?type=design&node-id=2%3A728&mode=design&t=ssejloYtH3ZHS8OV-1',
      imgFig: artistes,
    },
  ];

  return (
    <ResourceLayout
      title={t('bet.pageTitle')}
      tagLine={t('bet.pageSubtitle')}
      categoryActive="bet"
    >
      <div className="space-y-8 px-4 text-gray-100 sm:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="max-w-3xl">{t('bet.pageDescription')}</p>
          <h1 className="font-semibold ">{t('bet.hereForYou')}</h1>
        </div>

        {/* Section of Educational Content */}
        <Section>
          <SectionTitle>{t('bet.educationalContent.title')}</SectionTitle>
          <SectionDescription>
            {t('bet.educationalContent.description')}
          </SectionDescription>
          <SectionGrid
            elements={EDUCATIONAL_CONTENT}
            cardColor="bg-red-600"
            hoverColor="hover:bg-blue-600"
          />
        </Section>

        {/* Section of Visual Content */}
        <Section>
          <SectionTitle>{t('bet.visualContent.title')}</SectionTitle>
          <SectionDescription>
            {t('bet.visualContent.description')}
          </SectionDescription>
          <SectionGrid
            elements={VISUAL_CONTENT}
            cardColor="bg-green-600"
            hoverColor="hover:bg-blue-500"
          />
        </Section>

        <p className="border-y-2 px-8 py-5 text-center uppercase">
          {t('bet.contribute')}
        </p>
      </div>
    </ResourceLayout>
  );
};
