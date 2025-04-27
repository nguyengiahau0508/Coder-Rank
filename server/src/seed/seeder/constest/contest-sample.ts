
import { Contest } from "src/modules/mariadb/contests/entities/contest.entity";

export const sampleContests: Partial<Contest>[] = [
  {
    id: 1,
    title: 'New Year Challenge 2024',
    startTime: new Date('2024-01-01T12:00:00Z'),
    endTime: new Date('2024-01-01T15:00:00Z'),
    createdAt: new Date('2023-12-15T10:00:00Z'),
    image: 'images/contests/card_img_1654267951.png',
    sponsor: 'LeetCode'
  },
  {
    id: 2,
    title: 'Spring Coding Marathon',
    startTime: new Date('2024-03-10T09:00:00Z'),
    endTime: new Date('2024-03-10T14:00:00Z'),
    createdAt: new Date('2024-02-20T12:30:00Z'),
    image: 'images/contests/card_img_1654267980.png',
    sponsor: 'LeetCode'
  },
  {
    id: 3,
    title: 'Algorithmic Cup 2024',
    startTime: new Date('2024-04-15T18:00:00Z'),
    endTime: new Date('2024-04-15T21:00:00Z'),
    createdAt: new Date('2024-03-25T16:45:00Z'),
    image: 'images/contests/card_img_1659801683.png',
    sponsor: 'LeetCode'
  },
  {
    id: 4,
    title: 'Summer Coding Fest',
    startTime: new Date('2024-06-20T10:00:00Z'),
    endTime: new Date('2024-06-20T14:30:00Z'),
    createdAt: new Date('2024-05-10T09:20:00Z'),
    image: 'images/contests/card_img_1654267951.png',
    sponsor: 'LeetCode'
  },
  {
    id: 5,
    title: 'AI & Machine Learning Hackathon',
    startTime: new Date('2024-07-05T08:00:00Z'),
    endTime: new Date('2024-07-05T12:00:00Z'),
    createdAt: new Date('2024-06-01T11:10:00Z'),
    image: 'images/contests/card_img_1654267980.png',
    sponsor: 'LeetCode'
  },
  {
    id: 6,
    title: 'Graph Theory Championship',
    startTime: new Date('2024-08-12T14:00:00Z'),
    endTime: new Date('2024-08-12T17:30:00Z'),
    createdAt: new Date('2024-07-15T08:40:00Z'),
    image: 'images/contests/card_img_1659801683.png',
    sponsor: 'LeetCode'
  },
  {
    id: 7,
    title: 'Dynamic Programming Contest',
    startTime: new Date('2024-09-23T16:00:00Z'),
    endTime: new Date('2024-09-23T19:00:00Z'),
    createdAt: new Date('2024-08-18T14:25:00Z'),
    image: 'images/contests/card_img_1654267951.png',
    sponsor: 'LeetCode'
  },
  {
    id: 8,
    title: 'Competitive Coding League',
    startTime: new Date('2024-10-05T13:00:00Z'),
    endTime: new Date('2024-10-05T16:00:00Z'),
    createdAt: new Date('2024-09-10T07:55:00Z'),
    image: 'images/contests/card_img_1654267980.png',
    sponsor: 'LeetCode'
  },
  {
    id: 9,
    title: 'Winter Algorithm Challenge',
    startTime: new Date('2024-12-01T15:00:00Z'),
    endTime: new Date('2024-12-01T18:00:00Z'),
    createdAt: new Date('2024-11-05T10:45:00Z'),
    image: 'images/contests/card_img_1654267951.png',
    sponsor: 'LeetCode'
  },
  {
    id: 10,
    title: 'End of Year Coding Showdown',
    startTime: new Date('2024-12-30T20:00:00Z'),
    endTime: new Date('2024-12-30T23:00:00Z'),
    createdAt: new Date('2024-12-01T09:30:00Z'),
    image: 'images/contests/card_img_1654267980.png',
    sponsor: 'LeetCode'
  }
];

