import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TUTORIALS_CATEGORIES, extractSubCategories } from '../utils';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { compose, computeAssetCdnUrl, trpc } from '../../../utils';
import {
  tutorialCategoryRoute,
  tutorialDetailsRoute,
  tutorialsIndexRoute,
} from '../routes';
import { Routes } from 'apps/web/src/routes/routes';
import { TutorialLayout } from '../layout';

export const TutorialCategory = () => {
  const { t, i18n } = useTranslation();
  const { category } = useParams({
    from: tutorialCategoryRoute.id,
  });
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const tutorialCategory = TUTORIALS_CATEGORIES.find(
    (c) => c.name === category
  ) as (typeof TUTORIALS_CATEGORIES)[0];

  const { data: tutorials } = trpc.content.getTutorialsByCategory.useQuery({
    category,
    language: i18n.language,
  });

  useEffect(() => {
    if (!TUTORIALS_CATEGORIES.some((c) => c.name === category)) {
      navigate({
        to: tutorialsIndexRoute.id,
      });
    }
  }, [category, navigate]);

  useEffect(() => {
    if (tutorials) {
      setSubCategories(extractSubCategories(tutorials).sort());
    }
  }, [tutorials]);

  return (
    <TutorialLayout currentCategory={category}>
      <div className="col-span-3 lg:max-w-3xl xl:col-span-2 xl:max-w-none">
        <div className="flex w-full flex-row items-end justify-start py-10">
          <div className="bg-orange-400 relative z-0 flex h-20 w-20 self-center rounded-full md:h-24 md:w-24">
            <img
              className="absolute inset-0 m-auto h-12 md:h-14"
              src={tutorialCategory.image}
              alt=""
            />
          </div>
          <h1 className="text-blue-700 py-3 pl-4 text-5xl font-bold uppercase italic md:pl-8 lg:text-6xl">
            {tutorialCategory.name}
          </h1>
        </div>
        <p className="text-blue-800 flex w-full text-justify md:text-left">
          {t(`tutorials.${category}.description`)}
        </p>
        {tutorials && (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex rounded-t-xl bg-gray-200">
                {subCategories.map((subCategory) => (
                  <Tab
                    key={subCategory}
                    className={({ selected }) =>
                      compose(
                        'w-full first:rounded-tl-xl last:rounded-tr-xl py-2.5 font-medium text-blue-800 capitalize',
                        selected
                          ? 'bg-orange-600 shadow'
                          : 'text-blue-100 hover:bg-gray-100/[0.3] hover:text-orange-600'
                      )
                    }
                  >
                    {t([
                      `tutorials.${category}.${subCategory}.name`,
                      subCategory,
                    ])}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="rounded-b-xl bg-gray-200 pb-3">
                {subCategories.map((subCategory) => (
                  <Tab.Panel key={subCategory}>
                    <div className="flex flex-col pt-3">
                      {i18n.exists(
                        `tutorials.${category}.${subCategory}.description`
                      ) && (
                        <div className="text-blue-900 px-10 pb-6 pt-3 text-sm font-light italic">
                          {t(
                            `tutorials.${category}.${subCategory}.description`
                          )}
                        </div>
                      )}
                      {tutorials
                        .filter(
                          (tutorial) => tutorial.subcategory === subCategory
                        )
                        .map((tutorial) => (
                          <Link
                            to={tutorialDetailsRoute.id}
                            params={{
                              category: tutorial.category,
                              tutorialId: tutorial.id.toString(),
                              language: 'fr', // TODO TRIGGER
                            }}
                            key={tutorial.id}
                            className="my-2 flex flex-row items-start justify-start space-x-8 rounded-md px-8 py-2.5"
                          >
                            <img
                              className="h-16 w-16 rounded-md"
                              src={
                                tutorial.builder
                                  ? computeAssetCdnUrl(
                                      tutorial.builder.last_commit,
                                      `${tutorial.builder.path}/assets/logo.jpeg`
                                    )
                                  : computeAssetCdnUrl(
                                      tutorial.last_commit,
                                      `${tutorial.path}/assets/logo.jpeg`
                                    )
                              }
                              alt=""
                            />
                            <div className="flex flex-col">
                              <h2 className="text-blue-700 text-lg font-semibold uppercase">
                                {tutorial.name}
                              </h2>
                              <p className="text-blue-700 max-w-md text-xs capitalize">
                                {tutorial.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
    </TutorialLayout>
  );
};
