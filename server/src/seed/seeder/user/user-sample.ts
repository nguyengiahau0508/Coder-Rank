
import { Role } from "src/common/enums/authentication/role.enum";
import { CreateUserDto } from "src/modules/mariadb/users/dto/create-user.dto";

export const sampleUsers: CreateUserDto[] = [
  {
    name: "John Doe",
    username: "john_doe",
    email: "john.doe@example.com",
    rating: 1600,
    role: Role.User,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Admin User",
    username: "admin_user",
    email: "admin@example.com",
    rating: 2000,
    role: Role.Admin,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Problem Creator",
    username: "problem_creator",
    email: "creator@example.com",
    rating: 1800,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Alice Coder",
    username: "alice_coder",
    email: "alice@example.com",
    rating: 1700,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Bob Master",
    username: "bob_master",
    email: "bob@example.com",
    rating: 1900,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    name: "Charlie Dev",
    username: "charlie_dev",
    email: "charlie@example.com",
    rating: 1500,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "David OP",
    username: "david_op",
    email: "david@example.com",
    rating: 2100,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Eve Queen",
    username: "eve_queen",
    email: "eve@example.com",
    rating: 1650,
    role: Role.User,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Franklin X",
    username: "franklin_x",
    email: "franklin@example.com",
    rating: 1750,
    role: Role.Problemseter,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    name: "Grace Code",
    username: "grace_code",
    email: "grace@example.com",
    rating: 1400,
    role: Role.User,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  }
];

