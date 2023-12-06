import UsersRouter from "./Users/router";
import CategoriesRouter from "./Leave/router";
import PostRouter from "./Categories/router";
import AminRouter from "./Posts/router";

export = {
  user: {
    routes: UserRouter,
  },
  leave: {
    routes: LeaveRouter,
  },
  PayRise: {
    routes: PayRise,
  },
  project: {
    routes: ProjectRouter,
  },
  task: {
    routes: TaskRouter,
  },
};
