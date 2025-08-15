Run npm install for everything - pnpm install

Install library for specific app:

- pnpm --filter api add <package-name>
- pnpm --filter web add <package-name>
- pnpm --filter api add -D <package-name> # For dev dependencies

pnpm --filter api remove <package-name>

npx analog - pnpm dlx
