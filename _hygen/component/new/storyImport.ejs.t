---
inject: true
after: import StoryRouter
to: '<%= story ? `stories/${category}.js` : null %>'
---
import <%= name %> from '~/components/<%= category %>/<%= name %>'