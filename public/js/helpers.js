const countWords = stringToCount => {
  stringToCount = stringToCount.replace(/(^\s*)|(\s*$)/gi,'')
  stringToCount = stringToCount.replace(/[ ]{2,}/gi,' ')
  stringToCount = stringToCount.replace(/\n /,'\n')
  return stringToCount.split(' ').length
}