export const capitalizeFirstLetter = (word)=> {
  return word.charAt(0).toUpperCase()
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US')
}
