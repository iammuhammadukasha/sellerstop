# UI components (shadcn-style)

This folder holds reusable UI components that follow the **shadcn** pattern:

- Use **Tailwind CSS** for styling
- Use the **`cn()`** helper from `@/lib/utils` for class names
- Are built with **TypeScript** and **React**
- Can be copied from [shadcn/ui](https://ui.shadcn.com) or similar and adapted

**Why `/components/ui`?**  
Keeping UI primitives (buttons, cards, carousels, etc.) in one place makes it easy to add more shadcn-style components and keeps the app structure consistent. Page-specific components stay in `src/app/components/`.

**Adding more components:**  
Install with the shadcn CLI from the project root, or copy-paste components into this folder and ensure they use `@/lib/utils` for `cn` and Tailwind classes.
