import {baseURL} from '../../BaseURL'

export const getBusinessListingData = async (
  page,
  title,
  listingType,
  industry,
  minPrice,
  maxPrice,
  grossMinPrice,
  grossMaxPrice,
  cashMinPrice,
  cashMaxPrice,
  tag,
  addDates,
  years,
  cityID,
  countryID,
  stateID,
  accessToken
) => {
  const response = await fetch(`${baseURL}/admin/businesses/search?page=${page}`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      listing_type: listingType,
      industry: industry,
      min_price: minPrice,
      max_price: maxPrice,
      gross_min_price: grossMinPrice,
      gross_max_price: grossMaxPrice,
      cash_min_price: cashMinPrice,
      cash_max_price: cashMaxPrice,
      tags: tag,
      add_date: addDates,
      established_at: years,
      countries: countryID,
      provinces: stateID,
      cities: cityID,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const getFranchiseListingData = async (
  page,
  title,
  minPrice,
  maxPrice,
  cityID,
  countryID,
  stateID,
  fCat,
  accessToken
) => {
  console.log('ssssssssssssssssss', fCat, minPrice, maxPrice, cityID, countryID, stateID)

  const response = await fetch(`${baseURL}/admin/franchises/search?page=${page}`, {
    method: 'POST',

    body: JSON.stringify({
      f_cat: fCat,
      title: title,
      min_price: minPrice,
      max_price: maxPrice,
      countries: countryID,
      provinces: stateID,
      cities: cityID,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()

  return result
}
