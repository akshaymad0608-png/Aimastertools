const fs = require('fs');

const file = 'pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import for CategoryCard
content = content.replace(
  "import ToolCard from '../components/ToolCard';", 
  "import ToolCard from '../components/ToolCard';\nimport { CategoryCard } from '../components/CategoryCard';"
);

const newCatList = `const HOME_CATEGORIES = [
  { id: "AI Writing & Content", name: "AI Writing & Content", icon: "✍️", bg: "#EEEDFE" },
  { id: "Image & Art Generation", name: "Image & Art Generation", icon: "🎨", bg: "#E6F1FB" },
  { id: "Code & Development", name: "Code & Development", icon: "💻", bg: "#EAF3DE" },
  { id: "Video & Audio Tools", name: "Video & Audio Tools", icon: "🎬", bg: "#FAEEDA" },
  { id: "AI Chatbots & Assistants", name: "AI Chatbots & Assistants", icon: "🤖", bg: "#E1F5EE" },
  { id: "Marketing & SEO", name: "Marketing & SEO", icon: "📣", bg: "#FBEAF0" },
  { id: "Productivity & Automation", name: "Productivity & Automation", icon: "⚡", bg: "#FAECE7" },
  { id: "Research & Analysis", name: "Research & Analysis", icon: "🔍", bg: "#F1EFE8" },
  { id: "UI/UX & Design Tools", name: "UI/UX & Design Tools", icon: "🖌️", bg: "#EEEDFE" },
  { id: "Business & Finance AI", name: "Business & Finance AI", icon: "💼", bg: "#E6F1FB" },
  { id: "Learning & Education", name: "Learning & Education", icon: "📚", bg: "#EAF3DE" },
  { id: "AI Agents & Automation", name: "AI Agents & Automation", icon: "🧠", bg: "#FAEEDA" }
];`;

content = content.replace("const VoiceSearch = React.lazy(() => import('../components/VoiceSearch'));", "const VoiceSearch = React.lazy(() => import('../components/VoiceSearch'));\n\n" + newCatList);

const replacementSection = `{/* Layout Content: Categories Sidebar and Tools List */}
      <section id="content" className="py-12 md:py-16 relative bg-white">
        <div className="container-custom max-w-[1300px] mx-auto">
          
          {/* Horizontal Category Cards */}
          <div className="mb-10 w-full overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
             <div className="flex gap-4 min-w-max">
                 <CategoryCard
                   name="All Categories"
                   icon="✨"
                   bg="#f8f9fa"
                   count={MOCK_TOOLS.length}
                   isSelected={selectedCategory === 'All'}
                   onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                 />
                 {HOME_CATEGORIES.map(cat => {
                   const matchedCat = CATEGORIES.find(c => c.id === cat.id);
                   const count = matchedCat ? matchedCat.count : 0;
                   return (
                     <CategoryCard
                       key={cat.id}
                       name={cat.name}
                       icon={cat.icon}
                       bg={cat.bg}
                       count={count}
                       isSelected={selectedCategory === cat.id}
                       onClick={() => handleCategoryClick(cat.id)}
                     />
                   );
                 })}
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Area - Tools List */}
            <div className="flex-1 flex flex-col min-w-0">`;

content = content.replace(/\{\/\* Layout Content\: Categories Sidebar and Tools List \*\/\}.*\{\/\* Main Area - Tools List \*\/\}\s*<div className="flex-1 flex flex-col min-w-0">/s, replacementSection);

fs.writeFileSync(file, content);
console.log("Updated Home.tsx");
