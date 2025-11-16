# YouTube Shorts AI Agent

Automated YouTube Shorts content creation and posting platform powered by AI.

## Features

### 1. AI Script Generation
- Generate engaging 15-60 second scripts using Claude AI
- Trending topic integration based on selected niche
- Batch creation of multiple scripts
- SEO-optimized titles, tags, and descriptions
- Visual and text overlay suggestions

### 2. Video Creation Specifications
- Complete video spec generation
- 9:16 format optimized for YouTube Shorts
- AI voiceover suggestions
- Stock footage and asset recommendations
- Auto-generated captions with word-by-word highlighting

### 3. Smart Scheduling
- Manual scheduling with date/time picker
- Quick schedule templates (daily, bi-daily, weekly)
- Schedule management interface
- Batch scheduling support

### 4. Analytics Dashboard
- Video performance tracking
- Engagement metrics (views, likes, comments, shares)
- CTR and watch time analytics
- Per-video detailed statistics

### 5. Video Log
- Complete history of all created videos
- Status tracking (draft, created, scheduled, posted)
- Sortable and filterable interface

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Configure API Key

1. Navigate to Settings tab
2. Enter your Anthropic API key from console.anthropic.com
3. Save settings

## Usage Guide

See full documentation in the Settings tab of the application.

## Deployment

```bash
npm run build
vercel deploy --prod
```
