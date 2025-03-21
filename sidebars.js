module.exports = {
  docs: [
    {
      type: "doc",
      id: "about",
    },
    {
      type: "doc",
      id: "home",
    },
    {
      type: "category",
      label: "Resources",
      items: [
        {
          type: "doc",
          id: "resources/resources",
        },
      ],
    },
    {
      type: "category",
      label: "Languages",
      items: [
        // {
        //     type: "doc",
        //     id: "languages/languages",
        // },
        {
          type: "category",
          label: "C++",
          items: ["languages/cpp/cpp"],
        },
        {
          type: "category",
          label: "Java",
          items: ["languages/java/java"],
        },
        {
          type: "category",
          label: "Node",
          items: ["languages/node/node"],
        },
      ],
    },
    {
      type: "category",
      label: "Data Structures",
      items: ["ds/ds"],
    },
    {
      type: "category",
      label: "Algorithms by Topic",
      items: ["algorithms/algorithms"],
    },
    {
      type: "category",
      label: "Frontend",
      items: [
        // {
        //     type: "doc",
        //     id: "frontend/frontend",
        // },
        {
          type: "category",
          label: "HTML",
          items: ["frontend/html/html"],
        },
        {
          type: "category",
          label: "CSS",
          items: ["frontend/css/css"],
        },
        {
          type: "category",
          label: "Sass",
          items: [
            "frontend/sass/sass",
            "frontend/sass/sass-variables",
            "frontend/sass/sass-nesting",
            "frontend/sass/sass-import",
            "frontend/sass/sass-mixins",
            "frontend/sass/sass-extend",
            "frontend/sass/sass-operators",
            "frontend/sass/sass-conditionals",
            "frontend/sass/sass-organize",
          ],
        },
        {
          type: "category",
          label: "React",
          items: [
            "frontend/react/react",
            "frontend/react/react-typescript",
            "frontend/react/react-path-alias",
            "frontend/react/react-folder-structure",
            "frontend/react/react-flow",
            "frontend/react/react-components",
            "frontend/react/react-props",
            "frontend/react/react-state",
            "frontend/react/react-component-communication",
            "frontend/react/react-styling",
            "frontend/react/react-conditional-render",
            "frontend/react/react-lists",
            "frontend/react/react-event-handling",
            "frontend/react/react-http",
            "frontend/react/react-services",
            "frontend/react/react-env",
          ],
        },
        {
          type: "category",
          label: "Angular",
          items: [
            "frontend/angular/angular",
            "frontend/angular/angular-folder-structure",
            "frontend/angular/angular-flow",
            "frontend/angular/angular-modules",
            "frontend/angular/angular-components",
            "frontend/angular/angular-services",
            "frontend/angular/angular-component-communication",
            "frontend/angular/angular-routing",
            "frontend/angular/angular-data-binding",
            "frontend/angular/angular-directives",
            "frontend/angular/angular-http",
            "frontend/angular/angular-pipes",
            "frontend/angular/angular-jwt-auth",
            "frontend/angular/angular-form-handling",
            "frontend/angular/angular-ngrx",
            "frontend/angular/angular-material",
          ],
        },
        // {
        //     type: "category",
        //     label: "Next",
        //     items: ["frontend/next/next"],
        // },
        {
          type: "category",
          label: "Vue 3",
          items: [
            "frontend/vue/vue",
            "frontend/vue/vue-flow",
            "frontend/vue/vue-data-binding",
            "frontend/vue/vue-directives",
            "frontend/vue/vue-event-handling",
            "frontend/vue/vue-computed",
            "frontend/vue/vue-watchers",
            "frontend/vue/vue-components",
            "frontend/vue/vue-slots",
            "frontend/vue/vue-form-handling",
            "frontend/vue/vue-teleport",
            "frontend/vue/vue-lifecycle-hooks",
            "frontend/vue/vue-http",
            "frontend/vue/vue-template-refs",
            "frontend/vue/vue-mixins",
            "frontend/vue/vue-composition",
            "frontend/vue/vue-router",
            "frontend/vue/vuex",
          ],
        },
      ],
    },
    {
      type: "doc",
      label: "Frontend Career Path",
      id: "frontend-career-path/frontend-career-path"
    },
    {
      type: "category",
      label: "Backend",
      items: [
        // {
        //     type: "doc",
        //     id: "backend/backend",
        // },
        {
          type: "category",
          label: "Express",
          items: [
            "backend/express/express",
            "backend/express/express-typescript",
            "backend/express/express-hello-world",
            "backend/express/express-routing",
            "backend/express/express-middleware",
            "backend/express/express-sub-routes",
            "backend/express/express-static",
            "backend/express/express-requests",
            "backend/express/express-mongo",
            "backend/express/express-env",
            "backend/express/express-passwords",
            "backend/express/express-jwt",
          ],
        },
        {
          type: "category",
          label: "Strapi",
          items: ["backend/strapi/strapi"],
        },
        // {
        //     type: "category",
        //     label: "Spring Boot",
        //     items: ["backend/springboot/springboot"],
        // },
        // {
        //     type: "category",
        //     label: "Flask",
        //     items: ["backend/flask/flask"],
        // },
      ],
    },
    {
      type: "category",
      label: "Database",
      items: [
        {
          type: "category",
          label: "MongoDB",
          items: [
            "db/mongo/mongo",
            "db/mongo/mongo-atlas",
            "db/mongo/mongo-basics",
            "db/mongo/mongo-create",
            "db/mongo/mongo-read",
            "db/mongo/mongo-update",
            "db/mongo/mongo-delete",
            "db/mongo/mongo-query-operators",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Linux",
      items: [
        {
          type: "doc",
          id: "linux/linux",
        },
      ],
    },
    {
      type: "category",
      label: "Git",
      items: [
        {
          type: "doc",
          id: "git/git",
        },
      ],
    },
    {
      type: "category",
      label: "VS Code",
      items: [
        {
          type: "doc",
          id: "vscode/vscode",
        },
      ],
    },
    {
      type: "category",
      label: "Deployment",
      items: [
        {
          type: "category",
          label: "Heroku",
          items: ["deployment/heroku"],
        },
        {
          type: "category",
          label: "Vercel",
          items: ["deployment/vercel"],
        },
        {
          type: "category",
          label: "Firebase",
          items: ["deployment/firebase"],
        },
      ],
    },
    {
      type: "category",
      label: "Devops",
      items: [
        // {
        //     type: "doc",
        //     id: "devops/devops",
        // },
        {
          type: "category",
          label: "Docker",
          items: ["devops/docker/docker"],
        },
      ],
    },
    {
      type: "category",
      label: "GameDev",
      items: [
        {
          type: "category",
          label: "Unity",
          items: [
            "gamedev/unity/unity",
            "gamedev/unity/unity-2d",
            "gamedev/unity/unity-tutorial-notes",
            "gamedev/unity/unity-udemy-btp-course",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Documentation Tools",
      items: [
        {
          type: "doc",
          id: "documentation/documentation",
        },
      ],
    },
  ],
};
