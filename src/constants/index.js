import { meta, shopify,roar, starbucks,tech,sagar, tesla,vidyalankar } from "../assets/images";
import {
    car,
    contact,
    c,
    css,
    estate,
    express,
    git,
    github,
    html,
    java,
    javascript,
    linkedin,
    logoroar,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    threejs,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: c,
        name: "redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Basic HTML website",
        company_name: "Vidyalankar Polytechnic",
        icon: vidyalankar,
        iconBg: "#accbe1",
        date: "March 2023 - April 2023",
        points: [
            "Developed the structure of the website and provided proper designs.",
            "Collaborated with the team to create efficient designs and output.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "All of this was done in a hackathon environment.",
        ],
    },
    {
        title: "Co-Cataylst Head",
        company_name: "Techshala",
        icon: tech,
        iconBg: "#fbc3bc",
        date: "Oct 2023 - March 2024",
        points: [
            "Participated in various events.",
            "Managed various workshops.",
            "Gained knowledge through workshops on AIML, Cybersecurity, App Development, Game Development, and many more.",
            "Worked with the best team and gained experience from them."
        ],
    },
    {
        title: "Web Developer",
        company_name: "My Own Project",
        icon: roar,
        iconBg: "#E97451",
        date: "March 2024 - March 2024",
        points: [
            "Created a front end as a self project like Roar Cycles Dublin.",
            "Created various pages using HTML and CSS.",
            "Gained knowledge of JavaScript, Git, GitHub, and Material-UI.",
        ],
    },
    {
        title: "Full stack Developer",
        company_name: "Sagan (an) System",
        icon: sagar,
        iconBg: "#a2d2ff",
        date: "Learning - Present",
        points: [
            "Currently working here as an intern.",
            "Working on a React project from which I have created this beautiful website.",
            "Currently working on this project."
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/karim1556',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'www.linkedin.com/in/karim-shaikh1556',

    }
];

export const projects = [
    {
        iconUrl: logoroar,
        theme: 'btn-back-red',
        name: 'Bicyle Shop',
        description: 'Developed a website to book bicycles in Dublin.',
        link: 'https://github.com/karim1556',
    },
    {
        iconUrl: threejs,
        theme: 'btn-back-green',
        name: 'Portfolio using three js',
        description: 'Created a portfolio using three.js by exporting its various functions and everything.',
        link: 'https://github.com/karim1556',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Rental App',
        description: 'Designed and built a website for renting cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/karim1556',
    },
    // {
    //     iconUrl: snapgram,
    //     theme: 'btn-back-pink',
    //     name: 'Full Stack Instagram Clone',
    //     description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
    //     link: 'https://github.com/adrianhajdin/social_media_app',
    // },
    // {
    //     iconUrl: estate,
    //     theme: 'btn-back-black',
    //     name: 'Real-Estate Application',
    //     description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
    //     link: 'https://github.com/adrianhajdin/projects_realestate',
    // },
    // {
    //     iconUrl: summiz,
    //     theme: 'btn-back-yellow',
    //     name: 'AI Summarizer Application',
    //     description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
    //     link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    // }
];
