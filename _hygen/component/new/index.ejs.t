---
inject: true
append: true
to: src/components/<%= category %>/index.ts
skip_if: <%= name %>
---
export { default as <%= name %> } from './<%= name %>'