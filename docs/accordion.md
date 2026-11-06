# Dhiya use-case accordion

The supplied Accordion05 design is integrated as a React island in the Astro homepage, with the site's six use cases in place of the example portfolio copy.

- `src/components/ui/accordion-05.tsx` contains the numbered presentation and use-case content.
- `src/components/ui/accordion.tsx` contains the reusable Radix primitives.
- `src/components/home/Uses.astro` mounts the island.
- `src/styles/accordion.css` contains Tailwind 4 utility support and the component's scoped styles. Tailwind's preflight is omitted to preserve the existing Astro site's base styles.
- `src/lib/utils.ts` supplies the shadcn `cn` helper.

`@/*` resolves to `src/*`. The `src/components/ui` folder is the project's shadcn UI directory: it keeps reusable primitives separate from homepage composition, and makes imports and future shadcn additions consistent. `components.json` records those paths. React, Radix, lucide, Tailwind, and their TypeScript configuration are already installed; no CLI initialization is needed.

Run `bun install`, `bun run dev`, and `bun run build` as usual. The accordion opens the first use case initially, permits a single open item or all items closed, supports Radix keyboard navigation, and follows reduced-motion preferences. The Today, With DIL, and example question text live inside their own use-case panel so they cannot drift out of sync.
