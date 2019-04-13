export interface Course {
  courseId: string;
  courseName: string;
  courseDetails: string;
  lecture: [
    {
      lectureId: string;
      lectureName: string;
      lectureBody: string;
    }
  ];
  creator: string;
}
