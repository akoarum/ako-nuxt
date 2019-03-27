---
inject: true
append: true
to: '<%= story ? `stories/${category}.js` : null %>'
---
  .add('<%= name %>', () => ({
    components: { <%= name %> },
    template: `
      <<%= name %> />
    `
  }))