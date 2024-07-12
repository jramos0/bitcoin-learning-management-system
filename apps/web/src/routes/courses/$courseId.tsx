/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/courses/$courseId')({
  component: CourseId,
});

function CourseId() {
  return <Outlet></Outlet>;
}
