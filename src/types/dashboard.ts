export interface Lecture {
  _id: string;
  title: string;
  course: string;
  startTime: string;
  endTime: string;
}

export interface Deadline {
  _id: string;
  title: string;
  course: string;
  dueDate: string;
}

export interface DashboardData {
  lectures: Lecture[];
  deadlines: Deadline[];
}
