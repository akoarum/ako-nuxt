<template>
  <table class="table">
    <colgroup v-if="columnWidths.length">
      <col
        v-for="item in columnWidths"
        :key="item.id"
        :style="`width: ${item.width};`"
      />
    </colgroup>
    <thead v-if="headers">
      <tr>
        <th
          v-for="header in headers"
          :key="header.id"
          :class="headClasses(header)"
        >
          {{ header.display }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    widths: { type: Array },
    headers: { type: Array }
  },
  computed: {
    columnWidths() {
      if (!this.widths) {
        return []
      }
      return this.widths.map((item, i) => ({ id: i, width: item }))
    }
  },
  methods: {
    headClasses(item) {
      const classes = []

      if (item.align) {
        classes.push(`-${item.align}`)
      }

      if (item.vertical) {
        classes.push(`-${item.vertical}`)
      }

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
  border: 1px solid #ececec;
  width: 100%;

  thead {
    th,
    td {
      background: #ececec;

      + th,
      + td {
        border-left: 1px solid #fff;
      }
    }
  }
  tbody {
    th,
    td {
      + th,
      + td {
        border-left: 1px solid #ececec;
      }
    }
    tr + tr {
      border-top: 1px solid #ececec;
    }
  }
  th,
  td {
    padding: 9px 14px 8px;
  }
  th {
    text-align: center;

    &.-left {
      text-align: left;
    }
    &.-right {
      text-align: right;
    }
  }

  @media screen and (min-width: 768px) {
    font-size: $fontSize-base;
  }
}
</style>
