import { Tool } from '../types';

const _MOCK_TOOLS: Tool[] = [
    {
        "id": "manychat-automation",
        "name": "ManyChat",
        "description": "Automate interactive conversations in Instagram Direct Messages, Facebook Messenger, and SMS to grow your brand.",
        "category": "Social Media Automation",
        "url": "https://manychat.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-06T20:33:47.958Z",
        "domain": "manychat.com",
        "brandColor": "#0084FF"
    },
    {
        "id": "metricool-automation",
        "name": "Metricool",
        "description": "The Swiss army knife for social media professionals. Analyze, manage, and grow your digital presence.",
        "category": "Social Media Automation",
        "url": "https://metricool.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-02T13:39:06.451Z",
        "domain": "metricool.com",
        "brandColor": "#FF5252"
    },
    {
        "id": "buffer-automation",
        "name": "Buffer",
        "description": "The most intuitive, affordable, and authentic way to reach more people on social media.",
        "category": "Social Media Automation",
        "url": "https://buffer.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-18T15:39:19.818Z",
        "domain": "buffer.com",
        "brandColor": "#2C4BFF"
    },
    {
        "id": "publer-automation",
        "name": "Publer",
        "description": "Collaborate, schedule & analyze your posts for Facebook, Instagram, TikTok, Twitter, LinkedIn, Pinterest, Google Business, YouTube.",
        "category": "Social Media Automation",
        "url": "https://publer.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-05T06:04:52.282Z",
        "domain": "publer.io",
        "brandColor": "#08A05C"
    },
    {
        "id": "socialbee-automation",
        "name": "SocialBee",
        "description": "Social media management tool for businesses, agencies, and entrepreneurs. Create, schedule, and post.",
        "category": "Social Media Automation",
        "url": "https://socialbee.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-15T21:34:09.115Z",
        "domain": "socialbee.com",
        "brandColor": "#FFD200"
    },
    {
        "id": "zapier-automation",
        "name": "Zapier",
        "description": "Connect your apps and automate workflows. Easy automation for busy people.",
        "category": "Workflow Automation",
        "url": "https://zapier.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-02-13T02:28:59.933Z",
        "domain": "zapier.com",
        "brandColor": "#FF4A00"
    },
    {
        "id": "make-automation",
        "name": "Make",
        "description": "Make allows you to visually create, build and automate workflows. Unbounded possibilities.",
        "category": "Workflow Automation",
        "url": "https://make.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-03-17T04:13:02.221Z",
        "domain": "make.com",
        "brandColor": "#7B1FA2"
    },
    {
        "id": "n8n-automation",
        "name": "n8n",
        "description": "Free and open node-based Workflow Automation Tool. Easily automate tasks across different services.",
        "category": "Workflow Automation",
        "url": "https://n8n.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-27T23:42:50.927Z",
        "domain": "n8n.io",
        "brandColor": "#FF6D5A"
    },
    {
        "id": "pabbly-connect-automation",
        "name": "Pabbly Connect",
        "description": "Automate all your integrations and tasks. Best alternative to Zapier.",
        "category": "Workflow Automation",
        "url": "https://pabbly.com/connect",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-30T12:33:59.854Z",
        "domain": "pabbly.com",
        "brandColor": "#1A73E8"
    },
    {
        "id": "ifttt-automation",
        "name": "IFTTT",
        "description": "Get all your apps and devices talking to each other. Do more with the services you love.",
        "category": "Workflow Automation",
        "url": "https://ifttt.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-05T10:43:48.408Z",
        "domain": "ifttt.com",
        "brandColor": "#000000"
    },
    {
        "id": "mailchimp-automation",
        "name": "Mailchimp",
        "description": "Marketing automation platform and email marketing service for businesses.",
        "category": "Email Automation",
        "url": "https://mailchimp.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-27T22:28:10.849Z",
        "domain": "mailchimp.com",
        "brandColor": "#FFE01B"
    },
    {
        "id": "brevo-automation",
        "name": "Brevo",
        "description": "Send email, SMS, and WhatsApp campaigns. Marketing automation platform.",
        "category": "Email Automation",
        "url": "https://brevo.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-23T16:30:18.879Z",
        "domain": "brevo.com",
        "brandColor": "#0092FF"
    },
    {
        "id": "activecampaign-automation",
        "name": "ActiveCampaign",
        "description": "Customer Experience Automation platform combining email marketing, marketing automation, CRM.",
        "category": "Email Automation",
        "url": "https://activecampaign.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-06-09T19:56:13.666Z",
        "domain": "activecampaign.com",
        "brandColor": "#356AE6"
    },
    {
        "id": "kit-automation",
        "name": "Kit",
        "description": "The go-to marketing hub for creators that helps you grow and monetize your audience with ease.",
        "category": "Email Automation",
        "url": "https://kit.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-28T13:13:49.600Z",
        "domain": "kit.com",
        "brandColor": "#FF5C5C"
    },
    {
        "id": "mailerlite-automation",
        "name": "MailerLite",
        "description": "Create advanced email marketing campaigns with features like automation, landing pages, and surveys.",
        "category": "Email Automation",
        "url": "https://mailerlite.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-01T14:18:37.251Z",
        "domain": "mailerlite.com",
        "brandColor": "#00A235"
    },
    {
        "id": "wati-automation",
        "name": "WATI",
        "description": "WhatsApp Business API platform built for customer support, marketing, and sales.",
        "category": "WhatsApp Automation",
        "url": "https://wati.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-05T01:07:43.664Z",
        "domain": "wati.io",
        "brandColor": "#00E676"
    },
    {
        "id": "aisensy-automation",
        "name": "AiSensy",
        "description": "Complete WhatsApp Marketing platform built on Official WhatsApp Business API.",
        "category": "WhatsApp Automation",
        "url": "https://aisensy.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-14T13:32:38.484Z",
        "domain": "aisensy.com",
        "brandColor": "#1A73E8"
    },
    {
        "id": "interakt-automation",
        "name": "Interakt",
        "description": "WhatsApp Business API solution for SMBs. Best for e-commerce, retail and D2C brands.",
        "category": "WhatsApp Automation",
        "url": "https://interakt.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-23T07:01:55.954Z",
        "domain": "interakt.ai",
        "brandColor": "#FF5252"
    },
    {
        "id": "gallabox-automation",
        "name": "Gallabox",
        "description": "Conversational commerce platform for WhatsApp, helping businesses sell better.",
        "category": "WhatsApp Automation",
        "url": "https://gallabox.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-23T04:34:48.755Z",
        "domain": "gallabox.com",
        "brandColor": "#00B0FF"
    },
    {
        "id": "zoko-automation",
        "name": "Zoko",
        "description": "Central hub for all your WhatsApp communication. Great for scaling sales and support.",
        "category": "WhatsApp Automation",
        "url": "https://zoko.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-26T22:09:28.803Z",
        "domain": "zoko.io",
        "brandColor": "#00C853"
    },
    {
        "id": "apollo-automation",
        "name": "Apollo",
        "description": "Sales intelligence and engagement platform to find buyers, connect, and close.",
        "category": "Lead Generation Automation",
        "url": "https://apollo.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-02-05T02:03:47.982Z",
        "domain": "apollo.io",
        "brandColor": "#FFD600"
    },
    {
        "id": "clay-automation",
        "name": "Clay",
        "description": "Automate data enrichment, personalize outreach, and build automated lead generation workflows.",
        "category": "Lead Generation Automation",
        "url": "https://clay.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-02-02T08:19:26.110Z",
        "domain": "clay.com",
        "brandColor": "#333333"
    },
    {
        "id": "phantombuster-automation",
        "name": "Phantombuster",
        "description": "Automate any action on LinkedIn, Twitter, Instagram, Google Maps, and more to generate leads.",
        "category": "Lead Generation Automation",
        "url": "https://phantombuster.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-20T06:03:41.862Z",
        "domain": "phantombuster.com",
        "brandColor": "#4C2BDB"
    },
    {
        "id": "lemlist-automation",
        "name": "Lemlist",
        "description": "Advanced cold email software for lead generation. Personalize cold emails & automate follow-ups.",
        "category": "Lead Generation Automation",
        "url": "https://lemlist.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-27T14:22:18.428Z",
        "domain": "lemlist.com",
        "brandColor": "#F92C5B"
    },
    {
        "id": "dripify-automation",
        "name": "Dripify",
        "description": "Advanced LinkedIn automation tool for lead generation. Build sales funnels and close more deals.",
        "category": "Lead Generation Automation",
        "url": "https://dripify.io",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-14T02:46:25.055Z",
        "domain": "dripify.io",
        "brandColor": "#185ABC"
    },
    {
        "id": "hubspot-automation",
        "name": "HubSpot",
        "description": "Inbound marketing, sales, and service software. Automate your entire customer journey.",
        "category": "CRM Automation",
        "url": "https://hubspot.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-02-27T05:08:25.042Z",
        "domain": "hubspot.com",
        "brandColor": "#FF7A59"
    },
    {
        "id": "zoho-crm-automation",
        "name": "Zoho CRM",
        "description": "Top-rated sales CRM software by customers globally. Automate tasks and close deals faster.",
        "category": "CRM Automation",
        "url": "https://zoho.com/crm",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-18T23:53:31.165Z",
        "domain": "zoho.com",
        "brandColor": "#F0483E"
    },
    {
        "id": "pipedrive-automation",
        "name": "Pipedrive",
        "description": "Sales CRM & pipeline management software. Designed by salespeople for salespeople.",
        "category": "CRM Automation",
        "url": "https://pipedrive.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-28T00:49:12.135Z",
        "domain": "pipedrive.com",
        "brandColor": "#00A15D"
    },
    {
        "id": "freshsales-automation",
        "name": "Freshsales",
        "description": "Sales CRM with built-in phone and email. Automate sales processes and find the right leads.",
        "category": "CRM Automation",
        "url": "https://freshworks.com/freshsales-crm",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-16T16:04:24.161Z",
        "domain": "freshworks.com",
        "brandColor": "#02B875"
    },
    {
        "id": "salesforce-automation",
        "name": "Salesforce",
        "description": "The world’s #1 customer relationship management (CRM) platform. Advanced enterprise automation.",
        "category": "CRM Automation",
        "url": "https://salesforce.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-01-15T23:57:17.678Z",
        "domain": "salesforce.com",
        "brandColor": "#00A1E0"
    },
    {
        "id": "calendly-automation",
        "name": "Calendly",
        "description": "Automated scheduling software to simplify booking appointments, interviews, and meetings.",
        "category": "Productivity Automation",
        "url": "https://calendly.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-03-25T16:12:21.301Z",
        "domain": "calendly.com",
        "brandColor": "#006BFF"
    },
    {
        "id": "motion-automation",
        "name": "Motion",
        "description": "AI-powered calendar and project manager. Automatically plans your day and builds your schedule.",
        "category": "Productivity Automation",
        "url": "https://usemotion.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-25T22:04:00.846Z",
        "domain": "usemotion.com",
        "brandColor": "#000000"
    },
    {
        "id": "reclaim-ai-automation",
        "name": "Reclaim AI",
        "description": "Smart calendar assistant that automatically blocks time for tasks, routines, and breaks.",
        "category": "Productivity Automation",
        "url": "https://reclaim.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-06T11:18:54.181Z",
        "domain": "reclaim.ai",
        "brandColor": "#E24A4A"
    },
    {
        "id": "fireflies-ai-automation",
        "name": "Fireflies AI",
        "description": "AI meeting assistant that transcribes, summarizes, and analyzes your voice conversations.",
        "category": "Productivity Automation",
        "url": "https://fireflies.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-21T15:11:29.848Z",
        "domain": "fireflies.ai",
        "brandColor": "#FF3366"
    },
    {
        "id": "otter-ai-automation",
        "name": "Otter AI",
        "description": "Automated meeting notes. Records audio, writes notes, captures slides, and generates summaries.",
        "category": "Productivity Automation",
        "url": "https://otter.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-30T05:16:31.392Z",
        "domain": "otter.ai",
        "brandColor": "#2196F3"
    },
    {
        "id": "google-search-console",
        "name": "Google Search Console",
        "description": "Measure your site's search traffic and performance, fix issues, and make your site shine in Google Search results.",
        "category": "Google",
        "url": "https://search.google.com/search-console",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-06-26T02:37:47.424Z",
        "domain": "search.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "SEO",
            "Organic Growth"
        ]
    },
    {
        "id": "google-trends",
        "name": "Google Trends",
        "description": "Explore how Google data can be used to tell stories. Analyze search volume and trends globally.",
        "category": "Google",
        "url": "https://trends.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-05T21:26:08.715Z",
        "domain": "trends.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "SEO",
            "Organic Growth"
        ]
    },
    {
        "id": "google-keyword-planner",
        "name": "Google Keyword Planner",
        "description": "Find the right keywords to target for display ads, search ads, video ads, and app ads.",
        "category": "Google",
        "url": "https://ads.google.com/home/tools/keyword-planner/",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-13T04:14:59.656Z",
        "domain": "ads.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "SEO",
            "Organic Growth"
        ]
    },
    {
        "id": "google-business-profile",
        "name": "Google Business Profile",
        "description": "Manage your online presence across Google, including Search and Maps, to reach local customers.",
        "category": "Google",
        "url": "https://business.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-22T22:27:14.800Z",
        "domain": "business.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "SEO",
            "Organic Growth"
        ]
    },
    {
        "id": "google-alerts",
        "name": "Google Alerts",
        "description": "Monitor the web for interesting new content based on your custom search queries.",
        "category": "Google",
        "url": "https://www.google.com/alerts",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-07T05:08:07.251Z",
        "domain": "google.com",
        "brandColor": "#4285F4",
        "tags": [
            "SEO",
            "Organic Growth"
        ]
    },
    {
        "id": "google-analytics-4",
        "name": "Google Analytics 4 (GA4)",
        "description": "Measure your advertising ROI as well as track your Flash, video, and social networking sites and applications.",
        "category": "Google",
        "url": "https://analytics.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-06-07T08:31:06.480Z",
        "domain": "analytics.google.com",
        "brandColor": "#F4B400",
        "tags": [
            "Analytics",
            "Tracking"
        ]
    },
    {
        "id": "google-tag-manager",
        "name": "Google Tag Manager",
        "description": "Manage all your website tags without editing code. Simple, reliable, easily integrated tag management solutions.",
        "category": "Google",
        "url": "https://tagmanager.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-19T02:30:16.166Z",
        "domain": "tagmanager.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Analytics",
            "Tracking"
        ]
    },
    {
        "id": "looker-studio",
        "name": "Looker Studio",
        "description": "Unlock the power of your data with interactive dashboards and engaging reports that inspire smarter business decisions.",
        "category": "Google",
        "url": "https://lookerstudio.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-12T03:59:25.945Z",
        "domain": "lookerstudio.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Analytics",
            "Tracking"
        ]
    },
    {
        "id": "campaign-url-builder",
        "name": "Campaign URL Builder",
        "description": "Easily add campaign parameters to URLs so you can track Custom Campaigns in Google Analytics.",
        "category": "Google",
        "url": "https://ga-dev-tools.google/campaign-url-builder/",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-02T12:41:17.135Z",
        "domain": "ga-dev-tools.google",
        "brandColor": "#4285F4",
        "tags": [
            "Analytics",
            "Tracking"
        ]
    },
    {
        "id": "google-analytics-demo",
        "name": "Google Analytics Demo Account",
        "description": "Access the Google Analytics demo account to experiment with real business data.",
        "category": "Google",
        "url": "https://support.google.com/analytics/answer/6367342",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-19T13:56:11.856Z",
        "domain": "support.google.com",
        "brandColor": "#F4B400",
        "tags": [
            "Analytics",
            "Tracking"
        ]
    },
    {
        "id": "google-ads",
        "name": "Google Ads",
        "description": "Get in front of customers when they're searching for businesses like yours on Google Search and Maps.",
        "category": "Google",
        "url": "https://ads.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-03-08T19:20:07.708Z",
        "domain": "ads.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Paid Marketing"
        ]
    },
    {
        "id": "google-ads-editor",
        "name": "Google Ads Editor",
        "description": "Download your campaigns to make bulk changes offline, then upload them directly to Google Ads.",
        "category": "Google",
        "url": "https://ads.google.com/home/tools/ads-editor/",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-06T19:02:18.617Z",
        "domain": "ads.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Paid Marketing"
        ]
    },
    {
        "id": "performance-planner",
        "name": "Performance Planner",
        "description": "Create plans for your advertising spend and see how changes to campaigns might affect key metrics.",
        "category": "Google",
        "url": "https://support.google.com/google-ads/answer/94228",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-05T19:51:16.399Z",
        "domain": "support.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Paid Marketing"
        ]
    },
    {
        "id": "google-merchant-center",
        "name": "Google Merchant Center",
        "description": "Upload your store and product data to Google and make it available for Shopping ads and other Google services.",
        "category": "Google",
        "url": "https://merchants.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-18T22:13:07.273Z",
        "domain": "merchants.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Paid Marketing"
        ]
    },
    {
        "id": "ads-transparency-center",
        "name": "Ads Transparency Center",
        "description": "A searchable hub of verified advertisers and all the ads they are running across Google's platforms.",
        "category": "Google",
        "url": "https://adstransparency.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-15T23:10:06.972Z",
        "domain": "adstransparency.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Paid Marketing"
        ]
    },
    {
        "id": "google-gemini",
        "name": "Google Gemini",
        "description": "Google's most capable AI model yet. Built to be multimodal from the ground up.",
        "category": "Google",
        "url": "https://gemini.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-02-10T11:03:58.146Z",
        "domain": "gemini.google.com",
        "brandColor": "#0F9D58",
        "tags": [
            "AI",
            "Productivity"
        ]
    },
    {
        "id": "notebooklm",
        "name": "NotebookLM",
        "description": "An AI-first notebook, grounded in your own documents, to help you gain insights and synthesize information.",
        "category": "Google",
        "url": "https://notebooklm.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-03-04T04:50:19.222Z",
        "domain": "notebooklm.google.com",
        "brandColor": "#0F9D58",
        "tags": [
            "AI",
            "Productivity"
        ]
    },
    {
        "id": "google-ai-studio",
        "name": "Google AI Studio",
        "description": "The fastest way to start building with Gemini. Prototype and launch generative AI applications.",
        "category": "Google",
        "url": "https://aistudio.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-06-20T17:13:11.852Z",
        "domain": "aistudio.google.com",
        "brandColor": "#0F9D58",
        "tags": [
            "AI",
            "Productivity"
        ]
    },
    {
        "id": "google-vids",
        "name": "Google Vids",
        "description": "An AI-powered video creation app for Google Workspace, designed to help you create compelling video presentations.",
        "category": "Google",
        "url": "https://workspace.google.com/products/vids/",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-26T20:38:18.450Z",
        "domain": "workspace.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "AI",
            "Productivity"
        ]
    },
    {
        "id": "google-workspace",
        "name": "Google Workspace",
        "description": "Seamlessly integrates messaging, meetings, docs, and tasks—all built with trusted Google security and AI.",
        "category": "Google",
        "url": "https://workspace.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-06-03T22:34:18.408Z",
        "domain": "workspace.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Productivity"
        ]
    },
    {
        "id": "think-with-google",
        "name": "Think with Google",
        "description": "Uncover marketing insights, research, and trends to stay ahead of the curve and grow your business.",
        "category": "Google",
        "url": "https://www.thinkwithgoogle.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-11T14:47:35.005Z",
        "domain": "thinkwithgoogle.com",
        "brandColor": "#4285F4",
        "tags": [
            "Marketing Resources"
        ]
    },
    {
        "id": "grow-with-google",
        "name": "Grow with Google",
        "description": "Free training, tools, and events to help you grow your skills, career, or business.",
        "category": "Google",
        "url": "https://grow.google",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-28T13:28:49.463Z",
        "domain": "grow.google",
        "brandColor": "#4285F4",
        "tags": [
            "Marketing Resources"
        ]
    },
    {
        "id": "google-fonts",
        "name": "Google Fonts",
        "description": "Making the web more beautiful, fast, and open through great typography and iconography.",
        "category": "Google",
        "url": "https://fonts.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-04-02T08:53:24.831Z",
        "domain": "fonts.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Marketing Resources"
        ]
    },
    {
        "id": "google-sites",
        "name": "Google Sites",
        "description": "Effortlessly create impactful team sites. No programming or design skills required.",
        "category": "Google",
        "url": "https://sites.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-20T01:26:45.748Z",
        "domain": "sites.google.com",
        "brandColor": "#4285F4",
        "tags": [
            "Marketing Resources"
        ]
    },
    {
        "id": "google-maps-platform",
        "name": "Google Maps Platform",
        "description": "Build custom, agile experiences that bring the real world to your users with static and dynamic maps, Street View imagery, and 360° views.",
        "category": "Google",
        "url": "https://mapsplatform.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-25T17:42:10.741Z",
        "domain": "mapsplatform.google.com",
        "brandColor": "#34A853",
        "tags": [
            "Marketing Resources",
            "Development"
        ]
    },
    {
        "id": "eightfold-ai",
        "name": "Eightfold AI",
        "description": "Talent intelligence platform to hire and retain talent using AI.",
        "category": "HR & Recruiting",
        "url": "https://eightfold.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-22T09:14:44.932Z",
        "domain": "eightfold.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "lumalabs-ai",
        "name": "Luma AI",
        "description": "Create photorealistic 3D assets and environments using AI.",
        "category": "3D & Animation",
        "url": "https://lumalabs.ai",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-01-18T02:32:51.120Z",
        "domain": "lumalabs.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "julius-ai",
        "name": "Julius AI",
        "description": "Your AI data analyst. Chat with your data and create visualizations.",
        "category": "Data Science & Analytics",
        "url": "https://julius.ai",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-02-13T05:37:00.443Z",
        "domain": "julius.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "harvey-ai",
        "name": "Harvey",
        "description": "Custom LLM solutions for elite law firms.",
        "category": "Legal & Compliance",
        "url": "https://harvey.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-28T10:41:57.220Z",
        "domain": "harvey.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "inworld-ai",
        "name": "Inworld",
        "description": "Platform for creating AI-driven non-player characters for games.",
        "category": "Gaming & Entertainment",
        "url": "https://inworld.ai",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-02-13T21:33:53.589Z",
        "domain": "inworld.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "realty-ai",
        "name": "Realty AI",
        "description": "AI tool for real estate agents to generate property listings and insights.",
        "category": "AI Real Estate Tools",
        "url": "https://realty.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-03-04T03:10:31.075Z",
        "domain": "realty.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "shopify-magic",
        "name": "Shopify Magic",
        "description": "AI capabilities built into Shopify for merchants to generate product descriptions.",
        "category": "AI Ecommerce Tools",
        "url": "https://shopify.com/magic",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-09T03:39:33.201Z",
        "domain": "shopify.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "monica-ai",
        "name": "Monica",
        "description": "Your AI copilot Chrome extension powered by GPT-4 and Claude.",
        "category": "AI Chrome Extensions",
        "url": "https://monica.im",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-07-11T20:44:44.997Z",
        "domain": "monica.im",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "zapier-ai",
        "name": "Zapier AI",
        "description": "Automate your workflows by connecting apps with AI-powered natural language.",
        "category": "AI Workflow Automation",
        "url": "https://zapier.com/ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-01-20T23:16:27.441Z",
        "domain": "zapier.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "jasper-ai",
        "name": "Jasper",
        "description": "AI writing assistant for marketing copy, blog posts, and more.",
        "category": "AI Writing & Content",
        "url": "https://jasper.ai",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-05-08T23:56:31.050Z",
        "domain": "jasper.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "surfer-seo",
        "name": "Surfer SEO",
        "description": "AI SEO tool that analyzes SERPs to help you write optimized content.",
        "category": "Marketing & SEO",
        "url": "https://surferseo.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-07T09:07:13.168Z",
        "domain": "surferseo.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "voiceflow",
        "name": "Voiceflow",
        "description": "Build scalable AI agents and chatbots collaboratively.",
        "category": "Chatbot Creator Tools",
        "url": "https://voiceflow.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-05-18T03:21:55.598Z",
        "domain": "voiceflow.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "intercom-fin",
        "name": "Intercom Fin",
        "description": "AI customer service bot that resolves issues using your support history.",
        "category": "Customer Support",
        "url": "https://intercom.com/fin",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-07T15:29:12.363Z",
        "domain": "intercom.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "elicit-ai",
        "name": "Elicit",
        "description": "The AI research assistant that helps you find and analyze academic papers.",
        "category": "Research & Analysis",
        "url": "https://elicit.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-03-23T05:11:26.875Z",
        "domain": "elicit.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "pika-labs",
        "name": "Pika",
        "description": "An idea-to-video platform that brings your creativity to motion.",
        "category": "Gen AI Creator Tools",
        "url": "https://pika.art",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-25T18:01:47.832Z",
        "domain": "pika.art",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "galileo-ai",
        "name": "Galileo AI",
        "description": "Generates UI designs from simple text prompts.",
        "category": "UI/UX & Design Tools",
        "url": "https://usegalileo.ai",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-18T22:47:15.263Z",
        "domain": "usegalileo.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "alpha-sense",
        "name": "AlphaSense",
        "description": "Market intelligence and search platform powered by AI.",
        "category": "Business & Finance AI",
        "url": "https://alpha-sense.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-13T06:08:59.562Z",
        "domain": "alpha-sense.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "khanmigo",
        "name": "Khanmigo",
        "description": "AI guide for teachers and students from Khan Academy.",
        "category": "Learning & Education",
        "url": "https://khanacademy.org/khanmigo",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-05-10T05:41:01.213Z",
        "domain": "khanacademy.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "auto-gpt",
        "name": "AutoGPT",
        "description": "An experimental open-source attempt to make GPT-4 fully autonomous.",
        "category": "AI Agents & Automation",
        "url": "https://autogpt.net",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-01-25T11:27:35.906Z",
        "domain": "autogpt.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openai-api",
        "name": "OpenAI API",
        "description": "Access cutting-edge models like GPT-4, DALL-E, and Whisper.",
        "category": "LLM Providers & APIs",
        "url": "https://platform.openai.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-03-12T06:03:58.996Z",
        "domain": "platform.openai.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "claude-3-5",
        "name": "Claude 3.5 Sonnet",
        "description": "Anthropic's latest AI model for fast and intelligent text generation and coding.",
        "category": "AI Chatbots & Assistants",
        "url": "https://claude.ai",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-02-14T07:03:34.060Z",
        "domain": "claude.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "perplexity-ai-search",
        "name": "Perplexity AI",
        "description": "AI-powered answer engine that searches the web to provide real-time, cited answers.",
        "category": "AI Search Engines",
        "url": "https://perplexity.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-07-13T15:50:36.566Z",
        "domain": "perplexity.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "midjourney-v7",
        "name": "Midjourney",
        "description": "Advanced AI image generation tool running via Discord for high-quality art.",
        "category": "Image & Art Generation",
        "url": "https://midjourney.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-04-22T03:52:02.634Z",
        "domain": "midjourney.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "github-copilot-x",
        "name": "GitHub Copilot",
        "description": "AI pair programmer that suggests code completions inside your IDE.",
        "category": "Code & Development",
        "url": "https://github.com/features/copilot",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-04-06T02:24:53.959Z",
        "domain": "github.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "runway-gen3",
        "name": "Runway Gen-3",
        "description": "Next-generation text-to-video and image-to-video generation model.",
        "category": "Video & Audio Tools",
        "url": "https://runwayml.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-07-05T20:00:11.750Z",
        "domain": "runwayml.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "elevenlabs-voice",
        "name": "ElevenLabs",
        "description": "Realistic text-to-speech and voice cloning platform with immense emotion range.",
        "category": "Voice & Audio AI",
        "url": "https://elevenlabs.io",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-06-07T07:56:37.639Z",
        "domain": "elevenlabs.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "tome-presentations",
        "name": "Tome",
        "description": "AI-powered storytelling format to generate presentations and outlines.",
        "category": "AI Presentation Tools",
        "url": "https://tome.app",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-13T10:40:50.852Z",
        "domain": "tome.app",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "otter-ai",
        "name": "Otter.ai",
        "description": "AI meeting assistant that records, transcribes, and summarizes meetings.",
        "category": "AI Meeting Assistants",
        "url": "https://otter.ai",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-04-28T05:38:02.248Z",
        "domain": "otter.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "chatpdf-plus",
        "name": "ChatPDF",
        "description": "Talk to any PDF document using AI. Great for students and researchers.",
        "category": "AI PDF & Document Tools",
        "url": "https://chatpdf.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-20T12:04:39.293Z",
        "domain": "chatpdf.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "superhuman-ai",
        "name": "Superhuman AI",
        "description": "Blazing fast email client with built-in AI for drafting and summarizing emails.",
        "category": "AI Email Assistants",
        "url": "https://superhuman.com",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-17T09:16:51.591Z",
        "domain": "superhuman.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "kickresume-ai",
        "name": "Kickresume",
        "description": "AI resume builder with templates and auto-generated bullet points.",
        "category": "AI Resume & Career Tools",
        "url": "https://kickresume.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-19T22:36:36.239Z",
        "domain": "kickresume.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "framer-ai",
        "name": "Framer AI",
        "description": "Design and publish stunning websites with AI generation.",
        "category": "AI Website Builders",
        "url": "https://framer.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-04-19T19:28:55.326Z",
        "domain": "framer.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "taplio-ai",
        "name": "Taplio",
        "description": "AI-powered LinkedIn tool for growing your personal brand.",
        "category": "AI Social Media Tools",
        "url": "https://taplio.com",
        "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-02-26T13:51:15.815Z",
        "domain": "taplio.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "darktrace-ai",
        "name": "Darktrace",
        "description": "Cybersecurity AI that detects and responds to cyber threats in real-time.",
        "category": "AI Cybersecurity Tools",
        "url": "https://darktrace.com",
        "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-18T23:34:56.012Z",
        "domain": "darktrace.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "glass-health",
        "name": "Glass Health",
        "description": "AI-assisted diagnosis and clinical knowledge management for doctors.",
        "category": "AI Healthcare Tools",
        "url": "https://glass.health",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-01-17T10:34:38.132Z",
        "domain": "glass.health",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "chatgpt",
        "name": "ChatGPT",
        "description": "OpenAI's advanced conversational assistant capable of answering questions, writing essays, coding, and multi-modal searches.",
        "longDescription": "Comprehensive review of ChatGPT, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://chatgpt.com",
        "domain": "chatgpt.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-07-08T08:47:22.613Z",
        "tags": [
            "Chatbot",
            "Conversational",
            "Assistant"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "claude",
        "name": "Claude",
        "description": "Anthropic's state-of-the-art assistant, renowned for deep logical analysis, creative writing, and high-quality coding assistance.",
        "longDescription": "Comprehensive review of Claude, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://claude.ai",
        "domain": "claude.ai",
        "brandColor": "#D97706",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-07-06T05:52:24.311Z",
        "tags": [
            "LLM",
            "Coding",
            "Writing"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "gemini",
        "name": "Google Gemini",
        "description": "Google's multi-modal AI assistant integrated deeply with search and Google Workspace. Exceptionally fast and precise.",
        "longDescription": "Comprehensive review of Google Gemini, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Google",
        "url": "https://gemini.google.com",
        "domain": "google.com",
        "brandColor": "#1A73E8",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-03-25T16:40:20.183Z",
        "tags": [
            "Multi-modal",
            "Search",
            "Google"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "copilot",
        "name": "Microsoft Copilot",
        "description": "Your everyday AI assistant built into Windows, Edge, and Microsoft Office, powered by state-of-the-art OpenAI models.",
        "longDescription": "Comprehensive review of Microsoft Copilot, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://copilot.microsoft.com",
        "domain": "microsoft.com",
        "brandColor": "#00A4EF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-21T22:04:46.655Z",
        "tags": [
            "Windows",
            "Office",
            "Search"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "perplexity-assistant",
        "name": "Perplexity AI",
        "description": "An intelligent conversational research assistant that synthesizes web information with immediate citation sourcing.",
        "longDescription": "Comprehensive review of Perplexity AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://perplexity.ai",
        "domain": "perplexity.ai",
        "brandColor": "#00A389",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-11T08:30:09.723Z",
        "tags": [
            "Search",
            "Research",
            "Citations"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "grok",
        "name": "Grok",
        "description": "A conversational bot developed by xAI, with real-time access to the X platform, offering humorous and up-to-date responses.",
        "longDescription": "Comprehensive review of Grok, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://grok.com",
        "domain": "grok.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-09T11:58:01.906Z",
        "tags": [
            "Realtime",
            "X",
            "Social"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "meta-ai",
        "name": "Meta AI",
        "description": "Meta's helpful assistant powered by Llama models, integrated natively across WhatsApp, Instagram, Facebook, and Messenger.",
        "longDescription": "Comprehensive review of Meta AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://meta.ai",
        "domain": "meta.ai",
        "brandColor": "#0668E1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-23T16:28:01.389Z",
        "tags": [
            "Social",
            "Llama",
            "Meta"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "poe",
        "name": "Poe",
        "description": "Quora's centralized hub for querying top LLM models, permitting users to build custom-guided conversational agents.",
        "longDescription": "Comprehensive review of Poe, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://poe.com",
        "domain": "poe.com",
        "brandColor": "#AE1A1A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-22T08:19:35.337Z",
        "tags": [
            "Aggregator",
            "Chatbots",
            "Custom Bots"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "you-ai",
        "name": "You.com AI",
        "description": "Personalized AI assistant and search agent that empowers developers and researchers with multi-modal tools.",
        "longDescription": "Comprehensive review of You.com AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://you.com",
        "domain": "you.com",
        "brandColor": "#0072FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-23T22:13:30.813Z",
        "tags": [
            "Search",
            "Chatbot",
            "Coding"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "character-ai",
        "name": "Character AI",
        "description": "An immersive platform allowing users to design and chat with detailed custom-developed virtual personas.",
        "longDescription": "Comprehensive review of Character AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://character.ai",
        "domain": "character.ai",
        "brandColor": "#F6AE2D",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-13T11:30:10.715Z",
        "tags": [
            "Chatbot",
            "Entertainment",
            "Roleplay"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "pi-ai",
        "name": "Pi AI",
        "description": "A supportive, highly empathetic companion designed by Inflection AI for deep advice and warm dialogue.",
        "longDescription": "Comprehensive review of Pi AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://pi.ai",
        "domain": "pi.ai",
        "brandColor": "#2A9D8F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-24T14:11:03.528Z",
        "tags": [
            "Personal Assistant",
            "Therapy",
            "Conversational"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mistral-le-chat",
        "name": "Mistral Le Chat",
        "description": "The user-friendly gateway to Mistral AI's bleeding-edge open weights models, designed and built in Europe.",
        "longDescription": "Comprehensive review of Mistral Le Chat, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2024, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://chat.mistral.ai",
        "domain": "mistral.ai",
        "brandColor": "#FF601C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-02-22T05:14:01.149Z",
        "tags": [
            "Mistral",
            "Paris",
            "Assistant"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "huggingchat",
        "name": "HuggingChat",
        "description": "The premier open-source workspace for interacting with advanced community-driven chat models.",
        "longDescription": "Comprehensive review of HuggingChat, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://huggingface.co",
        "domain": "huggingface.co",
        "brandColor": "#FFD21E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-10T06:19:13.983Z",
        "tags": [
            "Open Source",
            "Llama",
            "HuggingFace"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "phind",
        "name": "Phind",
        "description": "The search engine for software developers, providing fast answers to complicated syntax and repository queries.",
        "longDescription": "Comprehensive review of Phind, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://phind.com",
        "domain": "phind.com",
        "brandColor": "#2B5C8F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-06T18:55:24.315Z",
        "tags": [
            "Search",
            "Programming",
            "Cody"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "deepseek-chat",
        "name": "DeepSeek Chat",
        "description": "Outstanding, ultra-cheap chat and coder assistant utilizing DeepSeek's powerful Mixture-of-Experts architecture.",
        "longDescription": "Comprehensive review of DeepSeek Chat, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://deepseek.com",
        "domain": "deepseek.com",
        "brandColor": "#0047BB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-04T00:23:59.123Z",
        "tags": [
            "DeepSeek",
            "Coding",
            "Mathematics"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "kimi-ai",
        "name": "Kimi AI",
        "description": "Moonshot AI's model with phenomenal long-context windows, perfect for reading massive financial manuals.",
        "longDescription": "Comprehensive review of Kimi AI, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://kimi.ai",
        "domain": "kimi.ai",
        "brandColor": "#23AC38",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-11T12:41:37.302Z",
        "tags": [
            "Moonshot",
            "Long Context",
            "Doc Summarizer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "qwen-chat",
        "name": "Qwen Chat",
        "description": "Alibaba's advanced bilingual chat assistant, leading open rankings on mathematics and reasoning challenges.",
        "longDescription": "Comprehensive review of Qwen Chat, including features, user experience, and key performance reviews in AI Chatbots & Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chatbots & Assistants",
        "url": "https://tongyi.aliyun.com",
        "domain": "aliyun.com",
        "brandColor": "#8E44AD",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-20T08:40:45.558Z",
        "tags": [
            "Alibaba",
            "Qwen",
            "Bilingual"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chatbots & Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "github-copilot",
        "name": "GitHub Copilot",
        "description": "The world's most widely adopted AI programmer, delivering custom in-line suggestions directly in VS Code.",
        "longDescription": "Comprehensive review of GitHub Copilot, including features, user experience, and key performance reviews in Code & Development. Built in 2021, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://github.com",
        "domain": "github.com",
        "brandColor": "#24292F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-13T02:39:06.308Z",
        "tags": [
            "Coding",
            "IDE",
            "Autopilot"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "cursor",
        "name": "Cursor",
        "description": "An AI-first code editor designed for team pair-programming. Edit, test, and write huge repositories cleanly.",
        "longDescription": "Comprehensive review of Cursor, including features, user experience, and key performance reviews in Code & Development. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://cursor.com",
        "domain": "cursor.com",
        "brandColor": "#0A0A0A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-06-24T23:44:15.847Z",
        "tags": [
            "IDE",
            "Coding",
            "Autopilot"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "windsurf",
        "name": "Windsurf",
        "description": "The first agentic IDE, orchestrating file editing, terminal execution, and context mapping in absolute unison.",
        "longDescription": "Comprehensive review of Windsurf, including features, user experience, and key performance reviews in Code & Development. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://codeium.com",
        "domain": "codeium.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-15T20:38:17.192Z",
        "tags": [
            "IDE",
            "Agentic",
            "Flow"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "replit-ai",
        "name": "Replit AI",
        "description": "Interactive AI coding companion built directly inside the cloud-hosted Replit software workspace.",
        "longDescription": "Comprehensive review of Replit AI, including features, user experience, and key performance reviews in Code & Development. Built in 2022, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://replit.com",
        "domain": "replit.com",
        "brandColor": "#FF6C37",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-23T13:22:44.732Z",
        "tags": [
            "In-browser",
            "Cloud IDE",
            "Coding"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "bolt-new",
        "name": "Bolt.new",
        "description": "Deploy full-stack web environments in browser using WebContainers. Perfect for prototyping instantly.",
        "longDescription": "Comprehensive review of Bolt.new, including features, user experience, and key performance reviews in Code & Development. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://bolt.new",
        "domain": "bolt.new",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-28T07:10:56.612Z",
        "tags": [
            "Stackblitz",
            "Web Containers",
            "App Builder"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "lovable-code",
        "name": "Lovable",
        "description": "Construct production-ready web apps starting with human text descriptions. Translates thoughts into pristine React code.",
        "longDescription": "Comprehensive review of Lovable, including features, user experience, and key performance reviews in Code & Development. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://lovable.dev",
        "domain": "lovable.dev",
        "brandColor": "#E0218A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-02T08:30:11.706Z",
        "tags": [
            "Frontend",
            "AI Developer",
            "React"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "v0-vercel",
        "name": "v0 by Vercel",
        "description": "Vercel's visual frontend designer. Feed it screenshots or ideas and receive clean, copyable Tailwind UI.",
        "longDescription": "Comprehensive review of v0 by Vercel, including features, user experience, and key performance reviews in Code & Development. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://v0.dev",
        "domain": "vercel.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-03-21T00:31:34.628Z",
        "tags": [
            "UI",
            "Tailwind",
            "Shadcn"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "claude-code",
        "name": "Claude Code",
        "description": "Anthropic's interactive command-line tool, authorizing Claude to review local repositories and compile changes.",
        "longDescription": "Comprehensive review of Claude Code, including features, user experience, and key performance reviews in Code & Development. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://anthropic.com",
        "domain": "anthropic.com",
        "brandColor": "#D97706",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-16T22:42:36.899Z",
        "tags": [
            "CLI",
            "Agent",
            "Coding"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "openai-codex",
        "name": "OpenAI Codex",
        "description": "OpenAI's legendary translating engine, converting natural human text commands into highly complex software APIs.",
        "longDescription": "Comprehensive review of OpenAI Codex, including features, user experience, and key performance reviews in Code & Development. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://openai.com",
        "domain": "openai.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-30T08:13:28.318Z",
        "tags": [
            "API",
            "Models",
            "Code Translation"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "tabnine",
        "name": "Tabnine",
        "description": "Privacy-conscious AI autocomplete adapter. Securely trained exclusively on fully validated permissive open repositories.",
        "longDescription": "Comprehensive review of Tabnine, including features, user experience, and key performance reviews in Code & Development. Built in 2018, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://tabnine.com",
        "domain": "tabnine.com",
        "brandColor": "#4900F5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-06T16:36:19.879Z",
        "tags": [
            "Autocomplete",
            "Privacy",
            "Self-hosted"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "codeium",
        "name": "Codeium",
        "description": "Ultra-fast free code completion engine integrated seamlessly inside over 40 popular software editors.",
        "longDescription": "Comprehensive review of Codeium, including features, user experience, and key performance reviews in Code & Development. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://codeium.com",
        "domain": "codeium.com",
        "brandColor": "#09B3AF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-31T12:23:36.731Z",
        "tags": [
            "Free",
            "Autocomplete",
            "Multi-Language"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "sourcegraph-cody",
        "name": "Sourcegraph Cody",
        "description": "Feature-rich assistant leveraging huge contextual maps to answer system queries across massive business repositories.",
        "longDescription": "Comprehensive review of Sourcegraph Cody, including features, user experience, and key performance reviews in Code & Development. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://sourcegraph.com",
        "domain": "sourcegraph.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-30T17:30:20.546Z",
        "tags": [
            "Code Search",
            "Enterprise",
            "Cody"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "devin",
        "name": "Devin AI",
        "description": "Cognition's fully autonomous AI software developer capable of executing full terminal commands and fixing server bugs.",
        "longDescription": "Comprehensive review of Devin AI, including features, user experience, and key performance reviews in Code & Development. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://cognition.ai",
        "domain": "cognition.ai",
        "brandColor": "#0550E1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-09T01:12:12.101Z",
        "tags": [
            "Software Engineer",
            "Autonomous",
            "Agent"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "amazon-q",
        "name": "Amazon Q Developer",
        "description": "Generative AI partner embedded in the AWS environment, giving exact hints on cloud infrastructure operations.",
        "longDescription": "Comprehensive review of Amazon Q Developer, including features, user experience, and key performance reviews in Code & Development. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://aws.amazon.com",
        "domain": "aws.amazon.com",
        "brandColor": "#FF9900",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-06T07:24:07.416Z",
        "tags": [
            "AWS",
            "Cloud",
            "Developer Companion"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mutable-ai",
        "name": "Mutable AI",
        "description": "Automatically refactors codebase architecture and exports pristine, synchronized documentation manuals.",
        "longDescription": "Comprehensive review of Mutable AI, including features, user experience, and key performance reviews in Code & Development. Built in 2022, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://mutable.ai",
        "domain": "mutable.ai",
        "brandColor": "#11C7D5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-07-09T19:25:10.684Z",
        "tags": [
            "Documentation",
            "Refactoring",
            "Python"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "coderabbit",
        "name": "CodeRabbit",
        "description": "Your proactive AI pull request reviewer, reducing manual engineering check times down to minutes.",
        "longDescription": "Comprehensive review of CodeRabbit, including features, user experience, and key performance reviews in Code & Development. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Code & Development",
        "url": "https://coderabbit.ai",
        "domain": "coderabbit.ai",
        "brandColor": "#FA4D2A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-24T20:42:42.115Z",
        "tags": [
            "Pull Request",
            "Reviewer",
            "GitHub"
        ],
        "useCases": [
            "Accelerating workflows in standard Code & Development business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "lovable",
        "name": "Lovable",
        "description": "Full-scale companion that turns complex ideas into fully deployed web applications in standard React and Tailwind.",
        "longDescription": "Comprehensive review of Lovable, including features, user experience, and key performance reviews in AI App Builders. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://lovable.dev",
        "domain": "lovable.dev",
        "brandColor": "#E0218A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-03-11T08:48:27.358Z",
        "tags": [
            "Frontend",
            "AI Developer",
            "React"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "bolt-new-builder",
        "name": "Bolt.new",
        "description": "Instantly create and preview full-stack Node.js environments directly on the web using natural prompts.",
        "longDescription": "Comprehensive review of Bolt.new, including features, user experience, and key performance reviews in AI App Builders. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://bolt.new",
        "domain": "bolt.new",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-06T13:07:19.226Z",
        "tags": [
            "Development",
            "App Builder",
            "Stackblitz"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "replit",
        "name": "Replit",
        "description": "Write, host, and launch dynamic web apps instantly from a cooperative in-browser container workspace.",
        "longDescription": "Comprehensive review of Replit, including features, user experience, and key performance reviews in AI App Builders. Built in 2016, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://replit.com",
        "domain": "replit.com",
        "brandColor": "#FF6C37",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-02-05T23:11:31.759Z",
        "tags": [
            "Cloud IDE",
            "Server Hosting",
            "Workspace"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "bubble-ai",
        "name": "Bubble AI",
        "description": "The power of Bubble's massive visual programming editor, now supercharged with prompt-driven AI builders.",
        "longDescription": "Comprehensive review of Bubble AI, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://bubble.io",
        "domain": "bubble.io",
        "brandColor": "#0040FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-20T00:59:42.057Z",
        "tags": [
            "No-Code",
            "Database",
            "Workflows"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "flutterflow-ai",
        "name": "FlutterFlow AI",
        "description": "Generate complete native cross-platform mobile programs with Flutter code directly from descriptions.",
        "longDescription": "Comprehensive review of FlutterFlow AI, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://flutterflow.io",
        "domain": "flutterflow.io",
        "brandColor": "#4B39EF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-25T18:36:22.126Z",
        "tags": [
            "Mobile Apps",
            "Flutter",
            "iOS & Android"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "softr-ai",
        "name": "Softr AI",
        "description": "Convert your workspace sheets and Airtable databases into gorgeous member portals in seconds.",
        "longDescription": "Comprehensive review of Softr AI, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://softr.io",
        "domain": "softr.io",
        "brandColor": "#00E0A6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-30T02:06:43.271Z",
        "tags": [
            "Airtable",
            "No-code Client Portal",
            "Web app"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "builder-io",
        "name": "Builder.io",
        "description": "A headless CMS and design interpreter that translates design layouts into fully functional react/vue blocks.",
        "longDescription": "Comprehensive review of Builder.io, including features, user experience, and key performance reviews in AI App Builders. Built in 2018, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://builder.io",
        "domain": "builder.io",
        "brandColor": "#1B2A4A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-07T20:26:42.365Z",
        "tags": [
            "Headless CMS",
            "Figma to Code",
            "Visual Editor"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "framer-ai",
        "name": "Framer AI",
        "description": "Design highly responsive and beautifully animated marketing websites quickly with Framer's smart layout engine.",
        "longDescription": "Comprehensive review of Framer AI, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "UI/UX & Design Tools",
        "url": "https://framer.com",
        "domain": "framer.com",
        "brandColor": "#0055FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-25T12:55:02.416Z",
        "tags": [
            "Web Design",
            "Interactive",
            "Animations"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "durable-ai-builder",
        "name": "Durable AI",
        "description": "Generate complete business platforms containing customized copy, contact forms, and scheduling in 30 seconds.",
        "longDescription": "Comprehensive review of Durable AI, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://durable.co",
        "domain": "durable.co",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-24T03:14:22.018Z",
        "tags": [
            "Startups",
            "Service Businesses",
            "Instant Website"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "create-xyz",
        "name": "Create.xyz",
        "description": "A high-fidelity prompt sandbox that instantly spins up functioning database tables, integrations and layouts.",
        "longDescription": "Comprehensive review of Create.xyz, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://create.xyz",
        "domain": "create.xyz",
        "brandColor": "#FC3F92",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-29T02:31:27.531Z",
        "tags": [
            "React",
            "No-code Database",
            "Embeds"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "tempo-labs",
        "name": "Tempo Labs",
        "description": "An intelligent designer specialized in directly parsing and editing raw React source files dynamically.",
        "longDescription": "Comprehensive review of Tempo Labs, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://tempolabs.ai",
        "domain": "tempolabs.ai",
        "brandColor": "#1E1E2F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-30T17:38:45.838Z",
        "tags": [
            "React UI Designer",
            "Figma",
            "Tailwind"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "softgen",
        "name": "Softgen",
        "description": "A startup-friendly application incubator that scaffolds SaaS modules like payments, profiles, and databases.",
        "longDescription": "Comprehensive review of Softgen, including features, user experience, and key performance reviews in AI App Builders. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://softgen.ai",
        "domain": "softgen.ai",
        "brandColor": "#E11D48",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-23T16:37:13.289Z",
        "tags": [
            "SaaS Boilerplate",
            "No-code SaaS",
            "App Builder"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "base44",
        "name": "Base44",
        "description": "A backend-centric workspace to quickly structure, map, and output scalable JSON endpoints.",
        "longDescription": "Comprehensive review of Base44, including features, user experience, and key performance reviews in AI App Builders. Built in 2024, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI App Builders",
        "url": "https://base44.co",
        "domain": "base44.co",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-22T10:52:49.223Z",
        "tags": [
            "Backend",
            "Workflow Database",
            "APIs"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "uizard",
        "name": "Uizard",
        "description": "Design high-fidelity smartphone prototype apps instantly from sketches and doodles.",
        "longDescription": "Comprehensive review of Uizard, including features, user experience, and key performance reviews in AI App Builders. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "UI/UX & Design Tools",
        "url": "https://uizard.io",
        "domain": "uizard.io",
        "brandColor": "#00C39C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-11T21:10:42.306Z",
        "tags": [
            "UX/UI wireframe",
            "Figma converter",
            "Mockup design"
        ],
        "useCases": [
            "Accelerating workflows in standard AI App Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "midjourney",
        "name": "Midjourney",
        "description": "The gold standard for generative imagery, producing breathtaking, artistic visuals inside user Discord servers.",
        "longDescription": "Comprehensive review of Midjourney, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://midjourney.com",
        "domain": "midjourney.com",
        "brandColor": "#1982FC",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-01-26T22:00:03.428Z",
        "tags": [
            "Generative Art",
            "Illustration",
            "Cooperative Canvas"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "dalle",
        "name": "DALL-E",
        "description": "OpenAI's masterful photo-generator, producing highly accurate, photorealistic results directly from text cues.",
        "longDescription": "Comprehensive review of DALL-E, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://openai.com",
        "domain": "openai.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-17T05:06:26.557Z",
        "tags": [
            "OpenAI",
            "Image Creator",
            "Outpainting"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "adobe-firefly",
        "name": "Adobe Firefly",
        "description": "Safe corporate-trained media generator integrated directly inside Adobe Illustrator and Photoshop frameworks.",
        "longDescription": "Comprehensive review of Adobe Firefly, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://firefly.adobe.com",
        "domain": "adobe.com",
        "brandColor": "#FA0F00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-01T21:58:47.699Z",
        "tags": [
            "Photoshop",
            "Commercial Safe",
            "Generative Fill"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "leonardo-ai",
        "name": "Leonardo AI",
        "description": "A comprehensive design control center featuring customizable model fine-tunes and live canvas painting.",
        "longDescription": "Comprehensive review of Leonardo AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://leonardo.ai",
        "domain": "leonardo.ai",
        "brandColor": "#6A0DAD",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-26T10:05:49.582Z",
        "tags": [
            "Gaming assets",
            "Realtime generation",
            "Fine-tuning"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "stable-diffusion",
        "name": "Stable Diffusion",
        "description": "The ultimate open source text-to-image foundation model engine, powering deep visual fine-tuning setups.",
        "longDescription": "Comprehensive review of Stable Diffusion, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://stability.ai",
        "domain": "stability.ai",
        "brandColor": "#3F0FF8",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-07T01:26:19.692Z",
        "tags": [
            "Open Source",
            "Stability",
            "ControlNet"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "flux-ai",
        "name": "Flux AI",
        "description": "The sensational open-weight photo-generator by Black Forest Labs, rendering photoreal fingers and text.",
        "longDescription": "Comprehensive review of Flux AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://blackforestlabs.ai",
        "domain": "blackforestlabs.ai",
        "brandColor": "#0B0C10",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-04T01:58:57.599Z",
        "tags": [
            "Photorealism",
            "Black Forest",
            "Typography"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "ideogram",
        "name": "Ideogram",
        "description": "The top tool for rendering sharp and readable text overlayed perfectly inside customized graphics.",
        "longDescription": "Comprehensive review of Ideogram, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://ideogram.ai",
        "domain": "ideogram.ai",
        "brandColor": "#252B33",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-19T13:29:09.558Z",
        "tags": [
            "Typography",
            "Logo Text",
            "Visual Layouts"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "krea-ai",
        "name": "Krea AI",
        "description": "Interactive painting utility that regenerates visual outcomes instantly while adjusting layout blocks.",
        "longDescription": "Comprehensive review of Krea AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://krea.ai",
        "domain": "krea.ai",
        "brandColor": "#050505",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-04T23:11:46.946Z",
        "tags": [
            "Realtime Editor",
            "Image Upscaler",
            "Interactive Painting"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "playground-ai",
        "name": "Playground AI",
        "description": "An expansive virtual graphic workspace that integrates multiple diffusion variants into single canvas blocks.",
        "longDescription": "Comprehensive review of Playground AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2022, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://playground.com",
        "domain": "playground.com",
        "brandColor": "#E22765",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-20T22:02:49.199Z",
        "tags": [
            "Image editor",
            "Canvas",
            "Mixed assets"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "canva-ai",
        "name": "Canva AI",
        "description": "Canva's Magic Studio suite, making graphic layout and social asset generation simple for marketing teams.",
        "longDescription": "Comprehensive review of Canva AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://canva.com",
        "domain": "canva.com",
        "brandColor": "#00C4CC",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-19T20:24:42.720Z",
        "tags": [
            "Presentations",
            "Business graphics",
            "Magic Design"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "freepik-ai",
        "name": "Freepik AI",
        "description": "Generates royalty-free vectors, professional PSD mockups, and high-quality stock illustrations.",
        "longDescription": "Comprehensive review of Freepik AI, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://freepik.com",
        "domain": "freepik.com",
        "brandColor": "#0D2240",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-12T22:11:09.256Z",
        "tags": [
            "Vector generator",
            "Stock Mockups",
            "Photo tools"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "bing-image-creator",
        "name": "Bing Image Creator",
        "description": "Microsoft's user-friendly playground, powered by OpenAI's DALL-E 3 engine within search dashboards.",
        "longDescription": "Comprehensive review of Bing Image Creator, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://bing.com",
        "domain": "bing.com",
        "brandColor": "#005EAC",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-22T04:39:35.422Z",
        "tags": [
            "Copilot Image",
            "DALL-E 3",
            "Microsoft Search"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "nightcafe",
        "name": "NightCafe",
        "description": "A vibrant social art community that organizes daily render tournaments and multiplayer collaborative challenges.",
        "longDescription": "Comprehensive review of NightCafe, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2019, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://nightcafe.studio",
        "domain": "nightcafe.studio",
        "brandColor": "#1F0443",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-04-04T14:56:16.605Z",
        "tags": [
            "Art Community",
            "SDXL",
            "Daily Challenges"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "lexica",
        "name": "Lexica",
        "description": "An absolute visual encyclopedia for high-fidelity prompt searching across millions of indexed images.",
        "longDescription": "Comprehensive review of Lexica, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2022, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://lexica.art",
        "domain": "lexica.art",
        "brandColor": "#E090F1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-19T21:32:14.563Z",
        "tags": [
            "Stable Diffusion search",
            "Aesthetic prompts",
            "Aperture model"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "dreamstudio",
        "name": "DreamStudio",
        "description": "Stability AI's official control panel, supporting prompt weights, negative terms, and custom dimensions.",
        "longDescription": "Comprehensive review of DreamStudio, including features, user experience, and key performance reviews in Image & Art Generation. Built in 2022, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Image & Art Generation",
        "url": "https://dreamstudio.ai",
        "domain": "dreamstudio.ai",
        "brandColor": "#FF3B30",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Usage Based",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-26T21:27:49.987Z",
        "tags": [
            "Stability API",
            "Image editor",
            "Advanced variables"
        ],
        "useCases": [
            "Accelerating workflows in standard Image & Art Generation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "sora",
        "name": "Sora",
        "description": "OpenAI's groundbreaking video simulator, rendering rich cinematic scenes directly from simple descriptions.",
        "longDescription": "Comprehensive review of Sora, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://openai.com",
        "domain": "openai.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-24T13:41:40.701Z",
        "tags": [
            "Video Generation",
            "OpenAI",
            "Simulation"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "veo",
        "name": "Google Veo",
        "description": "Google DeepMind's flagship video director, matching stylized photoreal prompts with physics consistency.",
        "longDescription": "Comprehensive review of Google Veo, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Google",
        "url": "https://deepmind.google",
        "domain": "google.com",
        "brandColor": "#1A73E8",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-08T03:32:19.982Z",
        "tags": [
            "DeepMind",
            "Cinematic 1080p",
            "Video AI"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "runway-ml",
        "name": "Runway ML",
        "description": "The choice tool for Hollywood editors. The latest Gen-3 Alpha model outputs impressive visual dynamics.",
        "longDescription": "Comprehensive review of Runway ML, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://runwayml.com",
        "domain": "runwayml.com",
        "brandColor": "#111111",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-21T10:48:44.509Z",
        "tags": [
            "Gen-3 Alpha",
            "Virtual camera",
            "Frame synthesis"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "pika",
        "name": "Pika",
        "description": "An incredibly approachable video animator, making cartoon styles, clothing changes, and background swaps easy.",
        "longDescription": "Comprehensive review of Pika, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://pika.art",
        "domain": "pika.art",
        "brandColor": "#2B9E7A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-15T04:03:51.384Z",
        "tags": [
            "3D Animation",
            "Cartoon styles",
            "Video effects"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "kling-ai",
        "name": "Kling AI",
        "description": "Impressive video model that features highly accurate native physics, realistic chewing, and smooth movements.",
        "longDescription": "Comprehensive review of Kling AI, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://klingai.com",
        "domain": "klingai.com",
        "brandColor": "#FA4A0A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-04T01:19:29.276Z",
        "tags": [
            "Realistic physics",
            "Long cinematic",
            "Photo to Video"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "luma-dream-machine",
        "name": "Luma Dream Machine",
        "description": "A rapid camera pan and zoom generator, designed by Lumalabs with impressive 3D camera tracker accuracy.",
        "longDescription": "Comprehensive review of Luma Dream Machine, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gen AI Creator Tools",
        "url": "https://lumalabs.ai",
        "domain": "lumalabs.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-29T13:14:11.052Z",
        "tags": [
            "Dream Machine",
            "Realtime pan",
            "Lumalabs"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "heygen",
        "name": "HeyGen",
        "description": "Seamless virtual presenter generation. Create photorealistic avatars with perfect lipsync and global translation.",
        "longDescription": "Comprehensive review of HeyGen, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://heygen.com",
        "domain": "heygen.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-01T19:43:46.721Z",
        "tags": [
            "AI Avatar",
            "Translation dubbing",
            "Personal brand"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "synthesia",
        "name": "Synthesia",
        "description": "The gold standard for interactive corporate employee onboarding and instruction tutorial videos.",
        "longDescription": "Comprehensive review of Synthesia, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2017, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://synthesia.io",
        "domain": "synthesia.io",
        "brandColor": "#0E11F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-20T01:31:47.377Z",
        "tags": [
            "Enterprise training",
            "HR Video",
            "Studio Avatar"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "d-id",
        "name": "D-ID",
        "description": "Breathes live speech, conversational blinking, and expressive nods into flat corporate portrait photos.",
        "longDescription": "Comprehensive review of D-ID, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2017, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://d-id.com",
        "domain": "d-id.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-20T09:37:56.593Z",
        "tags": [
            "Portrait animator",
            "Live agent",
            "Speak photo"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "descript",
        "name": "Descript",
        "description": "Edit audio and video dialogues as simply as adjusting standard text document file paragraphs.",
        "longDescription": "Comprehensive review of Descript, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2017, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://descript.com",
        "domain": "descript.com",
        "brandColor": "#22C55E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-06-19T23:27:23.393Z",
        "tags": [
            "Video Podcast",
            "Text script editor",
            "Overdub voice"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "opusclip",
        "name": "OpusClip",
        "description": "Slice long webinars into highly viral TikTok, Youtube, and Reel vertically formatted video clips.",
        "longDescription": "Comprehensive review of OpusClip, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://opus.pro",
        "domain": "opus.pro",
        "brandColor": "#5447F3",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-29T00:35:21.461Z",
        "tags": [
            "TikTok Shorts",
            "Virality score",
            "Auto caption"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "capcut-ai",
        "name": "CapCut AI",
        "description": "ByteDance's editor, fully supercharged with prompt-driven template visual effects and background removals.",
        "longDescription": "Comprehensive review of CapCut AI, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://capcut.com",
        "domain": "capcut.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-31T15:23:19.011Z",
        "tags": [
            "TikTok editor",
            "Background remover",
            "Auto caption"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "veed-ai",
        "name": "VEED AI",
        "description": "A versatile online editor offering instant audio noise cleanups and auto-translated subtitle burns.",
        "longDescription": "Comprehensive review of VEED AI, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2018, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://veed.io",
        "domain": "veed.io",
        "brandColor": "#FF1F62",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-20T20:08:30.313Z",
        "tags": [
            "Subtitles",
            "Noise clean",
            "In-browser clip"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "fliki",
        "name": "Fliki",
        "description": "Transforms written blog links into styled video scripts overlayed with high-quality voice narrator tracks.",
        "longDescription": "Comprehensive review of Fliki, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://fliki.ai",
        "domain": "fliki.ai",
        "brandColor": "#0091FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-30T20:38:00.097Z",
        "tags": [
            "Blog to video",
            "AI vocal",
            "Media library"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "invideo-ai",
        "name": "InVideo AI",
        "description": "Instantly constructs styled promotional layout drafts overlayed with rich sound effects from text.",
        "longDescription": "Comprehensive review of InVideo AI, including features, user experience, and key performance reviews in Video & Audio Tools. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Video & Audio Tools",
        "url": "https://invideo.io",
        "domain": "invideo.io",
        "brandColor": "#0052FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-08T17:03:16.586Z",
        "tags": [
            "Prompt to full draft",
            "Voiceover outline",
            "Ad maker"
        ],
        "useCases": [
            "Accelerating workflows in standard Video & Audio Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "elevenlabs",
        "name": "ElevenLabs",
        "description": "Phenomenal voice clone synthetically tracking human emotions, laughter levels, and native tones.",
        "longDescription": "Comprehensive review of ElevenLabs, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://elevenlabs.io",
        "domain": "elevenlabs.io",
        "brandColor": "#5F4D3C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-12T04:22:39.368Z",
        "tags": [
            "Voice Clone",
            "Vocal translation",
            "SFX synthesis"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "suno",
        "name": "Suno AI",
        "description": "Spit out stunning, full radio-quality musical tracks complete with vocals from brief textual inputs.",
        "longDescription": "Comprehensive review of Suno AI, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://suno.com",
        "domain": "suno.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-24T09:58:52.139Z",
        "tags": [
            "Full orchestrations",
            "Lyric generator",
            "Genre customizer"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "udio",
        "name": "Udio",
        "description": "A masterful sound compiler creating lossless music across jazz, pop, rock, and electronic styles.",
        "longDescription": "Comprehensive review of Udio, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://udio.com",
        "domain": "udio.com",
        "brandColor": "#FF3366",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-22T07:26:27.479Z",
        "tags": [
            "Lossless vocals",
            "Musical loops",
            "Stereo spacing"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "murf-ai",
        "name": "Murf AI",
        "description": "Studio-quality reading voices, ideally structured for commercial promotions and corporate onboarding.",
        "longDescription": "Comprehensive review of Murf AI, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://murf.ai",
        "domain": "murf.ai",
        "brandColor": "#007D8A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-16T02:24:05.918Z",
        "tags": [
            "Commercial voiceover",
            "E-learning narration",
            "Pitch tuner"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "playht",
        "name": "PlayHT",
        "description": "Sub-millisecond low latency vocal streaming, designed for live interactive customer service phone systems.",
        "longDescription": "Comprehensive review of PlayHT, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2016, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://play.ht",
        "domain": "play.ht",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-03T02:19:40.045Z",
        "tags": [
            "Podcast host API",
            "Conversational speech",
            "Realtime latency"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "speechify",
        "name": "Speechify",
        "description": "Converts massive PDF books, documents, and online journals into warm reading audio files.",
        "longDescription": "Comprehensive review of Speechify, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2016, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://speechify.com",
        "domain": "speechify.com",
        "brandColor": "#2B56FE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-07T19:39:26.294Z",
        "tags": [
            "Book reader",
            "Voice mimic",
            "Study helper"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "resemble-ai",
        "name": "Resemble AI",
        "description": "Interactive game character vocal modeler with advanced security checks, keeping deepfakes labeled.",
        "longDescription": "Comprehensive review of Resemble AI, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2019, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://resemble.ai",
        "domain": "resemble.ai",
        "brandColor": "#E03F3B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-03-31T21:28:38.673Z",
        "tags": [
            "Deepfake monitor",
            "Game character",
            "Vocal edit"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "krisp-ai",
        "name": "Krisp AI",
        "description": "Strips out coffeehouse clanging and dog barks from live calls in real-time.",
        "longDescription": "Comprehensive review of Krisp AI, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://krisp.ai",
        "domain": "krisp.ai",
        "brandColor": "#06B6D4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-06T16:27:14.466Z",
        "tags": [
            "Acoustic filter",
            "Echo cancellation",
            "Webinar clear"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "adobe-podcast",
        "name": "Adobe Podcast AI",
        "description": "Adobe's free vocal enhancer that converts muddy phone recordings into crisp studio quality.",
        "longDescription": "Comprehensive review of Adobe Podcast AI, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://podcast.adobe.com",
        "domain": "adobe.com",
        "brandColor": "#FA0F00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-18T02:38:02.573Z",
        "tags": [
            "Vocal enhancer",
            "Microphone checker",
            "Level analyzer"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "lalals",
        "name": "Lalals",
        "description": "Transform recorded singing vocals into various classic iconic performer timbres instantly.",
        "longDescription": "Comprehensive review of Lalals, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2021, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://lalals.com",
        "domain": "lalals.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-01-16T10:12:18.217Z",
        "tags": [
            "Vocal transformer",
            "Instrument splitter",
            "Acappella extractor"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "voicemod",
        "name": "Voicemod",
        "description": "Real-time gaming microphone changer, providing voice customization and dynamic soundboards.",
        "longDescription": "Comprehensive review of Voicemod, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2014, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://voicemod.net",
        "domain": "voicemod.net",
        "brandColor": "#EA1F59",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-20T11:22:30.102Z",
        "tags": [
            "Gaming live voice",
            "Vocal soundboard",
            "Discord mic"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2014
    },
    {
        "id": "aiva",
        "name": "AIVA",
        "description": "An artificial creative composer that formats elegant MIDI tracks for movies, trailers, and apps.",
        "longDescription": "Comprehensive review of AIVA, including features, user experience, and key performance reviews in Voice & Audio AI. Built in 2016, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Voice & Audio AI",
        "url": "https://aiva.ai",
        "domain": "aiva.ai",
        "brandColor": "#1F64FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-25T04:52:57.824Z",
        "tags": [
            "Classical synth",
            "Midi composer",
            "Game themes"
        ],
        "useCases": [
            "Accelerating workflows in standard Voice & Audio AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "jasper",
        "name": "Jasper AI",
        "description": "The premier content workspace for marketing teams, creating aligned copy, emails, and campaign assets.",
        "longDescription": "Comprehensive review of Jasper AI, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://jasper.ai",
        "domain": "jasper.ai",
        "brandColor": "#6A26FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-25T00:00:39.243Z",
        "tags": [
            "Marketing copy",
            "SEO briefs",
            "Team workspace"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "copy-ai",
        "name": "Copy.ai",
        "description": "Automate outbound messaging campaigns, taglines, and social posts with specialized brand voice parameters.",
        "longDescription": "Comprehensive review of Copy.ai, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://copy.ai",
        "domain": "copy.ai",
        "brandColor": "#0DF5A4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-14T16:10:50.538Z",
        "tags": [
            "Ad headlines",
            "Cold emails",
            "Workflow writer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "writesonic",
        "name": "Writesonic",
        "description": "Rapidly draft SEO-optimized articles, listicles, and Google ad copy with a built-in search checker.",
        "longDescription": "Comprehensive review of Writesonic, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://writesonic.com",
        "domain": "writesonic.com",
        "brandColor": "#0062FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-18T06:36:45.609Z",
        "tags": [
            "Blog templates",
            "Article writer",
            "SEO check"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "rytr",
        "name": "Rytr",
        "description": "A cozy and affordable writing aid suited for social headlines and personalized review responses.",
        "longDescription": "Comprehensive review of Rytr, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2021, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://rytr.me",
        "domain": "rytr.me",
        "brandColor": "#F28C0F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-28T20:31:55.496Z",
        "tags": [
            "Cheap content",
            "Vibe options",
            "Blog intro"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "grammarly",
        "name": "Grammarly",
        "description": "Your proactive typing companion. Fixes grammar, corrects sentence style, and refines wording on any site.",
        "longDescription": "Comprehensive review of Grammarly, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2009, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://grammarly.com",
        "domain": "grammarly.com",
        "brandColor": "#15C076",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-20T02:36:37.130Z",
        "tags": [
            "Syllabus check",
            "Tone checker",
            "Grammar correction"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2009
    },
    {
        "id": "quillbot",
        "name": "QuillBot",
        "description": "An outstanding rewriting aid that formats, checks, and restructures copy to improve readability.",
        "longDescription": "Comprehensive review of QuillBot, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://quillbot.com",
        "domain": "quillbot.com",
        "brandColor": "#00A859",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-04T22:05:38.499Z",
        "tags": [
            "Paraphraser",
            "Summarizer",
            "Synonym finder"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "wordtune",
        "name": "Wordtune",
        "description": "AI writing assistant that suggests multiple alternative ways to express your thoughts clearly.",
        "longDescription": "Comprehensive review of Wordtune, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://wordtune.com",
        "domain": "wordtune.com",
        "brandColor": "#5446FE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-03-23T22:31:54.351Z",
        "tags": [
            "Inline editor",
            "Sentence expander",
            "Vocal tone adjuster"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "notion-ai",
        "name": "Notion AI",
        "description": "An integrated command-line tool within Notion to summarize sheets, generate content, and outline briefs.",
        "longDescription": "Comprehensive review of Notion AI, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://notion.so",
        "domain": "notion.so",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-17T07:55:09.461Z",
        "tags": [
            "Notion workspace",
            "Document helper",
            "Table translator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sudowrite",
        "name": "Sudowrite",
        "description": "The creative writing assistant that helps novelists brainstorm plots, expand dialogues, and beat writer's block.",
        "longDescription": "Comprehensive review of Sudowrite, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://sudowrite.com",
        "domain": "sudowrite.com",
        "brandColor": "#FF4A00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-08T19:44:24.360Z",
        "tags": [
            "Novel editor",
            "Plot developer",
            "Descriptive expansion"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "hyperwrite",
        "name": "HyperWrite",
        "description": "Advanced typing companion that learns your personal writing style to draft emails and posts quickly.",
        "longDescription": "Comprehensive review of HyperWrite, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://hyperwriteai.com",
        "domain": "hyperwriteai.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-22T19:02:47.945Z",
        "tags": [
            "Email helper",
            "Autopilot search",
            "Extension helper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "anyword",
        "name": "Anyword",
        "description": "The enterprise platform that scores marketing copy effectiveness and user click rates beforehand.",
        "longDescription": "Comprehensive review of Anyword, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2013, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://anyword.com",
        "domain": "anyword.com",
        "brandColor": "#00AAFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-08T03:26:03.480Z",
        "tags": [
            "Performance score",
            "Copywriter",
            "Landing page optimization"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2013
    },
    {
        "id": "writer-com",
        "name": "Writer.com",
        "description": "An enterprise generative model designed around data privacy, specific brand rules, and styling.",
        "longDescription": "Comprehensive review of Writer.com, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://writer.com",
        "domain": "writer.com",
        "brandColor": "#0047FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-18T04:47:44.611Z",
        "tags": [
            "Business safe LLM",
            "Factual accuracy",
            "Legal review compliance"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "jenni-ai",
        "name": "Jenni AI",
        "description": "The academic thesis writing assistant that formats citations and generates logical next sentences.",
        "longDescription": "Comprehensive review of Jenni AI, including features, user experience, and key performance reviews in AI Writing & Content. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Writing & Content",
        "url": "https://jenni.ai",
        "domain": "jenni.ai",
        "brandColor": "#FF2C2C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-09T08:57:12.706Z",
        "tags": [
            "Citation formatting",
            "Thesis outlines",
            "Paper summaries"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Writing & Content business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "surfer-seo",
        "name": "Surfer SEO",
        "description": "Analyze search patterns to design optimized structures, headers, and keyword frequencies.",
        "longDescription": "Comprehensive review of Surfer SEO, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2017, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://surferseo.com",
        "domain": "surferseo.com",
        "brandColor": "#FF3F66",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-05T23:44:43.535Z",
        "tags": [
            "SEO auditor",
            "Keyword mapping",
            "Topic outline"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "semrush-ai",
        "name": "Semrush AI",
        "description": "The market standard for competitive intelligence, fully supercharged with rank trackers.",
        "longDescription": "Comprehensive review of Semrush AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://semrush.com",
        "domain": "semrush.com",
        "brandColor": "#FF642D",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-07T22:09:46.653Z",
        "tags": [
            "Ad analytics",
            "Competitor charts",
            "Backlink auditor"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "ahrefs-ai",
        "name": "Ahrefs AI",
        "description": "Highly validated suite providing custom keyword generator tools, anchors, and site audits.",
        "longDescription": "Comprehensive review of Ahrefs AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://ahrefs.com",
        "domain": "ahrefs.com",
        "brandColor": "#FF7D10",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-16T20:41:40.737Z",
        "tags": [
            "Alt text maker",
            "Keyword rank tracker",
            "Crawler"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "frase",
        "name": "Frase",
        "description": "Instantly scrapes search queries of competitors to construct content briefs in seconds.",
        "longDescription": "Comprehensive review of Frase, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2016, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://frase.io",
        "domain": "frase.io",
        "brandColor": "#003AFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-01T06:36:26.420Z",
        "tags": [
            "SERP analyzer",
            "Outline engine",
            "Content briefs"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "neuronwriter",
        "name": "NeuronWriter",
        "description": "Semantic layout compiler that matches written copies with Google search recommendations.",
        "longDescription": "Comprehensive review of NeuronWriter, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://neuronwriter.com",
        "domain": "neuronwriter.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-24T06:01:08.907Z",
        "tags": [
            "LSI keyword check",
            "Optimized content",
            "Competition scores"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "marketmuse",
        "name": "MarketMuse",
        "description": "Intelligent layout compiler mapping missing terms in your articles compared to the competition.",
        "longDescription": "Comprehensive review of MarketMuse, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2015, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://marketmuse.com",
        "domain": "marketmuse.com",
        "brandColor": "#00C39C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-07-09T23:05:48.640Z",
        "tags": [
            "Gap checker",
            "E-E-A-T score",
            "Topic mapping"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "adcreative-ai",
        "name": "AdCreative AI",
        "description": "Generate conversion-oriented ad banners, headlines, and visuals in seconds with dynamic scores.",
        "longDescription": "Comprehensive review of AdCreative AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://adcreative.ai",
        "domain": "adcreative.ai",
        "brandColor": "#005EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-24T12:47:27.407Z",
        "tags": [
            "Ad banner maker",
            "Performance check",
            "Social creatives"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "predis-ai-marketing",
        "name": "Predis AI",
        "description": "A creative compiler that generates videos, captions, and hashtag arrays from brief prompts.",
        "longDescription": "Comprehensive review of Predis AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://predis.ai",
        "domain": "predis.ai",
        "brandColor": "#3B1EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-19T22:49:27.304Z",
        "tags": [
            "Competitor briefs",
            "Social designer",
            "Bulk queue"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "ocoya-marketing",
        "name": "Ocoya",
        "description": "One-stop shop for generating copy, applying graphic layouts, and scheduling campaigns.",
        "longDescription": "Comprehensive review of Ocoya, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://ocoya.com",
        "domain": "ocoya.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-15T20:35:00.029Z",
        "tags": [
            "Copy assistant",
            "Scheduler",
            "Shopify integrations"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "buffer-ai-marketing",
        "name": "Buffer AI",
        "description": "Create, transform, and schedule social posts across popular channels from a single dashboard.",
        "longDescription": "Comprehensive review of Buffer AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://buffer.com",
        "domain": "buffer.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-02T18:07:41.986Z",
        "tags": [
            "Idea helper",
            "Social queue",
            "Thread optimizer"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hubspot-ai",
        "name": "HubSpot AI",
        "description": "Enriches the CRM ecosystem with automated customer behavior summaries and email drafts.",
        "longDescription": "Comprehensive review of HubSpot AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://hubspot.com",
        "domain": "hubspot.com",
        "brandColor": "#FF7A59",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-16T21:28:19.289Z",
        "tags": [
            "CRM marketing",
            "Call logger",
            "Email campaign generator"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hootsuite-ai-marketing",
        "name": "Hootsuite AI",
        "description": "Track competitor campaigns, log brand sentiment, and queue marketing messages in advance.",
        "longDescription": "Comprehensive review of Hootsuite AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://hootsuite.com",
        "domain": "hootsuite.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-08T20:44:50.993Z",
        "tags": [
            "Social queue",
            "Sentiment logger",
            "Brand monitoring"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "flick-ai",
        "name": "Flick AI",
        "description": "An intelligent hashtag auditor and social scheduler designed for fast-growing agencies.",
        "longDescription": "Comprehensive review of Flick AI, including features, user experience, and key performance reviews in Marketing & SEO. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Marketing & SEO",
        "url": "https://flick.social",
        "domain": "flick.social",
        "brandColor": "#E0218A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-12T01:10:35.571Z",
        "tags": [
            "Hashtag auditor",
            "Campaign scheduling",
            "Copy scheduler"
        ],
        "useCases": [
            "Accelerating workflows in standard Marketing & SEO business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "zapier",
        "name": "Zapier AI",
        "description": "Build automated application connections and complex task routing flows using simple language.",
        "longDescription": "Comprehensive review of Zapier AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://zapier.com",
        "domain": "zapier.com",
        "brandColor": "#FF4F00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-17T01:26:04.185Z",
        "tags": [
            "Visual diagrams",
            "API logs helper",
            "Data router"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "make-ai",
        "name": "Make AI",
        "description": "Allows groups to configure multi language chat assistants with API actions easily.",
        "longDescription": "Comprehensive review of Make AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Workflow Automation",
        "url": "https://make.com",
        "domain": "make.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-06T10:30:24.154Z",
        "tags": [
            "Visual canvas router",
            "Flowchart editor",
            "Custom JSON API"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "n8n",
        "name": "n8n",
        "description": "Secure node-based developer workflow canvas to integrate APIs, databases, and custom JS.",
        "longDescription": "Comprehensive review of n8n, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2019, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Workflow Automation",
        "url": "https://n8n.io",
        "domain": "n8n.io",
        "brandColor": "#FF6C37",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-05T02:40:02.932Z",
        "tags": [
            "Open Source workflow",
            "Privacy safe",
            "Node script integration"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "bardeen-ai",
        "name": "Bardeen AI",
        "description": "Proactive desktop helper that automates data scraping and schedules links behind normal clicks.",
        "longDescription": "Comprehensive review of Bardeen AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://bardeen.ai",
        "domain": "bardeen.ai",
        "brandColor": "#2B6AFE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-23T11:28:13.548Z",
        "tags": [
            "Chrome scrapper",
            "Calendar connector",
            "Action tab"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "lindy-ai",
        "name": "Lindy AI",
        "description": "Highly autonomous assistant agents, capable of filtering emails and updating calendars.",
        "longDescription": "Comprehensive review of Lindy AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://lindy.ai",
        "domain": "lindy.ai",
        "brandColor": "#9333EA",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-06-06T19:53:50.639Z",
        "tags": [
            "Autonomous HR bot",
            "Email inbox filter",
            "Calendar tracker"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "relevance-ai",
        "name": "Relevance AI",
        "description": "Build, test, and manage an entire team of autonomous, prompt-driven AI employees.",
        "longDescription": "Comprehensive review of Relevance AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://relevanceai.com",
        "domain": "relevanceai.com",
        "brandColor": "#111827",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-09T20:51:41.011Z",
        "tags": [
            "Autonomous agent team",
            "Data scraper",
            "Customer outbound"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "taskade-ai",
        "name": "Taskade AI",
        "description": "Cooperative multiplayer dashboard with automated mind maps and task organizers.",
        "longDescription": "Comprehensive review of Taskade AI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Workflow Automation",
        "url": "https://taskade.com",
        "domain": "taskade.com",
        "brandColor": "#FF1F62",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-05T08:51:00.139Z",
        "tags": [
            "Framer dashboard",
            "Multi-user whiteboard",
            "Mind map organizer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "relay-app",
        "name": "Relay.app",
        "description": "A fresh automated workspace adding human-in-the-loop approvals to dynamic workflows.",
        "longDescription": "Comprehensive review of Relay.app, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Workflow Automation",
        "url": "https://relay.app",
        "domain": "relay.app",
        "brandColor": "#319795",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-13T08:06:16.434Z",
        "tags": [
            "Approval loop",
            "Clean logs tracker",
            "No-code API"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "gumloop",
        "name": "Gumloop",
        "description": "A powerful developer canvas to drag-and-drop web scrapers and unstructured data parser pipes.",
        "longDescription": "Comprehensive review of Gumloop, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://gumloop.com",
        "domain": "gumloop.com",
        "brandColor": "#059669",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-12T06:02:53.150Z",
        "tags": [
            "Web scraper",
            "JSON formatter",
            "Enterprise automation"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "agenthub",
        "name": "AgentHub",
        "description": "No-code workspace to orchestrate multi agent tasks, scraping pipelines, and JSON compilers.",
        "longDescription": "Comprehensive review of AgentHub, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Workflow Automation",
        "url": "https://agenthub.dev",
        "domain": "agenthub.dev",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-16T19:54:00.420Z",
        "tags": [
            "Agent canvas",
            "YAML custom scripts",
            "API orchestrator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "crewai",
        "name": "CrewAI",
        "description": "Highly adopted Python framework to orchestrate team roleplay task hierarchies.",
        "longDescription": "Comprehensive review of CrewAI, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://crewai.com",
        "domain": "crewai.com",
        "brandColor": "#5B21B6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-29T06:29:25.477Z",
        "tags": [
            "Multi-Agent",
            "Python framework",
            "Roleplay tasking"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "autogpt",
        "name": "AutoGPT",
        "description": "Legendary open-source agent sandbox that navigates directories to fulfill text commands.",
        "longDescription": "Comprehensive review of AutoGPT, including features, user experience, and key performance reviews in AI Workflow Automation. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Agents & Automation",
        "url": "https://agpt.co",
        "domain": "agpt.co",
        "brandColor": "#1E3A8A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-19T21:58:05.728Z",
        "tags": [
            "Agentic system",
            "Docker executor",
            "Interactive shell"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Workflow Automation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "fireflies-ai",
        "name": "Fireflies AI",
        "description": "The premier call companion. Auto logs Zoom discussions, notes key metrics, and updates CRMs.",
        "longDescription": "Comprehensive review of Fireflies AI, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://fireflies.ai",
        "domain": "fireflies.ai",
        "brandColor": "#6366F1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-10T02:58:35.074Z",
        "tags": [
            "Call recorder",
            "CRM sync",
            "Sentiment tracking"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "otter-ai",
        "name": "Otter AI",
        "description": "Highly validated text transcribing assistant, displaying words in real time on screens.",
        "longDescription": "Comprehensive review of Otter AI, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2016, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://otter.ai",
        "domain": "otter.ai",
        "brandColor": "#0055FE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-03T21:52:07.844Z",
        "tags": [
            "Transcriber",
            "Real-time subtitle",
            "Speech notes"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "fathom",
        "name": "Fathom",
        "description": "Highly popular free call recorder compiling bullet outlines and action items.",
        "longDescription": "Comprehensive review of Fathom, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2020, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://fathom.video",
        "domain": "fathom.video",
        "brandColor": "#6A0DAD",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-14T18:43:57.261Z",
        "tags": [
            "Zoom companion",
            "Instant recording clips",
            "Action items list"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "tldv",
        "name": "tl;dv",
        "description": "Record, index, and translate virtual meetings, sharing direct highlighted timestamps.",
        "longDescription": "Comprehensive review of tl;dv, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://tldv.io",
        "domain": "tldv.io",
        "brandColor": "#00F0A0",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-11T08:04:52.503Z",
        "tags": [
            "Call translator",
            "G-meet sidebar",
            "Time stamps list"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "avoma",
        "name": "Avoma",
        "description": "An intelligent platform designed to track sales pipelines and customer objections.",
        "longDescription": "Comprehensive review of Avoma, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://avoma.com",
        "domain": "avoma.com",
        "brandColor": "#2B52F1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-04-04T04:07:16.561Z",
        "tags": [
            "CRM integration",
            "Customer objections logger",
            "Topic trend tracker"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "sembly-ai",
        "name": "Sembly AI",
        "description": "Translates speech into dynamic lists of action items, formatted into PDF summaries.",
        "longDescription": "Comprehensive review of Sembly AI, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://sembly.ai",
        "domain": "sembly.ai",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-26T06:10:23.263Z",
        "tags": [
            "Task planner",
            "PDF summary doc",
            "Voice analyzer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "krisp-meeting",
        "name": "Krisp Meeting",
        "description": "Mutes background noises during live calls while generating summaries.",
        "longDescription": "Comprehensive review of Krisp Meeting, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://krisp.ai",
        "domain": "krisp.ai",
        "brandColor": "#06B6D4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-19T22:02:29.379Z",
        "tags": [
            "Noise filter",
            "Transcriber",
            "Sound checker"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "meetgeek",
        "name": "MeetGeek",
        "description": "Sends custom automated meeting notes and emails to relevant team members.",
        "longDescription": "Comprehensive review of MeetGeek, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://meetgeek.ai",
        "domain": "meetgeek.ai",
        "brandColor": "#111827",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-12T23:58:55.027Z",
        "tags": [
            "Zoom logger",
            "Auto task sender",
            "Workflow email"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "supernormal",
        "name": "Supernormal",
        "description": "Beautiful template summary creator, customizing logs to fit your team's style.",
        "longDescription": "Comprehensive review of Supernormal, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://supernormal.com",
        "domain": "supernormal.com",
        "brandColor": "#E0218A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-09T22:20:28.476Z",
        "tags": [
            "Template editor",
            "SaaS client dashboard",
            "Google Meet integration"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "read-ai",
        "name": "Read AI",
        "description": "Analyzes attention levels and tracking sentiments during larger calls.",
        "longDescription": "Comprehensive review of Read AI, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://read.ai",
        "domain": "read.ai",
        "brandColor": "#5B21B6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-13T12:51:49.734Z",
        "tags": [
            "Attention metric",
            "Sentiment tracker",
            "Dashboard analytics"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "circleback",
        "name": "Circleback",
        "description": "Proactive assistant draft writer that syncs notes to complex tables.",
        "longDescription": "Comprehensive review of Circleback, including features, user experience, and key performance reviews in AI Meeting Assistants. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Meeting Assistants",
        "url": "https://circleback.ai",
        "domain": "circleback.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-27T11:48:00.868Z",
        "tags": [
            "Email logs",
            "Custom CRM mapping",
            "Google Meet helper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Meeting Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "gamma",
        "name": "Gamma",
        "description": "Interactive markdown generator that creates professional presentation slide cards instantly.",
        "longDescription": "Comprehensive review of Gamma, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://gamma.app",
        "domain": "gamma.app",
        "brandColor": "#FF3B6B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-15T08:00:03.617Z",
        "tags": [
            "Slideshow",
            "Docs to presentation",
            "Vector cards"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "tome",
        "name": "Tome",
        "description": "A creative canvas formatting dynamic pages, outlines, and images from prompt logs.",
        "longDescription": "Comprehensive review of Tome, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2022, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://tome.app",
        "domain": "tome.app",
        "brandColor": "#0A0A0A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-18T05:15:24.485Z",
        "tags": [
            "Visual storyteller",
            "Text-to-slide outlines",
            "Custom dimensions"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "beautiful-ai",
        "name": "Beautiful.ai",
        "description": "Intelligent layout assistant fixing margins, alignment, and column structures.",
        "longDescription": "Comprehensive review of Beautiful.ai, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2017, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://beautiful.ai",
        "domain": "beautiful.ai",
        "brandColor": "#2B6AFE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-24T17:44:43.825Z",
        "tags": [
            "Constraint templates",
            "Proportion engine",
            "Financial graphs"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "canva-presentation",
        "name": "Canva AI Presentation",
        "description": "Canva's Magic Presentation builder, formatting custom assets from templates.",
        "longDescription": "Comprehensive review of Canva AI Presentation, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://canva.com",
        "domain": "canva.com",
        "brandColor": "#00C4CC",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-02T05:24:21.313Z",
        "tags": [
            "Magic design templates",
            "Social exports",
            "Cooperative slides"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "decktopus",
        "name": "Decktopus",
        "description": "Generate presentation decks complete with tailored forms and image layouts.",
        "longDescription": "Comprehensive review of Decktopus, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2019, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://decktopus.com",
        "domain": "decktopus.com",
        "brandColor": "#E1523D",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-16T03:03:34.019Z",
        "tags": [
            "Questionnaire generator",
            "Instant forms",
            "SDR presentations"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "pitch-ai",
        "name": "Pitch AI",
        "description": "Fabulous team workspace to customize dynamic templates with real-time analytics.",
        "longDescription": "Comprehensive review of Pitch AI, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://pitch.com",
        "domain": "pitch.com",
        "brandColor": "#00E5A3",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-05-29T07:16:04.570Z",
        "tags": [
            "Pitch decks creator",
            "Startup tables",
            "SVG export"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "slidesai",
        "name": "SlidesAI",
        "description": "Chrome add-on that translates document paragraphs directly into Google Slides.",
        "longDescription": "Comprehensive review of SlidesAI, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://slidesai.io",
        "domain": "slidesai.io",
        "brandColor": "#FFBB00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-17T03:06:41.006Z",
        "tags": [
            "Google slides plug",
            "Paragraph importer",
            "Outline compiler"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "plus-ai",
        "name": "Plus AI",
        "description": "Creates dynamic presentation decks inside corporate templates using real-time figures.",
        "longDescription": "Comprehensive review of Plus AI, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://useplus.com",
        "domain": "useplus.com",
        "brandColor": "#9333EA",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-02T18:52:36.406Z",
        "tags": [
            "Google slides companion",
            "Metrics graph",
            "Powerpoint creator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "napkin-ai",
        "name": "Napkin AI",
        "description": "Extract logical insights from sentences to shape clean visual flowcharts.",
        "longDescription": "Comprehensive review of Napkin AI, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://napkin.ai",
        "domain": "napkin.ai",
        "brandColor": "#EF4444",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-17T06:29:21.237Z",
        "tags": [
            "Visual flowcharts",
            "Infographics maker",
            "Diagrams helper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "presentations-ai",
        "name": "Presentations AI",
        "description": "Converts ideas into custom brand presentations in seconds.",
        "longDescription": "Comprehensive review of Presentations AI, including features, user experience, and key performance reviews in AI Presentation Tools. Built in 2020, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Presentation Tools",
        "url": "https://presentations.ai",
        "domain": "presentations.ai",
        "brandColor": "#2563EB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-22T05:36:06.627Z",
        "tags": [
            "Automated designs",
            "Brand style logs",
            "PDF slide downloader"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Presentation Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "chatpdf",
        "name": "ChatPDF",
        "description": "Excellent interface that lets students query long PDF files and get immediate citations.",
        "longDescription": "Comprehensive review of ChatPDF, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://chatpdf.com",
        "domain": "chatpdf.com",
        "brandColor": "#FA4D2B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-01T16:21:04.329Z",
        "tags": [
            "PDF scanner",
            "Instant translation",
            "Exam studies Helper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "pdf-ai",
        "name": "PDF.ai",
        "description": "Interactive document reader featuring an inline highlight lookup sidebar.",
        "longDescription": "Comprehensive review of PDF.ai, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://pdf.ai",
        "domain": "pdf.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-23T17:15:45.307Z",
        "tags": [
            "E-book tracker",
            "Contract auditor",
            "Chrome expansion"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "humata",
        "name": "Humata",
        "description": "Speedy document analyzer capable of summarizing and querying vast data collections.",
        "longDescription": "Comprehensive review of Humata, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://humata.ai",
        "domain": "humata.ai",
        "brandColor": "#006BFE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-27T02:15:25.507Z",
        "tags": [
            "Patent analysis",
            "Scientific paper",
            "Knowledge Base"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "askyourpdf",
        "name": "AskYourPDF",
        "description": "A reliable partner to scan books and extract structured data tables.",
        "longDescription": "Comprehensive review of AskYourPDF, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://askyourpdf.com",
        "domain": "askyourpdf.com",
        "brandColor": "#23C55E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-26T20:11:55.272Z",
        "tags": [
            "Doc scanner",
            "Text translation",
            "Source citation finder"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "adobe-acrobat-ai",
        "name": "Adobe Acrobat AI",
        "description": "Adobe's official document reader partner, offering reliable summaries and citation checkers.",
        "longDescription": "Comprehensive review of Adobe Acrobat AI, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2024, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://adobe.com",
        "domain": "adobe.com",
        "brandColor": "#FA0F00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-16T20:23:04.612Z",
        "tags": [
            "Acrobat reader",
            "PDF compiler",
            "Verified links"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "updf-ai",
        "name": "UPDF AI",
        "description": "Enriches the UPDF design editing app with instant paragraphs translate.",
        "longDescription": "Comprehensive review of UPDF AI, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://updf.com",
        "domain": "updf.com",
        "brandColor": "#EA580C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-23T02:22:47.654Z",
        "tags": [
            "PDF editor",
            "Page arranger",
            "Translator tool"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "documind",
        "name": "Documind",
        "description": "Construct structured databases from bulk collections of product manuals.",
        "longDescription": "Comprehensive review of Documind, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://documind.chat",
        "domain": "documind.chat",
        "brandColor": "#1E3A8A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-10T11:21:01.602Z",
        "tags": [
            "Bulk pdf scanner",
            "Database exports",
            "Manual cataloging"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sharly-ai",
        "name": "Sharly AI",
        "description": "Collaborate with peers inside a shared document chat interface.",
        "longDescription": "Comprehensive review of Sharly AI, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://sharly.ai",
        "domain": "sharly.ai",
        "brandColor": "#11C7D5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-06-14T16:22:39.178Z",
        "tags": [
            "Shared doc chat",
            "Student notes helper",
            "Summary bullets"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "explainpaper",
        "name": "Explainpaper",
        "description": "Simply highlight complex scientific terms to receive clear, simplified explanations.",
        "longDescription": "Comprehensive review of Explainpaper, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://explainpaper.com",
        "domain": "explainpaper.com",
        "brandColor": "#0A0A0A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-03T07:31:22.338Z",
        "tags": [
            "Technical terms highlighter",
            "Tutor assistant",
            "Research papers"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "mapdeduce",
        "name": "MapDeduce",
        "description": "Audits corporate contracts to spot hidden fees and missing parameters.",
        "longDescription": "Comprehensive review of MapDeduce, including features, user experience, and key performance reviews in AI PDF & Document Tools. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI PDF & Document Tools",
        "url": "https://mapdeduce.com",
        "domain": "mapdeduce.com",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-14T12:41:01.553Z",
        "tags": [
            "Patent details checker",
            "Financial data compiler",
            "Log auditor"
        ],
        "useCases": [
            "Accelerating workflows in standard AI PDF & Document Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "notebooklm",
        "name": "NotebookLM",
        "description": "Google's smart personal notebook. Ingests source manuals and drafts comparative outlines.",
        "longDescription": "Comprehensive review of NotebookLM, including features, user experience, and key performance reviews in Research & Analysis. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://notebooklm.google.com",
        "domain": "google.com",
        "brandColor": "#4285F5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-16T12:30:56.926Z",
        "tags": [
            "Podcast generation",
            "Document analyzer",
            "Gemini helper"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "elicit",
        "name": "Elicit",
        "description": "Finds peer consensus across papers and builds comparative literature review tables.",
        "longDescription": "Comprehensive review of Elicit, including features, user experience, and key performance reviews in Research & Analysis. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://elicit.com",
        "domain": "elicit.com",
        "brandColor": "#3B82FE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-11T04:54:58.751Z",
        "tags": [
            "Consensus grid",
            "Technical reviews",
            "Citation finder"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "consensus",
        "name": "Consensus",
        "description": "Evidence-based search engine returning direct answers compiled from peer-reviewed databases.",
        "longDescription": "Comprehensive review of Consensus, including features, user experience, and key performance reviews in Research & Analysis. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://consensus.app",
        "domain": "consensus.app",
        "brandColor": "#D946F0",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-17T11:32:23.650Z",
        "tags": [
            "Evidence engine",
            "Science check",
            "Academic sources"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "scispace",
        "name": "SciSpace",
        "description": "A supportive tutor helping students decipher advanced academic articles.",
        "longDescription": "Comprehensive review of SciSpace, including features, user experience, and key performance reviews in Research & Analysis. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://typeset.io",
        "domain": "typeset.io",
        "brandColor": "#10B990",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-29T08:11:53.892Z",
        "tags": [
            "Literature check",
            "Math formula helper",
            "Paper summaries"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "perplexity-research",
        "name": "Perplexity",
        "description": "Conversational answer engine delivering cited facts compiled from real-time sources.",
        "longDescription": "Comprehensive review of Perplexity, including features, user experience, and key performance reviews in Research & Analysis. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://perplexity.ai",
        "domain": "perplexity.ai",
        "brandColor": "#00A389",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-27T13:40:42.002Z",
        "tags": [
            "Search AI",
            "Citation sources",
            "Copilot search"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "research-rabbit",
        "name": "Research Rabbit",
        "description": "A beautiful spatial map visualizer illustrating relationships between authors.",
        "longDescription": "Comprehensive review of Research Rabbit, including features, user experience, and key performance reviews in Research & Analysis. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://researchrabbitapp.com",
        "domain": "researchrabbitapp.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-11T22:26:24.917Z",
        "tags": [
            "Graph visualizer",
            "Collection mapper",
            "Email tracker"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "connected-papers",
        "name": "Connected Papers",
        "description": "Visualize the academic citation graph of specific research domains.",
        "longDescription": "Comprehensive review of Connected Papers, including features, user experience, and key performance reviews in Research & Analysis. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://connectedpapers.com",
        "domain": "connectedpapers.com",
        "brandColor": "#2563EB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-11T08:55:55.566Z",
        "tags": [
            "Reference map",
            "Academic collections",
            "Similar paper finder"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "semantic-scholar",
        "name": "Semantic Scholar AI",
        "description": "Allen Institute's advanced academic search indexer with impact tracking.",
        "longDescription": "Comprehensive review of Semantic Scholar AI, including features, user experience, and key performance reviews in Research & Analysis. Built in 2015, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://semanticscholar.org",
        "domain": "semanticscholar.org",
        "brandColor": "#2B3A8F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-14T23:56:44.011Z",
        "tags": [
            "Paper indexer",
            "Impact tracking",
            "Allen Institute"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "scholarcy",
        "name": "Scholarcy",
        "description": "Converts complex paper research papers into readable summary cards.",
        "longDescription": "Comprehensive review of Scholarcy, including features, user experience, and key performance reviews in Research & Analysis. Built in 2018, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://scholarcy.com",
        "domain": "scholarcy.com",
        "brandColor": "#0D9488",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-09T02:48:46.960Z",
        "tags": [
            "Flashcard outlines",
            "Key data summaries",
            "Text screen reader"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "explainpaper-research",
        "name": "Explainpaper",
        "description": "Highlight confusing equations or terms to get instant contextual definitions.",
        "longDescription": "Comprehensive review of Explainpaper, including features, user experience, and key performance reviews in Research & Analysis. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Research & Analysis",
        "url": "https://explainpaper.com",
        "domain": "explainpaper.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-01-25T16:15:48.140Z",
        "tags": [
            "Term lookup",
            "Paper translator",
            "Academic guide"
        ],
        "useCases": [
            "Accelerating workflows in standard Research & Analysis business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "perplexity",
        "name": "Perplexity",
        "description": "Conversational lookup engine synthesizing direct responses from web results.",
        "longDescription": "Comprehensive review of Perplexity, including features, user experience, and key performance reviews in AI Search Engines. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://perplexity.ai",
        "domain": "perplexity.ai",
        "brandColor": "#00A389",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-27T04:09:21.792Z",
        "tags": [
            "Conversational Search",
            "Research Citations",
            "GPT-4o"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "you-ai-search",
        "name": "You AI Search",
        "description": "Personalized search portal with agent tools for comparative market analysis.",
        "longDescription": "Comprehensive review of You AI Search, including features, user experience, and key performance reviews in AI Search Engines. Built in 2020, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://you.com",
        "domain": "you.com",
        "brandColor": "#0072FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-15T10:21:15.643Z",
        "tags": [
            "Developer tools",
            "Agent mode",
            "Multi-tabs search"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "phind-search",
        "name": "Phind",
        "description": "Search engine for programmers, providing direct coding answers with sources.",
        "longDescription": "Comprehensive review of Phind, including features, user experience, and key performance reviews in AI Search Engines. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://phind.com",
        "domain": "phind.com",
        "brandColor": "#2B5C8F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-26T15:42:46.328Z",
        "tags": [
            "Code search",
            "Developer search",
            "Instant scripts"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "andi-ai",
        "name": "Andi AI",
        "description": "A cozy, ad-free private search bot that explains results in simple chat boxes.",
        "longDescription": "Comprehensive review of Andi AI, including features, user experience, and key performance reviews in AI Search Engines. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://andisearch.com",
        "domain": "andisearch.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-14T18:43:55.949Z",
        "tags": [
            "Conversational",
            "Ad-free search",
            "Clean UI"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "komo-ai",
        "name": "Komo AI",
        "description": "A specialized search aid prioritizing community forum answers.",
        "longDescription": "Comprehensive review of Komo AI, including features, user experience, and key performance reviews in AI Search Engines. Built in 2022, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://komo.ai",
        "domain": "komo.ai",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-12T03:38:39.733Z",
        "tags": [
            "Speedy search",
            "Discussion forums",
            "Subtle layout"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "exa-ai",
        "name": "Exa AI",
        "description": "Neural search engine styled for programmers, finding items via semantic intent.",
        "longDescription": "Comprehensive review of Exa AI, including features, user experience, and key performance reviews in AI Search Engines. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://exa.ai",
        "domain": "exa.ai",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-13T06:21:33.627Z",
        "tags": [
            "Neural search",
            "API keys finder",
            "Aesthetic database"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "consensus-search",
        "name": "Consensus",
        "description": "Search tool queries clinical manuals to output verified evidence percentages.",
        "longDescription": "Comprehensive review of Consensus, including features, user experience, and key performance reviews in AI Search Engines. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://consensus.app",
        "domain": "consensus.app",
        "brandColor": "#D946F0",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-30T23:47:27.976Z",
        "tags": [
            "Science search",
            "Factual answers",
            "Peer reviewed sources"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "arc-search",
        "name": "Arc Search",
        "description": "Mobile browser that compiles custom summaries of multiple web sources instantly.",
        "longDescription": "Comprehensive review of Arc Search, including features, user experience, and key performance reviews in AI Search Engines. Built in 2024, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Search Engines",
        "url": "https://browsercompany.com",
        "domain": "browsercompany.com",
        "brandColor": "#FA2B6F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-12T08:06:14.298Z",
        "tags": [
            "Mobile browser",
            "Browse for Me",
            "Clean pages"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Search Engines business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2024
    },
    {
        "id": "predis-ai",
        "name": "Predis AI",
        "description": "Converts text ideas into completed marketing Reels, captions, and hashtag lists.",
        "longDescription": "Comprehensive review of Predis AI, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://predis.ai",
        "domain": "predis.ai",
        "brandColor": "#3B1EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-28T09:46:08.862Z",
        "tags": [
            "Social designs",
            "Auto Reel creator",
            "Calendar scheduler"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "ocoya",
        "name": "Ocoya",
        "description": "Create graphics, generate copy, and schedule multi-channel campaigns within clicks.",
        "longDescription": "Comprehensive review of Ocoya, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://ocoya.com",
        "domain": "ocoya.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-03T17:18:27.509Z",
        "tags": [
            "Graphic templates",
            "Caption planner",
            "SaaS manager"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "buffer-ai",
        "name": "Buffer AI",
        "description": "Enriches Buffer's queue with smart generators for draft replies and scheduling.",
        "longDescription": "Comprehensive review of Buffer AI, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://buffer.com",
        "domain": "buffer.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-16T18:28:10.024Z",
        "tags": [
            "Social queue",
            "Topic mapping",
            "Thread scheduler"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hootsuite-ai",
        "name": "Hootsuite AI",
        "description": "Enables teams to track brand mentions, schedule social posts, and summarize reviews.",
        "longDescription": "Comprehensive review of Hootsuite AI, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://hootsuite.com",
        "domain": "hootsuite.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-03-11T15:07:19.480Z",
        "tags": [
            "Outbound dashboard",
            "Auditor",
            "Competitor tracker"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "feedhive",
        "name": "FeedHive",
        "description": "Clean publisher interface using virality scoring to optimize post times.",
        "longDescription": "Comprehensive review of FeedHive, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://feedhive.com",
        "domain": "feedhive.com",
        "brandColor": "#FA4D2B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-09T11:55:58.989Z",
        "tags": [
            "Virality scoring",
            "Thread builder",
            "Auto retweet queue"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "taplio",
        "name": "Taplio",
        "description": "LinkedIn growth tool with viral post templates, scheduling, and lead databases.",
        "longDescription": "Comprehensive review of Taplio, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://taplio.com",
        "domain": "taplio.com",
        "brandColor": "#007DFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-08T14:18:07.765Z",
        "tags": [
            "LinkedIn growth",
            "Engagement CRM",
            "Carousel creator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "tweet-hunter",
        "name": "Tweet Hunter",
        "description": "Analyze high-performing tweets to scale your personal brand on X.",
        "longDescription": "Comprehensive review of Tweet Hunter, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://tweethunter.io",
        "domain": "tweethunter.io",
        "brandColor": "#1D9BF0",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-10T05:02:13.917Z",
        "tags": [
            "Twitter scheduler",
            "Engagement assistant",
            "Viral hooks"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "vista-social",
        "name": "Vista Social AI",
        "description": "Consolidated agency social workspace with automated customer support replies.",
        "longDescription": "Comprehensive review of Vista Social AI, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2022, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://vistasocial.com",
        "domain": "vistasocial.com",
        "brandColor": "#0E9F6E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-05T04:00:06.579Z",
        "tags": [
            "Team dashboard",
            "Review tracker",
            "AI writer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "publer-ai",
        "name": "Publer AI",
        "description": "Vibrant visual scheduler with hashtag helpers and blog recycling rules.",
        "longDescription": "Comprehensive review of Publer AI, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://publer.io",
        "domain": "publer.io",
        "brandColor": "#0083FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-09T14:20:41.308Z",
        "tags": [
            "Hashtag helper",
            "Pinterest tool",
            "SaaS automation"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "contentstudio",
        "name": "ContentStudio",
        "description": "Curate viral industry articles, write social captions, and queue posts in advance.",
        "longDescription": "Comprehensive review of ContentStudio, including features, user experience, and key performance reviews in AI Social Media Tools. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Social Media Tools",
        "url": "https://contentstudio.io",
        "domain": "contentstudio.io",
        "brandColor": "#2B5CFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-08T00:24:25.464Z",
        "tags": [
            "Blog recycling",
            "Influencer search",
            "Curation engine"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Social Media Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "superhuman-ai",
        "name": "Superhuman AI",
        "description": "The fastest email client in the world, drafting clear context replies in seconds.",
        "longDescription": "Comprehensive review of Superhuman AI, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://superhuman.com",
        "domain": "superhuman.com",
        "brandColor": "#E021A4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-12T05:08:41.124Z",
        "tags": [
            "Fast client",
            "Draft expander",
            "Instant calendar"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "shortwave",
        "name": "Shortwave",
        "description": "Convert cluttered Gmail folders into crisp lists of summaries and tasks.",
        "longDescription": "Comprehensive review of Shortwave, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://shortwave.com",
        "domain": "shortwave.com",
        "brandColor": "#0A0A0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-11T17:53:07.635Z",
        "tags": [
            "Inbox summarizer",
            "Task schedules",
            "Clean gmail"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "flowrite",
        "name": "Flowrite",
        "description": "Converts brief bullet points into fully formatted, customized email drafts.",
        "longDescription": "Comprehensive review of Flowrite, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://flowrite.com",
        "domain": "flowrite.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-29T05:10:49.036Z",
        "tags": [
            "Bullet compiler",
            "Tone settings",
            "Outbound template"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "lavender-ai",
        "name": "Lavender AI",
        "description": "Sales email assistant scoring layouts based on response chance.",
        "longDescription": "Comprehensive review of Lavender AI, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://lavender.ai",
        "domain": "lavender.ai",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-19T21:54:12.394Z",
        "tags": [
            "Sales scoring",
            "Tone checker",
            "Inbox stats"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "sanebox",
        "name": "SaneBox",
        "description": "Sorts non-essential newsletters into separate archives dynamically.",
        "longDescription": "Comprehensive review of SaneBox, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2011, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://sanebox.com",
        "domain": "sanebox.com",
        "brandColor": "#FF9900",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-20T16:58:11.732Z",
        "tags": [
            "Folder sorter",
            "Newsletter binder",
            "Do-not-disturb"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2011
    },
    {
        "id": "mailbutler",
        "name": "Mailbutler",
        "description": "Apple and Outlook add-on to summarize threads and track read states.",
        "longDescription": "Comprehensive review of Mailbutler, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2015, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://mailbutler.io",
        "domain": "mailbutler.io",
        "brandColor": "#2A9D8F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-05-18T01:04:48.306Z",
        "tags": [
            "SDR tracker",
            "Email signature",
            "Template notes"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "missive-ai",
        "name": "Missive AI",
        "description": "Cooperative shared inbox workspace integrating prompt templates for team consensus.",
        "longDescription": "Comprehensive review of Missive AI, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://missiveapp.com",
        "domain": "missiveapp.com",
        "brandColor": "#0A83FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-06T01:44:18.168Z",
        "tags": [
            "Shared team client",
            "Live chat support",
            "Custom templates"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "fyxer-ai",
        "name": "Fyxer AI",
        "description": "Executive partner agent sorting priorities and queueing responses.",
        "longDescription": "Comprehensive review of Fyxer AI, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://fyxer.ai",
        "domain": "fyxer.ai",
        "brandColor": "#FB7185",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-18T19:11:56.113Z",
        "tags": [
            "Executive assistant",
            "Action tasking",
            "SaaS inbox planner"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "ellie-ai",
        "name": "Ellie AI",
        "description": "Chrome expansion that drafting intuitive email responses styled after your tone.",
        "longDescription": "Comprehensive review of Ellie AI, including features, user experience, and key performance reviews in AI Email Assistants. Built in 2022, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Email Assistants",
        "url": "https://ellie.ai",
        "domain": "ellie.ai",
        "brandColor": "#06B6D4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-29T14:45:13.405Z",
        "tags": [
            "Chat mimic",
            "Paragraph reader",
            "Bilingual translator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Email Assistants business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "framer-web-builder",
        "name": "Framer AI",
        "description": "Design animated landing blocks and websites rapidly utilizing Framer's editor.",
        "longDescription": "Comprehensive review of Framer AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://framer.com",
        "domain": "framer.com",
        "brandColor": "#0055FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-17T00:49:58.212Z",
        "tags": [
            "Interaction designer",
            "Canvas",
            "Marketing pages"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "wix-ai",
        "name": "Wix AI",
        "description": "Wix's prompt generator compiles multi page structures with catalogs and booking tools.",
        "longDescription": "Comprehensive review of Wix AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://wix.com",
        "domain": "wix.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-18T07:17:45.412Z",
        "tags": [
            "Instant page",
            "SaaS client booking",
            "Store catalog"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "durable",
        "name": "Durable AI",
        "description": "A great companion to generate complete startup and service websites in seconds.",
        "longDescription": "Comprehensive review of Durable AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://durable.co",
        "domain": "durable.co",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-28T14:17:20.668Z",
        "tags": [
            "Instant local site",
            "Invoicing",
            "SEO copy"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "10web",
        "name": "10Web",
        "description": "Translate generic URLs into fully editable Elementor layouts in seconds.",
        "longDescription": "Comprehensive review of 10Web, including features, user experience, and key performance reviews in AI Website Builders. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://10web.io",
        "domain": "10web.io",
        "brandColor": "#1E3B8B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-16T11:22:06.706Z",
        "tags": [
            "WordPress cloning",
            "Elementor builder",
            "Host services"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "hostinger-ai",
        "name": "Hostinger AI Builder",
        "description": "Hostinger's site designer compiling pages with payment checkouts.",
        "longDescription": "Comprehensive review of Hostinger AI Builder, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://hostinger.com",
        "domain": "hostinger.com",
        "brandColor": "#673DE6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-03T12:20:17.962Z",
        "tags": [
            "Web host",
            "Store checkout",
            "Logo helper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "jimdo-ai",
        "name": "Jimdo AI",
        "description": "A beginner-friendly portfolio compiler with automatic legal text settings.",
        "longDescription": "Comprehensive review of Jimdo AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://jimdo.com",
        "domain": "jimdo.com",
        "brandColor": "#0062FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-18T12:26:28.472Z",
        "tags": [
            "No-code portfolio",
            "Store blocks",
            "Legal disclaimer"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "webflow-ai",
        "name": "Webflow AI",
        "description": "Webflow's smart helper optimizing layout classes, tags, and CMS pages.",
        "longDescription": "Comprehensive review of Webflow AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Website Builders",
        "url": "https://webflow.com",
        "domain": "webflow.com",
        "brandColor": "#4353FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-16T03:30:50.291Z",
        "tags": [
            "Style classes logs",
            "CMS list",
            "Web interactions"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "relume-ai",
        "name": "Relume AI",
        "description": "Outstanding sitemap and wireframe modeler exporting pristine Figma layouts.",
        "longDescription": "Comprehensive review of Relume AI, including features, user experience, and key performance reviews in AI Website Builders. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "UI/UX & Design Tools",
        "url": "https://relume.io",
        "domain": "relume.io",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-20T01:53:57.604Z",
        "tags": [
            "Wireframe outline",
            "Figma design blocks",
            "Sitemap"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Website Builders business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "intercom-fin",
        "name": "Intercom Fin",
        "description": "Accurately references help manuals to resolve customer issues instantly.",
        "longDescription": "Comprehensive review of Intercom Fin, including features, user experience, and key performance reviews in Customer Support. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Chatbot Creator Tools",
        "url": "https://intercom.com",
        "domain": "intercom.com",
        "brandColor": "#005CFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-07-07T07:17:28.432Z",
        "tags": [
            "Instant responder",
            "Knowledge syncing",
            "Ticket logger"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "zendesk-ai",
        "name": "Zendesk AI",
        "description": "Flags customer intent and updates reply tones in real time.",
        "longDescription": "Comprehensive review of Zendesk AI, including features, user experience, and key performance reviews in Customer Support. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Customer Support",
        "url": "https://zendesk.com",
        "domain": "zendesk.com",
        "brandColor": "#033640",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-03T23:36:57.079Z",
        "tags": [
            "Sentiment checker",
            "Dynamic routing",
            "Helpdesk summary"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "tidio",
        "name": "Tidio AI",
        "description": "Lyro bot answering common store user queries from handbook links.",
        "longDescription": "Comprehensive review of Tidio AI, including features, user experience, and key performance reviews in Customer Support. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Chatbot Creator Tools",
        "url": "https://tidio.com",
        "domain": "tidio.com",
        "brandColor": "#004FFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-29T06:27:44.740Z",
        "tags": [
            "Lyro chatbot",
            "Live chat widgets",
            "E-commerce bots"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "chatbase",
        "name": "Chatbase",
        "description": "Upload manuals and files to build custom chat widgets in clicks.",
        "longDescription": "Comprehensive review of Chatbase, including features, user experience, and key performance reviews in Customer Support. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Chatbot Creator Tools",
        "url": "https://chatbase.co",
        "domain": "chatbase.co",
        "brandColor": "#050518",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-24T13:21:37.786Z",
        "tags": [
            "Embedded script",
            "Folder upload",
            "Lead logger"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "botpress",
        "name": "Botpress",
        "description": "Flowchart canvas allows teams to build complex chatbot helpers.",
        "longDescription": "Comprehensive review of Botpress, including features, user experience, and key performance reviews in Customer Support. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Chatbot Creator Tools",
        "url": "https://botpress.com",
        "domain": "botpress.com",
        "brandColor": "#3F3F56",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-29T04:43:38.343Z",
        "tags": [
            "Flowchart canvas",
            "Language routing",
            "Database links"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "voiceflow",
        "name": "Voiceflow",
        "description": "Visually construct dialogue trees and export working customer support blocks.",
        "longDescription": "Comprehensive review of Voiceflow, including features, user experience, and key performance reviews in Customer Support. Built in 2019, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Chatbot Creator Tools",
        "url": "https://voiceflow.com",
        "domain": "voiceflow.com",
        "brandColor": "#EF4452",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-17T23:25:21.181Z",
        "tags": [
            "Dialogue tree designer",
            "Cooperative prototype",
            "Support logs"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "freshdesk-ai",
        "name": "Freshdesk AI",
        "description": "Freddy AI companion summarizes tickets and drafts support templates.",
        "longDescription": "Comprehensive review of Freshdesk AI, including features, user experience, and key performance reviews in Customer Support. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Customer Support",
        "url": "https://freshworks.com",
        "domain": "freshworks.com",
        "brandColor": "#007DFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-15T12:30:03.352Z",
        "tags": [
            "Freddy bot helper",
            "Agent helper",
            "Ticket sorter"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "ada-ai-support",
        "name": "Ada AI",
        "description": "Automate complex enterprise client requests like account resets and bookings.",
        "longDescription": "Comprehensive review of Ada AI, including features, user experience, and key performance reviews in Customer Support. Built in 2016, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Customer Support",
        "url": "https://ada.cx",
        "domain": "ada.cx",
        "brandColor": "#4B0082",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-16T22:47:16.556Z",
        "tags": [
            "Enterprise bot",
            "CRM routing",
            "Account settings"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "crisp-ai",
        "name": "Crisp AI",
        "description": "Simplifies live chat queues with automated help article linking.",
        "longDescription": "Comprehensive review of Crisp AI, including features, user experience, and key performance reviews in Customer Support. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Customer Support",
        "url": "https://crisp.chat",
        "domain": "crisp.chat",
        "brandColor": "#1A56F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-29T12:31:59.718Z",
        "tags": [
            "Vibe reply mimic",
            "Article recommender",
            "Translated logs"
        ],
        "useCases": [
            "Accelerating workflows in standard Customer Support business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "ramp-ai",
        "name": "Ramp AI",
        "description": "Corporate expense program automatically categorizing card receipts and cost leaks.",
        "longDescription": "Comprehensive review of Ramp AI, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://ramp.com",
        "domain": "ramp.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-27T07:47:30.462Z",
        "tags": [
            "Expense checker",
            "Receipt match logger",
            "Cost auditor"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "brex-ai",
        "name": "Brex AI",
        "description": "Ensures legal budget limit compliance on travel plans.",
        "longDescription": "Comprehensive review of Brex AI, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://brex.com",
        "domain": "brex.com",
        "brandColor": "#FF4A00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-09T17:31:32.998Z",
        "tags": [
            "Travel bills audit",
            "Budget tracker",
            "VAT match"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "vic-ai",
        "name": "Vic.ai",
        "description": "Automates complex accounts payable tasks by copying invoices directly into ledgers.",
        "longDescription": "Comprehensive review of Vic.ai, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://vic.ai",
        "domain": "vic.ai",
        "brandColor": "#0D2240",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-14T03:47:24.395Z",
        "tags": [
            "Invoice ledger",
            "Vendor logs check",
            "Tax rules"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "booke-ai",
        "name": "Booke AI",
        "description": "Fixes multi category booking mistakes in Quickbooks reports.",
        "longDescription": "Comprehensive review of Booke AI, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2021, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://booke.ai",
        "domain": "booke.ai",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-03-20T23:07:42.033Z",
        "tags": [
            "Quickbooks sync",
            "Receipt scanner",
            "Anomaly check"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "datarails-ai",
        "name": "Datarails AI",
        "description": "Translates standard offline financial sheets into synchronized cloud folders.",
        "longDescription": "Comprehensive review of Datarails AI, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://datarails.com",
        "domain": "datarails.com",
        "brandColor": "#00D28F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-28T11:37:30.940Z",
        "tags": [
            "Excel templates helper",
            "FP&A reports",
            "Figures compiler"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "fathom-finance",
        "name": "Fathom Finance",
        "description": "Generates clear visual dashboard charts explaining performance files.",
        "longDescription": "Comprehensive review of Fathom Finance, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://fathomhq.com",
        "domain": "fathomhq.com",
        "brandColor": "#FF3F66",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-12T14:17:38.789Z",
        "tags": [
            "Shareholder slides",
            "Tax sheets",
            "Growth matrices"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "digits-ai",
        "name": "Digits AI",
        "description": "Provides instantly updated accounting reports and interactive graph dashboards.",
        "longDescription": "Comprehensive review of Digits AI, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://digits.com",
        "domain": "digits.com",
        "brandColor": "#00AAFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-23T15:39:38.913Z",
        "tags": [
            "Realtime reports",
            "Ledgers graph",
            "Cost parser"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "finaloop",
        "name": "Finaloop",
        "description": "Fully automated bookkeeper tailored for direct-to-consumer e-commerce players.",
        "longDescription": "Comprehensive review of Finaloop, including features, user experience, and key performance reviews in Business & Finance AI. Built in 2020, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Business & Finance AI",
        "url": "https://finaloop.com",
        "domain": "finaloop.com",
        "brandColor": "#FA3B00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-13T06:47:22.377Z",
        "tags": [
            "Shopify books",
            "Payment gateway log",
            "Ecom stats"
        ],
        "useCases": [
            "Accelerating workflows in standard Business & Finance AI business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "eightfold-ai",
        "name": "Eightfold AI",
        "description": "Enterprise platform mapping team skills and finding career progression tracks.",
        "longDescription": "Comprehensive review of Eightfold AI, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2016, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://eightfold.ai",
        "domain": "eightfold.ai",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-16T07:27:11.423Z",
        "tags": [
            "Workforce planners",
            "Talent indexing",
            "Skill map"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "hirevue-ai",
        "name": "HireVue AI",
        "description": "Integrates specialized coding tasks and online assessments for high volume hiring.",
        "longDescription": "Comprehensive review of HireVue AI, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2015, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://hirevue.com",
        "domain": "hirevue.com",
        "brandColor": "#0062FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-02T08:22:20.471Z",
        "tags": [
            "Video scanner",
            "Skill challenges",
            "Role fit scoring"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "paradox-olivia",
        "name": "Paradox Olivia",
        "description": "Recruiting assistant Olivia chats with job candidates over text to organize interviews.",
        "longDescription": "Comprehensive review of Paradox Olivia, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2016, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://paradox.ai",
        "domain": "paradox.ai",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-01T16:12:31.815Z",
        "tags": [
            "Olivia chat app",
            "SMS scheduler",
            "Onboarding logs"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "seekout-ai",
        "name": "SeekOut AI",
        "description": "Allows technical recruiters to find passive engineers and niche researchers.",
        "longDescription": "Comprehensive review of SeekOut AI, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2017, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://seekout.com",
        "domain": "seekout.com",
        "brandColor": "#1E3B8B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-05T22:25:51.973Z",
        "tags": [
            "Outreach SDR",
            "Engineer scout",
            "Patent records"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "fetcher-ai",
        "name": "Fetcher AI",
        "description": "Scouts job candidates and sends personalized follow-up emails.",
        "longDescription": "Comprehensive review of Fetcher AI, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2017, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://fetcher.ai",
        "domain": "fetcher.ai",
        "brandColor": "#3B1EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-16T13:21:40.703Z",
        "tags": [
            "Auto outreach folder",
            "Drip message",
            "Lead dashboard"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2017
    },
    {
        "id": "manatal-ai",
        "name": "Manatal AI",
        "description": "Intuitive ATS software parser matching candidate profiles with open jobs.",
        "longDescription": "Comprehensive review of Manatal AI, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://manatal.com",
        "domain": "manatal.com",
        "brandColor": "#00E0A6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-13T09:03:20.210Z",
        "tags": [
            "ATS CRM",
            "Social profile scanner",
            "Hire checklist"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "textio",
        "name": "Textio",
        "description": "Flags gender bias and jargon in job descriptions to attract diverse talent.",
        "longDescription": "Comprehensive review of Textio, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2014, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://textio.com",
        "domain": "textio.com",
        "brandColor": "#00C39C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-04T00:32:05.075Z",
        "tags": [
            "Bias check",
            "Tone suggestions",
            "JD optimizer"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2014
    },
    {
        "id": "skillate",
        "name": "Skillate",
        "description": "Resume parsing AI offering candidate matching and automated screening.",
        "longDescription": "Comprehensive review of Skillate, including features, user experience, and key performance reviews in HR & Recruiting. Built in 2016, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "HR & Recruiting",
        "url": "https://skillate.com",
        "domain": "skillate.com",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-01-19T01:07:29.814Z",
        "tags": [
            "Resume matching",
            "Anonymizer logs",
            "HR tables"
        ],
        "useCases": [
            "Accelerating workflows in standard HR & Recruiting business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "datarobot",
        "name": "DataRobot",
        "description": "Enterprise AutoML workspace to build, check, and monitor forecasting algorithms.",
        "longDescription": "Comprehensive review of DataRobot, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2012, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://datarobot.com",
        "domain": "datarobot.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-11T04:43:01.750Z",
        "tags": [
            "AutoML modeler",
            "Feature mapper",
            "Cloud deploy"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2012
    },
    {
        "id": "h2o-ai",
        "name": "H2O.ai",
        "description": "Highly customizable model sandbox for predictive fraud and risk telemetry scoring.",
        "longDescription": "Comprehensive review of H2O.ai, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2012, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://h2o.ai",
        "domain": "h2o.ai",
        "brandColor": "#0D2240",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Open Source",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-02T11:10:01.062Z",
        "tags": [
            "LLM fine tuning",
            "Forecasting",
            "H2O driverless"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2012
    },
    {
        "id": "obviously-ai",
        "name": "Obviously AI",
        "description": "Build machine learning models from spreadsheet spreadsheets without coding.",
        "longDescription": "Comprehensive review of Obviously AI, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2018, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://obviously.ai",
        "domain": "obviously.ai",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-24T04:27:25.917Z",
        "tags": [
            "No-code prediction",
            "SaaS client logs",
            "CSV tables import"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "julius-ai",
        "name": "Julius AI",
        "description": "Chat assistant that writes clean Python code to graph and clean custom charts.",
        "longDescription": "Comprehensive review of Julius AI, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://julius.ai",
        "domain": "julius.ai",
        "brandColor": "#014B3E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-08T21:03:32.371Z",
        "tags": [
            "Chat spreadsheet data",
            "R scripts editor",
            "Python canvas"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "akkio",
        "name": "Akkio",
        "description": "A clean dashboard designed for marketing teams to model customer behavior.",
        "longDescription": "Comprehensive review of Akkio, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2020, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://akkio.com",
        "domain": "akkio.com",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-23T23:37:47.293Z",
        "tags": [
            "Interactive metrics",
            "SDR tracker",
            "Dashboard analytics"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "tableau-ai",
        "name": "Tableau AI",
        "description": "Enriches the Tableau ecosystem with automated slide descriptions and charts.",
        "longDescription": "Comprehensive review of Tableau AI, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://tableau.com",
        "domain": "tableau.com",
        "brandColor": "#E090F1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-11T23:57:16.864Z",
        "tags": [
            "Salesforce dashboard",
            "Viz panels",
            "Data prep"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "power-bi-copilot",
        "name": "Power BI Copilot",
        "description": "Generates custom DAX code and dashboard panels for business teams.",
        "longDescription": "Comprehensive review of Power BI Copilot, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://powerbi.microsoft.com",
        "domain": "microsoft.com",
        "brandColor": "#F2C811",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-02T10:33:51.593Z",
        "tags": [
            "DAX helpers",
            "Corporate analytics",
            "SQL tables viewer"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "polymer-search",
        "name": "Polymer Search",
        "description": "Converts chaotic spreadsheets into beautiful, searchable interactive directories.",
        "longDescription": "Comprehensive review of Polymer Search, including features, user experience, and key performance reviews in Data Science & Analytics. Built in 2021, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Data Science & Analytics",
        "url": "https://polymerproject.org",
        "domain": "google.com",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-26T17:02:25.325Z",
        "tags": [
            "Graph logs generator",
            "CSV catalog organizer",
            "Metrics tracker"
        ],
        "useCases": [
            "Accelerating workflows in standard Data Science & Analytics business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "glass-health",
        "name": "Glass Health",
        "description": "Clinical reasoning assistant for doctors, drafting diagnostics from symptom lists.",
        "longDescription": "Comprehensive review of Glass Health, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://glass.health",
        "domain": "glass.health",
        "brandColor": "#006BFE",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-18T17:13:13.536Z",
        "tags": [
            "Clinical reasoning",
            "Schema logs advisor",
            "Diagnostics paper"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "ada-health",
        "name": "Ada Health",
        "description": "CE-certified symptom checker assessing risks and suggesting next steps.",
        "longDescription": "Comprehensive review of Ada Health, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2011, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://ada.com",
        "domain": "ada.com",
        "brandColor": "#0A83FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-29T02:29:50.370Z",
        "tags": [
            "Symptom checker",
            "Doctor finder",
            "Medical files"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2011
    },
    {
        "id": "hippocratic-ai",
        "name": "Hippocratic AI",
        "description": "Empathy-driven virtual care agents supporting appointment planning and follow-ups.",
        "longDescription": "Comprehensive review of Hippocratic AI, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://hippocraticai.com",
        "domain": "hippocraticai.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-04T14:46:35.518Z",
        "tags": [
            "Clinician nurse bot",
            "Care tracking",
            "Legal HIPAA safe"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "abridge",
        "name": "Abridge",
        "description": "Listens to patient check-ups of doctors to format clinical notes for EMRs.",
        "longDescription": "Comprehensive review of Abridge, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2018, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://abridge.com",
        "domain": "abridge.com",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-05-17T00:03:43.080Z",
        "tags": [
            "Medical notes dictation",
            "EMR database",
            "Physician guide"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "nabla",
        "name": "Nabla",
        "description": "Speedy copilot transcribing patient conversations into structured notes.",
        "longDescription": "Comprehensive review of Nabla, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2018, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://nabla.com",
        "domain": "nabla.com",
        "brandColor": "#FF1F62",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-15T05:44:24.592Z",
        "tags": [
            "Symptom summaries",
            "EMR dashboard",
            "Copilot app"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "freed-ai",
        "name": "Freed AI",
        "description": "A secure assistant that listens to patient check-ups to write standard medical history.",
        "longDescription": "Comprehensive review of Freed AI, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://getfreed.ai",
        "domain": "getfreed.ai",
        "brandColor": "#014B3E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-17T20:07:07.326Z",
        "tags": [
            "Acoustic dictation",
            "EMR checklist",
            "Daily schedule advisor"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "openevidence",
        "name": "OpenEvidence",
        "description": "Expert search tool providing cited references from professional clinical journals.",
        "longDescription": "Comprehensive review of OpenEvidence, including features, user experience, and key performance reviews in AI Healthcare Tools. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Healthcare Tools",
        "url": "https://openevidence.com",
        "domain": "openevidence.com",
        "brandColor": "#2B5CFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-12T13:40:26.748Z",
        "tags": [
            "Clinical evidence search",
            "Medical consensus checker",
            "Doctor guidelines"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Healthcare Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "darktrace",
        "name": "Darktrace",
        "description": "Threat management suite detecting and blocking system anomalies in real time.",
        "longDescription": "Comprehensive review of Darktrace, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2013, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://darktrace.com",
        "domain": "darktrace.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-13T10:21:03.010Z",
        "tags": [
            "Autonomous security",
            "Anomalies tracker",
            "Email scan"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2013
    },
    {
        "id": "crowdstrike-charlotte",
        "name": "CrowdStrike Charlotte AI",
        "description": "Charlotte companion helps analysts track threats and compile system reports.",
        "longDescription": "Comprehensive review of CrowdStrike Charlotte AI, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://crowdstrike.com",
        "domain": "crowdstrike.com",
        "brandColor": "#FF0000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-31T03:23:56.738Z",
        "tags": [
            "Charlotte agent",
            "Malware blocks",
            "Log analytics"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "microsoft-security-copilot",
        "name": "Microsoft Security Copilot",
        "description": "Integrates threat intel directly inside corporate cloud defense frameworks.",
        "longDescription": "Comprehensive review of Microsoft Security Copilot, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://microsoft.com",
        "domain": "microsoft.com",
        "brandColor": "#00A4EF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-03T22:10:38.250Z",
        "tags": [
            "Sentinel rules tracker",
            "Attack vector map",
            "Incident report"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sentinelone-purple",
        "name": "SentinelOne Purple AI",
        "description": "Threat hunting assistant that queries end point logs to fix system breaches.",
        "longDescription": "Comprehensive review of SentinelOne Purple AI, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://sentinelone.com",
        "domain": "sentinelone.com",
        "brandColor": "#E1523D",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-11T05:09:18.257Z",
        "tags": [
            "Endpoint log scan",
            "Automated patch",
            "Incident log"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "vectra-ai",
        "name": "Vectra AI",
        "description": "Threat monitoring tool logging anomalous user sessions on SaaS platforms.",
        "longDescription": "Comprehensive review of Vectra AI, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2008, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://vectra.ai",
        "domain": "vectra.ai",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-04T05:38:43.058Z",
        "tags": [
            "Cloud logs check",
            "Lateral trace network",
            "Threat score"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2008
    },
    {
        "id": "abnormal-security",
        "name": "Abnormal Security",
        "description": "Stops inbound social engineering and executive mimic attacks.",
        "longDescription": "Comprehensive review of Abnormal Security, including features, user experience, and key performance reviews in AI Cybersecurity Tools. Built in 2018, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "AI Cybersecurity Tools",
        "url": "https://abnormalsecurity.com",
        "domain": "abnormalsecurity.com",
        "brandColor": "#FF5200",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-23T03:34:26.421Z",
        "tags": [
            "Phishing filter",
            "CEO mimic log blocker",
            "Email scan"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Cybersecurity Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "zillow-ai",
        "name": "Zillow AI",
        "description": "Enriches the Zillow dashboard search with direct descriptions and automated tags.",
        "longDescription": "Comprehensive review of Zillow AI, including features, user experience, and key performance reviews in AI Real Estate Tools. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Real Estate Tools",
        "url": "https://zillow.com",
        "domain": "zillow.com",
        "brandColor": "#006AFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-04T13:18:10.149Z",
        "tags": [
            "Interactive search",
            "Home value forecast",
            "Floor plan creator"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Real Estate Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "restb-ai",
        "name": "Restb.ai",
        "description": "Scans property photos to automatically tag fireplace types and granite counters.",
        "longDescription": "Comprehensive review of Restb.ai, including features, user experience, and key performance reviews in AI Real Estate Tools. Built in 2015, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Real Estate Tools",
        "url": "https://restb.ai",
        "domain": "restb.ai",
        "brandColor": "#1E3A8A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-02T14:57:55.395Z",
        "tags": [
            "Listing tagging",
            "Damage scanner",
            "MLS database sync"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Real Estate Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "reimaginehome",
        "name": "REimagineHome AI",
        "description": "Re-imagines physical spaces of empty properties with virtual staging.",
        "longDescription": "Comprehensive review of REimagineHome AI, including features, user experience, and key performance reviews in AI Real Estate Tools. Built in 2022, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Real Estate Tools",
        "url": "https://reimaginehome.ai",
        "domain": "reimaginehome.ai",
        "brandColor": "#E0218A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": true,
        "dateAdded": "2026-02-02T16:25:26.691Z",
        "tags": [
            "Virtual stager",
            "Color customizer",
            "Furniture blocks"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Real Estate Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "epique-ai",
        "name": "Epique AI",
        "description": "Fabulous platform drafting property descriptions and local flyers for agents.",
        "longDescription": "Comprehensive review of Epique AI, including features, user experience, and key performance reviews in AI Real Estate Tools. Built in 2023, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI Real Estate Tools",
        "url": "https://epique.ai",
        "domain": "epique.ai",
        "brandColor": "#046A38",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-17T04:25:44.631Z",
        "tags": [
            "Brochure generator",
            "Legal contract helper",
            "SDR emails"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Real Estate Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "housecanary",
        "name": "HouseCanary",
        "description": "Combines predictive analytics to estimate accurate listing valuations.",
        "longDescription": "Comprehensive review of HouseCanary, including features, user experience, and key performance reviews in AI Real Estate Tools. Built in 2013, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Real Estate Tools",
        "url": "https://housecanary.com",
        "domain": "housecanary.com",
        "brandColor": "#FF9900",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-23T17:20:06.937Z",
        "tags": [
            "Valuation index",
            "Risk scoring metrics",
            "Real estate tables"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Real Estate Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2013
    },
    {
        "id": "shopify-magic",
        "name": "Shopify Magic",
        "description": "Draft product catalogs and manage customer support directly inside shop dashboards.",
        "longDescription": "Comprehensive review of Shopify Magic, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://shopify.com",
        "domain": "shopify.com",
        "brandColor": "#96BF48",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-24T20:03:40.904Z",
        "tags": [
            "Product descriptions creator",
            "Discount scheduler",
            "Email followups"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "clerk-io",
        "name": "Clerk.io",
        "description": "Provides specialized search fields and smart suggestions that boost checkouts.",
        "longDescription": "Comprehensive review of Clerk.io, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2011, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://clerk.io",
        "domain": "clerk.io",
        "brandColor": "#2B52F1",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-20T02:20:31.042Z",
        "tags": [
            "Cross seller",
            "Search box helper",
            "Inbox marketing"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2011
    },
    {
        "id": "visenze-ai",
        "name": "ViSenze AI",
        "description": "Directly matches screenshots of prospective buyers with store inventory.",
        "longDescription": "Comprehensive review of ViSenze AI, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2012, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://visenze.com",
        "domain": "visenze.com",
        "brandColor": "#00E0A6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-21T05:46:43.053Z",
        "tags": [
            "Visual search box",
            "Similar clothing",
            "Visual tags"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2012
    },
    {
        "id": "vue-ai",
        "name": "Vue.ai",
        "description": "Virtual avatar dressing systems updating product catalogs in clicks.",
        "longDescription": "Comprehensive review of Vue.ai, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2016, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://vue.ai",
        "domain": "vue.ai",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-23T16:33:00.724Z",
        "tags": [
            "Model stager clothing",
            "Catalog analyzer",
            "Pricing tool"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2016
    },
    {
        "id": "lily-ai",
        "name": "Lily AI",
        "description": "Identifies subjective shopper emotions to match catalogs with customer context.",
        "longDescription": "Comprehensive review of Lily AI, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2015, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://lily.ai",
        "domain": "lily.ai",
        "brandColor": "#FA3B00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-23T22:54:25.292Z",
        "tags": [
            "Emotion buyer mapper",
            "Feminine tags",
            "DTC tables"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2015
    },
    {
        "id": "nosto-ai",
        "name": "Nosto AI",
        "description": "Tailors homepage hero banners and banners based on user purchase history.",
        "longDescription": "Comprehensive review of Nosto AI, including features, user experience, and key performance reviews in AI Ecommerce Tools. Built in 2011, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Ecommerce Tools",
        "url": "https://nosto.com",
        "domain": "nosto.com",
        "brandColor": "#111827",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-31T10:13:41.702Z",
        "tags": [
            "Personalized page",
            "Cart abandoner",
            "Dynamic headers"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Ecommerce Tools business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2011
    },
    {
        "id": "merlin",
        "name": "Merlin AI",
        "description": "An integrated portal summarizes Youtube transcripts and drafts replies.",
        "longDescription": "Comprehensive review of Merlin AI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://getmerlin.in",
        "domain": "google.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-08T03:47:04.036Z",
        "tags": [
            "Youtube summary",
            "X copy assistant",
            "Google overlay"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "monica",
        "name": "Monica AI",
        "description": "A sidebar utility hosting major chat models within a single browser extension.",
        "longDescription": "Comprehensive review of Monica AI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://monica.im",
        "domain": "google.com",
        "brandColor": "#0A0B0D",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-26T21:29:12.706Z",
        "tags": [
            "Copilot sidebar",
            "Text selector translate",
            "Aesthetic layout"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sider-ai",
        "name": "Sider AI",
        "description": "A browser copilot helping readers parse contract terms and explain code files.",
        "longDescription": "Comprehensive review of Sider AI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://sider.ai",
        "domain": "google.com",
        "brandColor": "#FB923C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-23T03:08:36.143Z",
        "tags": [
            "Explain coding rules",
            "PDF highlighter reviewer",
            "Translate assistant"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "maxai",
        "name": "MaxAI",
        "description": "Advanced extension that corrects typing flow and summaries Gmail folders.",
        "longDescription": "Comprehensive review of MaxAI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://maxai.me",
        "domain": "google.com",
        "brandColor": "#0062FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-05-09T12:27:37.814Z",
        "tags": [
            "Gmail assistant",
            "Search optimizer",
            "Readability checks"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "harpa-ai",
        "name": "HARPA AI",
        "description": "A browser macro orchestrator that monitors stock levels and price leaks.",
        "longDescription": "Comprehensive review of HARPA AI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://harpa.ai",
        "domain": "google.com",
        "brandColor": "#3B1EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-27T15:19:53.091Z",
        "tags": [
            "Automated web scrapers",
            "Price tracker logs",
            "Macro logs"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "compose-ai",
        "name": "Compose AI",
        "description": "Google Docs styling extension completing sentences sequentially.",
        "longDescription": "Comprehensive review of Compose AI, including features, user experience, and key performance reviews in AI Chrome Extensions. Built in 2020, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "AI Chrome Extensions",
        "url": "https://compose.ai",
        "domain": "google.com",
        "brandColor": "#11C7D5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-10T01:53:46.392Z",
        "tags": [
            "Autocomplete companion",
            "Email lines writer",
            "Cheap text"
        ],
        "useCases": [
            "Accelerating workflows in standard AI Chrome Extensions business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "khanmigo",
        "name": "Khanmigo",
        "description": "Socratic tutoring partner checking calculation homework logic without giving answers.",
        "longDescription": "Comprehensive review of Khanmigo, including features, user experience, and key performance reviews in Learning & Education. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://khanacademy.org",
        "domain": "khanacademy.org",
        "brandColor": "#0083FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-15T08:38:19.416Z",
        "tags": [
            "Socratic tutor",
            "Math equation guide",
            "Syllabus editor"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "duolingo-max",
        "name": "Duolingo Max",
        "description": "Roleplay features simulating life situations with real-time corrections.",
        "longDescription": "Comprehensive review of Duolingo Max, including features, user experience, and key performance reviews in Learning & Education. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://duolingo.com",
        "domain": "duolingo.com",
        "brandColor": "#56CD02",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-22T03:43:49.795Z",
        "tags": [
            "Roleplay dialogue",
            "Explain grammar mistake",
            "Speech test"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "quizlet-ai",
        "name": "Quizlet AI",
        "description": "Enriches study guides with customized test preparations and memory flashcards.",
        "longDescription": "Comprehensive review of Quizlet AI, including features, user experience, and key performance reviews in Learning & Education. Built in 2023, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://quizlet.com",
        "domain": "quizlet.com",
        "brandColor": "#3B2FFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-22T23:30:46.314Z",
        "tags": [
            "Flashcard builder",
            "Syllabus memory organizer",
            "Smart tests"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "socratic",
        "name": "Socratic",
        "description": "A supportive Google learning app that scans photo questions to display maps.",
        "longDescription": "Comprehensive review of Socratic, including features, user experience, and key performance reviews in Learning & Education. Built in 2019, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://socratic.org",
        "domain": "socratic.org",
        "brandColor": "#FA4D2B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-06T16:57:31.690Z",
        "tags": [
            "Google learning app",
            "Photo scan question",
            "Math explanation"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "magicschool-ai",
        "name": "MagicSchool AI",
        "description": "A lifesaver for educators, formatting customized classroom games and lesson plans.",
        "longDescription": "Comprehensive review of MagicSchool AI, including features, user experience, and key performance reviews in Learning & Education. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://magicschool.ai",
        "domain": "magicschool.ai",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-12T17:09:01.422Z",
        "tags": [
            "Teacher templates",
            "Classroom game customizer",
            "IEP goals planner"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "tutor-ai",
        "name": "Tutor AI",
        "description": "Fabulous learning aid structuring custom learning modules out of single tags.",
        "longDescription": "Comprehensive review of Tutor AI, including features, user experience, and key performance reviews in Learning & Education. Built in 2022, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://tutorai.me",
        "domain": "tutorai.me",
        "brandColor": "#00E0A6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-26T04:55:11.772Z",
        "tags": [
            "Module designer",
            "Interactive quizzes",
            "Self pace study"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "studyable",
        "name": "Studyable",
        "description": "Automated essays feedback tool flagging logic flow mistakes and citing targets.",
        "longDescription": "Comprehensive review of Studyable, including features, user experience, and key performance reviews in Learning & Education. Built in 2023, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Learning & Education",
        "url": "https://studyable.app",
        "domain": "studyable.app",
        "brandColor": "#10B990",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-24T04:41:30.828Z",
        "tags": [
            "Essay grader",
            "Study guides maker",
            "Anatomy assistant"
        ],
        "useCases": [
            "Accelerating workflows in standard Learning & Education business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "harvey-ai",
        "name": "Harvey AI",
        "description": "Legal framework helping lawyers browse trial records and draft briefs.",
        "longDescription": "Comprehensive review of Harvey AI, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2022, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://harvey.ai",
        "domain": "harvey.ai",
        "brandColor": "#1F2937",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-20T22:10:24.643Z",
        "tags": [
            "Enterprise legal reviewer",
            "Case match logs",
            "Factual search"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "spellbook",
        "name": "Spellbook",
        "description": "Analyzes contract terms in MS Word, detecting hidden fee traps.",
        "longDescription": "Comprehensive review of Spellbook, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://spellbook.legal",
        "domain": "spellbook.legal",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-09T03:00:30.540Z",
        "tags": [
            "Contract editor",
            "Drafting helper",
            "Anomaly lookup"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "casetext-cocounsel",
        "name": "Casetext CoCounsel",
        "description": "Comprehensive legal companion sorting trial documents and planner.",
        "longDescription": "Comprehensive review of Casetext CoCounsel, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://casetext.com",
        "domain": "casetext.com",
        "brandColor": "#004AD6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-05-31T11:50:05.795Z",
        "tags": [
            "Trial advisor",
            "Deposition planner",
            "Document verification"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "robin-ai",
        "name": "Robin AI",
        "description": "Proactive platform helping companies review commercial NDAs and manage contracts.",
        "longDescription": "Comprehensive review of Robin AI, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2019, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://robinai.com",
        "domain": "robinai.com",
        "brandColor": "#0D2240",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-26T19:30:16.686Z",
        "tags": [
            "NDA reviewer",
            "Contract repository",
            "Margin checker"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2019
    },
    {
        "id": "lexion",
        "name": "Lexion",
        "description": "Operations pipeline helping enterprise departments coordinate compliance checks.",
        "longDescription": "Comprehensive review of Lexion, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2018, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://lexion.ai",
        "domain": "lexion.ai",
        "brandColor": "#2E5BFF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-13T12:09:04.518Z",
        "tags": [
            "Corporate books checker",
            "VAT compliance",
            "Workflow dashboards"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "lawgeex",
        "name": "Lawgeex",
        "description": "Automates corporate contract review to ensure compliance with playbooks.",
        "longDescription": "Comprehensive review of Lawgeex, including features, user experience, and key performance reviews in Legal & Compliance. Built in 2014, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Legal & Compliance",
        "url": "https://lawgeex.com",
        "domain": "lawgeex.com",
        "brandColor": "#FA3B00",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-04T09:06:06.636Z",
        "tags": [
            "Auto NDAs check",
            "Standard parameters logs",
            "Contract check"
        ],
        "useCases": [
            "Accelerating workflows in standard Legal & Compliance business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2014
    },
    {
        "id": "spline-ai",
        "name": "Spline AI",
        "description": "Design outstanding 3D models and interactive web environments from simple commands.",
        "longDescription": "Comprehensive review of Spline AI, including features, user experience, and key performance reviews in 3D & Animation. Built in 2023, this platform has achieved a 4.9/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://spline.design",
        "domain": "spline.design",
        "brandColor": "#E021A4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-29T07:31:20.299Z",
        "tags": [
            "3D visual modeler",
            "Interactive objects",
            "React exports"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "meshy-ai",
        "name": "Meshy AI",
        "description": "Convert text or images into fully gamelike 3D meshes and maps.",
        "longDescription": "Comprehensive review of Meshy AI, including features, user experience, and key performance reviews in 3D & Animation. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://meshy.ai",
        "domain": "meshy.ai",
        "brandColor": "#FF6C37",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-19T16:09:22.915Z",
        "tags": [
            "Text to 3D mesh",
            "Texture mapper",
            "OBJ downloader"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "luma-ai-3d",
        "name": "Luma AI",
        "description": "Generates high fidelity NeRF scenes and Gaussian 3D files from videos.",
        "longDescription": "Comprehensive review of Luma AI, including features, user experience, and key performance reviews in 3D & Animation. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://lumalabs.ai",
        "domain": "lumalabs.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-04T13:11:07.499Z",
        "tags": [
            "3D scan smartphone",
            "NeRF camera views",
            "Splat editor"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "kaedim",
        "name": "Kaedim",
        "description": "Translates stylized flat illustrations into OBJ game files in minutes.",
        "longDescription": "Comprehensive review of Kaedim, including features, user experience, and key performance reviews in 3D & Animation. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://kaedim3d.com",
        "domain": "kaedim3d.com",
        "brandColor": "#0062FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-25T12:55:19.104Z",
        "tags": [
            "2D to OBJ converter",
            "Game files organizer",
            "Polygon optimizer"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "scenario-ai-3d",
        "name": "Scenario AI",
        "description": "Consistent gaming asset generation model, allowing granular fine-tuning.",
        "longDescription": "Comprehensive review of Scenario AI, including features, user experience, and key performance reviews in 3D & Animation. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://scenario.com",
        "domain": "scenario.com",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-22T15:51:45.227Z",
        "tags": [
            "Assets fine tune",
            "Texture generator",
            "Style cataloging"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "masterpiece-x",
        "name": "Masterpiece X",
        "description": "A beginner-friendly tool to quickly skin and rig skeletons of characters.",
        "longDescription": "Comprehensive review of Masterpiece X, including features, user experience, and key performance reviews in 3D & Animation. Built in 2021, this platform has achieved a 4.5/5 rating for reliability and design clarity.",
        "category": "3D & Animation",
        "url": "https://masterpiecex.com",
        "domain": "masterpiecex.com",
        "brandColor": "#10B990",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-08T02:54:31.095Z",
        "tags": [
            "Virtual stagers",
            "Interactive skeletons",
            "FBX downloader"
        ],
        "useCases": [
            "Accelerating workflows in standard 3D & Animation business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "inworld-ai",
        "name": "Inworld AI",
        "description": "Design expressive NPCs that respond with unique personality traits in-game.",
        "longDescription": "Comprehensive review of Inworld AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2021, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://inworld.ai",
        "domain": "inworld.ai",
        "brandColor": "#0B0C10",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-11T23:02:52.477Z",
        "tags": [
            "NPC dialogue trees",
            "Unity engine partner",
            "Blinking mimic"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2021
    },
    {
        "id": "scenario-ai",
        "name": "Scenario AI",
        "description": "Enables designers to train visual styles to produce consistent game assets.",
        "longDescription": "Comprehensive review of Scenario AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2022, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://scenario.com",
        "domain": "scenario.com",
        "brandColor": "#A855F7",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-28T23:57:29.800Z",
        "tags": [
            "Game style consistency",
            "Vector cards",
            "Assets database"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2022
    },
    {
        "id": "leonardo-ai-gaming",
        "name": "Leonardo AI",
        "description": "A great companion to stage fantasy visual environments and conceptual models.",
        "longDescription": "Comprehensive review of Leonardo AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2023, this platform has achieved a 4.8/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://leonardo.ai",
        "domain": "leonardo.ai",
        "brandColor": "#6A0DAD",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-01-15T21:46:34.319Z",
        "tags": [
            "Gamelike models",
            "Fine tune shapes",
            "Concept art"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "charisma-ai",
        "name": "Charisma AI",
        "description": "Construct dialogue maps for cinematic scripts and interactive literature.",
        "longDescription": "Comprehensive review of Charisma AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2018, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://charisma.ai",
        "domain": "charisma.ai",
        "brandColor": "#FA4D2B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-28T14:36:21.066Z",
        "tags": [
            "Interactive stories",
            "Movie dialogue trees",
            "Voiceover integration"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2018
    },
    {
        "id": "rosebud-ai",
        "name": "Rosebud AI",
        "description": "Design responsive browser web games by providing simple text instructions.",
        "longDescription": "Comprehensive review of Rosebud AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2020, this platform has achieved a 4.7/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://rosebud.ai",
        "domain": "rosebud.ai",
        "brandColor": "#00D28F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-31T10:11:18.603Z",
        "tags": [
            "Text to Phaser code",
            "Indie games creator",
            "Web host"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "ludo-ai",
        "name": "Ludo AI",
        "description": "An intelligent brainstorm companion mapping trending game mechanics and layouts.",
        "longDescription": "Comprehensive review of Ludo AI, including features, user experience, and key performance reviews in Gaming & Entertainment. Built in 2020, this platform has achieved a 4.6/5 rating for reliability and design clarity.",
        "category": "Gaming & Entertainment",
        "url": "https://ludo.ai",
        "domain": "ludo.ai",
        "brandColor": "#3B1EF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-02T04:26:48.282Z",
        "tags": [
            "Game stats analyzer",
            "Theme brainstormer",
            "Visual wireframe"
        ],
        "useCases": [
            "Accelerating workflows in standard Gaming & Entertainment business operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2020
    },
    {
        "id": "kickresume",
        "name": "Kickresume",
        "description": "Build your resume and cover letter in minutes with AI.",
        "longDescription": "Comprehensive review of Kickresume, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://kickresume.com",
        "domain": "kickresume.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-17T13:51:08.186Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "rezi",
        "name": "Rezi",
        "description": "AI resume builder tailored for ATS systems.",
        "longDescription": "Comprehensive review of Rezi, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://rezi.ai",
        "domain": "rezi.ai",
        "brandColor": "#EF4444",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-18T23:41:00.291Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "teal",
        "name": "Teal",
        "description": "Career toolkit with an AI resume builder and job tracker.",
        "longDescription": "Comprehensive review of Teal, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://tealhq.com",
        "domain": "tealhq.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-01-26T14:32:30.566Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "resume-io",
        "name": "Resume.io",
        "description": "Professional resumes made easy with AI suggestions.",
        "longDescription": "Comprehensive review of Resume.io, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://resume.io",
        "domain": "resume.io",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-12T13:03:34.798Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "enhancv",
        "name": "Enhancv",
        "description": "Stand out with a modern, AI-assisted resume.",
        "longDescription": "Comprehensive review of Enhancv, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://enhancv.com",
        "domain": "enhancv.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-11T16:39:46.797Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "jobscan",
        "name": "Jobscan",
        "description": "Optimize your resume against ATS using AI.",
        "longDescription": "Comprehensive review of Jobscan, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://jobscan.co",
        "domain": "jobscan.co",
        "brandColor": "#3E4491",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-22T23:21:26.673Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "wonsultingai",
        "name": "WonsultingAI",
        "description": "AI tools for job search and networking.",
        "longDescription": "Comprehensive review of WonsultingAI, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://wonsulting.com",
        "domain": "wonsulting.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-29T19:19:18.721Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "careerflow-ai",
        "name": "Careerflow AI",
        "description": "AI-powered job search copilot.",
        "longDescription": "Comprehensive review of Careerflow AI, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://careerflow.ai",
        "domain": "careerflow.ai",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-06T17:23:06.278Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "huntr",
        "name": "Huntr",
        "description": "Track jobs and build resumes with AI.",
        "longDescription": "Comprehensive review of Huntr, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "AI Resume & Career Tools",
        "url": "https://huntr.co",
        "domain": "huntr.co",
        "brandColor": "#06B6D4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-19T03:27:46.205Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "interview-warmup",
        "name": "Interview Warmup",
        "description": "Practice for job interviews with Google AI.",
        "longDescription": "Comprehensive review of Interview Warmup, including features, user experience, and key performance reviews in AI Resume & Career Tools.",
        "category": "Google",
        "url": "https://grow.google/certificates/interview-warmup",
        "domain": "grow.google",
        "brandColor": "#EA4335",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-06T23:56:47.712Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "manychat",
        "name": "Manychat",
        "description": "Chat marketing powered by AI.",
        "longDescription": "Comprehensive review of Manychat, including features, user experience, and key performance reviews in Chatbot Creator Tools.",
        "category": "Chatbot Creator Tools",
        "url": "https://manychat.com",
        "domain": "manychat.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-12T14:49:30.388Z",
        "tags": [
            "Chatbot",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "landbot",
        "name": "Landbot",
        "description": "Lead generation chatbot builder without code.",
        "longDescription": "Comprehensive review of Landbot, including features, user experience, and key performance reviews in Chatbot Creator Tools.",
        "category": "Chatbot Creator Tools",
        "url": "https://landbot.io",
        "domain": "landbot.io",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-07T17:05:20.218Z",
        "tags": [
            "Chatbot",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "dante-ai",
        "name": "Dante AI",
        "description": "Train an AI on your own data.",
        "longDescription": "Comprehensive review of Dante AI, including features, user experience, and key performance reviews in Chatbot Creator Tools.",
        "category": "Chatbot Creator Tools",
        "url": "https://dante-ai.com",
        "domain": "dante-ai.com",
        "brandColor": "#EF4444",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-20T12:20:50.435Z",
        "tags": [
            "Chatbot",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "customgpt",
        "name": "CustomGPT",
        "description": "Create custom AI models based on business data.",
        "longDescription": "Comprehensive review of CustomGPT, including features, user experience, and key performance reviews in Chatbot Creator Tools.",
        "category": "Chatbot Creator Tools",
        "url": "https://customgpt.ai",
        "domain": "customgpt.ai",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-11T14:35:51.970Z",
        "tags": [
            "Chatbot",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "botsonic",
        "name": "Botsonic",
        "description": "No-code AI chatbot builder by Writesonic.",
        "longDescription": "Comprehensive review of Botsonic, including features, user experience, and key performance reviews in Chatbot Creator Tools.",
        "category": "Chatbot Creator Tools",
        "url": "https://writesonic.com/botsonic",
        "domain": "writesonic.com",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-12T18:07:00.974Z",
        "tags": [
            "Chatbot",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "microsoft-designer",
        "name": "Microsoft Designer",
        "description": "Create stunning designs in a flash with AI.",
        "longDescription": "Comprehensive review of Microsoft Designer, including features, user experience, and key performance reviews in Gen AI Creator Tools.",
        "category": "Gen AI Creator Tools",
        "url": "https://designer.microsoft.com",
        "domain": "designer.microsoft.com",
        "brandColor": "#00A4EF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-09T16:45:00.812Z",
        "tags": [
            "Gen",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "runway",
        "name": "Runway",
        "description": "Advancing creativity with artificial intelligence.",
        "longDescription": "Comprehensive review of Runway, including features, user experience, and key performance reviews in Gen AI Creator Tools.",
        "category": "Gen AI Creator Tools",
        "url": "https://runwayml.com",
        "domain": "runwayml.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-13T12:09:32.282Z",
        "tags": [
            "Gen",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "galileo-ai",
        "name": "Galileo AI",
        "description": "AI for interface design generation.",
        "longDescription": "Comprehensive review of Galileo AI, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://usegalileo.ai",
        "domain": "usegalileo.ai",
        "brandColor": "#3E4491",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-21T01:03:56.306Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "figma-ai",
        "name": "Figma AI",
        "description": "AI features woven into Figma to help you design faster.",
        "longDescription": "Comprehensive review of Figma AI, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://figma.com",
        "domain": "figma.com",
        "brandColor": "#F24E1E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-24T21:00:29.892Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "visily",
        "name": "Visily",
        "description": "AI-powered UI design tool for non-designers.",
        "longDescription": "Comprehensive review of Visily, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://visily.ai",
        "domain": "visily.ai",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-10T05:03:38.196Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "khroma",
        "name": "Khroma",
        "description": "AI color tool for designers.",
        "longDescription": "Comprehensive review of Khroma, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://khroma.co",
        "domain": "khroma.co",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-18T12:53:10.455Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "magician-for-figma",
        "name": "Magician for Figma",
        "description": "A magical design tool for Figma powered by AI.",
        "longDescription": "Comprehensive review of Magician for Figma, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://magician.design",
        "domain": "magician.design",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-01-24T23:32:13.639Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "diagram",
        "name": "Diagram",
        "description": "AI tools for Figma.",
        "longDescription": "Comprehensive review of Diagram, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://diagram.com",
        "domain": "diagram.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-29T20:50:48.051Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "penpot-ai",
        "name": "Penpot AI",
        "description": "Open-source design tool with emerging AI capabilities.",
        "longDescription": "Comprehensive review of Penpot AI, including features, user experience, and key performance reviews in UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://penpot.app",
        "domain": "penpot.app",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-03T10:44:46.491Z",
        "tags": [
            "UI/UX",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "agentgpt",
        "name": "AgentGPT",
        "description": "Assemble, configure, and deploy autonomous AI agents in your browser.",
        "longDescription": "Comprehensive review of AgentGPT, including features, user experience, and key performance reviews in AI Agents & Automation.",
        "category": "AI Agents & Automation",
        "url": "https://agentgpt.reworkd.ai",
        "domain": "agentgpt.reworkd.ai",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-18T07:18:12.241Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "langchain",
        "name": "LangChain",
        "description": "Building applications with LLMs through composability.",
        "longDescription": "Comprehensive review of LangChain, including features, user experience, and key performance reviews in AI Agents & Automation.",
        "category": "AI Agents & Automation",
        "url": "https://langchain.com",
        "domain": "langchain.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-01-29T14:29:36.665Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "flowise",
        "name": "Flowise",
        "description": "Drag & drop UI to build your customized LLM flow.",
        "longDescription": "Comprehensive review of Flowise, including features, user experience, and key performance reviews in AI Agents & Automation.",
        "category": "AI Agents & Automation",
        "url": "https://flowiseai.com",
        "domain": "flowiseai.com",
        "brandColor": "#4F46E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-20T10:08:00.164Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "openai-api",
        "name": "OpenAI API",
        "description": "API access to top-tier models like GPT-4.",
        "longDescription": "Comprehensive review of OpenAI API, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://platform.openai.com",
        "domain": "openai.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-08T11:21:05.362Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "anthropic-claude-api",
        "name": "Anthropic Claude API",
        "description": "API for Claude, a next-generation AI assistant.",
        "longDescription": "Comprehensive review of Anthropic Claude API, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://console.anthropic.com",
        "domain": "anthropic.com",
        "brandColor": "#D97706",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-24T02:44:12.746Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "google-gemini-api",
        "name": "Google Gemini API",
        "description": "Access Google's multimodal Gemini models.",
        "longDescription": "Comprehensive review of Google Gemini API, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "Google",
        "url": "https://ai.google.dev",
        "domain": "google.com",
        "brandColor": "#1A73E8",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-04T12:39:49.925Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mistral-ai",
        "name": "Mistral AI",
        "description": "Frontier AI in your hands.",
        "longDescription": "Comprehensive review of Mistral AI, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://mistral.ai",
        "domain": "mistral.ai",
        "brandColor": "#FF601C",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-11T03:26:22.180Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "cohere",
        "name": "Cohere",
        "description": "The leading AI platform for enterprise.",
        "longDescription": "Comprehensive review of Cohere, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://cohere.com",
        "domain": "cohere.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-18T05:13:41.645Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "groq",
        "name": "Groq",
        "description": "The LPU Inference Engine provider.",
        "longDescription": "Comprehensive review of Groq, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://groq.com",
        "domain": "groq.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-14T04:19:53.384Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "together-ai",
        "name": "Together AI",
        "description": "Cloud platform for training and inferencing AI models.",
        "longDescription": "Comprehensive review of Together AI, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://together.ai",
        "domain": "together.ai",
        "brandColor": "#06B6D4",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-23T02:11:08.792Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "replicate",
        "name": "Replicate",
        "description": "Run AI models with an API.",
        "longDescription": "Comprehensive review of Replicate, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://replicate.com",
        "domain": "replicate.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-01-18T18:48:32.476Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hugging-face",
        "name": "Hugging Face",
        "description": "The AI community building the future.",
        "longDescription": "Comprehensive review of Hugging Face, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://huggingface.co",
        "domain": "huggingface.co",
        "brandColor": "#FFD21E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-30T21:55:57.437Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "perplexity-api",
        "name": "Perplexity API",
        "description": "API access to Perplexity's online LLMs.",
        "longDescription": "Comprehensive review of Perplexity API, including features, user experience, and key performance reviews in LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://docs.perplexity.ai",
        "domain": "perplexity.ai",
        "brandColor": "#00A389",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-05T23:25:41.484Z",
        "tags": [
            "LLM",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "dall-e-3",
        "name": "DALL-E 3",
        "description": "OpenAI's latest text-to-image AI model, available in ChatGPT Plus.",
        "longDescription": "Comprehensive review of DALL-E 3, including features, user experience, and key performance reviews in Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://openai.com/dall-e-3",
        "domain": "openai.com",
        "brandColor": "#10A37F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-05T08:40:12.504Z",
        "tags": [
            "Image",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "deepdream",
        "name": "DeepDream",
        "description": "An AI image generator using deep learning algorithms.",
        "longDescription": "Comprehensive review of DeepDream, including features, user experience, and key performance reviews in Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://deepdreamgenerator.com",
        "domain": "deepdreamgenerator.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-18T17:16:30.005Z",
        "tags": [
            "Image",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "runwayml",
        "name": "RunwayML",
        "description": "AI magic tools for creators, including text-to-video capabilities.",
        "longDescription": "Comprehensive review of RunwayML, including features, user experience, and key performance reviews in Video & Audio Tools.",
        "category": "Video & Audio Tools",
        "url": "https://runwayml.com",
        "domain": "runwayml.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-07T08:41:55.117Z",
        "tags": [
            "Video",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mubert",
        "name": "Mubert",
        "description": "AI generative music for all your needs.",
        "longDescription": "Comprehensive review of Mubert, including features, user experience, and key performance reviews in Video & Audio Tools.",
        "category": "Video & Audio Tools",
        "url": "https://mubert.com",
        "domain": "mubert.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-19T00:31:23.862Z",
        "tags": [
            "Video",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "vercel-v0",
        "name": "Vercel v0",
        "description": "Generate UI with AI.",
        "longDescription": "Comprehensive review of Vercel v0, including features, user experience, and key performance reviews in Code & Development.",
        "category": "Code & Development",
        "url": "https://v0.dev",
        "domain": "v0.dev",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-01T03:02:19.016Z",
        "tags": [
            "Code",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "you-com",
        "name": "You.com",
        "description": "The AI search engine you control.",
        "longDescription": "Comprehensive review of You.com, including features, user experience, and key performance reviews in AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://you.com",
        "domain": "you.com",
        "brandColor": "#2563EB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-07T07:03:53.994Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "andi",
        "name": "Andi",
        "description": "Search for the next generation.",
        "longDescription": "Comprehensive review of Andi, including features, user experience, and key performance reviews in AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://andisearch.com",
        "domain": "andisearch.com",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-11T22:51:37.255Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "komo",
        "name": "Komo",
        "description": "AI Search Engine for fast answers.",
        "longDescription": "Comprehensive review of Komo, including features, user experience, and key performance reviews in AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://komo.ai",
        "domain": "komo.ai",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-25T18:15:12.608Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mutiny",
        "name": "Mutiny",
        "description": "No-code AI platform that converts your website visitors.",
        "longDescription": "Comprehensive review of Mutiny, including features, user experience, and key performance reviews in Marketing & SEO.",
        "category": "Marketing & SEO",
        "url": "https://mutinyhq.com",
        "domain": "mutinyhq.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-12T19:11:19.679Z",
        "tags": [
            "Marketing",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "krisp",
        "name": "Krisp",
        "description": "AI noise cancellation and meeting transcription.",
        "longDescription": "Comprehensive review of Krisp, including features, user experience, and key performance reviews in AI Meeting Assistants.",
        "category": "AI Meeting Assistants",
        "url": "https://krisp.ai",
        "domain": "krisp.ai",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-10T12:45:00.931Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "pitch",
        "name": "Pitch",
        "description": "Fast, collaborative presentation software.",
        "longDescription": "Comprehensive review of Pitch, including features, user experience, and key performance reviews in AI Presentation Tools.",
        "category": "AI Presentation Tools",
        "url": "https://pitch.com",
        "domain": "pitch.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-18T21:59:48.891Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "intercom",
        "name": "Intercom",
        "description": "The AI-first customer service platform.",
        "longDescription": "Comprehensive review of Intercom, including features, user experience, and key performance reviews in Customer Support.",
        "category": "Customer Support",
        "url": "https://intercom.com",
        "domain": "intercom.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-10T20:01:52.093Z",
        "tags": [
            "Customer",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "gorgias",
        "name": "Gorgias",
        "description": "Ecommerce helpdesk connected to your store.",
        "longDescription": "Comprehensive review of Gorgias, including features, user experience, and key performance reviews in Customer Support.",
        "category": "Customer Support",
        "url": "https://gorgias.com",
        "domain": "gorgias.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-21T12:50:11.108Z",
        "tags": [
            "Customer",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "kustomer",
        "name": "Kustomer",
        "description": "AI-powered CRM for modern customer service.",
        "longDescription": "Comprehensive review of Kustomer, including features, user experience, and key performance reviews in Customer Support.",
        "category": "Customer Support",
        "url": "https://kustomer.com",
        "domain": "kustomer.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-01T09:46:11.796Z",
        "tags": [
            "Customer",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "forethought",
        "name": "Forethought",
        "description": "Generative AI for customer support.",
        "longDescription": "Comprehensive review of Forethought, including features, user experience, and key performance reviews in Customer Support.",
        "category": "Customer Support",
        "url": "https://forethought.ai",
        "domain": "forethought.ai",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-05T01:44:55.095Z",
        "tags": [
            "Customer",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "polymer",
        "name": "Polymer",
        "description": "Business Intelligence without the learning curve.",
        "longDescription": "Comprehensive review of Polymer, including features, user experience, and key performance reviews in Data Science & Analytics.",
        "category": "Data Science & Analytics",
        "url": "https://polymersearch.com",
        "domain": "polymersearch.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-21T02:18:52.810Z",
        "tags": [
            "Data",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "mendeley",
        "name": "Mendeley",
        "description": "Reference management software & researcher network.",
        "longDescription": "Comprehensive review of Mendeley, including features, user experience, and key performance reviews in Research & Analysis.",
        "category": "Research & Analysis",
        "url": "https://mendeley.com",
        "domain": "mendeley.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-06T03:56:34.844Z",
        "tags": [
            "Research",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "epique",
        "name": "Epique",
        "description": "First AI-based real estate brokerage.",
        "longDescription": "Comprehensive review of Epique, including features, user experience, and key performance reviews in AI Real Estate Tools.",
        "category": "AI Real Estate Tools",
        "url": "https://epiquerealty.com",
        "domain": "epiquerealty.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-25T22:21:16.057Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hyro",
        "name": "Hyro",
        "description": "Conversational AI for real estate.",
        "longDescription": "Comprehensive review of Hyro, including features, user experience, and key performance reviews in AI Real Estate Tools.",
        "category": "AI Real Estate Tools",
        "url": "https://hyro.ai",
        "domain": "hyro.ai",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-05T13:20:17.719Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "rechat",
        "name": "Rechat",
        "description": "AI-powered real estate CRM.",
        "longDescription": "Comprehensive review of Rechat, including features, user experience, and key performance reviews in AI Real Estate Tools.",
        "category": "AI Real Estate Tools",
        "url": "https://rechat.com",
        "domain": "rechat.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-10T17:24:44.276Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "localize",
        "name": "Localize",
        "description": "AI home hunting platform.",
        "longDescription": "Comprehensive review of Localize, including features, user experience, and key performance reviews in AI Real Estate Tools.",
        "category": "AI Real Estate Tools",
        "url": "https://localize.city",
        "domain": "localize.city",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-05T18:13:55.031Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "make",
        "name": "Make",
        "description": "Automate anything across apps.",
        "longDescription": "Comprehensive review of Make, including features, user experience, and key performance reviews in AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://make.com",
        "domain": "make.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-29T00:39:42.694Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "tray-io",
        "name": "Tray.io",
        "description": "AI-powered automation platform.",
        "longDescription": "Comprehensive review of Tray.io, including features, user experience, and key performance reviews in AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://tray.io",
        "domain": "tray.io",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-03T00:45:09.666Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "workato",
        "name": "Workato",
        "description": "Enterprise automation platform.",
        "longDescription": "Comprehensive review of Workato, including features, user experience, and key performance reviews in AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://workato.com",
        "domain": "workato.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-13T02:21:32.446Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "harvey",
        "name": "Harvey",
        "description": "AI for legal work.",
        "longDescription": "Comprehensive review of Harvey, including features, user experience, and key performance reviews in Legal & Compliance.",
        "category": "Legal & Compliance",
        "url": "https://harvey.ai",
        "domain": "harvey.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-14T07:25:53.559Z",
        "tags": [
            "Legal",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "cocounsel",
        "name": "CoCounsel",
        "description": "AI legal assistant.",
        "longDescription": "Comprehensive review of CoCounsel, including features, user experience, and key performance reviews in Legal & Compliance.",
        "category": "Legal & Compliance",
        "url": "https://casetext.com",
        "domain": "casetext.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-11T15:51:05.247Z",
        "tags": [
            "Legal",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "luminance",
        "name": "Luminance",
        "description": "AI for legal process automation.",
        "longDescription": "Comprehensive review of Luminance, including features, user experience, and key performance reviews in Legal & Compliance.",
        "category": "Legal & Compliance",
        "url": "https://luminance.com",
        "domain": "luminance.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-02T11:50:04.473Z",
        "tags": [
            "Legal",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "scenario",
        "name": "Scenario",
        "description": "AI-generated game assets.",
        "longDescription": "Comprehensive review of Scenario, including features, user experience, and key performance reviews in Gaming & Entertainment.",
        "category": "Gaming & Entertainment",
        "url": "https://scenario.com",
        "domain": "scenario.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-01-30T03:12:55.167Z",
        "tags": [
            "Gaming",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "crowdstrike",
        "name": "CrowdStrike",
        "description": "AI-native endpoint security.",
        "longDescription": "Comprehensive review of CrowdStrike, including features, user experience, and key performance reviews in AI Cybersecurity Tools.",
        "category": "AI Cybersecurity Tools",
        "url": "https://crowdstrike.com",
        "domain": "crowdstrike.com",
        "brandColor": "#FF0000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-10T22:32:17.300Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sentinelone",
        "name": "SentinelOne",
        "description": "Autonomous AI endpoint security.",
        "longDescription": "Comprehensive review of SentinelOne, including features, user experience, and key performance reviews in AI Cybersecurity Tools.",
        "category": "AI Cybersecurity Tools",
        "url": "https://sentinelone.com",
        "domain": "sentinelone.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-17T10:27:35.676Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "cylance",
        "name": "Cylance",
        "description": "Predictive cybersecurity powered by AI.",
        "longDescription": "Comprehensive review of Cylance, including features, user experience, and key performance reviews in AI Cybersecurity Tools.",
        "category": "AI Cybersecurity Tools",
        "url": "https://blackberry.com/cylance",
        "domain": "blackberry.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-28T19:38:07.565Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "octane-ai",
        "name": "Octane AI",
        "description": "AI quizzes and insights for Shopify.",
        "longDescription": "Comprehensive review of Octane AI, including features, user experience, and key performance reviews in AI Ecommerce Tools.",
        "category": "AI Ecommerce Tools",
        "url": "https://octaneai.com",
        "domain": "octaneai.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-26T23:34:07.647Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "klevu",
        "name": "Klevu",
        "description": "AI search and discovery for ecommerce.",
        "longDescription": "Comprehensive review of Klevu, including features, user experience, and key performance reviews in AI Ecommerce Tools.",
        "category": "AI Ecommerce Tools",
        "url": "https://klevu.com",
        "domain": "klevu.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-06T11:59:52.048Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "syte",
        "name": "Syte",
        "description": "Visual AI for ecommerce discovery.",
        "longDescription": "Comprehensive review of Syte, including features, user experience, and key performance reviews in AI Ecommerce Tools.",
        "category": "AI Ecommerce Tools",
        "url": "https://syte.ai",
        "domain": "syte.ai",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-16T18:15:10.409Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "dynamic-yield",
        "name": "Dynamic Yield",
        "description": "Experience optimization for ecommerce.",
        "longDescription": "Comprehensive review of Dynamic Yield, including features, user experience, and key performance reviews in AI Ecommerce Tools.",
        "category": "AI Ecommerce Tools",
        "url": "https://dynamicyield.com",
        "domain": "dynamicyield.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-09T10:35:27.345Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "sider",
        "name": "Sider",
        "description": "ChatGPT & Claude sidebar extension.",
        "longDescription": "Comprehensive review of Sider, including features, user experience, and key performance reviews in AI Chrome Extensions.",
        "category": "AI Chrome Extensions",
        "url": "https://sider.ai",
        "domain": "sider.ai",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-25T00:42:48.015Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "webchatgpt",
        "name": "WebChatGPT",
        "description": "Enhances ChatGPT with web access.",
        "longDescription": "Comprehensive review of WebChatGPT, including features, user experience, and key performance reviews in AI Chrome Extensions.",
        "category": "AI Chrome Extensions",
        "url": "https://chrome.google.com/webstore",
        "domain": "webchatgpt.app",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-12T04:37:13.709Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "scispace-copilot",
        "name": "SciSpace Copilot",
        "description": "AI copilot for research papers.",
        "longDescription": "Comprehensive review of SciSpace Copilot, including features, user experience, and key performance reviews in AI Chrome Extensions.",
        "category": "AI Chrome Extensions",
        "url": "https://typeset.io",
        "domain": "typeset.io",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-02-12T16:05:16.038Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "csm",
        "name": "CSM",
        "description": "3D models from any image or video.",
        "longDescription": "Comprehensive review of CSM, including features, user experience, and key performance reviews in 3D & Animation.",
        "category": "3D & Animation",
        "url": "https://csm.ai",
        "domain": "csm.ai",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-03-17T22:59:36.388Z",
        "tags": [
            "3D",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "masterpiece-studio",
        "name": "Masterpiece Studio",
        "description": "Generate 3D assets easily.",
        "longDescription": "Comprehensive review of Masterpiece Studio, including features, user experience, and key performance reviews in 3D & Animation.",
        "category": "3D & Animation",
        "url": "https://masterpiecestudio.com",
        "domain": "masterpiecestudio.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-15T17:07:12.304Z",
        "tags": [
            "3D",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "plask",
        "name": "Plask",
        "description": "AI motion capture tool.",
        "longDescription": "Comprehensive review of Plask, including features, user experience, and key performance reviews in 3D & Animation.",
        "category": "3D & Animation",
        "url": "https://plask.ai",
        "domain": "plask.ai",
        "brandColor": "#EC4899",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-23T07:53:03.933Z",
        "tags": [
            "3D",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "knewton",
        "name": "Knewton",
        "description": "Adaptive learning platform.",
        "longDescription": "Comprehensive review of Knewton, including features, user experience, and key performance reviews in Learning & Education.",
        "category": "Learning & Education",
        "url": "https://knewton.com",
        "domain": "knewton.com",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-29T16:30:31.228Z",
        "tags": [
            "Learning",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "edurite",
        "name": "Edurite",
        "description": "Smart educational tools.",
        "longDescription": "Comprehensive review of Edurite, including features, user experience, and key performance reviews in Learning & Education.",
        "category": "Learning & Education",
        "url": "https://edurite.com",
        "domain": "edurite.com",
        "brandColor": "#F59E0B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-02T12:22:38.752Z",
        "tags": [
            "Learning",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "dora",
        "name": "Dora",
        "description": "Design and publish 3D sites with AI.",
        "longDescription": "Comprehensive review of Dora, including features, user experience, and key performance reviews in AI Website Builders.",
        "category": "AI Website Builders",
        "url": "https://dora.run",
        "domain": "dora.run",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-21T08:20:29.825Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "hocoos",
        "name": "Hocoos",
        "description": "AI website builder.",
        "longDescription": "Comprehensive review of Hocoos, including features, user experience, and key performance reviews in AI Website Builders.",
        "category": "AI Website Builders",
        "url": "https://hocoos.com",
        "domain": "hocoos.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-07T02:15:59.242Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "b12",
        "name": "B12",
        "description": "Websites designed by AI.",
        "longDescription": "Comprehensive review of B12, including features, user experience, and key performance reviews in AI Website Builders.",
        "category": "AI Website Builders",
        "url": "https://b12.io",
        "domain": "b12.io",
        "brandColor": "#3B82F6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-10T20:28:41.604Z",
        "tags": [
            "AI",
            "AI",
            "Utility"
        ],
        "useCases": [
            "Accelerating workflows in standard operations",
            "Empowering startups containing remote collaborative units",
            "Automating complex daily checkups and documentation lists"
        ],
        "launchYear": 2023
    },
    {
        "id": "paradox-ai",
        "name": "Paradox",
        "description": "Conversational recruiting software featuring Olivia, an AI assistant who screens and schedules candidates.",
        "longDescription": "Comprehensive review of Paradox AI. Helps leading brands automate the recruiting process from application to interview scheduling seamlessly.",
        "category": "HR & Recruiting",
        "url": "https://paradox.ai",
        "domain": "paradox.ai",
        "brandColor": "#00A1E0",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-09T19:54:15.385Z",
        "tags": [
            "Recruiting",
            "Screening",
            "Interviews"
        ],
        "useCases": [
            "High-volume hiring",
            "Automated candidate screening"
        ],
        "launchYear": 2016
    },
    {
        "id": "corti",
        "name": "Corti",
        "description": "AI co-pilot for healthcare professionals, offering real-time guidance during patient consultations.",
        "longDescription": "Comprehensive review of Corti. Assures high-quality patient encounters by listening to conversations and suggesting diagnoses and workflows.",
        "category": "AI Healthcare Tools",
        "url": "https://corti.ai",
        "domain": "corti.ai",
        "brandColor": "#151B26",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-03T13:33:14.341Z",
        "tags": [
            "Voice Analysis",
            "Diagnosis",
            "Co-pilot"
        ],
        "useCases": [
            "Emergency dispatch guidance",
            "Clinical consultation transcription"
        ],
        "launchYear": 2016
    },
    {
        "id": "butterfly-network",
        "name": "Butterfly Network",
        "description": "Handheld ultrasound technology empowered by sophisticated AI analytics for rapid, portable medical imaging.",
        "longDescription": "Comprehensive review of Butterfly iQ+. Uses AI to guide users to better ultrasound images, democratizing medical imaging globally.",
        "category": "AI Healthcare Tools",
        "url": "https://butterflynetwork.com",
        "domain": "butterflynetwork.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-04-09T18:56:14.596Z",
        "tags": [
            "Imaging",
            "Ultrasound",
            "Diagnostics"
        ],
        "useCases": [
            "Point-of-care ultrasound",
            "Remote healthcare clinics"
        ],
        "launchYear": 2011
    },
    {
        "id": "alpha-sense",
        "name": "AlphaSense",
        "description": "Market intelligence and search platform designed specifically for finance professionals to uncover data insights.",
        "longDescription": "Comprehensive review of AlphaSense. Indexes billions of financial documents, applying AI to extract critical signals hidden within earnings calls and filings.",
        "category": "Business & Finance AI",
        "url": "https://alpha-sense.com",
        "domain": "alpha-sense.com",
        "brandColor": "#0A253F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-10T19:13:20.650Z",
        "tags": [
            "Market Research",
            "Financial Data",
            "Search Engine"
        ],
        "useCases": [
            "Equity research analysis",
            "Competitive market intelligence"
        ],
        "launchYear": 2011
    },
    {
        "id": "highradius",
        "name": "HighRadius",
        "description": "AI-driven order-to-cash and treasury management software for enterprise finance and accounting teams.",
        "longDescription": "Comprehensive review of HighRadius. Automates heavily manual financial processes like cash application, credit management, and billing using predictive AI.",
        "category": "Business & Finance AI",
        "url": "https://highradius.com",
        "domain": "highradius.com",
        "brandColor": "#00539B",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-18T23:24:45.528Z",
        "tags": [
            "Accounting",
            "Treasury",
            "Invoice Management"
        ],
        "useCases": [
            "B2B payment automation",
            "Cash flow forecasting"
        ],
        "launchYear": 2006
    },
    {
        "id": "suno-ai",
        "name": "Suno AI",
        "description": "Groundbreaking music generation model capable of creating full songs with realistic vocals from text.",
        "longDescription": "Comprehensive review of Suno AI. Allows anyone to type a prompt and receive fully produced musical tracks featuring surprisingly human-sounding vocalists.",
        "category": "Video & Audio Generation",
        "url": "https://suno.com",
        "domain": "suno.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-02-09T03:34:33.666Z",
        "tags": [
            "Music",
            "Vocals",
            "Audio"
        ],
        "useCases": [
            "Podcast intro music",
            "Personalized song creation"
        ],
        "launchYear": 2023
    },
    {
        "id": "pika-art",
        "name": "Pika Labs",
        "description": "Powerful text-to-video platform ideal for creating realistic motion animations and cinematic clips.",
        "longDescription": "Comprehensive review of Pika Labs. Rapidly turning text and images into engaging 3D animations, cinematic sequences, and anime styling.",
        "category": "Video & Audio Generation",
        "url": "https://pika.art",
        "domain": "pika.art",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-19T21:25:52.955Z",
        "tags": [
            "Text to Video",
            "Animation",
            "Cinematic"
        ],
        "useCases": [
            "Commercial video b-roll",
            "Animated storytelling"
        ],
        "launchYear": 2023
    },
    {
        "id": "freepik-pikaso",
        "name": "Freepik Pikaso",
        "description": "Real-time AI sketching and image generation tool built smoothly into Freepik's expansive asset catalog.",
        "longDescription": "Comprehensive review of Freepik Pikaso. Lets artists draw crude sketches and watch them render into photorealistic outputs in absolute real-time.",
        "category": "Image & Art Generation",
        "url": "https://freepik.com",
        "domain": "freepik.com",
        "brandColor": "#1273EB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-06T09:01:44.197Z",
        "tags": [
            "Real-time",
            "Sketch to Image",
            "Assets"
        ],
        "useCases": [
            "Rapid concept iteration",
            "Graphic design assets"
        ],
        "launchYear": 2023
    },
    {
        "id": "pexo",
        "name": "PEXO",
        "description": "AI-powered creative and design assistant.",
        "longDescription": "PEXO helps users create stunning visuals and designs using advanced AI features.",
        "category": "Image & Art Generation",
        "url": "https://pexo.example.com",
        "domain": "pexo.example.com",
        "brandColor": "#2A5DEB",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-19T07:40:05.455Z",
        "tags": [
            "Design",
            "Creative",
            "Generative AI"
        ],
        "useCases": [
            "Marketing assets",
            "Social media graphics"
        ],
        "launchYear": 2024
    },
    {
        "id": "magica",
        "name": "MAGICa",
        "description": "Magic AI tools for quick image manipulation.",
        "longDescription": "MAGICa provides magical AI tools for instant image generation and editing.",
        "category": "Image & Art Generation",
        "url": "https://magica.example.com",
        "domain": "magica.example.com",
        "brandColor": "#FF007F",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-17T16:10:40.814Z",
        "tags": [
            "Editing",
            "Manipulation",
            "Magic"
        ],
        "useCases": [
            "Photo editing",
            "Rapid prototyping"
        ],
        "launchYear": 2023
    },
    {
        "id": "dzine",
        "name": "Dzine",
        "description": "Generative AI for UX/UI designers.",
        "longDescription": "Dzine is a next-generation platform utilizing AI to generate User Interfaces and User Experiences.",
        "category": "Code & Development",
        "url": "https://dzine.ai",
        "domain": "dzine.ai",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-10T15:13:00.180Z",
        "tags": [
            "UI/UX",
            "Design",
            "Wireframing"
        ],
        "useCases": [
            "App design",
            "Website mockups"
        ],
        "launchYear": 2024
    },
    {
        "id": "holo",
        "name": "Holo",
        "description": "Holographic and 3D AI generator.",
        "longDescription": "Holo uses deep learning to generate 3D models and holographic displays from 2D images.",
        "category": "3D & Animation",
        "url": "https://holo.example.com",
        "domain": "holo.example.com",
        "brandColor": "#00E5FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-03-14T17:26:15.366Z",
        "tags": [
            "3D",
            "Hologram",
            "Modeling"
        ],
        "useCases": [
            "Game development",
            "AR/VR assets"
        ],
        "launchYear": 2023
    },
    {
        "id": "ai-overview-optimizer",
        "name": "AI Overview Optimizer",
        "description": "Optimize your content for AI search overviews.",
        "longDescription": "AI Overview Optimizer analyzes your content to ensure it is frequently cited by AI search engines like Google's SGE.",
        "category": "SEO & Marketing Tools",
        "url": "https://overviewoptimizer.example.com",
        "domain": "overviewoptimizer.example.com",
        "brandColor": "#FF5722",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-01T14:20:01.567Z",
        "tags": [
            "SEO",
            "AEO",
            "Search"
        ],
        "useCases": [
            "Content optimization",
            "AI rankings"
        ],
        "launchYear": 2024
    },
    {
        "id": "capcut",
        "name": "CapCut",
        "description": "Versatile video editor with powerful AI tools.",
        "longDescription": "CapCut is a popular video editing app with robust AI features for auto-captions, background removal, and smart effects.",
        "category": "Video & Audio Generation",
        "url": "https://capcut.com",
        "domain": "capcut.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": true,
        "dateAdded": "2026-07-10T16:15:27.695Z",
        "tags": [
            "Video Editing",
            "Social Media",
            "Effects"
        ],
        "useCases": [
            "TikTok creation",
            "YouTube Shorts"
        ],
        "launchYear": 2020
    },
    {
        "id": "pixmax-ai",
        "name": "Pixmax AI",
        "description": "High-resolution AI image upscaling and enhancement.",
        "longDescription": "Pixmax AI provides advanced algorithms to upscale, denoise, and enhance images without losing quality.",
        "category": "Image & Art Generation",
        "url": "https://pixmax.example.com",
        "domain": "pixmax.example.com",
        "brandColor": "#1E88E5",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-25T12:52:22.857Z",
        "tags": [
            "Upscaler",
            "Enhancer",
            "Photography"
        ],
        "useCases": [
            "Restoring old photos",
            "Print preparation"
        ],
        "launchYear": 2022
    },
    {
        "id": "terabox-ai",
        "name": "TeraBox AI",
        "description": "Smart cloud storage with AI-powered file organization.",
        "longDescription": "TeraBox AI gives you vast cloud storage space, automatically categorizing and tagging your files and photos using AI.",
        "category": "Productivity & Collaboration",
        "url": "https://terabox.com",
        "domain": "terabox.com",
        "brandColor": "#0057FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-06-26T23:21:09.493Z",
        "tags": [
            "Cloud Storage",
            "File Management",
            "Organization"
        ],
        "useCases": [
            "Photo backup",
            "Document organization"
        ],
        "launchYear": 2020
    },
    {
        "id": "blaze",
        "name": "Blaze",
        "description": "AI content engine for marketing teams and agencies.",
        "longDescription": "Blaze helps you create, organize, and publish marketing content 10x faster using your brand's unique voice.",
        "category": "Text & Writing",
        "url": "https://blaze.ai",
        "domain": "blaze.ai",
        "brandColor": "#FF4500",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-21T04:35:38.679Z",
        "tags": [
            "Marketing",
            "Brand Voice",
            "Content Engine"
        ],
        "useCases": [
            "Campaign management",
            "Blog writing"
        ],
        "launchYear": 2023
    },
    {
        "id": "coursebox-ai-tutor",
        "name": "Coursebox AI Tutor",
        "description": "AI course creator and personalized learning tutor.",
        "longDescription": "Coursebox builds comprehensive online courses in minutes and provides an interactive AI tutor for students.",
        "category": "Learning & Education",
        "url": "https://coursebox.ai",
        "domain": "coursebox.ai",
        "brandColor": "#60A5FA",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-17T22:16:06.225Z",
        "tags": [
            "Course Creation",
            "LMS",
            "Tutor"
        ],
        "useCases": [
            "Employee training",
            "Online education"
        ],
        "launchYear": 2023
    },
    {
        "id": "fotor",
        "name": "Fotor",
        "description": "Online photo editor and AI image generator.",
        "longDescription": "Fotor makes online photo editing easy and includes a suite of AI features like background removal, avatars, and text-to-image.",
        "category": "Image & Art Generation",
        "url": "https://fotor.com",
        "domain": "fotor.com",
        "brandColor": "#3A3A3A",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-07-02T00:35:17.753Z",
        "tags": [
            "Photo Editing",
            "Text to Image",
            "Collage"
        ],
        "useCases": [
            "Social media posts",
            "Graphic design"
        ],
        "launchYear": 2012
    },
    {
        "id": "clico",
        "name": "Clico",
        "description": "AI-powered conversion rate optimization platform.",
        "longDescription": "Clico uses AI to analyze user behavior dynamically and optimize website layouts and copy for maximum conversion.",
        "category": "SEO & Marketing Tools",
        "url": "https://clico.example.com",
        "domain": "clico.example.com",
        "brandColor": "#8B5CF6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-05-09T18:00:33.401Z",
        "tags": [
            "CRO",
            "Analytics",
            "Optimization"
        ],
        "useCases": [
            "Landing page testing",
            "E-commerce sales"
        ],
        "launchYear": 2023
    },
    {
        "id": "i10x",
        "name": "i10x",
        "description": "AI tool to boost developer productivity by 10x.",
        "longDescription": "i10x integrates with your IDE to provide hyper-contextual code suggestions, tests, and refactoring tips.",
        "category": "Code & Development",
        "url": "https://i10x.example.com",
        "domain": "i10x.example.com",
        "brandColor": "#10B981",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-17T05:46:52.508Z",
        "tags": [
            "Coding Assistant",
            "Developer Tool",
            "Productivity"
        ],
        "useCases": [
            "Faster coding",
            "Automated testing"
        ],
        "launchYear": 2024
    },
    {
        "id": "manychat-ai",
        "name": "Manychat AI",
        "description": "Automate Instagram, WhatsApp, and Facebook Messenger using AI.",
        "longDescription": "Manychat now integrates AI to automatically reply to DMs, capture leads, and answer complex customer questions 24/7.",
        "category": "AI Email Assistants",
        "url": "https://manychat.com",
        "domain": "manychat.com",
        "brandColor": "#0084FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-23T05:57:52.761Z",
        "tags": [
            "Chatbots",
            "Social Media",
            "Automation"
        ],
        "useCases": [
            "Instagram DM automation",
            "Lead generation"
        ],
        "launchYear": 2016
    },
    {
        "id": "munch-studio",
        "name": "Munch Studio",
        "description": "Extract the most engaging clips from long-form videos.",
        "longDescription": "Munch uses AI to analyze your long videos and automatically pull the most engaging moments specifically for TikTok, Reels, and Shorts.",
        "category": "Video & Audio Generation",
        "url": "https://getmunch.com",
        "domain": "getmunch.com",
        "brandColor": "#E3F2FD",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": true,
        "dateAdded": "2026-01-22T20:11:55.762Z",
        "tags": [
            "Clipping",
            "Shorts",
            "Social Media"
        ],
        "useCases": [
            "Podcast clipping",
            "YouTube Shorts creation"
        ],
        "launchYear": 2022
    },
    {
        "id": "vidnoz",
        "name": "Vidnoz",
        "description": "Free AI video generator with templates and avatars.",
        "longDescription": "Vidnoz provides a fast and free way to generate AI videos with realistic avatars, voices, and ready-made templates.",
        "category": "Video & Audio Generation",
        "url": "https://vidnoz.com",
        "domain": "vidnoz.com",
        "brandColor": "#6C63FF",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-22T20:01:08.576Z",
        "tags": [
            "Avatars",
            "Video Generator",
            "Templates"
        ],
        "useCases": [
            "Explainer videos",
            "Sales outreach"
        ],
        "launchYear": 2023
    },
    {
        "id": "klap",
        "name": "Klap",
        "description": "Turn YouTube videos into ready-to-publish short clips.",
        "longDescription": "Klap instantly reformats any YouTube link into multiple viral-ready shorts with dynamic captions and smart reframing.",
        "category": "Video & Audio Generation",
        "url": "https://klap.app",
        "domain": "klap.app",
        "brandColor": "#F43F5E",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-28T11:19:05.756Z",
        "tags": [
            "YouTube",
            "Shorts",
            "Auto-Captions"
        ],
        "useCases": [
            "Content repurposing",
            "TikTok growth"
        ],
        "launchYear": 2023
    },
    {
        "id": "whisper-flow",
        "name": "Wisper Flow",
        "description": "Seamless dictation and voice workflow automation.",
        "longDescription": "Wisper Flow allows you to dictate your thoughts and automatically routes them to notes, emails, or tasks using AI formatting.",
        "category": "Productivity & Collaboration",
        "url": "https://wisperflow.example.com",
        "domain": "wisperflow.example.com",
        "brandColor": "#14B8A6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-04-14T20:23:41.893Z",
        "tags": [
            "Dictation",
            "Voice to Text",
            "Workflow"
        ],
        "useCases": [
            "Meeting notes",
            "Email drafting via voice"
        ],
        "launchYear": 2024
    },
    {
        "id": "novamira",
        "name": "Novamira",
        "description": "Next-gen AI assistant for immersive world-building and writing.",
        "longDescription": "Novamira specializes in maintaining deep lore, complex continuity, and dynamic character generation for authors and game designers.",
        "category": "Text & Writing",
        "url": "https://novamira.example.com",
        "domain": "novamira.example.com",
        "brandColor": "#818CF8",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-20T20:43:07.017Z",
        "tags": [
            "Worldbuilding",
            "Storytelling",
            "Lore"
        ],
        "useCases": [
            "Novel writing",
            "Tabletop RPG campaigns"
        ],
        "launchYear": 2024
    },
    {
        "id": "pictory",
        "name": "Pictory",
        "description": "Easy video creation using AI for content marketers.",
        "longDescription": "Pictory automatically matches your text script or blog post with relevant stock footage, AI voices, and captions to create a video in minutes.",
        "category": "Video & Audio Generation",
        "url": "https://pictory.ai",
        "domain": "pictory.ai",
        "brandColor": "#0F4C81",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.7,
        "featured": true,
        "dateAdded": "2026-05-01T22:07:04.403Z",
        "tags": [
            "Text to Video",
            "Stock Footage",
            "Marketers"
        ],
        "useCases": [
            "Blog to video",
            "Faceless YouTube channels"
        ],
        "launchYear": 2020
    },
    {
        "id": "aimey",
        "name": "Aimey",
        "description": "Your personal empathic AI conversational companion.",
        "longDescription": "Aimey is designed to be a supportive active listener, helping people reflect on their day, practice mindfulness, and vent safely.",
        "category": "Personal Assistant",
        "url": "https://aimey.example.com",
        "domain": "aimey.example.com",
        "brandColor": "#F472B6",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-07T06:56:24.251Z",
        "tags": [
            "Companion",
            "Empathy",
            "Wellness"
        ],
        "useCases": [
            "Daily reflection",
            "Stress management"
        ],
        "launchYear": 2023
    },
    {
        "id": "jasper-ai",
        "name": "Jasper AI",
        "description": "The leading Jasper AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Jasper AI. It provides powerful AI capabilities for Text & Writing.",
        "category": "Text & Writing",
        "url": "https://jasperai.com",
        "domain": "jasperai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.750738668642727,
        "featured": false,
        "dateAdded": "2026-07-02T22:03:33.181Z",
        "tags": [
            "Text",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "designrr",
        "name": "Designrr",
        "description": "The leading Designrr platform using advanced AI.",
        "longDescription": "Comprehensive review of Designrr. It provides powerful AI capabilities for Text & Writing.",
        "category": "Text & Writing",
        "url": "https://designrr.com",
        "domain": "designrr.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.677701832388545,
        "featured": false,
        "dateAdded": "2026-03-31T14:45:55.308Z",
        "tags": [
            "Text",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "runway-gen-4",
        "name": "Runway Gen-4",
        "description": "The leading Runway Gen-4 platform using advanced AI.",
        "longDescription": "Comprehensive review of Runway Gen-4. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://runwaygen4.com",
        "domain": "runwaygen4.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.664965117631522,
        "featured": false,
        "dateAdded": "2026-01-22T04:00:47.654Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "pika-labs",
        "name": "Pika Labs",
        "description": "The leading Pika Labs platform using advanced AI.",
        "longDescription": "Comprehensive review of Pika Labs. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://pikalabs.com",
        "domain": "pikalabs.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.652804485630481,
        "featured": false,
        "dateAdded": "2026-04-07T15:56:47.605Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "luma-ai-dream-machine",
        "name": "Luma AI (Dream Machine)",
        "description": "The leading Luma AI (Dream Machine) platform using advanced AI.",
        "longDescription": "Comprehensive review of Luma AI (Dream Machine). It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://lumaaidreammachine.com",
        "domain": "lumaaidreammachine.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.697860655055261,
        "featured": false,
        "dateAdded": "2026-02-07T08:32:08.544Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "videogen",
        "name": "VideoGen",
        "description": "The leading VideoGen platform using advanced AI.",
        "longDescription": "Comprehensive review of VideoGen. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://videogen.com",
        "domain": "videogen.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.604835586866286,
        "featured": false,
        "dateAdded": "2026-06-22T17:11:50.649Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "reve-image",
        "name": "Reve Image",
        "description": "The leading Reve Image platform using advanced AI.",
        "longDescription": "Comprehensive review of Reve Image. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://reveimage.com",
        "domain": "reveimage.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.880562893866443,
        "featured": false,
        "dateAdded": "2026-03-08T09:29:57.696Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "artbreeder",
        "name": "Artbreeder",
        "description": "The leading Artbreeder platform using advanced AI.",
        "longDescription": "Comprehensive review of Artbreeder. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://artbreeder.com",
        "domain": "artbreeder.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6685079427071985,
        "featured": false,
        "dateAdded": "2026-02-06T05:44:30.386Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "whisper-openai",
        "name": "Whisper (OpenAI)",
        "description": "The leading Whisper (OpenAI) platform using advanced AI.",
        "longDescription": "Comprehensive review of Whisper (OpenAI). It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://whisperopenai.com",
        "domain": "whisperopenai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.664941526136752,
        "featured": false,
        "dateAdded": "2026-06-26T23:08:16.768Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "descript-audio",
        "name": "Descript Audio",
        "description": "The leading Descript Audio platform using advanced AI.",
        "longDescription": "Comprehensive review of Descript Audio. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://descriptaudio.com",
        "domain": "descriptaudio.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.741646391289804,
        "featured": false,
        "dateAdded": "2026-04-17T20:56:33.839Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "soundraw",
        "name": "Soundraw",
        "description": "The leading Soundraw platform using advanced AI.",
        "longDescription": "Comprehensive review of Soundraw. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://soundraw.com",
        "domain": "soundraw.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.889481498757604,
        "featured": false,
        "dateAdded": "2026-02-15T04:15:42.536Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "claude-anthropic",
        "name": "Claude (Anthropic)",
        "description": "The leading Claude (Anthropic) platform using advanced AI.",
        "longDescription": "Comprehensive review of Claude (Anthropic). It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://claudeanthropic.com",
        "domain": "claudeanthropic.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.581965840014636,
        "featured": false,
        "dateAdded": "2026-01-30T01:57:04.775Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "kuberns",
        "name": "Kuberns",
        "description": "The leading Kuberns platform using advanced AI.",
        "longDescription": "Comprehensive review of Kuberns. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://kuberns.com",
        "domain": "kuberns.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.740443053087094,
        "featured": false,
        "dateAdded": "2026-05-21T07:00:02.463Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "taskade",
        "name": "Taskade",
        "description": "The leading Taskade platform using advanced AI.",
        "longDescription": "Comprehensive review of Taskade. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://taskade.com",
        "domain": "taskade.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.824758606729862,
        "featured": false,
        "dateAdded": "2026-01-19T12:59:07.433Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "granola",
        "name": "Granola",
        "description": "The leading Granola platform using advanced AI.",
        "longDescription": "Comprehensive review of Granola. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://granola.com",
        "domain": "granola.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.80630682712986,
        "featured": false,
        "dateAdded": "2026-03-14T10:02:26.801Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "motion",
        "name": "Motion",
        "description": "The leading Motion platform using advanced AI.",
        "longDescription": "Comprehensive review of Motion. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://motion.com",
        "domain": "motion.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.617008805557051,
        "featured": false,
        "dateAdded": "2026-02-18T04:29:58.319Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "reclaim-ai",
        "name": "Reclaim AI",
        "description": "The leading Reclaim AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Reclaim AI. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://reclaimai.com",
        "domain": "reclaimai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.755013045102609,
        "featured": false,
        "dateAdded": "2026-02-02T05:56:58.062Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "mem-ai",
        "name": "Mem AI",
        "description": "The leading Mem AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Mem AI. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://memai.com",
        "domain": "memai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.671557594111358,
        "featured": false,
        "dateAdded": "2026-02-08T02:57:06.786Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "magical",
        "name": "Magical",
        "description": "The leading Magical platform using advanced AI.",
        "longDescription": "Comprehensive review of Magical. It provides powerful AI capabilities for Productivity & Collaboration.",
        "category": "Productivity & Collaboration",
        "url": "https://magical.com",
        "domain": "magical.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.724644530048717,
        "featured": false,
        "dateAdded": "2026-04-09T20:19:39.843Z",
        "tags": [
            "Productivity",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "jasper-marketing",
        "name": "Jasper (Marketing)",
        "description": "The leading Jasper (Marketing) platform using advanced AI.",
        "longDescription": "Comprehensive review of Jasper (Marketing). It provides powerful AI capabilities for SEO & Marketing Tools.",
        "category": "SEO & Marketing Tools",
        "url": "https://jaspermarketing.com",
        "domain": "jaspermarketing.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.896836146588063,
        "featured": false,
        "dateAdded": "2026-06-27T16:44:56.051Z",
        "tags": [
            "SEO",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "superscale-ai",
        "name": "Superscale AI",
        "description": "The leading Superscale AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Superscale AI. It provides powerful AI capabilities for SEO & Marketing Tools.",
        "category": "SEO & Marketing Tools",
        "url": "https://superscaleai.com",
        "domain": "superscaleai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6731883313038765,
        "featured": false,
        "dateAdded": "2026-06-16T05:35:11.361Z",
        "tags": [
            "SEO",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "blaze-ai",
        "name": "Blaze AI",
        "description": "The leading Blaze AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Blaze AI. It provides powerful AI capabilities for SEO & Marketing Tools.",
        "category": "SEO & Marketing Tools",
        "url": "https://blazeai.com",
        "domain": "blazeai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.570185101764789,
        "featured": false,
        "dateAdded": "2026-06-02T09:08:45.743Z",
        "tags": [
            "SEO",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "perplexity-ai",
        "name": "Perplexity AI",
        "description": "The leading Perplexity AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Perplexity AI. It provides powerful AI capabilities for AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://perplexityai.com",
        "domain": "perplexityai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.720330389578949,
        "featured": false,
        "dateAdded": "2026-05-09T23:10:04.641Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "scite",
        "name": "Scite",
        "description": "The leading Scite platform using advanced AI.",
        "longDescription": "Comprehensive review of Scite. It provides powerful AI capabilities for AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://scite.com",
        "domain": "scite.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.620815489975978,
        "featured": false,
        "dateAdded": "2026-06-11T17:08:39.998Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "notegpt",
        "name": "NoteGPT",
        "description": "The leading NoteGPT platform using advanced AI.",
        "longDescription": "Comprehensive review of NoteGPT. It provides powerful AI capabilities for AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://notegpt.com",
        "domain": "notegpt.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.802562872763925,
        "featured": false,
        "dateAdded": "2026-03-24T05:47:48.739Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "zapier-ai",
        "name": "Zapier AI",
        "description": "The leading Zapier AI platform using advanced AI.",
        "longDescription": "Comprehensive review of Zapier AI. It provides powerful AI capabilities for AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://zapierai.com",
        "domain": "zapierai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.60247010968904,
        "featured": false,
        "dateAdded": "2026-05-08T10:58:56.075Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "make-integromat",
        "name": "Make (Integromat)",
        "description": "The leading Make (Integromat) platform using advanced AI.",
        "longDescription": "Comprehensive review of Make (Integromat). It provides powerful AI capabilities for AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://makeintegromat.com",
        "domain": "makeintegromat.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.52319160608907,
        "featured": false,
        "dateAdded": "2026-02-12T09:28:55.468Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "salesforce-einstein",
        "name": "Salesforce Einstein",
        "description": "The leading Salesforce Einstein platform using advanced AI.",
        "longDescription": "Comprehensive review of Salesforce Einstein. It provides powerful AI capabilities for AI Workflow Automation.",
        "category": "AI Workflow Automation",
        "url": "https://salesforceeinstein.com",
        "domain": "salesforceeinstein.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.725089895428145,
        "featured": false,
        "dateAdded": "2026-04-18T10:39:40.226Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "google-gemini",
        "name": "Google Gemini",
        "description": "The leading Google Gemini platform using advanced AI.",
        "longDescription": "Comprehensive review of Google Gemini. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "Google",
        "url": "https://googlegemini.com",
        "domain": "googlegemini.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5450918016784545,
        "featured": false,
        "dateAdded": "2026-05-21T17:11:07.092Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "microsoft-copilot",
        "name": "Microsoft Copilot",
        "description": "The leading Microsoft Copilot platform using advanced AI.",
        "longDescription": "Comprehensive review of Microsoft Copilot. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://microsoftcopilot.com",
        "domain": "microsoftcopilot.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.583584349234236,
        "featured": false,
        "dateAdded": "2026-04-23T00:59:46.898Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "deepseek",
        "name": "DeepSeek",
        "description": "The leading DeepSeek platform using advanced AI.",
        "longDescription": "Comprehensive review of DeepSeek. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://deepseek.com",
        "domain": "deepseek.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.699535631035128,
        "featured": false,
        "dateAdded": "2026-04-06T22:29:32.304Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "poe-by-quora",
        "name": "Poe by Quora",
        "description": "The leading Poe by Quora platform using advanced AI.",
        "longDescription": "Comprehensive review of Poe by Quora. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://poebyquora.com",
        "domain": "poebyquora.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.548074975912925,
        "featured": false,
        "dateAdded": "2026-04-28T14:09:07.360Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "khan-academy-khanmigo",
        "name": "Khan Academy Khanmigo",
        "description": "The leading Khan Academy Khanmigo platform using advanced AI.",
        "longDescription": "Comprehensive review of Khan Academy Khanmigo. It provides powerful AI capabilities for Learning & Education.",
        "category": "Learning & Education",
        "url": "https://khanacademykhanmigo.com",
        "domain": "khanacademykhanmigo.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.855167460856239,
        "featured": false,
        "dateAdded": "2026-04-14T20:27:42.721Z",
        "tags": [
            "Learning",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "quizlet-q-chat",
        "name": "Quizlet Q-Chat",
        "description": "The leading Quizlet Q-Chat platform using advanced AI.",
        "longDescription": "Comprehensive review of Quizlet Q-Chat. It provides powerful AI capabilities for Learning & Education.",
        "category": "Learning & Education",
        "url": "https://quizletqchat.com",
        "domain": "quizletqchat.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.883753482049069,
        "featured": false,
        "dateAdded": "2026-02-01T11:59:02.292Z",
        "tags": [
            "Learning",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "wolfram-alpha",
        "name": "Wolfram Alpha",
        "description": "The leading Wolfram Alpha platform using advanced AI.",
        "longDescription": "Comprehensive review of Wolfram Alpha. It provides powerful AI capabilities for Learning & Education.",
        "category": "Learning & Education",
        "url": "https://wolframalpha.com",
        "domain": "wolframalpha.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.585083915259813,
        "featured": false,
        "dateAdded": "2026-03-27T07:46:38.646Z",
        "tags": [
            "Learning",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "socratic-by-google",
        "name": "Socratic by Google",
        "description": "The leading Socratic by Google platform using advanced AI.",
        "longDescription": "Comprehensive review of Socratic by Google. It provides powerful AI capabilities for Learning & Education.",
        "category": "Google",
        "url": "https://socraticbygoogle.com",
        "domain": "socraticbygoogle.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.759786672457354,
        "featured": false,
        "dateAdded": "2026-06-20T16:12:49.044Z",
        "tags": [
            "Learning",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "wix-adi",
        "name": "Wix ADI",
        "description": "The leading Wix ADI platform using advanced AI.",
        "longDescription": "Comprehensive review of Wix ADI. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://wixadi.com",
        "domain": "wixadi.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.821225136077993,
        "featured": false,
        "dateAdded": "2026-03-11T13:25:12.285Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "softr",
        "name": "Softr",
        "description": "The leading Softr platform using advanced AI.",
        "longDescription": "Comprehensive review of Softr. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://softr.com",
        "domain": "softr.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.848881415093312,
        "featured": false,
        "dateAdded": "2026-05-17T08:54:13.148Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2023
    },
    {
        "id": "sora",
        "name": "Sora",
        "description": "The leading Sora platform using advanced AI.",
        "longDescription": "Comprehensive overview of Sora. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://sora.com",
        "domain": "sora.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.848396994827546,
        "featured": false,
        "dateAdded": "2026-02-11T04:00:54.447Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "groq",
        "name": "Groq",
        "description": "The leading Groq platform using advanced AI.",
        "longDescription": "Comprehensive overview of Groq. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://groq.com",
        "domain": "groq.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.877804979964254,
        "featured": false,
        "dateAdded": "2026-02-13T05:43:00.077Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "claude-3-5-sonnet",
        "name": "Claude 3.5 Sonnet",
        "description": "The leading Claude 3.5 Sonnet platform using advanced AI.",
        "longDescription": "Comprehensive overview of Claude 3.5 Sonnet. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://claude35sonnet.com",
        "domain": "claude35sonnet.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.789128236140911,
        "featured": false,
        "dateAdded": "2026-06-14T18:34:58.063Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "gemini-1-5-pro",
        "name": "Gemini 1.5 Pro",
        "description": "The leading Gemini 1.5 Pro platform using advanced AI.",
        "longDescription": "Comprehensive overview of Gemini 1.5 Pro. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://gemini15pro.com",
        "domain": "gemini15pro.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.616749907000662,
        "featured": false,
        "dateAdded": "2026-05-23T19:15:28.120Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "runway-gen-3-alpha",
        "name": "Runway Gen-3 Alpha",
        "description": "The leading Runway Gen-3 Alpha platform using advanced AI.",
        "longDescription": "Comprehensive overview of Runway Gen-3 Alpha. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://runwaygen3alpha.com",
        "domain": "runwaygen3alpha.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.682776714728112,
        "featured": false,
        "dateAdded": "2026-06-25T18:39:22.281Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "suno-v3",
        "name": "Suno v3",
        "description": "The leading Suno v3 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Suno v3. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://sunov3.com",
        "domain": "sunov3.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.570782951090513,
        "featured": false,
        "dateAdded": "2026-04-11T06:35:42.888Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "udio",
        "name": "Udio",
        "description": "The leading Udio platform using advanced AI.",
        "longDescription": "Comprehensive overview of Udio. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://udio.com",
        "domain": "udio.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.529858030877163,
        "featured": false,
        "dateAdded": "2026-02-03T21:38:19.649Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "luma-dream-machine",
        "name": "Luma Dream Machine",
        "description": "The leading Luma Dream Machine platform using advanced AI.",
        "longDescription": "Comprehensive overview of Luma Dream Machine. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://lumadreammachine.com",
        "domain": "lumadreammachine.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.837897868099265,
        "featured": false,
        "dateAdded": "2026-04-10T23:42:46.674Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "kling-ai",
        "name": "Kling AI",
        "description": "The leading Kling AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Kling AI. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://klingai.com",
        "domain": "klingai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.723453152988925,
        "featured": false,
        "dateAdded": "2026-02-10T11:59:02.147Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "hailuo-minimax",
        "name": "Hailuo MiniMax",
        "description": "The leading Hailuo MiniMax platform using advanced AI.",
        "longDescription": "Comprehensive overview of Hailuo MiniMax. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://hailuominimax.com",
        "domain": "hailuominimax.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.854742655957391,
        "featured": false,
        "dateAdded": "2026-06-12T09:37:03.627Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "vercel-v0",
        "name": "Vercel v0",
        "description": "The leading Vercel v0 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Vercel v0. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://vercelv0.com",
        "domain": "vercelv0.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6004352175258685,
        "featured": false,
        "dateAdded": "2026-01-30T13:34:54.487Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "bolt-new-2",
        "name": "Bolt.new",
        "description": "The leading Bolt.new platform using advanced AI.",
        "longDescription": "Comprehensive overview of Bolt.new. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://boltnew.com",
        "domain": "boltnew.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.878644624558513,
        "featured": false,
        "dateAdded": "2026-05-06T13:13:04.117Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "lovable-dev",
        "name": "Lovable.dev",
        "description": "The leading Lovable.dev platform using advanced AI.",
        "longDescription": "Comprehensive overview of Lovable.dev. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://lovabledev.com",
        "domain": "lovabledev.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.618588064977127,
        "featured": false,
        "dateAdded": "2026-06-04T21:43:46.011Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "windsurf",
        "name": "Windsurf",
        "description": "The leading Windsurf platform using advanced AI.",
        "longDescription": "Comprehensive overview of Windsurf. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://windsurf.com",
        "domain": "windsurf.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6551069190643775,
        "featured": false,
        "dateAdded": "2026-06-25T05:18:22.847Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "perplexity-pro",
        "name": "Perplexity Pro",
        "description": "The leading Perplexity Pro platform using advanced AI.",
        "longDescription": "Comprehensive overview of Perplexity Pro. It provides powerful AI capabilities for AI Search Engines.",
        "category": "AI Search Engines",
        "url": "https://perplexitypro.com",
        "domain": "perplexitypro.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.741371092732815,
        "featured": false,
        "dateAdded": "2026-06-04T07:05:45.589Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "chatbox",
        "name": "Chatbox",
        "description": "The leading Chatbox platform using advanced AI.",
        "longDescription": "Comprehensive overview of Chatbox. It provides powerful AI capabilities for AI Chatbots & Assistants.",
        "category": "AI Chatbots & Assistants",
        "url": "https://chatbox.com",
        "domain": "chatbox.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.722614978119812,
        "featured": false,
        "dateAdded": "2026-02-26T22:28:15.468Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "anythingllm",
        "name": "AnythingLLM",
        "description": "The leading AnythingLLM platform using advanced AI.",
        "longDescription": "Comprehensive overview of AnythingLLM. It provides powerful AI capabilities for AI Chatbots & Assistants.",
        "category": "AI Chatbots & Assistants",
        "url": "https://anythingllm.com",
        "domain": "anythingllm.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.844326151975424,
        "featured": false,
        "dateAdded": "2026-05-26T00:45:58.286Z",
        "tags": [
            "AI",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "ollama",
        "name": "Ollama",
        "description": "The leading Ollama platform using advanced AI.",
        "longDescription": "Comprehensive overview of Ollama. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://ollama.com",
        "domain": "ollama.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.566264699457493,
        "featured": false,
        "dateAdded": "2026-06-22T20:16:32.959Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "lm-studio",
        "name": "LM Studio",
        "description": "The leading LM Studio platform using advanced AI.",
        "longDescription": "Comprehensive overview of LM Studio. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://lmstudio.com",
        "domain": "lmstudio.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.629588443943854,
        "featured": false,
        "dateAdded": "2026-05-20T04:11:23.160Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "gpt4all",
        "name": "GPT4All",
        "description": "The leading GPT4All platform using advanced AI.",
        "longDescription": "Comprehensive overview of GPT4All. It provides powerful AI capabilities for Code & Development.",
        "category": "Code & Development",
        "url": "https://gpt4all.com",
        "domain": "gpt4all.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.830472548870355,
        "featured": false,
        "dateAdded": "2026-04-30T17:37:29.591Z",
        "tags": [
            "Code",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "webui-forge",
        "name": "WebUI Forge",
        "description": "The leading WebUI Forge platform using advanced AI.",
        "longDescription": "Comprehensive overview of WebUI Forge. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://webuiforge.com",
        "domain": "webuiforge.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.650526899327296,
        "featured": false,
        "dateAdded": "2026-06-20T02:49:30.861Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "comfyui",
        "name": "ComfyUI",
        "description": "The leading ComfyUI platform using advanced AI.",
        "longDescription": "Comprehensive overview of ComfyUI. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://comfyui.com",
        "domain": "comfyui.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.567847614126147,
        "featured": false,
        "dateAdded": "2026-04-19T08:33:57.229Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "midjourney-v6",
        "name": "Midjourney v6",
        "description": "The leading Midjourney v6 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Midjourney v6. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://midjourneyv6.com",
        "domain": "midjourneyv6.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.726002304930009,
        "featured": false,
        "dateAdded": "2026-06-06T15:40:26.525Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "flux-1",
        "name": "Flux.1",
        "description": "The leading Flux.1 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Flux.1. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://flux1.com",
        "domain": "flux1.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.864989057625291,
        "featured": false,
        "dateAdded": "2026-02-19T22:50:35.892Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "ideogram-2-0",
        "name": "Ideogram 2.0",
        "description": "The leading Ideogram 2.0 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Ideogram 2.0. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://ideogram20.com",
        "domain": "ideogram20.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.830460866224487,
        "featured": false,
        "dateAdded": "2026-02-27T07:15:43.476Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "elevenlabs-reader",
        "name": "ElevenLabs Reader",
        "description": "The leading ElevenLabs Reader platform using advanced AI.",
        "longDescription": "Comprehensive overview of ElevenLabs Reader. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://elevenlabsreader.com",
        "domain": "elevenlabsreader.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7962260975479065,
        "featured": false,
        "dateAdded": "2026-06-10T03:18:27.177Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "recraft-v3",
        "name": "Recraft v3",
        "description": "The leading Recraft v3 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Recraft v3. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://recraftv3.com",
        "domain": "recraftv3.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.752005806498018,
        "featured": false,
        "dateAdded": "2026-06-07T05:37:44.018Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "leonardo-phoenix",
        "name": "Leonardo Phoenix",
        "description": "The leading Leonardo Phoenix platform using advanced AI.",
        "longDescription": "Comprehensive overview of Leonardo Phoenix. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://leonardophoenix.com",
        "domain": "leonardophoenix.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.530796149262928,
        "featured": false,
        "dateAdded": "2026-02-20T05:05:10.730Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "pika-1-5",
        "name": "Pika 1.5",
        "description": "The leading Pika 1.5 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Pika 1.5. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://pika15.com",
        "domain": "pika15.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8490691865984505,
        "featured": false,
        "dateAdded": "2026-07-13T10:44:08.092Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "heygen-2-0",
        "name": "HeyGen 2.0",
        "description": "The leading HeyGen 2.0 platform using advanced AI.",
        "longDescription": "Comprehensive overview of HeyGen 2.0. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://heygen20.com",
        "domain": "heygen20.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.681525884754637,
        "featured": false,
        "dateAdded": "2026-03-01T06:35:33.401Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "elevenlabs-voice-design",
        "name": "ElevenLabs Voice Design",
        "description": "The leading ElevenLabs Voice Design platform using advanced AI.",
        "longDescription": "Comprehensive overview of ElevenLabs Voice Design. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://elevenlabsvoicedesign.com",
        "domain": "elevenlabsvoicedesign.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.564931273975751,
        "featured": false,
        "dateAdded": "2026-04-21T05:40:21.130Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "napkin-ai",
        "name": "Napkin AI",
        "description": "The leading Napkin AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Napkin AI. It provides powerful AI capabilities for UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://napkinai.com",
        "domain": "napkinai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.879538997871628,
        "featured": false,
        "dateAdded": "2026-07-09T13:49:29.301Z",
        "tags": [
            "UI/UX",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "relume-library",
        "name": "Relume Library",
        "description": "The leading Relume Library platform using advanced AI.",
        "longDescription": "Comprehensive overview of Relume Library. It provides powerful AI capabilities for UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://relumelibrary.com",
        "domain": "relumelibrary.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.740704310200406,
        "featured": false,
        "dateAdded": "2026-01-30T07:34:56.998Z",
        "tags": [
            "UI/UX",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "galileo-ai-2",
        "name": "Galileo AI",
        "description": "The leading Galileo AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Galileo AI. It provides powerful AI capabilities for UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://galileoai.com",
        "domain": "galileoai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.88927047583962,
        "featured": false,
        "dateAdded": "2026-01-25T16:45:29.407Z",
        "tags": [
            "UI/UX",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "uizard-autodesigner",
        "name": "Uizard Autodesigner",
        "description": "The leading Uizard Autodesigner platform using advanced AI.",
        "longDescription": "Comprehensive overview of Uizard Autodesigner. It provides powerful AI capabilities for UI/UX & Design Tools.",
        "category": "UI/UX & Design Tools",
        "url": "https://uizardautodesigner.com",
        "domain": "uizardautodesigner.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.756759680712541,
        "featured": false,
        "dateAdded": "2026-06-29T18:20:47.891Z",
        "tags": [
            "UI/UX",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "krea-ai",
        "name": "Krea AI",
        "description": "The leading Krea AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Krea AI. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://kreaai.com",
        "domain": "kreaai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.641652967007986,
        "featured": false,
        "dateAdded": "2026-06-05T13:23:03.859Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "magnific-ai",
        "name": "Magnific AI",
        "description": "The leading Magnific AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Magnific AI. It provides powerful AI capabilities for Image & Art Generation.",
        "category": "Image & Art Generation",
        "url": "https://magnificai.com",
        "domain": "magnificai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.832139023098156,
        "featured": false,
        "dateAdded": "2026-05-02T14:04:19.612Z",
        "tags": [
            "Image",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "topaz-video-ai",
        "name": "Topaz Video AI",
        "description": "The leading Topaz Video AI platform using advanced AI.",
        "longDescription": "Comprehensive overview of Topaz Video AI. It provides powerful AI capabilities for Video & Audio Generation.",
        "category": "Video & Audio Generation",
        "url": "https://topazvideoai.com",
        "domain": "topazvideoai.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.757046516748241,
        "featured": false,
        "dateAdded": "2026-04-27T17:03:50.863Z",
        "tags": [
            "Video",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "mendel",
        "name": "Mendel",
        "description": "The leading Mendel platform using advanced AI.",
        "longDescription": "Comprehensive overview of Mendel. It provides powerful AI capabilities for Research & Analysis.",
        "category": "Research & Analysis",
        "url": "https://mendel.com",
        "domain": "mendel.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.712673614930377,
        "featured": false,
        "dateAdded": "2026-03-23T17:59:44.414Z",
        "tags": [
            "Research",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "alphafold-3",
        "name": "AlphaFold 3",
        "description": "The leading AlphaFold 3 platform using advanced AI.",
        "longDescription": "Comprehensive overview of AlphaFold 3. It provides powerful AI capabilities for Research & Analysis.",
        "category": "Research & Analysis",
        "url": "https://alphafold3.com",
        "domain": "alphafold3.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.77406447007697,
        "featured": false,
        "dateAdded": "2026-06-29T02:26:18.053Z",
        "tags": [
            "Research",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "grok-2",
        "name": "Grok 2",
        "description": "The leading Grok 2 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Grok 2. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://grok2.com",
        "domain": "grok2.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7556193122425165,
        "featured": false,
        "dateAdded": "2026-05-04T15:15:35.037Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "meta-llama-3-1",
        "name": "Meta Llama 3.1",
        "description": "The leading Meta Llama 3.1 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Meta Llama 3.1. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://metallama31.com",
        "domain": "metallama31.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.887867591671368,
        "featured": false,
        "dateAdded": "2026-04-16T11:11:39.502Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "mistral-large",
        "name": "Mistral Large",
        "description": "The leading Mistral Large platform using advanced AI.",
        "longDescription": "Comprehensive overview of Mistral Large. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://mistrallarge.com",
        "domain": "mistrallarge.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.570824597583378,
        "featured": false,
        "dateAdded": "2026-04-17T17:03:40.890Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "cohere-command-r",
        "name": "Cohere Command R+",
        "description": "The leading Cohere Command R+ platform using advanced AI.",
        "longDescription": "Comprehensive overview of Cohere Command R+. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://coherecommandr.com",
        "domain": "coherecommandr.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.630540920587665,
        "featured": false,
        "dateAdded": "2026-02-03T00:17:31.084Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "qwen-2-5",
        "name": "Qwen 2.5",
        "description": "The leading Qwen 2.5 platform using advanced AI.",
        "longDescription": "Comprehensive overview of Qwen 2.5. It provides powerful AI capabilities for LLM Providers & APIs.",
        "category": "LLM Providers & APIs",
        "url": "https://qwen25.com",
        "domain": "qwen25.com",
        "brandColor": "#000000",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.775329056182736,
        "featured": false,
        "dateAdded": "2026-06-21T03:53:24.665Z",
        "tags": [
            "LLM",
            "AI Tool"
        ],
        "useCases": [
            "Automation",
            "Efficiency"
        ],
        "launchYear": 2024
    },
    {
        "id": "ai-tool-ui-path",
        "name": "UiPath Autopilot",
        "description": "Enterprise-grade AI automation that integrates Generative AI and specialized AI to automate complex workflows across legacy and modern systems.",
        "url": "https://www.uipath.com/product/autopilot",
        "pricing": "Paid",
        "rating": 4.8,
        "category": "AI Workflow Automation",
        "tags": [
            "RPA",
            "Enterprise",
            "Workflow",
            "Integration"
        ],
        "featured": true,
        "dateAdded": "2026-01-19T15:38:54.429Z",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        "longDescription": "UiPath Autopilot leverages both generative AI and specialized AI to automate end-to-end workflows. It allows users to create automations via natural language, discover automation opportunities, and bridge legacy systems with modern cloud applications without extensive coding.",
        "features": [
            "Natural language to automation",
            "Document understanding and extraction",
            "Seamless integration with legacy UI and APIs",
            "Enterprise security and governance"
        ],
        "useCases": [
            "Invoice processing and data entry",
            "Customer onboarding workflows",
            "IT ticket resolution automation",
            "Cross-platform data migration"
        ],
        "domain": "uipath.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ai-tool-copy-ai-workflows",
        "name": "Copy.ai Workflows",
        "description": "Automate your sales and marketing processes with AI workflows that connect to your CRM and generate personalized content at scale.",
        "url": "https://www.copy.ai/workflows",
        "pricing": "Freemium",
        "rating": 4.7,
        "category": "AI Workflow Automation",
        "tags": [
            "Marketing",
            "Sales",
            "Content",
            "Workflow"
        ],
        "featured": false,
        "dateAdded": "2026-03-24T20:45:38.111Z",
        "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "longDescription": "Copy.ai Workflows transforms marketing and sales operations by automating the generation of personalized outreach, content briefs, and CRM updates. It seamlessly connects with tools like Salesforce and HubSpot to streamline the entire go-to-market motion.",
        "features": [
            "Pre-built GTM automation templates",
            "CRM and email integration",
            "Bulk content generation",
            "Brand voice consistency"
        ],
        "useCases": [
            "Automated personalized cold outreach",
            "Lead enrichment and summarization",
            "SEO content pipeline automation",
            "Social media scheduling and generation"
        ],
        "domain": "copy.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ai-tool-bland-ai",
        "name": "Bland AI",
        "description": "Hyper-realistic AI phone agents that can make and receive calls, automate customer support, and integrate directly with your existing software.",
        "url": "https://www.bland.ai/",
        "pricing": "Usage Based",
        "rating": 4.9,
        "category": "AI Agents & Automation",
        "tags": [
            "Voice",
            "Agents",
            "Customer Support",
            "Sales"
        ],
        "featured": true,
        "dateAdded": "2026-05-29T14:11:53.672Z",
        "imageUrl": "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80",
        "longDescription": "Bland AI provides developers and businesses with an API to deploy hyper-realistic AI phone calling agents. These agents can handle complex conversations, book appointments, qualify leads, and perform API actions during the call based on user responses.",
        "features": [
            "Ultra-low latency conversational voice AI",
            "Custom voice cloning and selection",
            "Mid-call API triggers",
            "Real-time call transcripts and analytics"
        ],
        "useCases": [
            "Inbound customer support routing",
            "Outbound lead qualification calls",
            "Appointment scheduling and reminders",
            "Automated surveys and feedback collection"
        ],
        "domain": "bland.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "leetcode",
        "name": "LeetCode",
        "description": "The world's leading online programming learning platform for interview prep.",
        "category": "Development",
        "url": "https://leetcode.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-26T18:55:58.235Z",
        "domain": "leetcode.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hackerrank",
        "name": "HackerRank",
        "description": "Practice coding, prepare for interviews, and get hired.",
        "category": "Development",
        "url": "https://hackerrank.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-12T19:45:14.711Z",
        "domain": "hackerrank.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codeforces",
        "name": "Codeforces",
        "description": "Programming competitions and contests platform.",
        "category": "Development",
        "url": "https://codeforces.com",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-01T12:33:42.410Z",
        "domain": "codeforces.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codechef",
        "name": "CodeChef",
        "description": "A competitive programming community and educational initiative.",
        "category": "Development",
        "url": "https://codechef.com",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-09T03:28:24.055Z",
        "domain": "codechef.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "atcoder",
        "name": "AtCoder",
        "description": "Programming contest site for anyone from beginners to experts.",
        "category": "Development",
        "url": "https://atcoder.jp",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-02T22:07:58.047Z",
        "domain": "atcoder.jp",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "exercism",
        "name": "Exercism",
        "description": "Code practice and mentorship for everyone. Develop fluency in coding.",
        "category": "Development",
        "url": "https://exercism.org",
        "imageUrl": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-18T12:36:16.509Z",
        "domain": "exercism.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coderbyte",
        "name": "Coderbyte",
        "description": "The #1 platform for technical assessments and interview prep.",
        "category": "Development",
        "url": "https://coderbyte.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-19T10:40:57.734Z",
        "domain": "coderbyte.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "project-euler",
        "name": "Project Euler",
        "description": "A series of challenging mathematical/computer programming problems.",
        "category": "Development",
        "url": "https://projecteuler.net",
        "imageUrl": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-09T21:12:05.644Z",
        "domain": "projecteuler.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sqlbolt",
        "name": "SQLBolt",
        "description": "Learn SQL with simple, interactive exercises.",
        "category": "Development",
        "url": "https://sqlbolt.com",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-10T09:12:24.960Z",
        "domain": "sqlbolt.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "frontend-mentor",
        "name": "Frontend Mentor",
        "description": "Improve your front-end coding skills by building real projects.",
        "category": "Development",
        "url": "https://frontendmentor.io",
        "imageUrl": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-21T22:37:53.281Z",
        "domain": "frontendmentor.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "roadmap-sh",
        "name": "Roadmap.sh",
        "description": "Community-driven roadmaps, articles, and resources for developers.",
        "category": "Development",
        "url": "https://roadmap.sh",
        "imageUrl": "https://images.unsplash.com/photo-1473221326025-9183b464c209?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-08T10:09:44.195Z",
        "domain": "roadmap.sh",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "freecodecamp",
        "name": "freeCodeCamp",
        "description": "Learn to code — for free. Build projects. Earn certifications.",
        "category": "Development",
        "url": "https://freecodecamp.org",
        "imageUrl": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-30T14:31:35.245Z",
        "domain": "freecodecamp.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "cs50",
        "name": "CS50",
        "description": "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
        "category": "Development",
        "url": "https://cs50.harvard.edu",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-29T17:14:32.120Z",
        "domain": "cs50.harvard.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "the-odin-project",
        "name": "The Odin Project",
        "description": "Your Career in Web Development Starts Here. Our full stack curriculum is free and supported by a passionate open source community.",
        "category": "Development",
        "url": "https://theodinproject.com",
        "imageUrl": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-24T17:15:55.627Z",
        "domain": "theodinproject.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "w3schools",
        "name": "W3Schools",
        "description": "The world's largest web developer site, with tutorials and references on web development languages.",
        "category": "Development",
        "url": "https://w3schools.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-29T09:46:20.111Z",
        "domain": "w3schools.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mdn",
        "name": "MDN Web Docs",
        "description": "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
        "category": "Development",
        "url": "https://developer.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-13T06:18:22.310Z",
        "domain": "developer.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "geeksforgeeks",
        "name": "GeeksforGeeks",
        "description": "A computer science portal for geeks. It contains well written, well thought and well explained computer science and programming articles.",
        "category": "Development",
        "url": "https://geeksforgeeks.org",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-26T06:55:58.118Z",
        "domain": "geeksforgeeks.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codecademy",
        "name": "Codecademy",
        "description": "Learn the technical skills to get the job you want. Join over 50 million people choosing Codecademy to start a new career.",
        "category": "Development",
        "url": "https://codecademy.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-29T06:50:42.810Z",
        "domain": "codecademy.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "programiz",
        "name": "Programiz",
        "description": "Learn to code in Python, C/C++, Java, and other popular programming languages with our easy to follow tutorials, examples, online compiler and references.",
        "category": "Development",
        "url": "https://programiz.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-03T07:33:31.771Z",
        "domain": "programiz.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "full-stack-open",
        "name": "Full Stack Open",
        "description": "Deep Dive Into Modern Web Development. Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go!",
        "category": "Development",
        "url": "https://fullstackopen.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-01T06:24:32.781Z",
        "domain": "fullstackopen.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "javatpoint",
        "name": "Javatpoint",
        "description": "Javatpoint provides tutorials and interview questions of all technology like java tutorial, android, java frameworks, javascript, ajax, core java, sql.",
        "category": "Development",
        "url": "https://javatpoint.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-02-14T17:07:32.325Z",
        "domain": "javatpoint.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "devdocs",
        "name": "DevDocs",
        "description": "DevDocs combines multiple API documentations in a fast, organized, and searchable interface.",
        "category": "Development",
        "url": "https://devdocs.io",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-04T09:58:16.440Z",
        "domain": "devdocs.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "kaggle",
        "name": "Kaggle Learn",
        "description": "Gain the skills you need to do independent data science projects. We pare down complex topics to their key practical components.",
        "category": "Development",
        "url": "https://kaggle.com/learn",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-15T16:09:02.831Z",
        "domain": "kaggle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-ai",
        "name": "Google AI",
        "description": "Explore Google's open source machine learning and AI technology, research, and tools.",
        "category": "Google",
        "url": "https://ai.google",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-31T09:03:24.430Z",
        "domain": "ai.google",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "deeplearning-ai",
        "name": "DeepLearning.AI",
        "description": "Learn from the AI pioneer Andrew Ng and a world-class team of experts. Master AI through courses, specializations, and certificates.",
        "category": "Development",
        "url": "https://deeplearning.ai",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-11T21:38:49.743Z",
        "domain": "deeplearning.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "fast-ai",
        "name": "Fast.ai",
        "description": "Making neural nets uncool again. Fast.ai is a non-profit research group focused on deep learning and artificial intelligence.",
        "category": "Development",
        "url": "https://fast.ai",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-31T19:15:26.139Z",
        "domain": "fast.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hugging-face-course",
        "name": "Hugging Face Course",
        "description": "This course will teach you about natural language processing (NLP) using libraries from the Hugging Face ecosystem.",
        "category": "Development",
        "url": "https://huggingface.co/course",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-02T02:03:45.696Z",
        "domain": "huggingface.co",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "microsoft-learn-ai",
        "name": "Microsoft Learn AI",
        "description": "Discover how Microsoft AI and machine learning products can help you build intelligent apps and solutions.",
        "category": "Development",
        "url": "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-05T01:16:04.905Z",
        "domain": "learn.microsoft.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openai-cookbook",
        "name": "OpenAI Cookbook",
        "description": "The OpenAI Cookbook shares example code and prompts for accomplishing common tasks with the OpenAI API.",
        "category": "Development",
        "url": "https://cookbook.openai.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-07T21:30:41.807Z",
        "domain": "cookbook.openai.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "datacamp",
        "name": "DataCamp",
        "description": "Learn the data and AI skills you need online at your own pace—from non-coding essentials to data science and machine learning.",
        "category": "Development",
        "url": "https://datacamp.com",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-30T16:59:40.992Z",
        "domain": "datacamp.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ibm-skillsbuild",
        "name": "IBM SkillsBuild",
        "description": "Free digital learning on tech, workplace skills, and more. Get badges to boost your career.",
        "category": "Development",
        "url": "https://skillsbuild.org",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-11T01:41:33.312Z",
        "domain": "skillsbuild.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sifu-yik",
        "name": "Sifu Yik",
        "description": "Learn AI and Data Science from experts.",
        "category": "Development",
        "url": "https://sifuyik.com",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-26T00:23:58.906Z",
        "domain": "sifuyik.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "tensorflow-tutorials",
        "name": "TensorFlow Tutorials",
        "description": "Learn how to use TensorFlow with these comprehensive tutorials for all skill levels.",
        "category": "Development",
        "url": "https://tensorflow.org/tutorials",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-06T20:29:02.381Z",
        "domain": "tensorflow.org",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-06-08T10:05:59.497Z",
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
        "dateAdded": "2026-06-20T16:20:14.469Z",
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
        "dateAdded": "2026-04-01T13:07:55.202Z",
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
        "dateAdded": "2026-03-21T20:53:31.510Z",
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
        "dateAdded": "2026-06-06T14:43:11.927Z",
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
        "dateAdded": "2026-07-12T04:19:39.048Z",
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
        "dateAdded": "2026-07-04T23:51:56.490Z",
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
        "dateAdded": "2026-05-03T11:40:32.248Z",
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
        "dateAdded": "2026-01-15T20:47:52.314Z",
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
        "dateAdded": "2026-02-21T23:12:53.379Z",
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
        "dateAdded": "2026-03-18T19:19:53.370Z",
        "domain": "learning.postman.com",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-03-07T03:14:58.205Z",
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
        "dateAdded": "2026-04-18T01:40:48.441Z",
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
        "dateAdded": "2026-05-09T10:18:10.704Z",
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
        "dateAdded": "2026-04-08T11:39:09.136Z",
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
        "dateAdded": "2026-04-03T08:59:06.281Z",
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
        "dateAdded": "2026-05-21T05:06:42.408Z",
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
        "dateAdded": "2026-05-17T23:04:00.671Z",
        "domain": "behance.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-fonts-knowledge",
        "name": "Google Fonts Knowledge",
        "description": "Learn about typography from experts around the world.",
        "category": "Google",
        "url": "https://fonts.google.com/knowledge",
        "imageUrl": "https://images.unsplash.com/photo-1550792436-181701c71f63?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-21T14:15:54.416Z",
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
        "dateAdded": "2026-07-13T16:35:51.258Z",
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
        "dateAdded": "2026-04-28T08:01:22.545Z",
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
        "dateAdded": "2026-02-06T05:10:28.721Z",
        "domain": "iconify.design",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hubspot-academy",
        "name": "HubSpot Academy",
        "description": "Free online training for inbound marketing, sales, and customer service professionals.",
        "category": "Marketing & SEO",
        "url": "https://academy.hubspot.com",
        "imageUrl": "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-30T13:55:28.692Z",
        "domain": "academy.hubspot.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-digital-garage",
        "name": "Google Digital Garage",
        "description": "Discover a range of free learning content designed to help your business or in your career.",
        "category": "Google",
        "url": "https://learndigital.withgoogle.com/digitalgarage",
        "imageUrl": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-27T09:24:45.485Z",
        "domain": "learndigital.withgoogle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "meta-blueprint",
        "name": "Meta Blueprint",
        "description": "Free online training for advertising on Facebook, Instagram, Messenger and WhatsApp.",
        "category": "Marketing & SEO",
        "url": "https://www.facebook.com/business/learn",
        "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-29T17:06:15.935Z",
        "domain": "facebook.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "semrush-academy",
        "name": "Semrush Academy",
        "description": "Free SEO and digital marketing courses from top industry experts.",
        "category": "Marketing & SEO",
        "url": "https://www.semrush.com/academy/",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-13T19:02:08.377Z",
        "domain": "semrush.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ahrefs-academy",
        "name": "Ahrefs Academy",
        "description": "Actionable SEO tutorials and marketing courses from Ahrefs.",
        "category": "Marketing & SEO",
        "url": "https://ahrefs.com/academy",
        "imageUrl": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-18T09:27:27.174Z",
        "domain": "ahrefs.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coursera",
        "name": "Coursera",
        "description": "Build skills with courses, certificates, and degrees online from world-class universities and companies.",
        "category": "Education",
        "url": "https://www.coursera.org",
        "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-14T12:32:24.987Z",
        "domain": "coursera.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "edx",
        "name": "edX",
        "description": "Access 2500+ Online Courses from 140 Top Institutions.",
        "category": "Education",
        "url": "https://www.edx.org",
        "imageUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-21T01:49:57.336Z",
        "domain": "edx.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "alison",
        "name": "Alison",
        "description": "Free Online Courses With Certificates & Diplomas.",
        "category": "Education",
        "url": "https://alison.com",
        "imageUrl": "https://images.unsplash.com/photo-1546410531-ee4cb47b5315?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-29T07:50:07.771Z",
        "domain": "alison.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "futurelearn",
        "name": "FutureLearn",
        "description": "Online Courses and Degrees from Top Universities.",
        "category": "Education",
        "url": "https://www.futurelearn.com",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-09T10:38:13.235Z",
        "domain": "futurelearn.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openlearn",
        "name": "OpenLearn",
        "description": "Free learning from The Open University.",
        "category": "Education",
        "url": "https://www.open.edu/openlearn",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-31T11:18:12.743Z",
        "domain": "open.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "skillshop",
        "name": "Skillshop",
        "description": "Develop skills you can apply right away, with e-learning courses designed by Google product experts.",
        "category": "Google",
        "url": "https://skillshop.exceedlms.com",
        "imageUrl": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-09T21:39:22.023Z",
        "domain": "skillshop.exceedlms.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "khan-academy",
        "name": "Khan Academy",
        "description": "Free online courses, lessons and practice. You can learn anything.",
        "category": "Education",
        "url": "https://www.khanacademy.org",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-02T15:00:01.755Z",
        "domain": "khanacademy.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "brilliant",
        "name": "Brilliant",
        "description": "Build quantitative skills in math, science, and computer science with interactive lessons.",
        "category": "Education",
        "url": "https://brilliant.org",
        "imageUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-22T17:35:45.706Z",
        "domain": "brilliant.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "pauls-online-math-notes",
        "name": "Paul's Online Math Notes",
        "description": "Free math notes and tutorials from Paul Dawkins at Lamar University.",
        "category": "Education",
        "url": "https://tutorial.math.lamar.edu",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-06T09:30:22.254Z",
        "domain": "tutorial.math.lamar.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mit-opencourseware",
        "name": "MIT OpenCourseWare",
        "description": "Free lecture notes, exams, and videos from MIT. No registration required.",
        "category": "Education",
        "url": "https://ocw.mit.edu",
        "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-17T08:09:46.997Z",
        "domain": "ocw.mit.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ck-12",
        "name": "CK-12",
        "description": "Free, customizable, interactive online textbooks, practice, and more.",
        "category": "Education",
        "url": "https://www.ck12.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-02T21:33:54.723Z",
        "domain": "ck12.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nasa-stem",
        "name": "NASA STEM",
        "description": "NASA's STEM engagement site for students and educators.",
        "category": "Education",
        "url": "https://www.nasa.gov/stem",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-10T08:48:57.555Z",
        "domain": "nasa.gov",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "phet-simulations",
        "name": "PhET Simulations",
        "description": "Free interactive math and science simulations from the University of Colorado Boulder.",
        "category": "Education",
        "url": "https://phet.colorado.edu",
        "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-11T14:06:23.568Z",
        "domain": "phet.colorado.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "wolfram-demonstrations",
        "name": "Wolfram Demonstrations Project",
        "description": "Open-code interactive simulations of concepts in science, math, technology, and more.",
        "category": "Education",
        "url": "https://demonstrations.wolfram.com",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-08T21:27:13.858Z",
        "domain": "demonstrations.wolfram.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openstax",
        "name": "OpenStax",
        "description": "Free, peer-reviewed, openly licensed textbooks.",
        "category": "Education",
        "url": "https://openstax.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-02T21:52:59.723Z",
        "domain": "openstax.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nptel",
        "name": "NPTEL",
        "description": "National Programme on Technology Enhanced Learning (NPTEL) offers online courses and certification.",
        "category": "Education",
        "url": "https://nptel.ac.in",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-22T09:52:43.294Z",
        "domain": "nptel.ac.in",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "byjus-free-resources",
        "name": "BYJU'S Free Resources",
        "description": "Free educational resources and video lessons.",
        "category": "Education",
        "url": "https://byjus.com",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-06T17:30:40.707Z",
        "domain": "byjus.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "notion-academy",
        "name": "Notion Academy",
        "description": "Learn how to use Notion with courses, tutorials, and guides.",
        "category": "Productivity",
        "url": "https://www.notion.so/help/notion-academy",
        "imageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-05T16:23:48.639Z",
        "domain": "notion.so",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "obsidian-help",
        "name": "Obsidian Help",
        "description": "Documentation for Obsidian, a powerful knowledge base on top of a local folder of plain text Markdown files.",
        "category": "Productivity",
        "url": "https://help.obsidian.md",
        "imageUrl": "https://images.unsplash.com/photo-1522881113591-5452277d7045?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-20T23:42:38.637Z",
        "domain": "help.obsidian.md",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "overthewire",
        "name": "OverTheWire",
        "description": "Wargames to help you learn and practice security concepts in the form of fun-filled games.",
        "category": "Development",
        "url": "https://overthewire.org/wargames/",
        "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-30T22:41:01.376Z",
        "domain": "overthewire.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mozilla-observatory",
        "name": "Mozilla Observatory",
        "description": "A set of tools to analyze your website and let you know if it is secure.",
        "category": "Development",
        "url": "https://observatory.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-01T10:00:38.648Z",
        "domain": "observatory.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "internet-archive",
        "name": "Internet Archive",
        "description": "Non-profit library of millions of free books, movies, software, music, websites, and more.",
        "category": "Education",
        "url": "https://archive.org",
        "imageUrl": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-20T00:46:14.064Z",
        "domain": "archive.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "open-library",
        "name": "Open Library",
        "description": "An open, editable library catalog, building towards a web page for every book ever published.",
        "category": "Education",
        "url": "https://openlibrary.org",
        "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-26T16:57:34.807Z",
        "domain": "openlibrary.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "iep",
        "name": "Internet Encyclopedia of Philosophy",
        "description": "A peer-reviewed academic resource.",
        "category": "Education",
        "url": "https://iep.utm.edu",
        "imageUrl": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-04T20:13:16.302Z",
        "domain": "iep.utm.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "youtube",
        "name": "YouTube",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "category": "Google",
        "url": "https://youtube.com",
        "imageUrl": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-27T18:21:09.880Z",
        "domain": "youtube.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "leetcode",
        "name": "LeetCode",
        "description": "The world's leading online programming learning platform for interview prep.",
        "category": "Development",
        "url": "https://leetcode.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-22T07:18:22.917Z",
        "domain": "leetcode.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hackerrank",
        "name": "HackerRank",
        "description": "Practice coding, prepare for interviews, and get hired.",
        "category": "Development",
        "url": "https://hackerrank.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-25T09:41:44.135Z",
        "domain": "hackerrank.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codeforces",
        "name": "Codeforces",
        "description": "Programming competitions and contests platform.",
        "category": "Development",
        "url": "https://codeforces.com",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-20T03:25:12.309Z",
        "domain": "codeforces.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codechef",
        "name": "CodeChef",
        "description": "A competitive programming community and educational initiative.",
        "category": "Development",
        "url": "https://codechef.com",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-18T04:13:18.086Z",
        "domain": "codechef.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "atcoder",
        "name": "AtCoder",
        "description": "Programming contest site for anyone from beginners to experts.",
        "category": "Development",
        "url": "https://atcoder.jp",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-18T15:01:13.153Z",
        "domain": "atcoder.jp",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "exercism",
        "name": "Exercism",
        "description": "Code practice and mentorship for everyone. Develop fluency in coding.",
        "category": "Development",
        "url": "https://exercism.org",
        "imageUrl": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-15T15:03:08.328Z",
        "domain": "exercism.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coderbyte",
        "name": "Coderbyte",
        "description": "The #1 platform for technical assessments and interview prep.",
        "category": "Development",
        "url": "https://coderbyte.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-28T16:17:53.583Z",
        "domain": "coderbyte.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "project-euler",
        "name": "Project Euler",
        "description": "A series of challenging mathematical/computer programming problems.",
        "category": "Development",
        "url": "https://projecteuler.net",
        "imageUrl": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-19T06:11:20.742Z",
        "domain": "projecteuler.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sqlbolt",
        "name": "SQLBolt",
        "description": "Learn SQL with simple, interactive exercises.",
        "category": "Development",
        "url": "https://sqlbolt.com",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-15T22:42:38.213Z",
        "domain": "sqlbolt.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "frontend-mentor",
        "name": "Frontend Mentor",
        "description": "Improve your front-end coding skills by building real projects.",
        "category": "Development",
        "url": "https://frontendmentor.io",
        "imageUrl": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-27T15:37:31.224Z",
        "domain": "frontendmentor.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "roadmap-sh",
        "name": "Roadmap.sh",
        "description": "Community-driven roadmaps, articles, and resources for developers.",
        "category": "Development",
        "url": "https://roadmap.sh",
        "imageUrl": "https://images.unsplash.com/photo-1473221326025-9183b464c209?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-07T21:55:34.175Z",
        "domain": "roadmap.sh",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "freecodecamp",
        "name": "freeCodeCamp",
        "description": "Learn to code — for free. Build projects. Earn certifications.",
        "category": "Development",
        "url": "https://freecodecamp.org",
        "imageUrl": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-04T16:23:15.002Z",
        "domain": "freecodecamp.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "cs50",
        "name": "CS50",
        "description": "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
        "category": "Development",
        "url": "https://cs50.harvard.edu",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-19T23:46:29.206Z",
        "domain": "cs50.harvard.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "the-odin-project",
        "name": "The Odin Project",
        "description": "Your Career in Web Development Starts Here. Our full stack curriculum is free and supported by a passionate open source community.",
        "category": "Development",
        "url": "https://theodinproject.com",
        "imageUrl": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-13T09:42:41.581Z",
        "domain": "theodinproject.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "w3schools",
        "name": "W3Schools",
        "description": "The world's largest web developer site, with tutorials and references on web development languages.",
        "category": "Development",
        "url": "https://w3schools.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-06-15T05:50:17.768Z",
        "domain": "w3schools.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mdn",
        "name": "MDN Web Docs",
        "description": "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
        "category": "Development",
        "url": "https://developer.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-11T13:53:08.192Z",
        "domain": "developer.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "geeksforgeeks",
        "name": "GeeksforGeeks",
        "description": "A computer science portal for geeks. It contains well written, well thought and well explained computer science and programming articles.",
        "category": "Development",
        "url": "https://geeksforgeeks.org",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-17T14:48:13.975Z",
        "domain": "geeksforgeeks.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codecademy",
        "name": "Codecademy",
        "description": "Learn the technical skills to get the job you want. Join over 50 million people choosing Codecademy to start a new career.",
        "category": "Development",
        "url": "https://codecademy.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-13T15:05:44.190Z",
        "domain": "codecademy.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "programiz",
        "name": "Programiz",
        "description": "Learn to code in Python, C/C++, Java, and other popular programming languages with our easy to follow tutorials, examples, online compiler and references.",
        "category": "Development",
        "url": "https://programiz.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-27T12:09:25.600Z",
        "domain": "programiz.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "full-stack-open",
        "name": "Full Stack Open",
        "description": "Deep Dive Into Modern Web Development. Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go!",
        "category": "Development",
        "url": "https://fullstackopen.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-03T03:06:36.124Z",
        "domain": "fullstackopen.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "javatpoint",
        "name": "Javatpoint",
        "description": "Javatpoint provides tutorials and interview questions of all technology like java tutorial, android, java frameworks, javascript, ajax, core java, sql.",
        "category": "Development",
        "url": "https://javatpoint.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-03-16T16:51:50.561Z",
        "domain": "javatpoint.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "devdocs",
        "name": "DevDocs",
        "description": "DevDocs combines multiple API documentations in a fast, organized, and searchable interface.",
        "category": "Development",
        "url": "https://devdocs.io",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-23T19:26:10.381Z",
        "domain": "devdocs.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "kaggle",
        "name": "Kaggle Learn",
        "description": "Gain the skills you need to do independent data science projects. We pare down complex topics to their key practical components.",
        "category": "Development",
        "url": "https://kaggle.com/learn",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-18T18:27:09.001Z",
        "domain": "kaggle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-ai",
        "name": "Google AI",
        "description": "Explore Google's open source machine learning and AI technology, research, and tools.",
        "category": "Google",
        "url": "https://ai.google",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-21T19:47:27.220Z",
        "domain": "ai.google",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "deeplearning-ai",
        "name": "DeepLearning.AI",
        "description": "Learn from the AI pioneer Andrew Ng and a world-class team of experts. Master AI through courses, specializations, and certificates.",
        "category": "Development",
        "url": "https://deeplearning.ai",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-07T17:59:20.453Z",
        "domain": "deeplearning.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "fast-ai",
        "name": "Fast.ai",
        "description": "Making neural nets uncool again. Fast.ai is a non-profit research group focused on deep learning and artificial intelligence.",
        "category": "Development",
        "url": "https://fast.ai",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-26T18:32:04.294Z",
        "domain": "fast.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hugging-face-course",
        "name": "Hugging Face Course",
        "description": "This course will teach you about natural language processing (NLP) using libraries from the Hugging Face ecosystem.",
        "category": "Development",
        "url": "https://huggingface.co/course",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-28T03:44:18.421Z",
        "domain": "huggingface.co",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "microsoft-learn-ai",
        "name": "Microsoft Learn AI",
        "description": "Discover how Microsoft AI and machine learning products can help you build intelligent apps and solutions.",
        "category": "Development",
        "url": "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-14T05:26:21.748Z",
        "domain": "learn.microsoft.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openai-cookbook",
        "name": "OpenAI Cookbook",
        "description": "The OpenAI Cookbook shares example code and prompts for accomplishing common tasks with the OpenAI API.",
        "category": "Development",
        "url": "https://cookbook.openai.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-14T06:40:54.267Z",
        "domain": "cookbook.openai.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "datacamp",
        "name": "DataCamp",
        "description": "Learn the data and AI skills you need online at your own pace—from non-coding essentials to data science and machine learning.",
        "category": "Development",
        "url": "https://datacamp.com",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-23T07:54:08.701Z",
        "domain": "datacamp.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ibm-skillsbuild",
        "name": "IBM SkillsBuild",
        "description": "Free digital learning on tech, workplace skills, and more. Get badges to boost your career.",
        "category": "Development",
        "url": "https://skillsbuild.org",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-18T23:38:23.101Z",
        "domain": "skillsbuild.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sifu-yik",
        "name": "Sifu Yik",
        "description": "Learn AI and Data Science from experts.",
        "category": "Development",
        "url": "https://sifuyik.com",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-07T01:40:22.175Z",
        "domain": "sifuyik.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "tensorflow-tutorials",
        "name": "TensorFlow Tutorials",
        "description": "Learn how to use TensorFlow with these comprehensive tutorials for all skill levels.",
        "category": "Development",
        "url": "https://tensorflow.org/tutorials",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-25T03:46:36.827Z",
        "domain": "tensorflow.org",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-04-30T00:14:07.036Z",
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
        "dateAdded": "2026-04-29T02:43:15.543Z",
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
        "dateAdded": "2026-06-16T08:02:10.331Z",
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
        "dateAdded": "2026-05-26T16:20:43.897Z",
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
        "dateAdded": "2026-04-03T23:23:25.367Z",
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
        "dateAdded": "2026-05-07T06:52:52.396Z",
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
        "dateAdded": "2026-02-28T10:00:33.625Z",
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
        "dateAdded": "2026-04-05T16:43:27.967Z",
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
        "dateAdded": "2026-07-02T11:17:13.238Z",
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
        "dateAdded": "2026-06-14T01:49:26.003Z",
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
        "dateAdded": "2026-06-30T10:19:22.567Z",
        "domain": "learning.postman.com",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-01-20T20:41:56.236Z",
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
        "dateAdded": "2026-05-01T14:49:32.180Z",
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
        "dateAdded": "2026-03-20T04:15:22.170Z",
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
        "dateAdded": "2026-04-09T06:41:11.633Z",
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
        "dateAdded": "2026-05-17T19:43:39.825Z",
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
        "dateAdded": "2026-05-13T07:08:47.058Z",
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
        "dateAdded": "2026-03-14T17:36:58.695Z",
        "domain": "behance.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-fonts-knowledge",
        "name": "Google Fonts Knowledge",
        "description": "Learn about typography from experts around the world.",
        "category": "Google",
        "url": "https://fonts.google.com/knowledge",
        "imageUrl": "https://images.unsplash.com/photo-1550792436-181701c71f63?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-11T00:56:39.483Z",
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
        "dateAdded": "2026-06-12T11:52:31.500Z",
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
        "dateAdded": "2026-03-18T02:10:25.942Z",
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
        "dateAdded": "2026-06-20T19:16:54.312Z",
        "domain": "iconify.design",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hubspot-academy",
        "name": "HubSpot Academy",
        "description": "Free online training for inbound marketing, sales, and customer service professionals.",
        "category": "Marketing & SEO",
        "url": "https://academy.hubspot.com",
        "imageUrl": "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-06T20:07:19.009Z",
        "domain": "academy.hubspot.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-digital-garage",
        "name": "Google Digital Garage",
        "description": "Discover a range of free learning content designed to help your business or in your career.",
        "category": "Google",
        "url": "https://learndigital.withgoogle.com/digitalgarage",
        "imageUrl": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-24T08:43:09.223Z",
        "domain": "learndigital.withgoogle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "meta-blueprint",
        "name": "Meta Blueprint",
        "description": "Free online training for advertising on Facebook, Instagram, Messenger and WhatsApp.",
        "category": "Marketing & SEO",
        "url": "https://www.facebook.com/business/learn",
        "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-09T20:26:28.529Z",
        "domain": "facebook.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "semrush-academy",
        "name": "Semrush Academy",
        "description": "Free SEO and digital marketing courses from top industry experts.",
        "category": "Marketing & SEO",
        "url": "https://www.semrush.com/academy/",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-17T07:24:04.542Z",
        "domain": "semrush.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ahrefs-academy",
        "name": "Ahrefs Academy",
        "description": "Actionable SEO tutorials and marketing courses from Ahrefs.",
        "category": "Marketing & SEO",
        "url": "https://ahrefs.com/academy",
        "imageUrl": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-20T09:34:48.200Z",
        "domain": "ahrefs.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coursera",
        "name": "Coursera",
        "description": "Build skills with courses, certificates, and degrees online from world-class universities and companies.",
        "category": "Education",
        "url": "https://www.coursera.org",
        "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-25T03:51:23.619Z",
        "domain": "coursera.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "edx",
        "name": "edX",
        "description": "Access 2500+ Online Courses from 140 Top Institutions.",
        "category": "Education",
        "url": "https://www.edx.org",
        "imageUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-02T23:06:09.224Z",
        "domain": "edx.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "alison",
        "name": "Alison",
        "description": "Free Online Courses With Certificates & Diplomas.",
        "category": "Education",
        "url": "https://alison.com",
        "imageUrl": "https://images.unsplash.com/photo-1546410531-ee4cb47b5315?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-02-07T04:47:13.665Z",
        "domain": "alison.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "futurelearn",
        "name": "FutureLearn",
        "description": "Online Courses and Degrees from Top Universities.",
        "category": "Education",
        "url": "https://www.futurelearn.com",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-09T07:49:20.645Z",
        "domain": "futurelearn.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openlearn",
        "name": "OpenLearn",
        "description": "Free learning from The Open University.",
        "category": "Education",
        "url": "https://www.open.edu/openlearn",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-26T21:03:56.985Z",
        "domain": "open.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "skillshop",
        "name": "Skillshop",
        "description": "Develop skills you can apply right away, with e-learning courses designed by Google product experts.",
        "category": "Google",
        "url": "https://skillshop.exceedlms.com",
        "imageUrl": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-19T16:19:10.114Z",
        "domain": "skillshop.exceedlms.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "khan-academy",
        "name": "Khan Academy",
        "description": "Free online courses, lessons and practice. You can learn anything.",
        "category": "Education",
        "url": "https://www.khanacademy.org",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-09T08:01:41.305Z",
        "domain": "khanacademy.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "brilliant",
        "name": "Brilliant",
        "description": "Build quantitative skills in math, science, and computer science with interactive lessons.",
        "category": "Education",
        "url": "https://brilliant.org",
        "imageUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-27T18:56:20.094Z",
        "domain": "brilliant.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "pauls-online-math-notes",
        "name": "Paul's Online Math Notes",
        "description": "Free math notes and tutorials from Paul Dawkins at Lamar University.",
        "category": "Education",
        "url": "https://tutorial.math.lamar.edu",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-22T02:07:07.793Z",
        "domain": "tutorial.math.lamar.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mit-opencourseware",
        "name": "MIT OpenCourseWare",
        "description": "Free lecture notes, exams, and videos from MIT. No registration required.",
        "category": "Education",
        "url": "https://ocw.mit.edu",
        "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-08T17:43:20.021Z",
        "domain": "ocw.mit.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ck-12",
        "name": "CK-12",
        "description": "Free, customizable, interactive online textbooks, practice, and more.",
        "category": "Education",
        "url": "https://www.ck12.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-24T14:24:34.110Z",
        "domain": "ck12.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nasa-stem",
        "name": "NASA STEM",
        "description": "NASA's STEM engagement site for students and educators.",
        "category": "Education",
        "url": "https://www.nasa.gov/stem",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-29T18:52:07.464Z",
        "domain": "nasa.gov",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "phet-simulations",
        "name": "PhET Simulations",
        "description": "Free interactive math and science simulations from the University of Colorado Boulder.",
        "category": "Education",
        "url": "https://phet.colorado.edu",
        "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-25T03:28:11.026Z",
        "domain": "phet.colorado.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "wolfram-demonstrations",
        "name": "Wolfram Demonstrations Project",
        "description": "Open-code interactive simulations of concepts in science, math, technology, and more.",
        "category": "Education",
        "url": "https://demonstrations.wolfram.com",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-03T14:17:32.600Z",
        "domain": "demonstrations.wolfram.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openstax",
        "name": "OpenStax",
        "description": "Free, peer-reviewed, openly licensed textbooks.",
        "category": "Education",
        "url": "https://openstax.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-19T14:07:15.059Z",
        "domain": "openstax.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nptel",
        "name": "NPTEL",
        "description": "National Programme on Technology Enhanced Learning (NPTEL) offers online courses and certification.",
        "category": "Education",
        "url": "https://nptel.ac.in",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-09T01:53:09.808Z",
        "domain": "nptel.ac.in",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "byjus-free-resources",
        "name": "BYJU'S Free Resources",
        "description": "Free educational resources and video lessons.",
        "category": "Education",
        "url": "https://byjus.com",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-10T01:27:46.033Z",
        "domain": "byjus.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "notion-academy",
        "name": "Notion Academy",
        "description": "Learn how to use Notion with courses, tutorials, and guides.",
        "category": "Productivity",
        "url": "https://www.notion.so/help/notion-academy",
        "imageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-10T01:36:41.386Z",
        "domain": "notion.so",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "obsidian-help",
        "name": "Obsidian Help",
        "description": "Documentation for Obsidian, a powerful knowledge base on top of a local folder of plain text Markdown files.",
        "category": "Productivity",
        "url": "https://help.obsidian.md",
        "imageUrl": "https://images.unsplash.com/photo-1522881113591-5452277d7045?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-22T06:16:30.077Z",
        "domain": "help.obsidian.md",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "overthewire",
        "name": "OverTheWire",
        "description": "Wargames to help you learn and practice security concepts in the form of fun-filled games.",
        "category": "Development",
        "url": "https://overthewire.org/wargames/",
        "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-04T11:11:44.186Z",
        "domain": "overthewire.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mozilla-observatory",
        "name": "Mozilla Observatory",
        "description": "A set of tools to analyze your website and let you know if it is secure.",
        "category": "Development",
        "url": "https://observatory.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-31T01:29:20.448Z",
        "domain": "observatory.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "internet-archive",
        "name": "Internet Archive",
        "description": "Non-profit library of millions of free books, movies, software, music, websites, and more.",
        "category": "Education",
        "url": "https://archive.org",
        "imageUrl": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-13T07:54:46.775Z",
        "domain": "archive.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "open-library",
        "name": "Open Library",
        "description": "An open, editable library catalog, building towards a web page for every book ever published.",
        "category": "Education",
        "url": "https://openlibrary.org",
        "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-16T16:54:14.261Z",
        "domain": "openlibrary.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "iep",
        "name": "Internet Encyclopedia of Philosophy",
        "description": "A peer-reviewed academic resource.",
        "category": "Education",
        "url": "https://iep.utm.edu",
        "imageUrl": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-15T17:13:55.030Z",
        "domain": "iep.utm.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "youtube",
        "name": "YouTube",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "category": "Google",
        "url": "https://youtube.com",
        "imageUrl": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-21T16:55:41.580Z",
        "domain": "youtube.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "leetcode",
        "name": "LeetCode",
        "description": "The world's leading online programming learning platform for interview prep.",
        "category": "Development",
        "url": "https://leetcode.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-09T14:20:52.306Z",
        "domain": "leetcode.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hackerrank",
        "name": "HackerRank",
        "description": "Practice coding, prepare for interviews, and get hired.",
        "category": "Development",
        "url": "https://hackerrank.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-26T03:04:58.280Z",
        "domain": "hackerrank.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codeforces",
        "name": "Codeforces",
        "description": "Programming competitions and contests platform.",
        "category": "Development",
        "url": "https://codeforces.com",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-04-06T19:44:43.466Z",
        "domain": "codeforces.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codechef",
        "name": "CodeChef",
        "description": "A competitive programming community and educational initiative.",
        "category": "Development",
        "url": "https://codechef.com",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-08T14:24:54.996Z",
        "domain": "codechef.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "atcoder",
        "name": "AtCoder",
        "description": "Programming contest site for anyone from beginners to experts.",
        "category": "Development",
        "url": "https://atcoder.jp",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-27T02:21:15.794Z",
        "domain": "atcoder.jp",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "exercism",
        "name": "Exercism",
        "description": "Code practice and mentorship for everyone. Develop fluency in coding.",
        "category": "Development",
        "url": "https://exercism.org",
        "imageUrl": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-21T12:04:40.333Z",
        "domain": "exercism.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coderbyte",
        "name": "Coderbyte",
        "description": "The #1 platform for technical assessments and interview prep.",
        "category": "Development",
        "url": "https://coderbyte.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-01-23T20:40:59.455Z",
        "domain": "coderbyte.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "project-euler",
        "name": "Project Euler",
        "description": "A series of challenging mathematical/computer programming problems.",
        "category": "Development",
        "url": "https://projecteuler.net",
        "imageUrl": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-07-13T14:10:16.967Z",
        "domain": "projecteuler.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sqlbolt",
        "name": "SQLBolt",
        "description": "Learn SQL with simple, interactive exercises.",
        "category": "Development",
        "url": "https://sqlbolt.com",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-10T00:38:56.164Z",
        "domain": "sqlbolt.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "frontend-mentor",
        "name": "Frontend Mentor",
        "description": "Improve your front-end coding skills by building real projects.",
        "category": "Development",
        "url": "https://frontendmentor.io",
        "imageUrl": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-15T09:23:17.931Z",
        "domain": "frontendmentor.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "roadmap-sh",
        "name": "Roadmap.sh",
        "description": "Community-driven roadmaps, articles, and resources for developers.",
        "category": "Development",
        "url": "https://roadmap.sh",
        "imageUrl": "https://images.unsplash.com/photo-1473221326025-9183b464c209?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-20T02:07:39.813Z",
        "domain": "roadmap.sh",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "freecodecamp",
        "name": "freeCodeCamp",
        "description": "Learn to code — for free. Build projects. Earn certifications.",
        "category": "Development",
        "url": "https://freecodecamp.org",
        "imageUrl": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-10T17:25:04.890Z",
        "domain": "freecodecamp.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "cs50",
        "name": "CS50",
        "description": "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
        "category": "Development",
        "url": "https://cs50.harvard.edu",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-29T00:28:05.582Z",
        "domain": "cs50.harvard.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "the-odin-project",
        "name": "The Odin Project",
        "description": "Your Career in Web Development Starts Here. Our full stack curriculum is free and supported by a passionate open source community.",
        "category": "Development",
        "url": "https://theodinproject.com",
        "imageUrl": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-31T06:55:10.206Z",
        "domain": "theodinproject.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "w3schools",
        "name": "W3Schools",
        "description": "The world's largest web developer site, with tutorials and references on web development languages.",
        "category": "Development",
        "url": "https://w3schools.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-09T10:38:04.960Z",
        "domain": "w3schools.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mdn",
        "name": "MDN Web Docs",
        "description": "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
        "category": "Development",
        "url": "https://developer.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-15T06:29:57.142Z",
        "domain": "developer.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "geeksforgeeks",
        "name": "GeeksforGeeks",
        "description": "A computer science portal for geeks. It contains well written, well thought and well explained computer science and programming articles.",
        "category": "Development",
        "url": "https://geeksforgeeks.org",
        "imageUrl": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-11T03:17:40.733Z",
        "domain": "geeksforgeeks.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "codecademy",
        "name": "Codecademy",
        "description": "Learn the technical skills to get the job you want. Join over 50 million people choosing Codecademy to start a new career.",
        "category": "Development",
        "url": "https://codecademy.com",
        "imageUrl": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-13T06:12:03.704Z",
        "domain": "codecademy.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "programiz",
        "name": "Programiz",
        "description": "Learn to code in Python, C/C++, Java, and other popular programming languages with our easy to follow tutorials, examples, online compiler and references.",
        "category": "Development",
        "url": "https://programiz.com",
        "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-03-03T16:51:03.747Z",
        "domain": "programiz.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "full-stack-open",
        "name": "Full Stack Open",
        "description": "Deep Dive Into Modern Web Development. Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go!",
        "category": "Development",
        "url": "https://fullstackopen.com",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-21T19:01:01.058Z",
        "domain": "fullstackopen.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "javatpoint",
        "name": "Javatpoint",
        "description": "Javatpoint provides tutorials and interview questions of all technology like java tutorial, android, java frameworks, javascript, ajax, core java, sql.",
        "category": "Development",
        "url": "https://javatpoint.com",
        "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-05-12T17:15:15.523Z",
        "domain": "javatpoint.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "devdocs",
        "name": "DevDocs",
        "description": "DevDocs combines multiple API documentations in a fast, organized, and searchable interface.",
        "category": "Development",
        "url": "https://devdocs.io",
        "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-07-09T17:13:49.091Z",
        "domain": "devdocs.io",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "kaggle",
        "name": "Kaggle Learn",
        "description": "Gain the skills you need to do independent data science projects. We pare down complex topics to their key practical components.",
        "category": "Development",
        "url": "https://kaggle.com/learn",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-19T05:56:08.759Z",
        "domain": "kaggle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-ai",
        "name": "Google AI",
        "description": "Explore Google's open source machine learning and AI technology, research, and tools.",
        "category": "Google",
        "url": "https://ai.google",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-25T16:26:43.542Z",
        "domain": "ai.google",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "deeplearning-ai",
        "name": "DeepLearning.AI",
        "description": "Learn from the AI pioneer Andrew Ng and a world-class team of experts. Master AI through courses, specializations, and certificates.",
        "category": "Development",
        "url": "https://deeplearning.ai",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Paid",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-29T01:06:14.560Z",
        "domain": "deeplearning.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "fast-ai",
        "name": "Fast.ai",
        "description": "Making neural nets uncool again. Fast.ai is a non-profit research group focused on deep learning and artificial intelligence.",
        "category": "Development",
        "url": "https://fast.ai",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-18T19:14:09.935Z",
        "domain": "fast.ai",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hugging-face-course",
        "name": "Hugging Face Course",
        "description": "This course will teach you about natural language processing (NLP) using libraries from the Hugging Face ecosystem.",
        "category": "Development",
        "url": "https://huggingface.co/course",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-20T12:01:43.459Z",
        "domain": "huggingface.co",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "microsoft-learn-ai",
        "name": "Microsoft Learn AI",
        "description": "Discover how Microsoft AI and machine learning products can help you build intelligent apps and solutions.",
        "category": "Development",
        "url": "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-17T23:15:48.674Z",
        "domain": "learn.microsoft.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openai-cookbook",
        "name": "OpenAI Cookbook",
        "description": "The OpenAI Cookbook shares example code and prompts for accomplishing common tasks with the OpenAI API.",
        "category": "Development",
        "url": "https://cookbook.openai.com",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-17T10:46:36.874Z",
        "domain": "cookbook.openai.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "datacamp",
        "name": "DataCamp",
        "description": "Learn the data and AI skills you need online at your own pace—from non-coding essentials to data science and machine learning.",
        "category": "Development",
        "url": "https://datacamp.com",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-02T17:57:33.122Z",
        "domain": "datacamp.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ibm-skillsbuild",
        "name": "IBM SkillsBuild",
        "description": "Free digital learning on tech, workplace skills, and more. Get badges to boost your career.",
        "category": "Development",
        "url": "https://skillsbuild.org",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-24T06:44:00.140Z",
        "domain": "skillsbuild.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "sifu-yik",
        "name": "Sifu Yik",
        "description": "Learn AI and Data Science from experts.",
        "category": "Development",
        "url": "https://sifuyik.com",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-04-21T11:56:15.716Z",
        "domain": "sifuyik.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "tensorflow-tutorials",
        "name": "TensorFlow Tutorials",
        "description": "Learn how to use TensorFlow with these comprehensive tutorials for all skill levels.",
        "category": "Development",
        "url": "https://tensorflow.org/tutorials",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-01T06:26:08.826Z",
        "domain": "tensorflow.org",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-04-11T09:11:17.035Z",
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
        "dateAdded": "2026-07-03T12:46:22.890Z",
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
        "dateAdded": "2026-06-30T05:59:11.559Z",
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
        "dateAdded": "2026-03-07T19:41:08.995Z",
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
        "dateAdded": "2026-04-23T16:24:38.051Z",
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
        "dateAdded": "2026-02-15T16:21:08.674Z",
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
        "dateAdded": "2026-05-25T16:51:19.577Z",
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
        "dateAdded": "2026-04-10T01:54:24.861Z",
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
        "dateAdded": "2026-01-25T16:58:22.362Z",
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
        "dateAdded": "2026-06-05T09:39:00.117Z",
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
        "dateAdded": "2026-05-03T06:00:44.043Z",
        "domain": "learning.postman.com",
        "brandColor": "var(--color-primary)"
    },
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
        "dateAdded": "2026-06-09T08:52:52.860Z",
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
        "dateAdded": "2026-05-30T23:56:58.756Z",
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
        "dateAdded": "2026-01-22T04:54:49.226Z",
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
        "dateAdded": "2026-07-01T20:22:03.606Z",
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
        "dateAdded": "2026-06-03T00:55:43.868Z",
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
        "dateAdded": "2026-03-31T14:12:41.304Z",
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
        "dateAdded": "2026-04-07T14:23:28.260Z",
        "domain": "behance.net",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-fonts-knowledge",
        "name": "Google Fonts Knowledge",
        "description": "Learn about typography from experts around the world.",
        "category": "Google",
        "url": "https://fonts.google.com/knowledge",
        "imageUrl": "https://images.unsplash.com/photo-1550792436-181701c71f63?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-18T21:06:02.074Z",
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
        "dateAdded": "2026-02-19T06:55:47.996Z",
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
        "dateAdded": "2026-02-18T22:54:45.381Z",
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
        "dateAdded": "2026-06-13T09:49:25.015Z",
        "domain": "iconify.design",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "hubspot-academy",
        "name": "HubSpot Academy",
        "description": "Free online training for inbound marketing, sales, and customer service professionals.",
        "category": "Marketing & SEO",
        "url": "https://academy.hubspot.com",
        "imageUrl": "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-28T21:25:19.532Z",
        "domain": "academy.hubspot.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "google-digital-garage",
        "name": "Google Digital Garage",
        "description": "Discover a range of free learning content designed to help your business or in your career.",
        "category": "Google",
        "url": "https://learndigital.withgoogle.com/digitalgarage",
        "imageUrl": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-06T13:14:08.447Z",
        "domain": "learndigital.withgoogle.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "meta-blueprint",
        "name": "Meta Blueprint",
        "description": "Free online training for advertising on Facebook, Instagram, Messenger and WhatsApp.",
        "category": "Marketing & SEO",
        "url": "https://www.facebook.com/business/learn",
        "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-05-09T01:12:52.373Z",
        "domain": "facebook.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "semrush-academy",
        "name": "Semrush Academy",
        "description": "Free SEO and digital marketing courses from top industry experts.",
        "category": "Marketing & SEO",
        "url": "https://www.semrush.com/academy/",
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-26T10:00:18.088Z",
        "domain": "semrush.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ahrefs-academy",
        "name": "Ahrefs Academy",
        "description": "Actionable SEO tutorials and marketing courses from Ahrefs.",
        "category": "Marketing & SEO",
        "url": "https://ahrefs.com/academy",
        "imageUrl": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-24T12:21:05.724Z",
        "domain": "ahrefs.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "coursera",
        "name": "Coursera",
        "description": "Build skills with courses, certificates, and degrees online from world-class universities and companies.",
        "category": "Education",
        "url": "https://www.coursera.org",
        "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-05-29T14:25:19.269Z",
        "domain": "coursera.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "edx",
        "name": "edX",
        "description": "Access 2500+ Online Courses from 140 Top Institutions.",
        "category": "Education",
        "url": "https://www.edx.org",
        "imageUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-01-30T01:51:41.884Z",
        "domain": "edx.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "alison",
        "name": "Alison",
        "description": "Free Online Courses With Certificates & Diplomas.",
        "category": "Education",
        "url": "https://alison.com",
        "imageUrl": "https://images.unsplash.com/photo-1546410531-ee4cb47b5315?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-14T10:10:54.043Z",
        "domain": "alison.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "futurelearn",
        "name": "FutureLearn",
        "description": "Online Courses and Degrees from Top Universities.",
        "category": "Education",
        "url": "https://www.futurelearn.com",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-04-17T21:48:54.010Z",
        "domain": "futurelearn.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openlearn",
        "name": "OpenLearn",
        "description": "Free learning from The Open University.",
        "category": "Education",
        "url": "https://www.open.edu/openlearn",
        "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-25T10:58:21.892Z",
        "domain": "open.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "skillshop",
        "name": "Skillshop",
        "description": "Develop skills you can apply right away, with e-learning courses designed by Google product experts.",
        "category": "Google",
        "url": "https://skillshop.exceedlms.com",
        "imageUrl": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-12T11:37:01.276Z",
        "domain": "skillshop.exceedlms.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "khan-academy",
        "name": "Khan Academy",
        "description": "Free online courses, lessons and practice. You can learn anything.",
        "category": "Education",
        "url": "https://www.khanacademy.org",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-22T02:55:51.697Z",
        "domain": "khanacademy.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "brilliant",
        "name": "Brilliant",
        "description": "Build quantitative skills in math, science, and computer science with interactive lessons.",
        "category": "Education",
        "url": "https://brilliant.org",
        "imageUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-19T21:48:18.109Z",
        "domain": "brilliant.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "pauls-online-math-notes",
        "name": "Paul's Online Math Notes",
        "description": "Free math notes and tutorials from Paul Dawkins at Lamar University.",
        "category": "Education",
        "url": "https://tutorial.math.lamar.edu",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-02-14T09:01:23.565Z",
        "domain": "tutorial.math.lamar.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mit-opencourseware",
        "name": "MIT OpenCourseWare",
        "description": "Free lecture notes, exams, and videos from MIT. No registration required.",
        "category": "Education",
        "url": "https://ocw.mit.edu",
        "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-16T22:13:28.442Z",
        "domain": "ocw.mit.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "ck-12",
        "name": "CK-12",
        "description": "Free, customizable, interactive online textbooks, practice, and more.",
        "category": "Education",
        "url": "https://www.ck12.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-10T16:39:43.440Z",
        "domain": "ck12.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nasa-stem",
        "name": "NASA STEM",
        "description": "NASA's STEM engagement site for students and educators.",
        "category": "Education",
        "url": "https://www.nasa.gov/stem",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-26T08:59:29.822Z",
        "domain": "nasa.gov",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "phet-simulations",
        "name": "PhET Simulations",
        "description": "Free interactive math and science simulations from the University of Colorado Boulder.",
        "category": "Education",
        "url": "https://phet.colorado.edu",
        "imageUrl": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-16T18:46:46.734Z",
        "domain": "phet.colorado.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "wolfram-demonstrations",
        "name": "Wolfram Demonstrations Project",
        "description": "Open-code interactive simulations of concepts in science, math, technology, and more.",
        "category": "Education",
        "url": "https://demonstrations.wolfram.com",
        "imageUrl": "https://images.unsplash.com/photo-1632516643771-69e1358c97dd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-08T12:00:43.018Z",
        "domain": "demonstrations.wolfram.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "openstax",
        "name": "OpenStax",
        "description": "Free, peer-reviewed, openly licensed textbooks.",
        "category": "Education",
        "url": "https://openstax.org",
        "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-09T15:05:20.216Z",
        "domain": "openstax.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "nptel",
        "name": "NPTEL",
        "description": "National Programme on Technology Enhanced Learning (NPTEL) offers online courses and certification.",
        "category": "Education",
        "url": "https://nptel.ac.in",
        "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-06-17T04:00:56.940Z",
        "domain": "nptel.ac.in",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "byjus-free-resources",
        "name": "BYJU'S Free Resources",
        "description": "Free educational resources and video lessons.",
        "category": "Education",
        "url": "https://byjus.com",
        "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-06-09T03:09:06.965Z",
        "domain": "byjus.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "notion-academy",
        "name": "Notion Academy",
        "description": "Learn how to use Notion with courses, tutorials, and guides.",
        "category": "Productivity",
        "url": "https://www.notion.so/help/notion-academy",
        "imageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-02-18T17:55:49.345Z",
        "domain": "notion.so",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "obsidian-help",
        "name": "Obsidian Help",
        "description": "Documentation for Obsidian, a powerful knowledge base on top of a local folder of plain text Markdown files.",
        "category": "Productivity",
        "url": "https://help.obsidian.md",
        "imageUrl": "https://images.unsplash.com/photo-1522881113591-5452277d7045?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-01-28T04:37:30.873Z",
        "domain": "help.obsidian.md",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "overthewire",
        "name": "OverTheWire",
        "description": "Wargames to help you learn and practice security concepts in the form of fun-filled games.",
        "category": "Development",
        "url": "https://overthewire.org/wargames/",
        "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-04-20T03:24:05.591Z",
        "domain": "overthewire.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "mozilla-observatory",
        "name": "Mozilla Observatory",
        "description": "A set of tools to analyze your website and let you know if it is secure.",
        "category": "Development",
        "url": "https://observatory.mozilla.org",
        "imageUrl": "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-02T12:01:24.899Z",
        "domain": "observatory.mozilla.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "internet-archive",
        "name": "Internet Archive",
        "description": "Non-profit library of millions of free books, movies, software, music, websites, and more.",
        "category": "Education",
        "url": "https://archive.org",
        "imageUrl": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-06-28T05:14:53.998Z",
        "domain": "archive.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "open-library",
        "name": "Open Library",
        "description": "An open, editable library catalog, building towards a web page for every book ever published.",
        "category": "Education",
        "url": "https://openlibrary.org",
        "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-05-16T08:20:43.764Z",
        "domain": "openlibrary.org",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "iep",
        "name": "Internet Encyclopedia of Philosophy",
        "description": "A peer-reviewed academic resource.",
        "category": "Education",
        "url": "https://iep.utm.edu",
        "imageUrl": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.8,
        "featured": false,
        "dateAdded": "2026-03-18T13:57:23.188Z",
        "domain": "iep.utm.edu",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "youtube",
        "name": "YouTube",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "category": "Google",
        "url": "https://youtube.com",
        "imageUrl": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.9,
        "featured": false,
        "dateAdded": "2026-03-27T22:42:56.999Z",
        "domain": "youtube.com",
        "brandColor": "var(--color-primary)"
    },
    {
        "id": "recraft",
        "name": "Recraft",
        "description": "AI design tool that generates editable vector (SVG) graphics, icons and brand sets with a consistent style. Built for real design work, not just raster images.",
        "category": "Image & Art Generation",
        "url": "https://www.recraft.ai",
        "imageUrl": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "recraft.ai",
        "brandColor": "#6E56CF"
    },
    {
        "id": "flux",
        "name": "Flux",
        "description": "High-quality image generation from Black Forest Labs, known for photorealism, lifelike detail and strong text rendering. Available across many platforms.",
        "category": "Image & Art Generation",
        "url": "https://blackforestlabs.ai",
        "imageUrl": "https://images.unsplash.com/photo-1547954575-855750c57bd3?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "blackforestlabs.ai",
        "brandColor": "#111827"
    },
    {
        "id": "higgsfield",
        "name": "Higgsfield",
        "description": "AI video generator focused on cinematic camera motion and controls, popular with social creators for dynamic, film-style clips.",
        "category": "Video & Audio Generation",
        "url": "https://higgsfield.ai",
        "imageUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "higgsfield.ai",
        "brandColor": "#7C3AED"
    },
    {
        "id": "hailuo-ai",
        "name": "Hailuo AI",
        "description": "MiniMax's text-to-video and image-to-video generator, praised for smooth motion and realistic results with a generous free tier.",
        "category": "Video & Audio Generation",
        "url": "https://hailuoai.video",
        "imageUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "hailuoai.video",
        "brandColor": "#FF6A00"
    },
    {
        "id": "manus",
        "name": "Manus",
        "description": "A general AI agent that autonomously plans and completes multi-step tasks — research, data work and building things — with minimal supervision.",
        "category": "AI Agents & Automation",
        "url": "https://manus.im",
        "imageUrl": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "manus.im",
        "brandColor": "#6366F1"
    },
    {
        "id": "genspark",
        "name": "Genspark",
        "description": "An AI agent and answer engine that runs deep research, builds pages and automates tasks across the web, combining search with autonomous execution.",
        "category": "AI Agents & Automation",
        "url": "https://www.genspark.ai",
        "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.3,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "genspark.ai",
        "brandColor": "#FF5A5F"
    },
    {
        "id": "qwen",
        "name": "Qwen",
        "description": "Alibaba's powerful Qwen chat assistant and open models, strong at reasoning, coding and multilingual tasks, free to use online.",
        "category": "AI Chatbots & Assistants",
        "url": "https://chat.qwen.ai",
        "imageUrl": "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.5,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "qwen.ai",
        "brandColor": "#615CED"
    },
    {
        "id": "fal-ai",
        "name": "Fal",
        "description": "A fast inference platform for developers to run and deploy generative image, video and audio models via simple APIs, with generous free credits.",
        "category": "LLM Providers & APIs",
        "url": "https://fal.ai",
        "imageUrl": "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.4,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "fal.ai",
        "brandColor": "#0EA5E9"
    },
    {
        "id": "google-search",
        "name": "Google Search",
        "description": "The world’s most-used search engine — find anything on the web in an instant.",
        "category": "Google",
        "url": "https://www.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "gmail",
        "name": "Gmail",
        "description": "Google’s free email service with powerful search, spam protection and Workspace integration.",
        "category": "Google",
        "url": "https://mail.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "gmail.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-maps",
        "name": "Google Maps",
        "description": "Maps, directions, live traffic and local business info for anywhere on earth.",
        "category": "Google",
        "url": "https://maps.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "maps.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-drive",
        "name": "Google Drive",
        "description": "Cloud storage to keep, sync and share your files, photos and documents.",
        "category": "Google",
        "url": "https://drive.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "drive.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-docs",
        "name": "Google Docs",
        "description": "Free online word processor for creating and collaborating on documents in real time.",
        "category": "Google",
        "url": "https://docs.google.com/document",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "docs.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-sheets",
        "name": "Google Sheets",
        "description": "Free online spreadsheets with formulas, charts and real-time collaboration.",
        "category": "Google",
        "url": "https://docs.google.com/spreadsheets",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "sheets.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-slides",
        "name": "Google Slides",
        "description": "Create and present slide decks online, together with your team.",
        "category": "Google",
        "url": "https://docs.google.com/presentation",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "slides.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-meet",
        "name": "Google Meet",
        "description": "Secure video meetings and calls for teams, right in your browser.",
        "category": "Google",
        "url": "https://meet.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "meet.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-calendar",
        "name": "Google Calendar",
        "description": "Smart scheduling, reminders and shared calendars that sync everywhere.",
        "category": "Google",
        "url": "https://calendar.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "calendar.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-photos",
        "name": "Google Photos",
        "description": "Automatic photo backup, AI search and editing for all your memories.",
        "category": "Google",
        "url": "https://photos.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "photos.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-translate",
        "name": "Google Translate",
        "description": "Instantly translate text, speech, images and websites across 100+ languages.",
        "category": "Google",
        "url": "https://translate.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "translate.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-chrome",
        "name": "Google Chrome",
        "description": "The fast, secure web browser with built-in Google features and extensions.",
        "category": "Google",
        "url": "https://www.google.com/chrome",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-lens",
        "name": "Google Lens",
        "description": "Search what you see — identify objects, text and products with your camera.",
        "category": "Google",
        "url": "https://lens.google",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "lens.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-forms",
        "name": "Google Forms",
        "description": "Build free surveys and quizzes and collect responses in a spreadsheet.",
        "category": "Google",
        "url": "https://forms.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "forms.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-colab",
        "name": "Google Colab",
        "description": "Free cloud Jupyter notebooks with GPUs for Python, data science and AI.",
        "category": "Google",
        "url": "https://colab.google",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "colab.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-cloud",
        "name": "Google Cloud",
        "description": "Cloud computing, storage, data and AI infrastructure that powers apps at scale.",
        "category": "Google",
        "url": "https://cloud.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "cloud.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-scholar",
        "name": "Google Scholar",
        "description": "Search scholarly papers, citations and academic literature across disciplines.",
        "category": "Google",
        "url": "https://scholar.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "scholar.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "android",
        "name": "Android",
        "description": "Google’s mobile operating system powering billions of phones and devices.",
        "category": "Google",
        "url": "https://www.android.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.7,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "android.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "gemini-flash",
        "name": "Gemini Flash",
        "description": "Google’s fastest, most cost-efficient Gemini model — great for high-volume, low-latency tasks.",
        "category": "Google",
        "url": "https://gemini.google.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "gemini.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-flow",
        "name": "Google Flow",
        "description": "Google’s AI filmmaking tool built on Veo — generate and direct cinematic video clips from prompts.",
        "category": "Google",
        "url": "https://labs.google/flow",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "labs.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "imagefx",
        "name": "ImageFX",
        "description": "Google Labs image generator powered by Imagen — create high-quality AI images with expressive chips.",
        "category": "Google",
        "url": "https://labs.google/fx/tools/image-fx",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "labs.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "whisk",
        "name": "Whisk",
        "description": "Google Labs tool that remixes images — combine subject, scene and style images into something new.",
        "category": "Google",
        "url": "https://labs.google/fx/tools/whisk",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "labs.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "musicfx",
        "name": "MusicFX",
        "description": "Google Labs AI music generator — turn text prompts into original instrumental tracks.",
        "category": "Google",
        "url": "https://labs.google/fx/tools/music-fx",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "labs.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-labs",
        "name": "Google Labs",
        "description": "The home for Google’s experimental AI tools and early access to new products.",
        "category": "Google",
        "url": "https://labs.google",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "labs.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "firebase-studio",
        "name": "Firebase Studio",
        "description": "Google’s agentic, cloud-based workspace to build, test and ship full-stack AI apps from a prompt.",
        "category": "Google",
        "url": "https://firebase.studio",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "firebase.studio",
        "brandColor": "#4285F4"
    },
    {
        "id": "jules",
        "name": "Jules",
        "description": "Google’s asynchronous AI coding agent that fixes bugs and builds features in your repo autonomously.",
        "category": "Google",
        "url": "https://jules.google",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "jules.google",
        "brandColor": "#4285F4"
    },
    {
        "id": "google-stitch",
        "name": "Google Stitch",
        "description": "AI UI design tool from Google Labs — generate app interfaces and front-end from text or images.",
        "category": "Google",
        "url": "https://stitch.withgoogle.com",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "stitch.withgoogle.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "learn-about",
        "name": "Learn About",
        "description": "Google’s conversational AI learning experiment that turns any topic into an interactive lesson.",
        "category": "Google",
        "url": "https://learning.google.com/experiments/learn-about",
        "imageUrl": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
        "pricing": "Free",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-07-31T00:00:00.000Z",
        "domain": "learning.google.com",
        "brandColor": "#4285F4"
    },
    {
        "id": "teachy-ai",
        "name": "Teachy AI",
        "description": "AI assistant for teachers — plan lessons, create activities and slides, and grade faster.",
        "category": "Learning & Education",
        "url": "https://teachy.ai",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "teachy.ai",
        "brandColor": "#7C3AED"
    },
    {
        "id": "chalkie-ai",
        "name": "Chalkie",
        "description": "AI teaching assistant that helps educators plan lessons, build resources and save prep time.",
        "category": "Learning & Education",
        "url": "https://chalkie.ai/en",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "chalkie.ai",
        "brandColor": "#10B981"
    },
    {
        "id": "curipod",
        "name": "Curipod",
        "description": "Turn any topic into an interactive classroom lesson with AI — slides, polls and activities in minutes.",
        "category": "Learning & Education",
        "url": "https://curipod.com",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "curipod.com",
        "brandColor": "#F59E0B"
    },
    {
        "id": "diffit",
        "name": "Diffit",
        "description": "AI tool that adapts any text or topic to the right reading level, with questions and vocabulary for students.",
        "category": "Learning & Education",
        "url": "https://diffit.me",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "diffit.me",
        "brandColor": "#EF4444"
    },
    {
        "id": "schoolai",
        "name": "SchoolAI",
        "description": "A safe AI platform for K-12 — student chat Spaces, teacher tools and classroom insights.",
        "category": "Learning & Education",
        "url": "https://schoolai.com",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "schoolai.com",
        "brandColor": "#2563EB"
    },
    {
        "id": "questionwell",
        "name": "QuestionWell",
        "description": "AI question generator — turn any reading or topic into aligned quiz questions and learning objectives.",
        "category": "Learning & Education",
        "url": "https://questionwell.org",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "questionwell.org",
        "brandColor": "#0EA5E9"
    },
    {
        "id": "brisk-teaching",
        "name": "Brisk Teaching",
        "description": "A Chrome extension that gives teachers AI superpowers — feedback, quizzes, leveling and lesson plans on any page.",
        "category": "Learning & Education",
        "url": "https://briskteaching.com",
        "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        "pricing": "Freemium",
        "rating": 4.6,
        "featured": false,
        "dateAdded": "2026-08-04T00:00:00.000Z",
        "domain": "briskteaching.com",
        "brandColor": "#8B5CF6"
    },
  {
      "id": "v0",
      "name": "v0",
      "description": "Vercel’s generative UI tool — describe an interface and get React and Tailwind you can paste into a project.",
      "category": "Code & Development",
      "url": "https://v0.dev",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "v0.dev"
  },
  {
      "id": "replit-agent",
      "name": "Replit Agent",
      "description": "Builds and runs a working app from a prompt entirely in the browser, with hosting attached.",
      "category": "AI App Builders",
      "url": "https://replit.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "replit.com"
  },
  {
      "id": "cline",
      "name": "Cline",
      "description": "Open-source coding agent that lives in VS Code and edits files, runs commands and reads the terminal.",
      "category": "Code & Development",
      "url": "https://cline.bot",
      "pricing": "Open Source",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "cline.bot"
  },
  {
      "id": "aider",
      "name": "Aider",
      "description": "Pair programming in the terminal — it edits your local files and commits to git as it goes.",
      "category": "Code & Development",
      "url": "https://aider.chat",
      "pricing": "Open Source",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "aider.chat"
  },
  {
      "id": "continue-dev",
      "name": "Continue",
      "description": "Open-source assistant for VS Code and JetBrains that you point at whichever model you want to use.",
      "category": "Code & Development",
      "url": "https://continue.dev",
      "pricing": "Open Source",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "continue.dev"
  },
  {
      "id": "zed",
      "name": "Zed",
      "description": "A fast code editor built in Rust, with collaboration and model-assisted editing built in rather than bolted on.",
      "category": "Code & Development",
      "url": "https://zed.dev",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "zed.dev"
  },
  {
      "id": "warp",
      "name": "Warp",
      "description": "A terminal that takes plain English, explains what a command will do, and keeps your session searchable.",
      "category": "Code & Development",
      "url": "https://warp.dev",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "warp.dev"
  },
  {
      "id": "greptile",
      "name": "Greptile",
      "description": "Reviews pull requests with the whole codebase in context, so comments account for how the repo actually works.",
      "category": "Code & Development",
      "url": "https://greptile.com",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "greptile.com"
  },
  {
      "id": "qodo",
      "name": "Qodo",
      "description": "Generates tests and reviews changes, aimed at keeping behaviour intact rather than just producing code.",
      "category": "Code & Development",
      "url": "https://qodo.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "qodo.ai"
  },
  {
      "id": "graphite-dev",
      "name": "Graphite",
      "description": "Stacked pull requests for teams that ship in small pieces, with automated review on top.",
      "category": "Code & Development",
      "url": "https://graphite.dev",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "graphite.dev"
  },
  {
      "id": "raycast",
      "name": "Raycast",
      "description": "A macOS launcher that runs commands, scripts and model prompts from one keystroke.",
      "category": "Productivity",
      "url": "https://raycast.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "raycast.com"
  },
  {
      "id": "linear",
      "name": "Linear",
      "description": "Issue tracking built for speed, with automatic triage and summaries over your project history.",
      "category": "Productivity & Collaboration",
      "url": "https://linear.app",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "linear.app"
  },
  {
      "id": "superhuman",
      "name": "Superhuman",
      "description": "A keyboard-first email client that drafts replies and summarises long threads.",
      "category": "AI Email Assistants",
      "url": "https://superhuman.com",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "superhuman.com"
  },
  {
      "id": "obsidian",
      "name": "Obsidian",
      "description": "Local-first notes in plain markdown files you own, with a large plugin ecosystem including model integrations.",
      "category": "Productivity",
      "url": "https://obsidian.md",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "obsidian.md"
  },
  {
      "id": "coda",
      "name": "Coda",
      "description": "Documents that behave like apps — tables, buttons and automations, with assistants you can place inline.",
      "category": "Productivity & Collaboration",
      "url": "https://coda.io",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "coda.io"
  },
  {
      "id": "airtable",
      "name": "Airtable",
      "description": "A database that looks like a spreadsheet, with model-driven fields that summarise, classify or extract per row.",
      "category": "Productivity & Collaboration",
      "url": "https://airtable.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "airtable.com"
  },
  {
      "id": "retool",
      "name": "Retool",
      "description": "Builds internal tools over your existing databases and APIs, generating the interface from a description.",
      "category": "AI App Builders",
      "url": "https://retool.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "retool.com"
  },
  {
      "id": "fireflies",
      "name": "Fireflies.ai",
      "description": "Joins calls, records and transcribes them, then pushes the summary into your CRM.",
      "category": "AI Meeting Assistants",
      "url": "https://fireflies.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "fireflies.ai"
  },
  {
      "id": "wispr-flow",
      "name": "Wispr Flow",
      "description": "Dictation that types into any application, punctuating and tidying as you speak.",
      "category": "Voice & Audio AI",
      "url": "https://wisprflow.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "wisprflow.ai"
  },
  {
      "id": "excalidraw",
      "name": "Excalidraw",
      "description": "A hand-drawn style whiteboard for diagrams and architecture sketches, free and open source.",
      "category": "UI/UX & Design Tools",
      "url": "https://excalidraw.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "excalidraw.com"
  },
  {
      "id": "tldraw",
      "name": "tldraw",
      "description": "An infinite canvas you can drop into your own product, with a generous free web app to draw in.",
      "category": "UI/UX & Design Tools",
      "url": "https://tldraw.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "tldraw.com"
  },
  {
      "id": "framer",
      "name": "Framer",
      "description": "Designs and publishes real websites from a canvas, generating sections and copy from a brief.",
      "category": "AI Website Builders",
      "url": "https://framer.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "framer.com"
  },
  {
      "id": "webflow",
      "name": "Webflow",
      "description": "Visual web development with clean output and a CMS, aimed at designers who do not want to hand-write markup.",
      "category": "AI Website Builders",
      "url": "https://webflow.com",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "webflow.com"
  },
  {
      "id": "relume",
      "name": "Relume",
      "description": "Turns a description of a business into a sitemap and wireframes, ready to build out in Webflow or Figma.",
      "category": "UI/UX & Design Tools",
      "url": "https://relume.io",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "relume.io"
  },
  {
      "id": "krea",
      "name": "Krea",
      "description": "Real-time image generation where the picture updates as you draw or type, rather than after a wait.",
      "category": "Image & Art Generation",
      "url": "https://krea.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "krea.ai"
  },
  {
      "id": "captions-ai",
      "name": "Captions",
      "description": "Edits talking-head video for social — captions, cuts and eye contact correction in one pass.",
      "category": "Video & Audio Tools",
      "url": "https://captions.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "captions.ai"
  },
  {
      "id": "opus-clip",
      "name": "Opus Clip",
      "description": "Cuts long video into short vertical clips and picks the moments most likely to hold attention.",
      "category": "Video & Audio Tools",
      "url": "https://opus.pro",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "opus.pro"
  },
  {
      "id": "glean",
      "name": "Glean",
      "description": "Search across every system a company uses, answering from documents the person asking is allowed to see.",
      "category": "AI Search Engines",
      "url": "https://glean.com",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "glean.com"
  },
  {
      "id": "dust-tt",
      "name": "Dust",
      "description": "Build assistants on top of your company’s own documents and tools, then share them with the team.",
      "category": "AI Agents & Automation",
      "url": "https://dust.tt",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "dust.tt"
  },
  {
      "id": "lindy",
      "name": "Lindy",
      "description": "Assembles agents that handle recurring work — inbox triage, scheduling, follow-ups — from a description.",
      "category": "AI Agents & Automation",
      "url": "https://lindy.ai",
      "pricing": "Freemium",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "lindy.ai"
  },
  {
      "id": "hebbia",
      "name": "Hebbia",
      "description": "Reads large document sets and answers with citations, built for finance and diligence work.",
      "category": "Research & Analysis",
      "url": "https://hebbia.ai",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "hebbia.ai"
  },
  {
      "id": "legora",
      "name": "Legora",
      "description": "Legal work in context — reviewing, drafting and researching against a firm’s own precedent.",
      "category": "Legal & Compliance",
      "url": "https://legora.com",
      "pricing": "Paid",
      "rating": 4.5,
      "featured": false,
      "dateAdded": "2026-08-21T00:00:00.000Z",
      "domain": "legora.com"
  }
];
/**
 * The raw array accumulated 200 duplicate entries across 115 ids as tools were
 * appended in batches — leetcode, hackerrank and friends each appear three
 * times. Left alone that means React key collisions, the same card rendered
 * twice in one list, inflated category counts, and duplicate-content signals
 * pointing at /tool/:id routes that can only ever resolve to one record.
 *
 * De-duplicating on id here fixes all of those at once and keeps every count
 * in the UI honest, because every count is derived from this export. First
 * occurrence wins, so the earliest curated entry is the one that survives.
 */
const _seen = new Set<string>();
const _byId = _MOCK_TOOLS.filter((tool) => {
  if (!tool || !tool.id || _seen.has(tool.id)) return false;
  _seen.add(tool.id);
  return true;
});

/**
 * Id-dedup alone still left 42 products showing twice, because the same tool
 * was curated under two different ids — e.g. "midjourney-v7" and "midjourney",
 * "lovable-code" and "lovable". Two cards, two /tool routes, one real product.
 *
 * Second pass: collapse entries that share a normalized name. We keep the one
 * with the shortest (most canonical) id — which is also the URL most likely to
 * already be indexed by Google, so we don't orphan a ranking page — and prefer
 * a record carrying a longDescription when ids tie. Order is preserved.
 */
const _canonical = new Map<string, Tool>();
for (const tool of _byId) {
  const key = (tool.name || '').trim().toLowerCase();
  const prev = _canonical.get(key);
  if (!prev) { _canonical.set(key, tool); continue; }
  const preferNew =
    tool.id.length < prev.id.length ||
    (tool.id.length === prev.id.length &&
      !!(tool as any).longDescription && !(prev as any).longDescription);
  if (preferNew) _canonical.set(key, tool);
}
export const MOCK_TOOLS = _byId.filter(
  (tool) => _canonical.get((tool.name || '').trim().toLowerCase()) === tool,
);
