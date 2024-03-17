import {baseURL} from '../BaseURL'
export const saveSearch = async (
  title,
  locationValue,
  statesValue,
  citiesValue,
  industry,
  instantAlert,
  listing,
  minPriceRange,
  maxPriceRange,
  grossMin,
  grossMax,
  cashMin,
  cashMax,
  keyword,
  addDate,
  year,
  directly,
  daily,
  accessToken,
  userID
) => {
  let formData = new FormData()

  formData.append('user ', userID)
  let countryValue = []
  let state = []
  let city = []
  let industryValue = []
  let listingValue = []
  locationValue?.length
    ? locationValue?.map((item) => countryValue.push(item.name))
    : (countryValue = [])
  statesValue?.length ? statesValue.map((item) => state.push(item.name)) : (state = [])
  citiesValue?.length ? citiesValue.map((item) => city.push(item.name)) : (city = [])
  industry?.length ? industry.map((item) => industryValue.push(item.id)) : (industryValue = [])
  listing?.length ? listing?.map((item) => listingValue.push(item.id)) : (listingValue = [])
  // countryValue.map((value) => formData.append('country[]', value))
  // stateValue.map((value) => formData.append('state[]', value))
  // cityValue.map((value) => formData.append('city[]', value))

  // formData.append('country', countryValue)
  // formData.append('state', state)
  // formData.append('city', city)
  // formData.append('industry', industryValue)
  // formData.append('listing_type', listingValue)
  // formData.append('min_price', minPriceRange)
  // formData.append('max_price', maxPriceRange)
  // formData.append('min_gross', grossMin)
  // formData.append('max_gross', grossMax)
  // formData.append('min_cash', cashMin)
  // formData.append('max_cash', cashMax)
  // formData.append('keyword', keyword)
  // formData.append('add_data', addDate)
  // formData.append('establish_year', year)
  // formData.append('email_duration', daily)
  // formData.append('contact', directly)
  // formData.append('instance', instantAlert)
  const response = await fetch(`${baseURL}/searchSave/add_search`, {
    body: JSON.stringify({
      title: title,
      country: countryValue,
      state: state,
      city: city,
      industry: industryValue,
      listing_type: listingValue,
      min_price: minPriceRange,
      max_price: maxPriceRange,
      min_gross: grossMin,
      max_gross: grossMax,
      min_cash: cashMin,
      max_cash: cashMax,
      keyword: keyword,
      add_data: addDate,
      establish_year: year,
      email_duration: daily,
      contact: directly,
      instance: instantAlert,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getSaveSearches = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/searchSave/get_search?page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const deleteSaveSearches = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/searchSave/delete_search/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const singleSaveSearch = async (id, accessToken) => {
  const response = await fetch(`${baseURL}/searchSave/get_single_search/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}

export const updateSaveSearch = async (
  locationValue,
  statesValue,
  citiesValue,
  industry,
  instantAlert,
  listing,
  minPriceRange,
  maxPriceRange,
  grossMin,
  grossMax,
  cashMin,
  cashMax,
  keyword,
  addDate,
  year,
  directly,
  daily,
  accessToken,
  userID,
  id,
  updateTitle
) => {
  let formData = new FormData()

  formData.append('user ', userID)
  let countryValue = []
  let state = []
  let city = []
  let industryValue = []
  let listingValue = []
  locationValue?.length
    ? locationValue?.map((item) => countryValue.push(item.name))
    : (countryValue = [])
  statesValue?.length ? statesValue.map((item) => state.push(item.name)) : (state = [])
  citiesValue?.length ? citiesValue.map((item) => city.push(item.name)) : (city = [])
  industry?.length ? industry.map((item) => industryValue.push(item.id)) : (industryValue = [])
  listing?.length ? listing?.map((item) => listingValue.push(item.id)) : (listingValue = [])
  // countryValue.map((value) => formData.append('country[]', value))
  // stateValue.map((value) => formData.append('state[]', value))
  // cityValue.map((value) => formData.append('city[]', value))

  // formData.append('country', countryValue)
  // formData.append('state', state)
  // formData.append('city', city)
  // formData.append('industry', industryValue)
  // formData.append('listing_type', listingValue)
  // formData.append('min_price', minPriceRange)
  // formData.append('max_price', maxPriceRange)
  // formData.append('min_gross', grossMin)
  // formData.append('max_gross', grossMax)
  // formData.append('min_cash', cashMin)
  // formData.append('max_cash', cashMax)
  // formData.append('keyword', keyword)
  // formData.append('add_data', addDate)
  // formData.append('establish_year', year)
  // formData.append('email_duration', daily)
  // formData.append('contact', directly)
  // formData.append('instance', instantAlert)
  const response = await fetch(`${baseURL}/searchSave/update_search/${id}`, {
    body: JSON.stringify({
      country: countryValue,
      state: state,
      city: city,
      industry: industryValue,
      listing_type: listingValue,
      min_price: minPriceRange,
      max_price: maxPriceRange,
      min_gross: grossMin,
      max_gross: grossMax,
      min_cash: cashMin,
      max_cash: cashMax,
      keyword: keyword,
      add_data: addDate,
      establish_year: year,
      email_duration: daily,
      contact: directly,
      instance: instantAlert,
      title: updateTitle,
    }),

    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + accessToken,
    },
  })

  const result = await response.json()
  return result
}
export const emailDurationSave = async (id, accessToken, daily, instantAlert) => {
  let formData = new FormData()

  formData.append('user ', id)

  // countryValue.map((value) => formData.append('country[]', value))
  // stateValue.map((value) => formData.append('state[]', value))
  // cityValue.map((value) => formData.append('city[]', value))

  // formData.append('country', countryValue)
  // formData.append('state', state)
  // formData.append('city', city)
  // formData.append('industry', industryValue)
  // formData.append('listing_type', listingValue)
  // formData.append('min_price', minPriceRange)
  // formData.append('max_price', maxPriceRange)
  // formData.append('min_gross', grossMin)
  // formData.append('max_gross', grossMax)
  // formData.append('min_cash', cashMin)
  // formData.append('max_cash', cashMax)
  // formData.append('keyword', keyword)
  // formData.append('add_data', addDate)
  // formData.append('establish_year', year)
  // formData.append('email_duration', daily)
  // formData.append('contact', directly)
  // formData.append('instance', instantAlert)
  const response = await fetch(`${baseURL}/searchSave/update_search_duration/${id}`, {
    body: JSON.stringify({
      email_duration: daily,

      instance: instantAlert,
    }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
