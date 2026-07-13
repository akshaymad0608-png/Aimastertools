const fs = require('fs');

const toolsToAdd = [
  // 4. Cloud, DevOps & Developer Tools
  {
      "id": "docker-docs",
      "name": "Docker Docs",
      "description": "Learn how to build, share, and run applications with Docker.",
      "category": "Development",
      "url": "https://docs.docker.com",
      "imageUrl": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "docs.docker.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "kubernetes-docs",
      "name": "Kubernetes Docs",
      "description": "Learn how to use Kubernetes, the open-source system for automating deployment, scaling, and management of containerized applications.",
      "category": "Development",
      "url": "https://kubernetes.io/docs",
      "imageUrl": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.7,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "kubernetes.io",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "github-skills",
      "name": "GitHub Skills",
      "description": "Learn how to use GitHub with interactive courses built right into GitHub repositories.",
      "category": "Development",
      "url": "https://skills.github.com",
      "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "skills.github.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "git-immersion",
      "name": "Git Immersion",
      "description": "A guided tour that walks through the fundamentals of Git, inspired by the premise that to know a thing is to do it.",
      "category": "Development",
      "url": "https://gitimmersion.com",
      "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "gitimmersion.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "linux-journey",
      "name": "Linux Journey",
      "description": "Learn the ways of Linux-fu, for free.",
      "category": "Development",
      "url": "https://linuxjourney.com",
      "imageUrl": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "linuxjourney.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "roadmap-sh-devops",
      "name": "Roadmap.sh DevOps",
      "description": "Step by step guide to becoming a DevOps Engineer in 2024.",
      "category": "Development",
      "url": "https://roadmap.sh/devops",
      "imageUrl": "https://images.unsplash.com/photo-1473221326025-9183b464c209?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "roadmap.sh",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "jenkins",
      "name": "Jenkins Docs",
      "description": "Learn how to use Jenkins, the leading open source automation server.",
      "category": "Development",
      "url": "https://jenkins.io/doc",
      "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.7,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "jenkins.io",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "terraform-docs",
      "name": "Terraform Docs",
      "description": "Learn how to use Terraform to provision and manage infrastructure in any cloud.",
      "category": "Development",
      "url": "https://developer.hashicorp.com/terraform",
      "imageUrl": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "developer.hashicorp.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "vercel-docs",
      "name": "Vercel Docs",
      "description": "Learn how to deploy your applications with Vercel's Frontend Cloud.",
      "category": "Development",
      "url": "https://vercel.com/docs",
      "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "vercel.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "netlify-docs",
      "name": "Netlify Docs",
      "description": "Learn how to build and deploy your sites and apps on Netlify.",
      "category": "Development",
      "url": "https://docs.netlify.com",
      "imageUrl": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "docs.netlify.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "postman-learning",
      "name": "Postman Learning Center",
      "description": "Learn how to use Postman to build, test, and document your APIs.",
      "category": "Development",
      "url": "https://learning.postman.com",
      "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "learning.postman.com",
      "brandColor": "var(--color-primary)"
  },

  // 5. Design, UI/UX & Creativity
  {
      "id": "figma-learn",
      "name": "Figma Learn",
      "description": "Explore tutorials, articles, and videos to learn how to use Figma.",
      "category": "Design",
      "url": "https://help.figma.com/hc/en-us",
      "imageUrl": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "figma.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "canva-design-school",
      "name": "Canva Design School",
      "description": "Free courses and tutorials to help you learn design, marketing, and more.",
      "category": "Design",
      "url": "https://designschool.canva.com",
      "imageUrl": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "canva.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "adobe-learn",
      "name": "Adobe Learn",
      "description": "Discover tutorials, projects, and tips to help you create your best work.",
      "category": "Design",
      "url": "https://creativecloud.adobe.com/learn",
      "imageUrl": "https://images.unsplash.com/photo-1561089489-0268a7353f09?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.7,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "adobe.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "ux-planet",
      "name": "UX Planet",
      "description": "One-stop resource for everything related to user experience.",
      "category": "Design",
      "url": "https://uxplanet.org",
      "imageUrl": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "uxplanet.org",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "learn-ui-design",
      "name": "Learn UI Design",
      "description": "The complete video course for developers, PMs, and UX designers.",
      "category": "Design",
      "url": "https://learnui.design",
      "imageUrl": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      "pricing": "Paid",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "learnui.design",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "dribbble",
      "name": "Dribbble",
      "description": "Discover the world's top designers & creatives.",
      "category": "Design",
      "url": "https://dribbble.com",
      "imageUrl": "https://images.unsplash.com/photo-1623062369620-333060fc5b2c?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "dribbble.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "behance",
      "name": "Behance",
      "description": "Showcase and discover creative work.",
      "category": "Design",
      "url": "https://behance.net",
      "imageUrl": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "behance.net",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "google-fonts-knowledge",
      "name": "Google Fonts Knowledge",
      "description": "Learn about typography from experts around the world.",
      "category": "Design",
      "url": "https://fonts.google.com/knowledge",
      "imageUrl": "https://images.unsplash.com/photo-1550792436-181701c71f63?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "fonts.google.com",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "color-hunt",
      "name": "Color Hunt",
      "description": "Color palettes for designers and artists.",
      "category": "Design",
      "url": "https://colorhunt.co",
      "imageUrl": "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.8,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "colorhunt.co",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "material-design",
      "name": "Material Design",
      "description": "Build beautiful, usable products faster. Material Design is an adaptable system of guidelines, components, and tools.",
      "category": "Design",
      "url": "https://m3.material.io",
      "imageUrl": "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "material.io",
      "brandColor": "var(--color-primary)"
  },
  {
      "id": "iconify",
      "name": "Iconify",
      "description": "Universal icon framework. One syntax for over 200k open source icons.",
      "category": "Design",
      "url": "https://iconify.design",
      "imageUrl": "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
      "pricing": "Free",
      "rating": 4.9,
      "featured": false,
      "dateAdded": new Date().toISOString(),
      "domain": "iconify.design",
      "brandColor": "var(--color-primary)"
  }
];

const fsPath = 'data/tools.ts';
let content = fs.readFileSync(fsPath, 'utf8');

// Find the end of the array
const arrayEndIndex = content.lastIndexOf('];');
if (arrayEndIndex !== -1) {
    const stringToAdd = toolsToAdd.map(tool => JSON.stringify(tool, null, 4)).join(',\n') + ',\n';
    
    // Insert before the closing bracket
    const newContent = content.slice(0, arrayEndIndex) + ',\n' + stringToAdd + content.slice(arrayEndIndex);
    fs.writeFileSync(fsPath, newContent);
    console.log(`Added ${toolsToAdd.length} tools to tools.ts`);
} else {
    console.error("Could not find the end of the MOCK_TOOLS array.");
}

