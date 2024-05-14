import { Disclosure } from '@headlessui/react';
import { Link } from '@tanstack/react-router';
import type { CSSProperties } from 'react';
import { BsFillCircleFill, BsFillTriangleFill } from 'react-icons/bs';

import { cn } from '@sovereign-university/ui';

import { addSpaceToCourseId } from '../../../utils/courses.ts';
import type { TRPCRouterOutput } from '../../../utils/trpc.ts';

interface Part {
  part: number;
}
interface Chapter {
  title: string;
  chapter: number;
  part: Part;
}

interface Props {
  course: TRPCRouterOutput['content']['getCourse'];
  chapters: TRPCRouterOutput['content']['getCourseChapters'];
  currentChapter: Chapter;
  style?: CSSProperties;
}

const isCurrentChapter = (
  chapter: TRPCRouterOutput['content']['getCourseChapters'][number],
  currentChapter: Chapter,
) => {
  return (
    chapter.part === currentChapter.part.part &&
    chapter.chapter === currentChapter.chapter
  );
};

const isPastPart = (
  chapter: TRPCRouterOutput['content']['getCourseChapters'][number],
  currentChapter: Chapter,
) => {
  return chapter.part <= currentChapter.part.part;
};

const isPastChapter = (
  chapter: TRPCRouterOutput['content']['getCourseChapters'][number],
  currentChapter: Chapter,
) => {
  return (
    chapter.part < currentChapter.part.part ||
    (chapter.part === currentChapter.part.part &&
      chapter.chapter < currentChapter.chapter)
  );
};

export const NavigationPanel: React.FC<Props> = ({
  course,
  chapters,
  currentChapter,
  style,
}: Props) => {
  return (
    <div
      className="bg-white z-10 h-auto w-60 rounded-b-2xl border border-darkOrange-0 pt-4 pb-7 px-2.5 shadow-course-navigation"
      style={style}
    >
      <Link
        to={'/courses/$courseId'}
        params={{ courseId: course.id }}
        className="w-fit cursor-default"
      >
        <h2 className="desktop-h4 uppercase text-darkOrange-5 text-center hover:font-medium w-fit mx-auto hover:cursor-pointer">
          {addSpaceToCourseId(course.id)}
        </h2>
      </Link>
      <hr className="mb-4 mt-1 border-darkOrange-5" />
      <div className="ml-2">
        <ul className="flex flex-col gap-2">
          {chapters
            .filter((chapter) => chapter.chapter === 1)
            .map((chapterOne) => (
              <Disclosure
                key={`${chapterOne.part}${chapterOne.chapter}`}
                defaultOpen={chapterOne.part === currentChapter.part.part}
              >
                {({ open }) => (
                  <div key={`${chapterOne.part}${chapterOne.chapter}`}>
                    <Disclosure.Button
                      className={'flex justify-start text-left'}
                    >
                      <li
                        className={cn(
                          'flex items-baseline gap-2.5 text-sm font-semibold mb-1  hover:text-darkOrange-5',
                          isPastPart(chapterOne, currentChapter)
                            ? 'text-black'
                            : 'text-newGray-1',
                        )}
                      >
                        <BsFillTriangleFill
                          size={10}
                          className={
                            open
                              ? 'rotate-180 shrink-0 transition-transform ease-in-out'
                              : 'rotate-90 shrink-0 transition-transform ease-in-out'
                          }
                        />
                        <span>{chapterOne.partTitle}</span>
                      </li>
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      {chapters
                        .filter((chapter) => chapter.part === chapterOne.part)
                        .map((chapter, index) => (
                          <li key={index + 1000}>
                            <Link
                              to={'/courses/$courseId/$partIndex/$chapterIndex'}
                              params={{
                                courseId: course.id,
                                partIndex: chapter.part.toString(),
                                chapterIndex: chapter.chapter.toString(),
                              }}
                            >
                              <div className="mt-1 grid grid-cols-8 items-center gap-1">
                                <div className="col-span-1">
                                  <BsFillCircleFill
                                    size={10}
                                    className={cn(
                                      'text-xs ml-2',
                                      isPastChapter(chapter, currentChapter)
                                        ? 'text-black'
                                        : isCurrentChapter(
                                              chapter,
                                              currentChapter,
                                            )
                                          ? 'text-darkOrange-5'
                                          : 'text-newGray-3',
                                    )}
                                  />
                                </div>
                                <div className="col-span-7">
                                  <span
                                    className={cn(
                                      'text-xs',
                                      isPastChapter(chapter, currentChapter)
                                        ? 'text-black'
                                        : isCurrentChapter(
                                              chapter,
                                              currentChapter,
                                            )
                                          ? 'text-darkOrange-5'
                                          : 'text-newGray-3',
                                    )}
                                  >
                                    {chapter.title}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
        </ul>
      </div>
    </div>
  );
};
