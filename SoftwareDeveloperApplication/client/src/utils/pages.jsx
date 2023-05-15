import { Page404 } from "../pages/404/404";
import { PageHome } from "../pages/Home/Home";
import { PageSaved } from "../pages/Saved/Saved";

/**
 * Curated list of pages for the frontend
 */

export const pages = {
  404: {
    label: "404",
    component: <Page404 />,
  },
  main: [
    {
      label: "Home",
      component: <PageHome />,
      path: "/",
      includeFooter: true,
    },
    {
      label: "Saved Activities",
      component: <PageSaved />,
      path: "/saved",
      includeFooter: true,
    },
  ],

  hidden: [
    // {
    //   label: "About",
    //   component: <PageAbout />,
    //   path: "/about",
    //   includeFooter: true,
    // },
  ],
};
