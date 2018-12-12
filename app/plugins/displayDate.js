import Vue from 'vue'

const regex = /^(\d{4})-(\d{2})-(\d{2})$/

export const displayDate = value => {
  if (!regex.test(value)) {
    return value
  }
  return value.replace(regex, '$1/$2/$3')
}

Vue.filter('displayDate', displayDate)
