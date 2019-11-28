const checkLocalStorageExpiry = function () {
  let localStorageCacheTime = 12 // in hours
  let saved = localStorage.getItem('setUpTime')

  if (saved && (new Date().getTime() - saved > localStorageCacheTime * 60 * 60 * 1000)) {
    localStorage.clear()
  }
  if (!saved) {
    localStorage.setItem('setUpTime', new Date().getTime())
  }
}

export {checkLocalStorageExpiry}