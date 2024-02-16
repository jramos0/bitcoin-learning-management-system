import {
  BreakPointHooks,
  breakpointsTailwind,
} from '@react-hooks-library/core';
import { useNavigate } from '@tanstack/react-router';

import { cn } from '@sovereign-university/ui';

import Tree from '../../../atoms/Tree/index.tsx';
import TreeNode from '../../../atoms/Tree/TreeNode/index.tsx';
import { addSpaceToCourseId, fakeCourseId } from '../../../utils/courses.ts';

const { useSmaller } = BreakPointHooks(breakpointsTailwind);

export interface Course {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'developer';
  language: string;
  children?: Course[];
  unreleased?: boolean;
  groupName?: string;
}

interface CourseTreeProps {
  courses: Course[];
}

const CourseTreeNode = ({ course }: { course: Course }) => {
  const isMobile = useSmaller('xl');

  const navigate = useNavigate();
  if (!course) {
    return null;
  }

  const nodeCommonStyle =
    'z-10 inline-block relative cursor-pointer border-[3px] rounded-2xl p-1 xl:p-4 text-white font-semibold max-w-[8rem] sm:max-w-[12rem] xl:max-w-[16rem]';

  let nodeColorClasses;
  const courseIdNumbers = Number(
    fakeCourseId(course.id).replaceAll(/[A-Za-z]/g, ''),
  );

  if (courseIdNumbers >= 400) {
    nodeColorClasses = 'bg-gray-900 border-gray-300 hover:bg-gray-800';
  } else if (courseIdNumbers >= 300) {
    nodeColorClasses = 'bg-red-500 border-red-300 hover:bg-red-400';
  } else if (courseIdNumbers >= 200) {
    nodeColorClasses = 'bg-orange-500 border-orange-300 hover:bg-orange-400';
  } else {
    nodeColorClasses = 'bg-green-500 border-green-300 hover:bg-green-400';
  }

  nodeColorClasses = cn(nodeCommonStyle, nodeColorClasses);

  function onCourseClick() {
    navigate({ to: '/courses/$courseId', params: { courseId: course.id } });
  }

  function getLineMultiplier(course: Course) {
    switch (course.id) {
      case 'crypto301': {
        return isMobile ? 5 : 8;
      }
      case 'cuboplus': {
        return isMobile ? 6 : 10;
      }
      case 'ln402': {
        return isMobile ? 6 : 10;
      }
      // No default
    }
    return 1;
  }

  return (
    <TreeNode
      key={course.id}
      label={
        <div className={nodeColorClasses} onClick={onCourseClick}>
          <div className="text-[8px] font-normal leading-[12px] md:text-sm md:leading-normal xl:text-base xl:font-medium">
            {course.name}
          </div>
          <div className="absolute -right-3 -top-4 hidden rounded-xl bg-gray-400 p-[6px] text-sm font-normal xl:block ">
            {addSpaceToCourseId(course.id)}
          </div>
        </div>
      }
      groupName={course.groupName}
      lineMultiplier={getLineMultiplier(course)}
    >
      {course.children?.map((c) => {
        return <CourseTreeNode key={c.id} course={c} />;
      })}
    </TreeNode>
  );
};

export const CourseTree: React.FC<CourseTreeProps> = ({ courses }) => {
  const firstCourse = courses.slice(0, 1)[0];
  courses = courses.slice(1);
  const isMobile = useSmaller('xl');

  return (
    <Tree
      lineWidth={'4px'}
      lineHeight={isMobile ? '25px' : '40px'}
      lineColor={'white'}
      lineBorderRadius={'10px'}
      nodePadding={isMobile ? '3px' : '15px'}
      label={<CourseTreeNode course={firstCourse} />}
    >
      {courses.map((course) => {
        return <CourseTreeNode key={course.id} course={course} />;
      })}
    </Tree>
  );
};
