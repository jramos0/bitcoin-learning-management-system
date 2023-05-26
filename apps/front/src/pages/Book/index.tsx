import { trpc } from '@sovereign-academy/api-client';

import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';
import { Tag } from '../../atoms/Tag';
import { MainLayout } from '../../components';
import { OtherSimilarResources } from '../../components/OtherSimilarResources';
import { RelatedResources } from '../../components/RelatedResources';
import { ResourceReview } from '../../components/ResourceReview';
import { Routes } from '../../types';
import { replaceDynamicParam } from '../../utils';

import { BookSummary } from './BookSummary';

export const Book = () => {
  const query = trpc.content.getResources.useQuery({ category: 'books' });
  const book = query.data?.slice(1, 2)[0];

  return (
    <MainLayout>
      <div className="flex flex-col bg-primary-800">
        <div className="flex flex-row justify-center">
          <Card className="max-w-8xl px-6">
            <div className="flex flex-row justify-between mx-auto my-6 w-screen max-w-4xl">
              <div className="flex flex-col justify-between py-4 mr-12 w-max">
                <img
                  className="w-100"
                  alt="book cover"
                  src={book?.cover}
                />
                <div className="flex flex-row justify-evenly mt-4 w-full">
                  <Button size="s" variant="tertiary" className="mx-2 w-full">PDF / E-book</Button>
                  <Button size="s" variant="tertiary" className="mx-2 w-full">Buy</Button>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-primary-800">
                    {book?.title}
                  </h2>

                  <div className="text-xs">
                    <h5>{book?.author}</h5>
                    <h5>Date: {book?.publication_date}</h5>
                  </div>
                </div>

                <div>
                  <Tag>Bitcoin</Tag>
                  <Tag>Technology</Tag>
                  <Tag>Philosophy</Tag>
                </div>

                <div>
                  <h3 className="mb-4 text-lg">Abstract</h3>
                  <p className="max-w-lg text-xs text-justify text-ellipsis line-clamp-[9]">
                    {book?.description}
                  </p>
                </div>

                <RelatedResources
                  audioBook={[{ label: 'Need to be recorded!' }]}
                  interview={[
                    {
                      label: 'CEO Interview',
                      path: replaceDynamicParam(Routes.Interview, {
                        interviewId: 'ja78172',
                      }),
                    },
                  ]}
                  course={[
                    {
                      label: 'BTC 204',
                      path: replaceDynamicParam(Routes.Course, {
                        courseId: 'btc-204',
                      }),
                    },
                  ]}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-row justify-center pb-48">
          <BookSummary
            contributor={{
              username: 'Asi0',
              title: 'Bitcoiner',
              image:
                'https://github.com/DecouvreBitcoin/sovereign-university-data/blob/main/resources/books/21-lessons/assets/cover-en.jpg?raw=true',
            }}
            title="A journey into sovreignty"
            content="If it's not the Presentation mode that's causing the issue, it's possible that you accidentally triggered a different mode or setting in Figma that is causing the screen to display in black and white with a purple overlay. One thing you could try is to reset your Figma preferences. To do this, click on your user icon in the bottom left-hand corner of the Figma interface, and then select 'Help & Account' from the dropdown menu. From there, select 'Troubleshooting' and then click the 'Reset Figma' button. This should reset your preferences and return Figma to its default settings. If resetting your preferences doesn't work, it's possible that there is another issue causing the problem. You might try clearing your browser's cache and cookies, or trying to access Figma using a different browser or device to see if the issue persists. If none of these solutions work, you may want to contact Figma's support team for further assistance."
          />

          <div className="py-4 max-w-lg">
            <ResourceReview />
          </div>
        </div>

        <OtherSimilarResources
          title="Proposition de lecture"
          resources={[
            {
              title: 'Discours de la servitude volontaire',
              id: 'discours-de-la-servitude-volontaire',
              image:
                'https://github.com/DecouvreBitcoin/sovereign-university-data/blob/main/resources/books/21-lessons/assets/cover-en.jpg?raw=true',
            },
            {
              title: 'Check your financiel priviledge',
              id: 'check-your-financiel-priviledge',
              image:
                'https://github.com/DecouvreBitcoin/sovereign-university-data/blob/main/resources/books/21-lessons/assets/cover-en.jpg?raw=true',
            },
            {
              title: "L'ordre mondial en mutation",
              id: 'l-ordre-mondial-en-mutation',
              image:
                'https://github.com/DecouvreBitcoin/sovereign-university-data/blob/main/resources/books/21-lessons/assets/cover-en.jpg?raw=true',
            },
            {
              title: 'Le prix de demain',
              image:
                'https://github.com/DecouvreBitcoin/sovereign-university-data/blob/main/resources/books/21-lessons/assets/cover-en.jpg?raw=true',
              id: 'le-prix-de-demain',
            },
          ]}
        />
      </div>
    </MainLayout >
  );
};
