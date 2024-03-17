import { baseURL } from '../BaseURL'
export const getContactReasons = async () => {
    const response = await fetch(`${baseURL}/contact-reason`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const result = await response.json()
    return result
}
export const postContactUs = async (
    name,
    reason,
    company,
    email,
    phone,
    Comments
) => {
    const response = await fetch(`${baseURL}/add-contact-us`, {
        body: JSON.stringify({
            contact_reason: reason,
            name: name,
            compnay_name: company,
            email: email,
            phone_no: phone,
            comment: Comments

        }),
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const result = await response.json()

    return result
}