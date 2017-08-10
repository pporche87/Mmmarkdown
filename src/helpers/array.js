module.exports = {
  equals: (array1, array2) => {
    if(!array1 || !array2) return false
    if(array1.constructor !== Array || array2.constructor !== Array) return false
    if(array1.length !== array2.length) return false
      
    for (var index = 0; index < array1.length; index++) {
      if(array1[index] !== array2[index]) return false
    }

    return true
  }
}