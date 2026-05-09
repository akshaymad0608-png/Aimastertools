export function getToolLogo(name: string, url: string): string {
  const n = name.toLowerCase();
  
  if (n.includes('chatgpt')) return 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg';
  if (n.includes('midjourney')) return 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png';
  if (n.includes('hitpaw')) return 'https://camo.githubusercontent.com/deab63b65fa31be7a13d7195d88f6aedfdbf0a0fd042e47c1a8aa679c1bc3d2e/68747470733a2f2f7777772e6869747061772e636f6d2f696d616765732f636f6d6d6f6e2f6c6f676f2f6869747061772d6c6f676f2e737667';
  if (n.includes('powerpoint')) return 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg';
  if (n.includes('runway')) return 'https://avatars.githubusercontent.com/u/41566952?v=4';
  if (n.includes('grammarly')) return 'https://upload.wikimedia.org/wikipedia/commons/2/24/Grammarly_logo.svg';
  if (n.includes('canva')) return 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg';
  if (n.includes('zapier')) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOB24JtJqE5TjG3tX7zM-wL3JqJv5yZzZ9zw&s';
  if (n.includes('deepseek')) return 'https://avatars.githubusercontent.com/u/148330874?v=4';
  if (n.includes('ideogram')) return 'https://ideogram.ai/assets/apple-touch-icon.png';
  if (n.includes('lightpdf')) return 'https://lightpdf.com/favicon.ico';
  if (n.includes('google slides') || n.includes('slides')) return 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Google_Slides_logo_%282020%29.svg';
  if (n.includes('pika')) return 'https://pika.art/favicon.png';
  if (n.includes('prowritingaid')) return 'https://prowritingaid.com/favicon.png'; // fallback handled later if 404
  if (n.includes('microsoft designer')) return 'https://upload.wikimedia.org/wikipedia/commons/2/21/Microsoft_Designer_logo.svg';
  if (n.includes('bardeen')) return 'https://assets-global.website-files.com/60959a4be2162534a6efb08d/609d575fae8fa655bf51cd31_Bardeen_Logo_Symbol_Blue.svg';
  
  if (n.includes('crewai')) return 'https://avatars.githubusercontent.com/u/154674061?v=4';
  if (n.includes('notion')) return 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png';
  if (n.includes('perplexity')) return 'https://avatars.githubusercontent.com/u/111002341?v=4';
  if (n.includes('meta')) return 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg';
  if (n.includes('anthropic') || n.includes('claude')) return 'https://upload.wikimedia.org/wikipedia/commons/1/14/Anthropic.png';
  if (n.includes('github')) return 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg';
  
  // Default to clearbit
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return `https://logo.clearbit.com/${domain}`;
  } catch (e) {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=e2e8f0&textColor=475569`;
  }
}
