/**
 * "Earn Online" directory — real, independent websites where people find work
 * or sell what they make, grouped by category. Every entry is an editorial
 * pick with an honest one-line note; none are affiliated with AI Master Tools.
 *
 * Keep intros factual and short. Pay on most of these varies a lot by country,
 * skill and effort — the page copy says so, so individual notes stay neutral.
 */

export interface EarnSite {
  name: string;
  /** Bare domain-style URL; the UI adds https:// */
  url: string;
  intro: string;
  /** Optional short tag, e.g. a region or "No degree". */
  tag?: string;
}

export interface EarnCategory {
  /** URL-safe anchor id. */
  id: string;
  name: string;
  blurb: string;
  sites: EarnSite[];
}

export const EARN_CATEGORIES: EarnCategory[] = [
  {
    id: 'remote-jobs',
    name: 'Remote Jobs (Global)',
    blurb: 'Job boards that list only remote-friendly roles — engineering, design, support, marketing — so you can apply from anywhere.',
    sites: [
      { name: 'We Work Remotely', url: 'weworkremotely.com', intro: 'One of the largest remote-only job boards, strong in engineering, marketing and support roles.' },
      { name: 'Remote OK', url: 'remoteok.com', intro: 'Remote tech, design and marketing jobs — most listings show a salary range.' },
      { name: 'Remotive', url: 'remotive.com', intro: 'Curated remote jobs plus a community, focused on software, product and customer roles.' },
      { name: 'Working Nomads', url: 'workingnomads.com', intro: 'Hand-picked remote jobs delivered by category and email digest.' },
      { name: 'Himalayas', url: 'himalayas.app', intro: 'Remote jobs with detailed company profiles, timezones and salary transparency.' },
      { name: 'Wellfound', url: 'wellfound.com', intro: 'Startup and remote roles where you apply directly to founders (formerly AngelList Talent).' },
      { name: 'FlexJobs', url: 'flexjobs.com', intro: 'Hand-screened remote and flexible jobs; a paid membership keeps out scams.', tag: 'Paid membership' },
    ],
  },
  {
    id: 'freelance',
    name: 'Freelance Marketplaces',
    blurb: 'Clients post work or buy your services directly — the fastest way to build a paid portfolio from scratch.',
    sites: [
      { name: 'Upwork', url: 'upwork.com', intro: 'The largest general freelance marketplace — writing, development, design and admin work.' },
      { name: 'Fiverr', url: 'fiverr.com', intro: 'List fixed-price "gigs" and let buyers come to you; great for productised services.' },
      { name: 'Freelancer', url: 'freelancer.com', intro: 'Bid on projects across hundreds of categories worldwide.' },
      { name: 'Toptal', url: 'toptal.com', intro: 'Screened network for the top freelance developers, designers and finance experts.', tag: 'Screened' },
      { name: 'PeoplePerHour', url: 'peopleperhour.com', intro: 'Freelance projects and hourlies, popular across the UK and Europe.' },
      { name: 'Guru', url: 'guru.com', intro: 'Freelance work with flexible SafePay milestone payments.' },
      { name: 'Contra', url: 'contra.com', intro: 'Commission-free platform for independents to get paid directly.', tag: 'No commission' },
    ],
  },
  {
    id: 'wfh',
    name: 'Work From Home Jobs',
    blurb: 'Companies and boards hiring for home-based roles like customer support, data entry and virtual assistance.',
    sites: [
      { name: 'Rat Race Rebellion', url: 'ratracerebellion.com', intro: 'Daily hand-screened work-from-home job leads, updated every weekday.' },
      { name: 'Virtual Vocations', url: 'virtualvocations.com', intro: 'A searchable database of telecommute and home-based jobs.' },
      { name: 'Working Solutions', url: 'workingsolutions.com', intro: 'Contract work-from-home customer service and sales agent roles.' },
      { name: 'Liveops', url: 'liveops.com', intro: 'Remote virtual call-center agent opportunities.', tag: 'US' },
      { name: 'Belay', url: 'belaysolutions.com', intro: 'Hires virtual assistants, bookkeepers and social media specialists.', tag: 'US' },
      { name: 'Time Etc', url: 'timeetc.com', intro: 'Flexible virtual assistant work for experienced professionals.' },
    ],
  },
  {
    id: 'microtasks',
    name: 'Microtasks & Crowdwork',
    blurb: 'Small, repeatable online tasks — data labeling, categorization, transcription — that pay per task.',
    sites: [
      { name: 'Amazon Mechanical Turk', url: 'mturk.com', intro: 'Complete micro "HITs" like surveys, tagging and data entry for small payments.' },
      { name: 'Clickworker', url: 'clickworker.com', intro: 'Short tasks such as data entry, categorization and text creation.' },
      { name: 'Appen', url: 'appen.com', intro: 'AI-training data tasks: transcription, search evaluation and data collection.' },
      { name: 'Remotasks', url: 'remotasks.com', intro: 'Image annotation and data-labeling tasks that train AI models.' },
      { name: 'Microworkers', url: 'microworkers.com', intro: 'Small paid online tasks you can pick up anytime.' },
      { name: 'Toloka', url: 'toloka.ai', intro: 'Crowdsourced data tasks for machine-learning projects.' },
    ],
  },
  {
    id: 'surveys',
    name: 'Paid Surveys & Rewards',
    blurb: 'Share opinions or test products for points, cash or gift cards. Realistic pay — treat this as pocket money, not a salary.',
    sites: [
      { name: 'Prolific', url: 'prolific.com', intro: 'Paid academic and market research studies with fair, transparent pay.', tag: 'Fair pay' },
      { name: 'Swagbucks', url: 'swagbucks.com', intro: 'Surveys, cashback and offers redeemable for gift cards or PayPal.' },
      { name: 'Survey Junkie', url: 'surveyjunkie.com', intro: 'Take surveys for points you convert to cash or e-gift cards.' },
      { name: 'YouGov', url: 'yougov.com', intro: 'Opinion surveys on news and brands; points build toward rewards.' },
      { name: 'Toluna', url: 'toluna.com', intro: 'Surveys and product-testing panels with a points rewards system.' },
      { name: 'InboxDollars', url: 'inboxdollars.com', intro: 'Get paid for surveys, offers, games and watching videos.' },
    ],
  },
  {
    id: 'testing',
    name: 'Website & App Testing',
    blurb: 'Get paid to try websites and apps and say what confuses you — usually via short screen-and-voice recordings.',
    sites: [
      { name: 'UserTesting', url: 'usertesting.com', intro: 'Speak your thoughts aloud while testing sites and apps; one of the best-known panels.' },
      { name: 'TestingTime', url: 'testingtime.com', intro: 'Paid remote user tests and interviews scheduled to your availability.' },
      { name: 'Trymata', url: 'trymata.com', intro: 'Usability tests (formerly TryMyUI) that pay per completed test.' },
      { name: 'Userlytics', url: 'userlytics.com', intro: 'Moderated and unmoderated user tests across web and mobile.' },
      { name: 'PlaytestCloud', url: 'playtestcloud.com', intro: 'Get paid to playtest mobile games and record your feedback.' },
      { name: 'uTest', url: 'utest.com', intro: 'A QA community with paid functional, usability and localization test cycles.' },
    ],
  },
  {
    id: 'gig-work',
    name: 'Gig Work & On-Demand',
    blurb: 'App-based local work you can start quickly. Availability and pay depend heavily on your city and country.',
    sites: [
      { name: 'TaskRabbit', url: 'taskrabbit.com', intro: 'Local gigs like moving help, cleaning, furniture assembly and errands.' },
      { name: 'Uber', url: 'uber.com', intro: 'Ride-share driving with flexible hours where the service operates.', tag: 'Region-based' },
      { name: 'DoorDash', url: 'doordash.com', intro: 'Food-delivery gigs paid per delivery plus tips.', tag: 'US/CA/AU' },
      { name: 'Instacart', url: 'instacart.com', intro: 'Grocery shopping and delivery as an independent shopper.', tag: 'US/CA' },
      { name: 'Rover', url: 'rover.com', intro: 'Earn from dog walking, pet sitting and boarding.' },
      { name: 'Wonolo', url: 'wonolo.com', intro: 'On-demand shift work in warehouses, events and retail.', tag: 'US' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Selling',
    blurb: 'Sell products — physical, handmade, print-on-demand or digital — to a ready-made audience or your own store.',
    sites: [
      { name: 'Shopify', url: 'shopify.com', intro: 'Build and run your own branded online store with payments and shipping built in.' },
      { name: 'Etsy', url: 'etsy.com', intro: 'Marketplace for handmade, vintage and craft goods with built-in buyers.' },
      { name: 'Amazon Seller', url: 'sell.amazon.com', intro: "Sell to Amazon's huge customer base; FBA can handle storage and shipping." },
      { name: 'eBay', url: 'ebay.com', intro: 'Auction or fixed-price selling for new and used items worldwide.' },
      { name: 'Gumroad', url: 'gumroad.com', intro: 'Sell digital products, downloads and memberships directly to fans.', tag: 'Digital' },
      { name: 'Printful', url: 'printful.com', intro: 'Print-on-demand: your designs on products, printed and shipped per order.', tag: 'Print-on-demand' },
      { name: 'Redbubble', url: 'redbubble.com', intro: 'Upload designs and earn a margin when they sell on print-on-demand products.', tag: 'Print-on-demand' },
    ],
  },
  {
    id: 'teaching',
    name: 'Online Teaching & Tutoring',
    blurb: 'Teach a skill, subject or language — live one-on-one, or by packaging what you know into a course.',
    sites: [
      { name: 'Udemy', url: 'udemy.com', intro: 'Create and sell recorded video courses to a marketplace of millions.' },
      { name: 'Teachable', url: 'teachable.com', intro: 'Host and sell your own courses under your own brand.' },
      { name: 'Preply', url: 'preply.com', intro: 'Tutor languages and academic subjects one-on-one online.' },
      { name: 'iTalki', url: 'italki.com', intro: 'Teach languages to students around the world on your schedule.' },
      { name: 'Cambly', url: 'cambly.com', intro: 'Get paid to chat and teach English to learners.', tag: 'No degree' },
      { name: 'Outschool', url: 'outschool.com', intro: 'Teach live, small-group classes to kids on topics you love.' },
      { name: 'Skillshare', url: 'skillshare.com', intro: 'Publish creative classes and earn royalties based on watch time.' },
    ],
  },
  {
    id: 'affiliate',
    name: 'Affiliate Marketing',
    blurb: 'Earn commissions by recommending products with your unique link. Works best paired with a blog, channel or audience.',
    sites: [
      { name: 'Amazon Associates', url: 'affiliate-program.amazon.com', intro: 'Promote almost any Amazon product and earn a commission on sales.' },
      { name: 'ShareASale', url: 'shareasale.com', intro: 'Affiliate network with thousands of merchant programs to join.' },
      { name: 'CJ Affiliate', url: 'cj.com', intro: 'Large, established affiliate network used by major brands.' },
      { name: 'Impact', url: 'impact.com', intro: 'Partnership platform hosting affiliate programs for well-known companies.' },
      { name: 'ClickBank', url: 'clickbank.com', intro: 'Digital-product marketplace known for high affiliate commissions.' },
      { name: 'Awin', url: 'awin.com', intro: 'Global affiliate network with brands across many niches.' },
    ],
  },
  {
    id: 'country-jobs',
    name: 'Job Boards by Country',
    blurb: 'Major national job portals. Start here for local on-site or hybrid roles as well as remote listings.',
    sites: [
      { name: 'Indeed', url: 'indeed.com', intro: "The world's largest job search engine, available in most countries.", tag: 'Global' },
      { name: 'LinkedIn Jobs', url: 'linkedin.com/jobs', intro: 'Apply and get discovered through your professional profile and network.', tag: 'Global' },
      { name: 'Naukri', url: 'naukri.com', intro: "India's biggest job portal for both fresher and experienced roles.", tag: 'India' },
      { name: 'Apna', url: 'apna.co', intro: 'India-focused app for entry-level, blue-collar and city jobs.', tag: 'India' },
      { name: 'ZipRecruiter', url: 'ziprecruiter.com', intro: 'US job board that matches you to roles and alerts employers.', tag: 'US' },
      { name: 'Reed', url: 'reed.co.uk', intro: "One of the UK's largest job sites across most sectors.", tag: 'UK' },
      { name: 'Glassdoor', url: 'glassdoor.com', intro: 'Jobs plus company reviews and real salary data before you apply.', tag: 'Global' },
    ],
  },
  {
    id: 'writing',
    name: 'Content & Writing',
    blurb: 'Get paid to write — articles, copy, newsletters — on marketplaces or by building your own readership.',
    sites: [
      { name: 'Textbroker', url: 'textbroker.com', intro: 'Claim writing assignments and get paid per word once approved.' },
      { name: 'ProBlogger Jobs', url: 'problogger.com/jobs', intro: 'A long-running board for blogging and content-writing gigs.' },
      { name: 'Contently', url: 'contently.com', intro: 'Freelance content network that matches writers with brand work.' },
      { name: 'Medium', url: 'medium.com', intro: 'Earn from the Partner Program based on member reading time.' },
      { name: 'Substack', url: 'substack.com', intro: 'Publish a newsletter and earn from paid subscribers.' },
    ],
  },
  {
    id: 'design',
    name: 'Design & Creative',
    blurb: 'Sell design and creative services, enter contests, or get hired straight from your portfolio.',
    sites: [
      { name: '99designs', url: '99designs.com', intro: 'Win design contests or work one-on-one with clients (by Vista).' },
      { name: 'Dribbble', url: 'dribbble.com', intro: 'Showcase work and find design jobs and freelance clients.' },
      { name: 'Behance', url: 'behance.net', intro: "Adobe's portfolio network with a job board for creatives." },
      { name: 'DesignCrowd', url: 'designcrowd.com', intro: 'Crowdsourced design projects across logos, web and print.' },
    ],
  },
  {
    id: 'stock-media',
    name: 'Sell Stock Photos & Media',
    blurb: 'Upload photos, video, illustrations or music once and earn royalties each time they are licensed.',
    sites: [
      { name: 'Shutterstock Contributor', url: 'submit.shutterstock.com', intro: 'Earn royalties when your photos, video and vectors are downloaded.' },
      { name: 'Adobe Stock', url: 'contributor.stock.adobe.com', intro: "Sell your images and video to Adobe's creative customers." },
      { name: 'iStock by Getty', url: 'istock.com', intro: "Contribute photos and video to Getty's stock marketplace." },
      { name: 'Alamy', url: 'alamy.com', intro: 'Stock photo library with contributor-friendly commission terms.' },
      { name: 'Pond5', url: 'pond5.com', intro: 'Marketplace focused on stock video, music and sound effects.' },
    ],
  },
];

export const EARN_SITE_COUNT = EARN_CATEGORIES.reduce((n, c) => n + c.sites.length, 0);
export const EARN_CATEGORY_COUNT = EARN_CATEGORIES.length;
