module.exports = {
  docs: [
    {
        type: "doc",
        id: "about",
    },
    {
        type: "doc",
        id: "index",
    },
    {
        type: "category",
        label: "Languages",
        items: [
            {
                type: "doc",
                id: "languages/languages",
            },
            {
                type: "category",
                label: "C++",
                items: ["languages/c++/c++"],
            },
            {
                type: "category",
                label: "Java",
                items: ["languages/java/java"],
            },
        ],
    },
    {
        type: "category",
        label: "Frontend",
        items: [
            {
                type: "doc",
                id: "frontend/frontend",
            },
            {
                type: "category",
                label: "React",
                items: ["frontend/react/react"],
            },
            {
                type: "category",
                label: "Angular",
                items: ["frontend/angular/angular"],
            },
        ],
    },
    
    {
        type: "category",
        label: "Devops",
        items: [
            {
                type: "doc",
                id: "devops/devops",
            },
            {
                type: "category",
                label: "Git",
                items: ["devops/git/git"],
            },
            {
                type: "category",
                label: "Docker",
                items: ["devops/docker/docker"],
            },
        ],
    },
],
};
