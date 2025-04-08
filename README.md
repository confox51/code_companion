
# CodeReviewAI

A full-stack web application that provides instant, AI-powered code reviews to help developers improve their code quality.

## Features

- **Instant Code Reviews**: Get professional-quality code reviews in seconds
- **Multi-Language Support**: Works with popular programming languages
- **Comprehensive Analysis**: Detects bugs, improves readability, and optimizes performance
- **AI-Powered Feedback**: Leverages both Anthropic and Google's Generative AI
- **Modern UI**: Built with React and Tailwind CSS using shadcn/ui components

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Anthropic Claude and Google Gemini
- **Authentication**: Passport.js with local strategy

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://0.0.0.0:5000`

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express.js backend
├── shared/          # Shared TypeScript types and schemas
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run check`: Run TypeScript checks
- `npm run db:push`: Push database schema changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Built with Replit

This project is built and hosted on [Replit](https://replit.com), taking advantage of:
- Zero-configuration development environment
- Integrated deployment with autoscaling
- Real-time collaboration features
- Built-in package management
- Automatic HTTPS and custom domain support

You can run this project directly in your browser by visiting our Repl!
