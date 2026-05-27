# Contributing to Vibe Coding Crash Course

Thanks for your interest in contributing!

## Getting Started

```bash
git clone https://github.com/sixtdreanight/vibe-coding-agent.git
cd vibe-coding-agent
npm install
cp .env.example .env.local  # configure your AI provider
npm run dev
```

## Development Workflow

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npx tsc --noEmit` to type-check
4. Run `npm run build` to verify the build
5. Add tests for new functionality
6. Commit using [Conventional Commits][conv] format
7. Push and open a pull request

## Commit Convention

```
feat: add lesson on prompt engineering
fix: sanitize user input in quiz answers
refactor: extract rate limiter into middleware
test: add unit tests for quiz scoring
docs: update SETUP_GUIDE with new provider
```

Types: `feat` `fix` `refactor` `test` `docs` `chore` `perf` `ci`

## Code Style

- TypeScript strict mode enabled
- Next.js App Router conventions
- Components in `components/`, hooks in `hooks/`, lib in `lib/`
- Functions under 50 lines; files under 800 lines
- Use Tailwind CSS for styling

## Adding a Lesson

1. Create the lesson content in `content/lessons/`
2. Add to `content/index.ts` lesson registry
3. Test quiz logic with sample answers
4. Update README if lesson changes course flow

## Pull Request Checklist

- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)
- [ ] New tests added for new behavior
- [ ] `.env.example` updated if new env vars needed
- [ ] Content changes reviewed for accuracy

## Questions?

Open a [discussion](https://github.com/sixtdreanight/vibe-coding-agent/discussions).

[conv]: https://www.conventionalcommits.org/
