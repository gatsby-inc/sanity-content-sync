export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        // __experimental_before: [
        //   {
        //     name: "netlify",
        //     options: {
        //       description:
        //         "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
        //       sites: [
        //         {
        //           buildHookId:
        //             "6179b38a5b17437862ebac44",
        //           title: "Sanity Studio",
        //           name: "sanity-gatsby-blog-contentsync-studio",
        //           apiId: "03f047c7-9851-42f3-8bbb-60a1b5d7c1cd",
        //         },
        //         {
        //           buildHookId: "6179b38a329fc6740555273c",
        //           title: "Blog Website",
        //           name: "sanity-gatsby-blog-contentsync",
        //           apiId: "26726480-c7d1-4d65-971f-4f772f0aa6cf",
        //         },
        //       ],
        //     },
        //   },
        // ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/gatsby-inc/sanity-content-sync",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanitycontentsyncmain.gatsbyjs.io/",
            category: "apps",
          },
        ],
      },
    },
    {
      name: "gatsby",
      options: { sites: [{ siteUrl: "preview-sanitycontentsyncmain.gtsb.io" }] },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
