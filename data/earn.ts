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
      { name: 'Jobspresso', url: 'jobspresso.co', intro: 'Curated remote jobs in tech, marketing and customer support.' },
      { name: 'Dynamite Jobs', url: 'dynamitejobs.com', intro: 'Remote jobs from vetted companies, with a focus on lasting roles.' },
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
    id: 'ai-data',
    name: 'AI Training & Data Labeling',
    blurb: 'Get paid to train and evaluate AI models — writing, rating and correcting responses. Often the best-paying tasks in this list for skilled people.',
    sites: [
      { name: 'Outlier', url: 'outlier.ai', intro: 'Train AI by writing, reviewing and rating responses in your area of expertise.', tag: 'Higher pay' },
      { name: 'DataAnnotation', url: 'dataannotation.tech', intro: 'Complete AI-training tasks like rating and correcting model responses.' },
      { name: 'Alignerr', url: 'alignerr.com', intro: 'Get paid to train frontier AI models; specialists earn more.' },
      { name: 'Mindrift', url: 'mindrift.ai', intro: 'Freelance AI-training projects for specialists across many domains.' },
      { name: 'Surge AI', url: 'surgehq.ai', intro: 'Human-feedback and data-labeling projects for AI research teams.' },
      { name: 'Labelbox', url: 'labelbox.com', intro: 'Data-labeling platform used by machine-learning teams.' },
    ],
  },
  {
    id: 'transcription',
    name: 'Transcription & Captioning',
    blurb: 'Turn audio and video into text — transcription, captions and subtitles — usually paid per audio minute.',
    sites: [
      { name: 'Rev', url: 'rev.com', intro: 'Transcription, captioning and subtitling work paid per audio minute.' },
      { name: 'GoTranscript', url: 'gotranscript.com', intro: 'Transcribe and caption audio from home with weekly payouts.' },
      { name: 'TranscribeMe', url: 'transcribeme.com', intro: 'Short audio transcription tasks with a beginner-friendly workflow.' },
      { name: 'Scribie', url: 'scribie.com', intro: 'Audio-to-text transcription jobs paid per completed file.' },
      { name: 'CastingWords', url: 'castingwords.com', intro: 'Pick transcription jobs from a queue and get paid per task.' },
      { name: 'Happy Scribe', url: 'happyscribe.com', intro: 'Freelance transcribers and subtitlers across many languages.' },
    ],
  },
  {
    id: 'translation',
    name: 'Translation & Localization',
    blurb: 'Translate or post-edit text between languages. Being fluent in two languages is the main requirement.',
    sites: [
      { name: 'Gengo', url: 'gengo.com', intro: 'Translate short texts across language pairs, paid per word.' },
      { name: 'Unbabel', url: 'unbabel.com', intro: 'Post-edit AI translations as a language specialist.' },
      { name: 'Stepes', url: 'stepes.com', intro: 'On-demand translation work from your phone or desktop.' },
      { name: 'TextMaster', url: 'textmaster.com', intro: 'Professional translation and copywriting projects.' },
      { name: 'ProZ', url: 'proz.com', intro: 'The largest network and job board for professional translators.' },
      { name: 'Smartcat', url: 'smartcat.com', intro: 'Marketplace connecting translators with clients and CAT tools.' },
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
  {
    id: 'print-on-demand',
    name: 'Print on Demand',
    blurb: 'Upload a design once and earn a margin every time it sells on a product — no inventory, no shipping to handle.',
    sites: [
      { name: 'Printify', url: 'printify.com', intro: 'Design products and sell via your store; Printify handles printing and shipping.' },
      { name: 'Merch by Amazon', url: 'merch.amazon.com', intro: 'Upload T-shirt and apparel designs and earn royalties on Amazon sales.' },
      { name: 'TeePublic', url: 'teepublic.com', intro: 'Sell your designs on apparel and accessories with no upfront cost.' },
      { name: 'Society6', url: 'society6.com', intro: 'Put your art on home decor and lifestyle products.' },
      { name: 'Zazzle', url: 'zazzle.com', intro: 'Design and sell customizable products across a huge catalog.' },
      { name: 'Gelato', url: 'gelato.com', intro: 'Global print-on-demand with local production in many countries.' },
    ],
  },
  {
    id: 'dev-gigs',
    name: 'Bug Bounties & Dev Gigs',
    blurb: 'For developers and security folks — find vulnerabilities for bounties, or land vetted remote coding contracts.',
    sites: [
      { name: 'HackerOne', url: 'hackerone.com', intro: 'Report security vulnerabilities to companies and earn bug bounties.' },
      { name: 'Bugcrowd', url: 'bugcrowd.com', intro: 'Crowdsourced security testing with paid bounties for valid bugs.' },
      { name: 'Codementor', url: 'codementor.io', intro: 'Get paid to mentor developers or take freelance coding jobs.' },
      { name: 'Arc.dev', url: 'arc.dev', intro: 'Remote developer jobs and contracts with vetted companies.' },
      { name: 'Turing', url: 'turing.com', intro: 'Match with remote software roles at US companies after vetting.' },
      { name: 'Gun.io', url: 'gun.io', intro: 'Freelance platform for experienced software engineers.' },
    ],
  },
  {
    id: 'tutoring',
    name: 'Tutoring & Homework Help',
    blurb: 'Help students one-on-one or answer academic questions. Good if you know a school or college subject well.',
    sites: [
      { name: 'Wyzant', url: 'wyzant.com', intro: 'Set your own rate and tutor students one-on-one, online or in person.' },
      { name: 'Tutor.com', url: 'tutor.com', intro: 'Join an on-demand platform that matches you with students to tutor.' },
      { name: 'Studypool', url: 'studypool.com', intro: 'Answer academic questions and help with assignments for pay.' },
      { name: 'Varsity Tutors', url: 'varsitytutors.com', intro: 'Tutor a wide range of subjects and test prep online.' },
      { name: 'Skooli', url: 'skooli.com', intro: 'Online tutoring platform for school and college subjects.' },
      { name: 'Chegg', url: 'chegg.com', intro: 'Answer student questions and provide step-by-step help as an expert.' },
    ],
  },
  {
    id: 'voice-over',
    name: 'Voice-Over & Audio',
    blurb: 'Get paid for your voice — ads, narration, e-learning, audiobooks and characters.',
    sites: [
      { name: 'Voices.com', url: 'voices.com', intro: 'Audition for voice-over jobs — ads, narration, e-learning and more.' },
      { name: 'Voice123', url: 'voice123.com', intro: 'Voice-acting marketplace connecting talent with clients.' },
      { name: 'Bunny Studio', url: 'bunnystudio.com', intro: 'Voice-over, writing and audio gigs delivered as managed projects.' },
      { name: 'ACX', url: 'acx.com', intro: 'Narrate audiobooks for royalties or per-finished-hour rates.' },
      { name: 'Backstage', url: 'backstage.com', intro: 'Casting calls for voice, acting and creative gigs.' },
    ],
  },
  {
    id: 'creators',
    name: 'Creators & Fan Support',
    blurb: 'Build an audience and earn from it directly — memberships, tips, subscriptions and ad revenue.',
    sites: [
      { name: 'Patreon', url: 'patreon.com', intro: 'Earn recurring income from fans through monthly memberships.' },
      { name: 'Ko-fi', url: 'ko-fi.com', intro: 'Accept tips, memberships and shop sales with no fee on tips.' },
      { name: 'Buy Me a Coffee', url: 'buymeacoffee.com', intro: 'Let supporters tip you or subscribe for extras.' },
      { name: 'YouTube', url: 'youtube.com', intro: 'Earn from ads, memberships and Super Thanks via the Partner Program.' },
      { name: 'Twitch', url: 'twitch.tv', intro: 'Live-stream and earn from subscriptions, bits and ads.' },
      { name: 'Podia', url: 'podia.com', intro: 'Sell courses, digital downloads, memberships and webinars in one place.' },
    ],
  },
  {
    id: 'rent-out',
    name: 'Rent Out What You Own',
    blurb: 'Turn things you already own — a spare room, car, storage or gear — into income. Availability varies by country.',
    sites: [
      { name: 'Airbnb', url: 'airbnb.com', intro: 'Rent out a room, home or experience to travelers.' },
      { name: 'Turo', url: 'turo.com', intro: 'List your car for rent and earn when it is booked.', tag: 'Region-based' },
      { name: 'Getaround', url: 'getaround.com', intro: 'Share your car by the hour or day through the app.', tag: 'Region-based' },
      { name: 'Neighbor', url: 'neighbor.com', intro: 'Rent out unused storage space — garage, driveway or basement.', tag: 'US' },
      { name: 'Fat Llama', url: 'fatllama.com', intro: 'Rent out cameras, tools, gadgets and gear to people nearby.' },
      { name: 'Spacer', url: 'spacer.com', intro: 'Rent out parking and storage space to people who need it.' },
    ],
  },
  {
    id: 'cashback',
    name: 'Cashback & Rewards Apps',
    blurb: 'Earn a little back on spending you already do. Not a real income — think of it as money-off rather than earnings.',
    sites: [
      { name: 'Rakuten', url: 'rakuten.com', intro: 'Earn cashback when you shop through its links and app.' },
      { name: 'Ibotta', url: 'ibotta.com', intro: 'Cashback on groceries and everyday purchases via receipt scans.' },
      { name: 'Fetch', url: 'fetch.com', intro: 'Scan any receipt to earn points toward gift cards.' },
      { name: 'Upside', url: 'upside.com', intro: 'Cashback on gas, groceries and dining.', tag: 'US' },
      { name: 'Capital One Shopping', url: 'capitaloneshopping.com', intro: 'Automatic coupons and rewards when you shop online.' },
    ],
  },
];

export const EARN_SITE_COUNT = EARN_CATEGORIES.reduce((n, c) => n + c.sites.length, 0);
export const EARN_CATEGORY_COUNT = EARN_CATEGORIES.length;
