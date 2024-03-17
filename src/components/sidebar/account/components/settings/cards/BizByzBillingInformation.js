import React, {useState} from 'react'

export default function BizByzBillingInformation() {
  const [toggle, setToggle] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [PhoneNo, setPhoneNo] = useState('')

  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')
  const [timezone, setTimezone] = useState('')
  const [currency, setCurrency] = useState('')
  const [checkboxEmail, setCheckboxEmail] = useState(false)
  const [checkboxPhone, setCheckboxPhone] = useState(false)

  const Languages = [
    'Bahasa Indonesia - Indonesian',
    'Bahasa Melayu - Malay',
    'Català - Catalan',
    'Čeština - Czech',
    'Dansk - Danish',
    'Deutsch - German',
    'English',
    'English UK - British English',
    'Español - Spanish',
    'Filipino',
    'Français - French',
    'Gaeilge - Irish',
    'Galego - Galician',
  ]
  const timezoneArray = [
    '(GMT-05:00) Guadalajara',
    '(GMT-11:00) Midway Island',
    '(GMT-11:00) Samoa',
    '(GMT-10:00) Hawaii',
    '(GMT-08:00) Alaska',
    '(GMT-07:00) Pacific Time (US &amp; Canada)',
    '(GMT-07:00) Tijuana',
    '(GMT-07:00) Arizona UK - British English',
    '(GMT-06:00) Mountain Time (US &amp; Canada)',
    '(GMT-06:00) Chihuahua',
    '(GMT-06:00) Mazatlan - French',
    '(GMT-06:00) Saskatchewan',
    '(GMT-06:00) Central America',
    ' (GMT-05:00) Central Time (US &amp; Canada)',
  ]
  const timeFrame = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
  ]
  const currencyArray = [
    'USD - USA dollar',
    'GBP - British pound',
    'AUD - Australian dollar',
    'JPY - Japanese yen',
    'SEK - Swedish krona',
    'CAD - Canadian dollar',
    'CHF - Swiss franc',
  ]

  const formToggle = () => {
    setToggle(true)
  }
  const SubmitForm = () => {
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      PhoneNo.length !== 0 &&
      country.length !== 0 &&
      language.length !== 0 &&
      timezone.length !== 0 &&
      currency.length !== 0
    ) {
    } else {
      alert()
    }
  }

  return (
    <div className='dashboard-bg py-0' style={{backgroundColor: '#f5f5f5', marginTop: '-3%'}}>
      <div className='container p-10'>
        <div className='row bg-white p-5 rounded'>
          <div
            style={{
              margin: '0px 20px',
            }}
          >
            <h1>Billing Information</h1>
          </div>

          <div className=''>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        onChange={(e) => setFirstName(e.target.value)}
                        defaultValue={firstName}
                        className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='First name'
                      />
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        onChange={(e) => setLastName(e.target.value)}
                        defaultValue={lastName}
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Contact Phone</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='tel'
                    onChange={(e) => setPhoneNo(e.target.value)}
                    defaultValue={PhoneNo}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Phone number'
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Address</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    defaultValue={country}
                    className='form-select form-select-solid form-select-lg fw-bold'
                  >
                    <option value=''>Select a Country...</option>
                    {timeFrame.map((timeFrameOption, idx1) => (
                      <option key={idx1}>{timeFrameOption}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Language</label>
                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => setLanguage(e.target.value)}
                    defaultValue={language}
                    className='form-select form-select-solid form-select-lg'
                  >
                    <option value=''>Select a Language...</option>
                    {Languages.map((LanguageOption, idx2) => (
                      <option key={idx2}>{LanguageOption}</option>
                    ))}
                  </select>

                  <div className='form-text'>
                    Please select a preferred language, including date, time, and number formatting.
                  </div>
                </div>
              </div>

              {/* <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Time Zone</label>

              <div className='col-lg-8 fv-row'>
                <select
                  onChange={(e) => setTimezone(e.target.value)}
                  defaultValue={timezone}
                  className='form-select form-select-solid form-select-lg'
                >
                  <option value=''>Select a Timezone..</option>
                  {timezoneArray.map((timezoneArrayOption, idx4) => (
                    <option key={idx4}>{timezoneArrayOption}</option>
                  ))}
                </select>
              </div>
            </div> */}

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currency</label>

                <div className='col-lg-8 fv-row'>
                  <select
                    onChange={(e) => setCurrency(e.target.value)}
                    defaultValue={currency}
                    className='form-select form-select-solid form-select-lg'
                  >
                    <option value=''>Select a currency..</option>
                    {currencyArray.map((currencyOption, idx4) => (
                      <option key={idx4}>{currencyOption}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Communication</label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                  <label className='form-check form-check-inline form-check-solid me-5'>
                    <input
                      className='form-check-input'
                      checked={checkboxEmail}
                      onChange={(e) => setCheckboxEmail(e.target.value)}
                      // defaultValue={checkboxEmail}
                      name='communication[]'
                      type='checkbox'
                    />
                    <span className='fw-bold ps-2 fs-6'>Email</span>
                  </label>

                  <label className='form-check form-check-inline form-check-solid'>
                    <input
                      className='form-check-input'
                      onChange={(e) => setCheckboxPhone(e.target.value)}
                      defaultValue={checkboxPhone}
                      name='communication[]'
                      type='checkbox'
                    />
                    <span className='fw-bold ps-2 fs-6'>Phone</span>
                  </label>
                </div>
              </div>
            </div>

            <div className='row mb-0'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Allow Marketing</label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    id='allowmarketing'
                  />
                  <label className='form-check-label'></label>
                </div>
              </div>
            </div> */}
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' onClick={() => SubmitForm()} className='btn btn-primary'>
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
