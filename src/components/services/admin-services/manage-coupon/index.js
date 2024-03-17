import {baseURL} from '../../BaseURL'

export const createCoupon = async (
  accessToken,
  typeOfListing,
  name,
  couponCode,
  minSpend,
  maxSpend,
  usagePerCoupon,
  usagePerUser,
  description,
  duration,
  amountOFF,
  percentageRange
) => {
  let amount
  if (amountOFF == null) {
    amount = percentageRange
  } else if (percentageRange == null) {
    amount = amountOFF
  }

  const response = await fetch(`${baseURL}/coupon/create`, {
    body: JSON.stringify({
      title: name,
      code: couponCode,
      description: description,
      type: typeOfListing,
      amount: amount,
      expiry_date: duration,
      min_spend: minSpend,
      max_spend: maxSpend,
      limit_coupon: usagePerCoupon,
      limit_user: usagePerUser,
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
export const getCoupons = async (accessToken, page) => {
  const response = await fetch(`${baseURL}/coupon/index?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}

export const deleteCoupon = async (accessToken, id) => {
  const response = await fetch(`${baseURL}/coupon/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + '  ' + accessToken,
    },
  })
  const result = await response.json()
  return result
}
