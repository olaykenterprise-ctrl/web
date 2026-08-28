# WordPress-Style Block Builder Implementation Plan

## Goal Description
Upgrade the current static landing page and product page creators into a dynamic, block-based builder (similar to WordPress Gutenberg or Notion). This will allow admins to easily stack and rearrange various content blocks (headlines, text, images, carousels, lists, etc.) to create highly custom product and marketing pages.

## Proposed Changes

### 1. Database Schema Updates
We need to add a flexible field to store this dynamic array of blocks.
- **SQL Migration**: Run an `ALTER TABLE` command on Supabase to add a `blocks JSONB DEFAULT '[]'::jsonb` column to both the `products` and `landing_pages` tables.
- **Types Update**: Update `lib/db.ts` to include the `PageBlock` types and fetch the new `blocks` field.

### 2. Block Schema Definition
We will define a standardized JSON structure for blocks:
- `headline`: `{ text: string }`
- `subheadline`: `{ text: string }`
- `body`: `{ text: string }`
- `image`: `{ url: string, alt: string }`
- `carousel`: `{ images: string[] }`
- `list`: `{ items: string[] }`

### 3. Reusable Admin Component
#### [NEW] `components/admin/BlockBuilder.tsx`
Create the core editor component for the admin panel:
- **State Management**: Holds an array of `PageBlock` objects.
- **Block Editors**: Distinct mini-forms (inputs/textareas) to edit the content of each block type.
- **Controls**: Buttons to move a block up/down or delete it.
- **Add Menu**: A prominent "Add Block" dropdown/modal to append new blocks to the page.

### 4. Admin Integrations
#### [MODIFY] `app/adminola/landing-pages/new/page.tsx`
- Replace the rigid "Value Proposition" and "Image Grid" sections with the new `<BlockBuilder />`.
- Parse the output and send it in the database insertion payload.

#### [MODIFY] `app/adminola/products/new/page.tsx`
- Add the `<BlockBuilder />` to the bottom of the product creation form so admins can design a rich product description.
- Parse the output and send it in the database insertion payload.

### 5. Storefront Renderer
#### [NEW] `components/ui/BlockRenderer.tsx`
Create a component for the public-facing storefront that takes the `blocks` JSON array and renders the beautiful Tailwind CSS components for each block type.

#### [MODIFY] `app/(store)/[slug]/page.tsx` (Landing Pages)
- Fetch the `blocks` from the DB and pass them to the `<BlockRenderer />`.

#### [MODIFY] `app/(store)/product/[slug]/ProductClient.tsx`
- Fetch the `blocks` and render them below the main product details, replacing the hardcoded `richContent` section.

## Open Questions
1. **Existing Landing Pages**: Since we are moving from `body_list` and `photos` to a dynamic `blocks` array, should we migrate the old landing pages or just leave them and start using blocks for new ones?
2. **Additional Blocks**: Are there any other specific blocks you'd like out-of-the-box besides Headline, Sub-headline, Body Text, Image, Carousel, and List? (e.g., Video Embed, Call to Action Button).

## User Review Required
> [!IMPORTANT]
> This requires running a database migration on Supabase to add the `blocks` JSONB columns. Please review the plan above and if it aligns with your vision, reply with **"Approve"** and I will begin the implementation!
