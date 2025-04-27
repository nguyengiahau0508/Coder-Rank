import { Course } from "src/modules/mariadb/courses/entities/course.entity";
import { Lesson } from "src/modules/mariadb/lessons/entities/lesson.entity";

export const sampleLesson: Partial<Lesson>[] = [
  {
    id: 1,
    title: "Introduction to HTML",
    content: "Learn the basics of HTML structure, tags, and semantic markup.",
    order: 1,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01")
  },
  {
    id: 2,
    title: "Styling with CSS",
    content: "Explore CSS properties, selectors, and layouts for styling web pages.",
    order: 2,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-02"),
    updatedAt: new Date("2025-02-02")
  },
  {
    id: 3,
    title: "JavaScript Basics",
    content: "Understand variables, functions, and events in JavaScript.",
    order: 3,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-03"),
    updatedAt: new Date("2025-02-03")
  },
  {
    id: 4,
    title: "Responsive Design",
    content: "Master media queries and flexible layouts for mobile-friendly sites.",
    order: 4,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-04"),
    updatedAt: new Date("2025-02-04")
  },
  {
    id: 5,
    title: "DOM Manipulation",
    content: "Learn to interact with the Document Object Model using JavaScript.",
    order: 5,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-05"),
    updatedAt: new Date("2025-02-05")
  },
  {
    id: 6,
    title: "Introduction to Flexbox",
    content: "Use CSS Flexbox for efficient and dynamic layouts.",
    order: 6,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-06"),
    updatedAt: new Date("2025-02-06")
  },
  {
    id: 7,
    title: "CSS Grid Layouts",
    content: "Create complex layouts with CSS Grid for modern web design.",
    order: 7,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-07"),
    updatedAt: new Date("2025-02-07")
  },
  {
    id: 8,
    title: "JavaScript ES6 Features",
    content: "Explore arrow functions, destructuring, and modules in ES6.",
    order: 8,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-08"),
    updatedAt: new Date("2025-02-08")
  },
  {
    id: 9,
    title: "Working with APIs",
    content: "Fetch and display data from REST APIs using JavaScript.",
    order: 9,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-09"),
    updatedAt: new Date("2025-02-09")
  },
  {
    id: 10,
    title: "Introduction to React",
    content: "Build dynamic UIs with React components and state management.",
    order: 10,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10")
  },
  {
    id: 11,
    title: "State and Props in React",
    content: "Manage data flow in React applications using state and props.",
    order: 11,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-11"),
    updatedAt: new Date("2025-02-11")
  },
  {
    id: 12,
    title: "Web Accessibility",
    content: "Ensure your websites are accessible with ARIA and semantic HTML.",
    order: 12,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-12"),
    updatedAt: new Date("2025-02-12")
  },
  {
    id: 13,
    title: "Performance Optimization",
    content: "Optimize web performance with lazy loading and code splitting.",
    order: 13,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-13"),
    updatedAt: new Date("2025-02-13")
  },
  {
    id: 14,
    title: "Debugging JavaScript",
    content: "Use browser tools and techniques to debug JavaScript code.",
    order: 14,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-14"),
    updatedAt: new Date("2025-02-14")
  },
  {
    id: 15,
    title: "Building Forms",
    content: "Create interactive forms with validation and error handling.",
    order: 15,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-15")
  },
  {
    id: 16,
    title: "Introduction to TypeScript",
    content: "Enhance JavaScript with TypeScript’s type safety and interfaces.",
    order: 16,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-16"),
    updatedAt: new Date("2025-02-16")
  },
  {
    id: 17,
    title: "SEO for Web Developers",
    content: "Optimize websites for search engines with meta tags and structure.",
    order: 17,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-17"),
    updatedAt: new Date("2025-02-17")
  },
  {
    id: 18,
    title: "Progressive Web Apps",
    content: "Build PWAs with service workers for offline functionality.",
    order: 18,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-18"),
    updatedAt: new Date("2025-02-18")
  },
  {
    id: 19,
    title: "Testing Web Applications",
    content: "Implement unit and integration tests with Jest and Cypress.",
    order: 19,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-19"),
    updatedAt: new Date("2025-02-19")
  },
  {
    id: 20,
    title: "Deploying Web Apps",
    content: "Deploy applications to platforms like Vercel, Netlify, and AWS.",
    order: 20,
    course: { id: 1 } as Course,
    questions: [],
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20")
  }
];
