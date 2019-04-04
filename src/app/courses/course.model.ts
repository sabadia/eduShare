import { Lecture } from './lecture.model';
export interface Course {
  courseId: string;
  courseName: string;
  courseDetails: string;
  lecture: Lecture[];
}
