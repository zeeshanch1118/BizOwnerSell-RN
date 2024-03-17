import {display} from '@mui/system'
import React, {useState} from 'react'
import './style.css'
const PrivacyNotice = () => {
  const [pointNumber, setPointNumber] = useState(0)
  return (
    <React.Fragment>
      <div className='container mt-5'>
        <div className='row pt-8'>
          <div className='col-4'>
            {/* <p className='privacy-notice-paragraph'>Table of Contents</p> */}
            <ul>
              <li className='privacy-notice-paragraph pb-4' onClick={(e) => setPointNumber(1)}>
                <a href='#s1'> Types of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(2)}>
                <a href='#s2'> Collection of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(3)}>
                <a href='#s3'> Use of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(4)}>
                <a href='#s4'> Disclosure of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(5)}>
                <a href='#s5'> International Transfer of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(6)}>
                <a href='#s6'> Security of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(7)}>
                <a href='#s7'> Retention of Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(8)}>
                <a href='#s8'>Manage Your Personal Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(9)}>
                <a href='#s9'> Global Policy Notice Changes</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(10)}>
                <a href='#s10'> Contact Us</a>
              </li>
            </ul>
          </div>
          <div className='col-8'>
            <h1>Global Privacy Notice</h1>
            <h6>Last Modified: December 28, 2022</h6>
            <p className='privacy-notice-paragraph'>
              As the leading provider of information, analytics, and online marketplaces to the
              commercial real estate industry, CoStar Realty Information, Inc. and our affiliates
              (collectively, “CoStar,” “we,” or “us”) respect your privacy and are committed to
              protecting your Personal Information. This Global Privacy Notice describes the types
              of Personal Information we collect and our practices for using, maintaining, sharing,
              and protecting it. It also describes the rights and choices you may have with respect
              to your Personal Information and how you may{' '}
              <a onClick={(e) => setPointNumber(10)} href='#s10'>
                Contact Us
              </a>{' '}
              about our privacy practices. Our privacy practices may vary among the countries in
              which we operate to reflect local practices and legal requirements, and specific
              privacy practices may apply to some of our products and services. This Global Privacy
              Notice applies to the following websites and any associated CoStar websites, products,
              services, and mobile applications (the “Services”): CoStar.com (CoStar Information and
              Analytics, CoStar Portfolio Strategy, CoStar Risk Analytics, CoStar Real Estate
              Manager, CoStar Investment Analysis, and CoStar Brokerage Applications),
              BusinessImmo.com CoStarGroup.com, CoStar.co.uk, Thomas-daily.de and Grecam.com. It
              does not apply to the collection and use of certain employment-related information. If
              you are a current or former CoStar job applicant, employee, owner, director, officer,
              or contractor, please{' '}
              <a onClick={(e) => setPointNumber(10)} href='#s10'>
                Contact Us
              </a>{' '}
              for the appropriate policy. When using our websites, you may choose to interact with
              features from third parties that operate independently from CoStar, such as social
              media widgets and links to third-party websites. CoStar has no control over and is not
              responsible for the privacy practices of such third parties. This Global Privacy
              Notice does not apply to the extent CoStar does not own or control any linked websites
              or features you visit or use. We recommend that you familiarize yourself with the
              privacy practices of these third parties.
            </p>
            <div style={{display: pointNumber == 1 ? 'block' : 'none'}}>
              <h6 id='s1'>Types of Personal Information</h6>
              <p className='privacy-notice-paragraph'>
                “Personal Information” means any information directly or indirectly relating to an
                identified or identifiable individual. Examples of Personal Information CoStar may
                collect include:
              </p>
              <ul>
                <li className='privacy-notice-paragraph'>
                  Payment information (credit card and other payment card information)
                </li>
                <li className='privacy-notice-paragraph'>
                  Personal contact information (name, nickname, gender, mailing address, email
                  address, phone number)
                </li>
                <li className='privacy-notice-paragraph'>
                  Business information (office location, business contact information, department,
                  job title/description, professional bio)
                </li>
                <li className='privacy-notice-paragraph'>
                  Log-in credentials (username, password)
                </li>
                <li className='privacy-notice-paragraph'>
                  Usage details (log-on activity, search terms, views, clicks, downloads,
                  CoStar-related preferences, lead submission information)
                </li>
                <li className='privacy-notice-paragraph'>
                  Technical details (IP address, geolocation information, cookie/session IDs,
                  authentication information, browser type/version, operating system/platform)
                </li>
                <li className='privacy-notice-paragraph'>
                  Any other information you or other CoStar customers may upload or enter into the
                  Services
                </li>
                <li className='privacy-notice-paragraph'>
                  Phone call and video conference recordings
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>Service-Specific</p>
              <ul>
                <li className='privacy-notice-paragraph'>
                  Apartments.com may additionally collect information you submit when you create a
                  lease as a landlord or fill out a leasing application, such as move-in date,
                  reference contacts, co-applicants, guarantors, pets, residence history, employment
                  history, annual income, proof of income, driver’s license, vehicle information,
                  Social Security Number, and date of birth
                </li>
                <li className='privacy-notice-paragraph'>
                  Belbex may additionally collect the type of transaction and the use, conditions,
                  description, square meter, availability, and registration number of property from
                  advertisers and photographs/images. Through Belbex Pro, we may additionally
                  collect commercial preferences and contacts made in the Belbex network.
                </li>
                <li className='privacy-notice-paragraph'>
                  BizOwnerSell may additionally collect purchase time frame, broker license number,
                  desired business category and location, available capital, business cash flow, and
                  other financial details.
                </li>
                <li className='privacy-notice-paragraph'>
                  BizOwnerSell, LoopNet, and Cityfeet may additionally collect primary role in real
                  estate, such as broker, business owner, investor, or appraiser, and broker license
                  number.
                </li>
                <li className='privacy-notice-paragraph'>
                  BureauxLocaux may additionally collect professional head-shot photographs or
                  social network URLs linked to an individual’s professional profile webpage.
                  Shopproperty may additionally collect staff code
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>California Residents</p>
              <p className='privacy-notice-paragraph'>
                We collect Personal Information as defined by the California Consumer Privacy Act,
                which is information that identifies, relates to, describes, is reasonably capable
                of being associated with, or could reasonably be linked, directly or indirectly,
                with a particular consumer or household. Personal Information does not include
                de-identified or aggregate information, publicly-available information that is
                lawfully made available from federal, state, or local government records, and
                information covered by certain sector-specific privacy laws. CoStar has collected
                the following categories of Personal Information about consumers in the 12 months
                preceding the date this Global Privacy Notice was last modified:
              </p>

              <ul>
                <li className='privacy-notice-paragraph'>
                  Identifiers (e.g., real name, alias, postal address, unique personal identifier,
                  online identifier, IP address, email address, account name, Social Security
                  Number, or other similar identifiers)
                </li>
                <li className='privacy-notice-paragraph'>
                  Categories of personal information described in California Civil Code §1798.80(e)
                  (e.g., signature, phone number, bank account number, credit card number, debit
                  card number, or other financial information)
                </li>
                <li className='privacy-notice-paragraph'>
                  Protected classification characteristics under California or federal law
                  Commercial information (e.g., records of personal property, products or services
                  purchased, obtained, or considered, or other purchasing or consuming histories or
                  tendencies)
                </li>
                <li className='privacy-notice-paragraph'>
                  Internet or other electronic network activity information
                </li>
                <li className='privacy-notice-paragraph'>Geolocation data</li>
                <li className='privacy-notice-paragraph'>
                  Professional or employment-related information
                </li>
                <li className='privacy-notice-paragraph'>
                  Inferences drawn from other Personal Information (e.g., profile reflecting your
                  preferences, characteristics, and behavior)
                </li>
                <li className='privacy-notice-paragraph'>
                  Sensitive personal information, including: precise geolocation, login credentials
                  (username and password), and the content of messages sent through the Services
                </li>
              </ul>
            </div>

            <div style={{display: pointNumber == 2 ? 'block' : 'none'}}>
              <h2 id='s2'> Collection of Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                CoStar may collect Personal Information using the following methods:
              </p>

              <ul>
                <li className='privacy-notice-paragraph'>
                  Directly from you when you provide it to us (information you enter into web forms,
                  chatbots, participation in phone calls or video conferences, subscription
                  agreements, and contracts or other content you submit to the Services)
                </li>
                <li className='privacy-notice-paragraph'>
                  Through your participation in surveys, promotions, and contests
                </li>
                <li className='privacy-notice-paragraph'>
                  CoStar’s internal customer relationship management system and databases
                </li>
                <li className='privacy-notice-paragraph'>
                  From third parties, such as analytics and email marketing service providers
                </li>
                <li className='privacy-notice-paragraph'>
                  Researching public websites where permitted by the Terms of Use (company websites,
                  search engines, social media)
                </li>
                <li className='privacy-notice-paragraph'>
                  Automatically through tracking technologies (cookies, web beacons, log files),
                  including over time and across third-party websites or other online services
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>
                For more information about how we use Personal Information collected through
                tracking technologies and the ways you may be able to manage it, see{' '}
                <a onClick={(e) => setPointNumber(3)} href='#s3'>
                  {' '}
                  Use of Personal Information
                </a>{' '}
                , our <a href='#'> Cookie Policy,</a> and{' '}
                <a onClick={(e) => setPointNumber(8)} href='#s8'>
                  {' '}
                  Manage Your Personal Information
                </a>
                .
              </p>
              <p className='privacy-notice-paragraph'>Service-Specific</p>
              <p className='privacy-notice-paragraph'>United States Listing Services</p>
              <p className='privacy-notice-paragraph'>
                When you dial a phone number we publish for a listing, we or a service provider
                operating on our behalf may record the date, time and length of your call and the
                phone number from which the call originated, along with the call itself and any
                other information that may be captured. The types of Personal Information collected
                will depend on the nature of the submission or the features of the website used but
                could include your name, address, phone number, and/or email address.
              </p>
              <p className='privacy-notice-paragraph'>Belbex</p>
              <p className='privacy-notice-paragraph'>
                Belbex Pro sales and customer service personnel and other CoStar representatives may
                collect Personal Information from you by email, phone, or at CoStar meetings or
                events. Belbex may additionally collect Personal Information from owners based on
                information from third-party sources, including, among others: (i) the
                reception/concierge/farm manager/neighboring tenants; (ii) LinkedIn or other social
                networks (professional Facebook page, Twitter); (iii) the databases that can be
                accessed such as the Property Registry and the General Directorate of the Cadastre;
                and (iv) the brochures of investment agents and lease conditions.
              </p>
              <p className='privacy-notice-paragraph'>
                Belbex Research researches some listings from landlords and agents to identify
                changes.
              </p>
              <p className='privacy-notice-paragraph'>BureauxLocaux</p>
              <p className='privacy-notice-paragraph'>
                BureauxLocaux may collect personal information from you through your participation
                in online webinars we host or through social authentication services.
              </p>
              <p className='privacy-notice-paragraph'>Realla</p>
              <p className='privacy-notice-paragraph'>
                First name, last name, email address, and type of professional is required for us to
                create an account for you and sign you up to receive the Services. We will inform
                you at the point of collecting information from you whether you are required to
                provide this information to us.
              </p>
              <p className='privacy-notice-paragraph'>
                In respect of each property advertised on the website, we will collect the details
                of the estate agent that is advertising the property and the name of the individual
                estate agent who should be contacted in case of inquiries. We collect this
                information from the applicable estate agent’s website. When completing a property
                inquiry, we will collect the name, email address, phone number, subject line, and
                detailed description of the inquiry.
              </p>
              <p className='privacy-notice-paragraph'>Children Under 16</p>
              <p className='privacy-notice-paragraph'>
                CoStar websites are not intended for children under 16 years of age, and we do not
                knowingly collect Personal Information from children under 16. If you are under 16,
                do not use or provide any information on this website or through any of its
                features, register, or make any purchases. If we learn we have collected or received
                Personal Information from a child under 16 without verification of parental consent,
                we will delete it. If you believe we might have any information from or about a
                child under 16, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                .
              </p>
              <p className='privacy-notice-paragraph'>California Residents</p>
              <p className='privacy-notice-paragraph'>
                CoStar collects Personal Information from the following categories of sources:
              </p>
              <ul>
                <li className='privacy-notice-paragraph'>Directly and indirectly from you</li>
                <li className='privacy-notice-paragraph'>Other CoStar customers</li>
                <li className='privacy-notice-paragraph'>
                  Service providers, including data analytics providers
                </li>
                <li className='privacy-notice-paragraph'>
                  Third parties, including advertising services and social media networks
                </li>
                <li className='privacy-notice-paragraph'>Consumer reporting agencies</li>
                <li className='privacy-notice-paragraph'>Companies with public websites</li>
                <li className='privacy-notice-paragraph'>Government entities</li>
              </ul>
              <p className='privacy-notice-paragraph'>
                European Economic Area (EEA) and United Kingdom Residents
              </p>
              <p className='privacy-notice-paragraph'>
                Where we need to collect Personal Information by law or under the terms of a
                contract we have with you and you fail to provide that information when requested,
                we may not be able to perform the contract we have or are trying to enter into with
                you. In this case, we may have to cancel a product or service you have with us but
                will notify you first.
              </p>
            </div>
            <div style={{display: pointNumber == 3 ? 'block' : 'none'}}>
              <h2 id='s3'> Use of Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                We may use your Personal Information for the following purposes:
              </p>
              <ul>
                <li className='privacy-notice-paragraph'>Communicating with you</li>
                <li className='privacy-notice-paragraph'>Providing you with the Services</li>
                <li className='privacy-notice-paragraph'>
                  Authenticating use, detecting potential fraudulent use, and otherwise maintaining
                  the security of the Services
                </li>
                <li className='privacy-notice-paragraph'>
                  Developing, testing, improving, and demonstrating the Services
                </li>
                <li className='privacy-notice-paragraph'>
                  Creating and maintaining a customer relationship management system, member
                  directories, and invitation lists for CoStar events
                </li>
                <li className='privacy-notice-paragraph'>
                  Carrying out our legal and contractual obligations and enforcing our rights,
                  including billing and payment processing
                </li>
                <li className='privacy-notice-paragraph'>
                  Anonymizing and aggregating information for analytics and reporting
                </li>
                <li className='privacy-notice-paragraph'>
                  Advertising, marketing, and selling the Services, including linking together or
                  merging Personal Information with other Personal Information so that we may better
                  understand your needs and inform you about our Services and those of our partners
                </li>
                <li className='privacy-notice-paragraph'>
                  Short-term transient use, as defined in the California Consumer Privacy Act
                </li>
                <li className='privacy-notice-paragraph'>Training and quality assurance</li>
                <li className='privacy-notice-paragraph'>
                  For any other purpose with your consent
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>Service-Specific</p>
              <p className='privacy-notice-paragraph'>United States Listing Services</p>
              <p className='privacy-notice-paragraph'>
                You may have the ability to share certain pages or content with third parties. If
                you use the “share” functionality, you will be asked for your email address and the
                recipient’s email address, and you may enter an optional message. We use the email
                addresses stored through the “share” functionality for the limited purpose of
                sending a one-time email.
              </p>
              <p className='privacy-notice-paragraph'>
                When you use our mobile application or our website, your location may be obtained
                from the mobile device or the network, or directly from you, and may be used to
                search for information you may need, including local searches for rental properties.
                When we execute such searches on your behalf, we do not transfer your identity or
                Personal Information to third parties other than the rental property owners or
                managers or service providers, as needed to provide the Services. This information
                is not used to create a profile about you or your activities. Your location is only
                stored in the application if you save your location (rental property) searches, and
                you may delete this information by clearing your search history. Location
                coordinates are shared with our geocoding service providers (such as Google Maps)
                only to perform the task of providing maps and directions at your request. No
                location information is shared with any third parties for marketing purposes. Our
                application does not interact or share information with any other applications
                installed on your mobile device.
              </p>
              <p className='privacy-notice-paragraph'>Belbex</p>
              <p className='privacy-notice-paragraph'>
                Belbex may use your Personal Information to register you in the Belbex Professional
                Directory, including your name, address, company, geographic location, phone number,
                and transaction information. The Belbex Professional Directory consists of a
                database available to registered users of Belbex Pro and Belbex.com, which can be
                used to contact other registered users in relation to the properties they have
                published.
              </p>
              <p className='privacy-notice-paragraph'>
                Belbex may use the Personal Information to advise listers about improvements to
                Belbex products and to allow users to contact Belbex in relation to the properties
                the listers have published.
              </p>
              <p className='privacy-notice-paragraph'>BizOwnerSell, BizQuest, FindaFranchise</p>
              <p className='privacy-notice-paragraph'>
                If you send an email using the “Email a Listing to a Friend” service to a
                third-party email address that is not registered in our system, we do not use that
                email address for any purpose other than to send your email, and for us to
                automatically send the third party a one-time email inviting him or her to visit the
                website. We store this information for the limited purpose of sending this one-time
                email and for tracking the success of our referral program.
              </p>
              <p className='privacy-notice-paragraph'>BureauxLocaux</p>
              <p className='privacy-notice-paragraph'>
                When you use our mobile application on a mobile device, your location may be
                obtained from the mobile device or the network and may be used to search for things
                you may need near your device.
              </p>
              <p className='privacy-notice-paragraph'>Shopproperty</p>
              <p className='privacy-notice-paragraph'>
                Providing you the Shopproperty Services includes using your Personal Information to
                permit subscribers to market their retail properties to you and providing your
                contact information to agents of properties you have viewed.
              </p>
              <p className='privacy-notice-paragraph'>Online Advertising</p>
              <p className='privacy-notice-paragraph'>
                When you use the Services, we and third parties may use cookies and other tracking
                technologies to collect information, including Personal Information, to help us
                target content to you on the Services or elsewhere. This information may be
                associated with other information or combined with information from other sources,
                including information these third parties might track about your online activities
                over time and across the Internet. Third parties use this information to provide
                interest-based display advertising and retargeting on our behalf, which may include
                placing our advertisements on other websites you visit, including your social media
                accounts, or matching a cookie or device ID to your email address so we can send you
                promotional emails that may be of interest to you.
              </p>
              <p className='privacy-notice-paragraph'>
                To make informed choices about targeted advertising, see Manage{' '}
                <a onClick={(e) => setPointNumber(3)} href='#s3'>
                  Your Personal Information.
                </a>
              </p>
              <p className='privacy-notice-paragraph'>Automated Decision-Making</p>
              <p className='privacy-notice-paragraph'>
                We may use an automated process to identify properties that may be of particular
                interest to you and to bring these to your attention. We may do this by profiling
                your activity when using the Services. This profiling takes place based on
                properties you browse, searches you conduct, and your location. It helps us to
                understand what sort of properties you are interested in and to categorize your
                activity to help us determine the Services you require. For information about how
                users based in the European Union can object to our automated decision-making, see{' '}
                <a onClick={(e) => setPointNumber(8)} href='#s8'>
                  {' '}
                  Manage Your Personal Information
                </a>{' '}
                For more information, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                European Economic Area (EEA) and United Kingdom
              </p>
              <p className='privacy-notice-paragraph'>European Economic Area (EEA)</p>
              <p className='privacy-notice-paragraph'>
                We rely on the following lawful bases to process your Personal Information for these
                non-exhaustive purposes:
              </p>
              <p className='privacy-notice-paragraph'>Consent</p>
              <p className='privacy-notice-paragraph'>
                We may obtain your consent to process your Personal Information in certain
                circumstances, which may include when we send you relevant marketing, you elect to
                receive information from us, or you{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                to register an interest in our Services or company. We may also rely upon our
                legitimate interest in developing our business as a basis for sending you marketing
                information and information about our Services (see below).
              </p>
              <p className='privacy-notice-paragraph'>Performance of a Contract</p>
              <p className='privacy-notice-paragraph'>
                We rely on this lawful processing ground when we process your Personal Information
                to perform a contract which we have with you, or when we take steps in anticipation
                of entering into a contract with you, for example in connection with in the
                provision of our Services to you and the management of our relationships with third
                parties.
              </p>
              <p className='privacy-notice-paragraph'>Compliance with a Legal Obligation</p>

              <p className='privacy-notice-paragraph'>
                We rely on this lawful processing ground when we process your Personal Information
                to meet legal and regulatory obligations which apply to us.
              </p>
              <p className='privacy-notice-paragraph'>Legitimate Interests</p>
              <p className='privacy-notice-paragraph'>
                We rely on this lawful processing ground when we process your Personal Information
                to provide our Services, to respond to specific requests, to manage our business
                operations, to manage our relationships with you and with third parties in
                connection with our business, and when we provide you with marketing information or
                other information in relation to our Services which we believe may interest you.
              </p>
              <p className='privacy-notice-paragraph'>
                If you wish to have more information regarding the legitimate interests assessments
                we have conducted in order to reach these conclusions, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
              </p>
            </div>
            <div style={{display: pointNumber == 4 ? 'block' : 'none'}}>
              <h2 id='s4'>Disclosure of Personal Information</h2>
              <p className='privacy-notice-paragraph'>We may disclose Personal Information:</p>
              <ul>
                <li className='privacy-notice-paragraph'>
                  To affiliates and other entities within CoStar’s group of companies, distribution
                  partners, other CoStar customers, and service providers
                </li>
                <li className='privacy-notice-paragraph'>
                  To third parties when you use a third party feature in our Services
                </li>
                <li className='privacy-notice-paragraph'>
                  To enforce or apply our Terms of Use and other agreements or comply with any court
                  order, law, or legal process, including government or regulatory requests
                </li>
                <li className='privacy-notice-paragraph'>
                  To a buyer or other successor in the event of a merger, divestiture,
                  restructuring, reorganization, dissolution, or other sale or transfer of some or
                  all of CoStar’s assets
                </li>
                <li className='privacy-notice-paragraph'>
                  To advisors, consultants, auditors, or similar professionals to assess our
                  business, financial, and legal obligations or operations
                </li>
                <li className='privacy-notice-paragraph'>
                  If we believe it is necessary to protect the rights, property, or safety of CoStar
                  or others
                </li>
                <li className='privacy-notice-paragraph'>
                  For any other purpose disclosed by us when you provide Personal Information
                </li>
                <li className='privacy-notice-paragraph'>
                  With your consent, such as when you choose to provide your information to third
                  parties
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>
                We may also disclose de-identified information without restriction. Note that if you
                make any Personal Information publicly available on the Services, anyone may see and
                use such information.
              </p>

              <p className='privacy-notice-paragraph'>Service-Specific</p>
              <p className='privacy-notice-paragraph'>United States Listing Services</p>
              <p className='privacy-notice-paragraph'>
                CoStar may share member information in the following areas on the Services:
                Marketing Center, Email Alerts and Professional Directory. When a CoStar customer
                enters a sale or lease listing in the Marketing Center, listing contact information
                is also entered. During this process, the listing submitter is able to view other
                CoStar customers’ contact information when he or she adds another contact to the
                listing. In addition, CoStar customers can view contact information (name, email,
                and phone number) when viewing a property listing profile.
              </p>
              <p className='privacy-notice-paragraph'>
                The Services may also allow users to share contact information with one another via
                email alerts. With email alerts, users can save their property search criteria to
                have information about properties that match the specified criteria emailed to them.
                When selecting this service, users are given the option of releasing their contact
                information to other users who have property listings that match their criteria.
                This contact information is then shared with the users who have property listings
                that match the buying or leasing criteria.
              </p>
              <p className='privacy-notice-paragraph'>Apartments.com</p>
              <p className='privacy-notice-paragraph'>
                If you elect to use the website’s Free Listing Service to advertise a property, it
                is important to note that any information you choose to include in your listing may
                be made publicly available via the website and other media in which the website
                listings are published, including affiliate sites. For example, you may include a
                phone number and/or an email address to allow users to contact you regarding your
                listing. Apartments.com is not responsible for unsolicited phone calls and emails
                that you may receive from third parties, even after your listing is no longer on the
                website. Except for required information, you should not include any contact or
                other information in your listing that you do not want other parties to see or use.
                If you wish to access, verify the accuracy of, or change any information in your
                advertisement, you can use{' '}
                <a href='https://www.apartments.com/add-property/' target='_blank'>
                  this interface.
                </a>
              </p>
              <p className='privacy-notice-paragraph'>
                When applying for a lease, your redacted Social security number and date of birth
                are shared with TransUnion for purposes of a background check.
              </p>
              <p className='privacy-notice-paragraph'>Belbex</p>
              <p className='privacy-notice-paragraph'>
                Belbex may share the Personal Information of Belbex subscribers with listers.
              </p>
              <p className='privacy-notice-paragraph'>BizOwnerSell</p>
              <p className='privacy-notice-paragraph'>
                BizOwnerSell allows users to opt into a Prospect List. Users who opt in agree to
                have their name, role, and phone number shared with sellers who have matching
                businesses.
              </p>
              <p className='privacy-notice-paragraph'>Service Providers</p>
              <p className='privacy-notice-paragraph'>
                CoStar retains third-party service providers to assist us in our business. For
                example, we use service providers to assist with analytics, email marketing, payment
                processing, customer relationship management, and IT infrastructure and support.
                CoStar may permit these affiliates and service providers to access your Personal
                Information in order to assist us in providing services; however, we contractually
                require these third parties to keep Personal Information confidential and use it
                only for the purposes for which we disclose it to them.
              </p>
              <p className='privacy-notice-paragraph'>California and Quebec, Canada Residents</p>
              <p className='privacy-notice-paragraph'>
                CoStar shares Personal Information with the following categories of third parties
                and has disclosed the following categories of Personal Information for a business or
                commercial purpose in the 12 months preceding the date this Global Privacy notice
                was last modified:
              </p>
              <table
                style={{fontSize: 'initial', border: '1px solid black', borderCollapse: 'collapse'}}
              >
                <tr>
                  <th
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='col'
                  >
                    Personal Information
                  </th>
                  <th
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='col'
                  >
                    Third Parties
                  </th>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Identifiers
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, including data analytics and advertising providers, operating
                    systems and platforms, social networks, other CoStar customers, consumer
                    reporting agencies
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Categories of personal information described in California Civil Code
                    §1798.80(e)
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, other CoStar customers, consumer reporting agencies
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Commercial information
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Affiliates, distribution partners, other CoStar customers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Internet or other electronic network activity information
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, including data analytics and advertising providers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Geolocation data
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Professional or employment-related information
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, other CoStar customers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Inferences
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, including data analytics and advertising providers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Categories of personal information required for 1099 tax reporting
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers, government agencies
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope='row'
                  >
                    {' '}
                    Sensitive personal information, including precise geolocation, login
                    credentials, and the contents of messages sent through the Services
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {' '}
                    Service providers
                  </td>
                </tr>
              </table>

              <p className='privacy-notice-paragraph'>
                CoStar may also sell/share certain Personal Information. In the 12 months preceding
                the date this Global Privacy Notice was last modified, CoStar sold:
              </p>
              <ul>
                <li className='privacy-notice-paragraph'>
                  Identifiers (e.g., IP address and other online identifiers) and Internet or other
                  electronic network activity information, and commercial information (e.g.,
                  purchasing tendencies or records of products or services purchased or considered)
                  to advertising providers for the purpose of advertising our Services.
                </li>
              </ul>
            </div>
            <div style={{display: pointNumber == 5 ? 'block' : 'none'}}>
              <h2 id='s5'> International Transfer of Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                CoStar is a global business. We may transfer your Personal Information to the United
                States, where we are headquartered, and to other countries which may not have the
                same privacy laws as the country in which you initially provided the information,
                but we will protect your Personal Information in accordance with this Global Privacy
                Notice, or as otherwise disclosed to you.
              </p>
              <p className='privacy-notice-paragraph'>
                European Economic Area (EEA) Residents and United Kingdom Residents
              </p>
              <p className='privacy-notice-paragraph'>
                If you live in the EEA or United Kingdom, we may transfer Personal Information to
                countries for which adequacy decisions have been issued, use contractual protections
                for the transfer of Personal Information to third parties, such as an intra-company
                agreement or the European Commission’s Standard Contractual Clauses or their
                equivalent under applicable law.
              </p>
              <p className='privacy-notice-paragraph'>
                You may{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                to obtain a copy of the safeguards we use to transfer Personal Information outside
                of the EEA or United Kingdom.
              </p>
              <p className='privacy-notice-paragraph'>Canadian Residents</p>
              <p className='privacy-notice-paragraph'>
                We may use service providers located outside of Canada, including, without
                limitation, in the United States of America, to process Personal Information, and
                may transfer your Personal Information to such service providers for this purpose.
                When your Personal Information is processed outside of Canada, it will be subject to
                the laws of the countries where the information is processed and may be accessible
                to law enforcement and national security authorities of those countries in
                accordance with their laws.
              </p>
              <p className='privacy-notice-paragraph'>
                You may{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                to obtain information about our policies and practices regarding the use of service
                providers located outside of Canada.
              </p>
            </div>
            <div style={{display: pointNumber == 6 ? 'block' : 'none'}}>
              <h2 id='s6'> Security of Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                CoStar implements security safeguards to protect your Personal Information.
              </p>
              <p className='privacy-notice-paragraph'>
                We take steps to secure Personal Information through administrative, technical and
                physical safeguards designed to protect against the risk of accidental, unlawful or
                unauthorized destruction, loss, alteration, access, disclosure or use. For example,
                we encrypt payment card information in accordance with the Payment Card Industry
                Data Security Standard (PCI DSS) and store sensitive information such as geolocation
                data on CoStar servers located in the United States with access limited to
                authorized CoStar employees.
              </p>
              <p className='privacy-notice-paragraph'>
                Unfortunately, we cannot guarantee the security of information transmitted through
                the Internet, and where we have given you (or where you have chosen) a password, you
                are responsible for keeping this password confidential.
              </p>
              <p className='privacy-notice-paragraph'>
                CoStar has designated a Cybersecurity Team to investigate and respond to all
                security issues and vulnerabilities regarding its offerings. You can contact this
                team at: <a href='mailto:CoStarSecurity1@costar.com'>CoStarSecurity1@costar.com.</a>
              </p>
            </div>
            <div style={{display: pointNumber == 7 ? 'block' : 'none'}}>
              <h2 id='s7'>Retention of Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                CoStar will retain your information only for as long as is reasonably necessary for
                the purposes set out on this Global Privacy Notice, for as long as your account is
                active (i.e., for the lifetime of your CoStar customer account), or as needed to
                provide the Services to you. If you no longer want CoStar to use your information to
                provide the Services to you, you may close your account. CoStar will retain and use
                your information to the extent necessary to comply with our legal obligations,
                resolve disputes, enforce our agreements, and as otherwise described in this Global
                Privacy Notice. Please note that closing an account may not make your email address,
                username, or property name (if any) available for reuse on a new account. We also
                retain log files for internal analysis purposes. These log files are retained for a
                brief period of time, except in cases where they are used to protect the safety and
                security of the Services, to maintain and improve functionality of the Services, or
                to comply with legal obligations.
              </p>
            </div>
            <div style={{display: pointNumber == 8 ? 'block' : 'none'}}>
              <h2 id='s8'> Manage Your Personal Information</h2>
              <p className='privacy-notice-paragraph'>
                You may manage your Personal Information by making certain choices. If you believe
                that any Personal Information you have provided to us is out-of-date or inaccurate,
                you may review and correct such information if it is within your online account by
                logging in at any time or
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                . You may also have additional rights detailed below depending on where you live. As
                a security precaution, we may need to request information from you to help us
                confirm your identity when exercising a right related to your Personal Information.
              </p>
              <p className='privacy-notice-paragraph'>Direct Marketing Opt-Out</p>
              <p className='privacy-notice-paragraph'>
                If you no longer wish to receive direct marketing emails from CoStar, you may click
                the “Unsubscribe” link in an email at any time to stop receiving emails for that
                particular subject. Depending on the Services, you may also be able to manage
                notification preferences in your account. Note that CoStar may still contact you
                about the Terms of Use, Global Privacy Notice, or other legal notices, or in
                connection with providing you Services you have requested from us.
              </p>
              <p className='privacy-notice-paragraph'>Tracking/Online Advertising Opt-Out</p>
              <p className='privacy-notice-paragraph'>
                You may disable or delete browser cookies through your browser settings. Cookies are
                generally easy to disable or delete, but the method varies between browsers. To
                learn how you can manage Flash cookies, visit{' '}
                <a href='https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html#117717'>
                  Adobe’s Flash player settings page
                </a>{' '}
                . If you disable or delete cookies, or if you are running third-party software that
                intercepts or deletes cookies, please note that some parts of our websites may not
                work properly.
              </p>
              <p className='privacy-notice-paragraph'>
                You can opt out of third parties collecting your Personal Information for targeted
                advertising purposes in the United States or Canada by visiting the National
                Advertising Initiative’s (NAI){' '}
                <a href='https://optout.networkadvertising.org/?c=1'>opt-out page</a> and the
                Digital Advertising Alliance’s (DAA){' '}
                <a href='https://optout.networkadvertising.org/?c=1'>opt-out page</a> and in the EEA
                by visiting The Programme’s{' '}
                <a href='https://optout.networkadvertising.org/?c=1'>opt-out page</a>.
              </p>
              <p className='privacy-notice-paragraph'>
                Our Services do not recognize “Do Not Track” signals.
              </p>
              <p className='privacy-notice-paragraph'>California Residents</p>
              <p className='privacy-notice-paragraph'>
                If you live in California, you have the right to: (1) request that CoStar disclose
                what Personal Information we collect, use, disclose, and sell; (2) request deletion
                of Personal Information, subject to certain exceptions; (3) request that CoStar
                correct inaccurate or incomplete Personal Information; (4) opt-out of the sale of
                Personal Information; (5) opt-out of the “sharing,” or disclosing Personal
                Information for the purposes of cross-context behavioral advertising, and (6) not
                receive discriminatory treatment by CoStar for exercising these rights.
              </p>
              <p className='privacy-notice-paragraph'>Requests to Know</p>
              <p className='privacy-notice-paragraph'>
                You have the right to request that we disclose the following information:
              </p>
              <ul>
                <li className='privacy-notice-paragraph'>
                  Specific pieces of Personal Information CoStar has collected about you;
                </li>
                <li className='privacy-notice-paragraph'>
                  Categories of Personal Information CoStar has collected about you, disclosed about
                  you for a business purpose, or sold;
                </li>
                <li className='privacy-notice-paragraph'>
                  Categories of sources from which the Personal Information is collected;
                </li>
                <li className='privacy-notice-paragraph'>
                  Categories of third parties with whom CoStar shares or to whom CoStar sells
                  Personal Information; and
                </li>
                <li className='privacy-notice-paragraph'>
                  The business or commercial purpose for collecting, selling and sharing Personal
                  Information.
                </li>
              </ul>
              <p className='privacy-notice-paragraph'>
                Opt-Out of the Sale or Sharing of Personal Information
              </p>
              <p className='privacy-notice-paragraph'>
                You have the right to opt-out of the sale of your Personal Information. To make such
                a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                by email or visit{' '}
                <a href='https://www.costar.com/about/do-not-sell-my-personal-information-california-residents'>
                  {' '}
                  Do Not Sell My Personal Information.{' '}
                </a>{' '}
                To opt-out of CoStar sharing your Personal Information with third parties to
                advertise our Services, please additionally manage{' '}
                <a href='https://www.costar.com/marketplace/privacy-notice#s8'>
                  Tracking/Online Advertising Opt-Out
                </a>{' '}
                privacy controls
              </p>
              <p className='privacy-notice-paragraph'>
                Please{' '}
                <a href='https://www.costar.com/sites/costar.com.na/files/2022-07/2021%20CCPA%20Consumer%20Request%20Metrics%20Reporting%20Marketplaces.pdf'>
                  click here
                </a>{' '}
                for statistics relating to California Consumer Privacy Act requests received by
                CoStar brands under this Global Privacy Notice in the prior calendar year.
              </p>
              <p className='privacy-notice-paragraph'>
                We do not have actual knowledge that we sell or share the Personal Information of
                consumers under the age of 16.
              </p>
              <p className='privacy-notice-paragraph'>
                We do not use or disclose sensitive personal information for purposes other than
                those specified in Cal. Civ Code § 1798.121.
              </p>
              <p className='privacy-notice-paragraph'>Exercising Your Rights</p>
              <p className='privacy-notice-paragraph'>
                To make a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                by email, call us toll-free at (800) 204-5960, or submit the request through your
                CoStar account or our rights request{' '}
                <a href='https://privacyportal.onetrust.com/webform/69fc85af-b1e4-4eae-966b-cf91a3cca94c/5f1a45b9-bb79-49dc-ad4d-064548192246'>
                  web form
                </a>{' '}
                . In order to verify your request, CoStar may require you to provide additional
                information to confirm the identity of the consumer.
              </p>
              <p className='privacy-notice-paragraph'>
                Only you, or someone legally authorized to act on your behalf, may make a verifiable
                consumer request related to your Personal Information. To make a request on your
                behalf, an authorized agent may{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>{' '}
                by email with proof of your written and signed permission to do so. Note that CoStar
                may also require you to verify your identity and confirm that you gave permission.
              </p>
              <p className='privacy-notice-paragraph'>“Shine the Light” Request</p>
              <p className='privacy-notice-paragraph'>
                California residents may also have the right to request certain information
                regarding our disclosure of Personal Information to third parties for their direct
                marketing purposes. To make such a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                .
              </p>
              <p className='privacy-notice-paragraph'>Nevada Residents</p>
              <p className='privacy-notice-paragraph'>
                Nevada residents may have the right to opt-out of the sale of Personal Information
                we have collected or will collect. To make such a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                .
              </p>
              <p className='privacy-notice-paragraph'>Virginia Residents</p>
              <p className='privacy-notice-paragraph'>
                If you live in Virginia, you have the right to: (1) request that CoStar disclose and
                provide a copy of what Personal Information we collect, use, disclose, and sell; (2)
                request deletion of Personal Information, subject to certain exceptions; (3) request
                that CoStar correct inaccurate or incomplete Personal Information; (4) opt-out of
                the sale of Personal Information; (5) opt-out of targeted advertising; (6) opt out
                of profiling in furtherance of decisions that produce legal or similarly significant
                effects about you, and (7) not receive discriminatory treatment by CoStar for
                exercising these rights.
              </p>
              <p className='privacy-notice-paragraph'>
                To make such a request, please follow the instructions in the below section,{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                . If you are appealing our decision, please email us following the instructions in
                the below section, Contact Us, and reference and/or attach information to identify
                your original request. In order to verify your request, CoStar may require you to
                provide additional information to confirm the identity of the consumer.
              </p>
              <p className='privacy-notice-paragraph'>
                European Economic Area (EEA) and United Kingdom Residents
              </p>
              <p className='privacy-notice-paragraph'>
                If you live in the EEA or United Kingdom, you may have the right to (1) request
                access to, rectification, or erasure of your Personal Information or restrict the
                processing of your Personal Information; (2) object to processing; (3) data
                portability (receive and transfer your Personal Information); (4) lodge a complaint
                with a supervisory authority; and, (5) where processing of your Personal Information
                is based on consent, withdraw your consent at any time without affecting the
                lawfulness of the processing of Personal Information that occurred before you
                withdraw consent. To make such a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                .
              </p>
              <p className='privacy-notice-paragraph'>Canadian Residents</p>
              <p className='privacy-notice-paragraph'>
                If you live in Canada, in addition to the other rights you may have hereunder, you
                may have the right to (1) request access to, review and to correct inaccuracies or
                omissions in your Personal Information; (2) to withdraw consent for collection, use
                or disclosure of, or to request deletion of, your Personal Information (provided
                that, if you do so, we may no longer be able to provide services to you that rely on
                such Personal Information); (3) to ask questions about our policies and practices,
                and to lodge complaints about our compliance with them with us or with regulatory
                authorities; and (4) for Quebec residents, to request an electronic copy of the
                Personal Information you have provided to us in a structured and commonly used
                technological format.
              </p>
              <p className='privacy-notice-paragraph'>
                To make such a request, please{' '}
                <a onClick={(e) => setPointNumber(10)} href='#s10'>
                  Contact Us
                </a>
                . We may require you to provide additional information to confirm your identity
                prior to carrying out any such request.
              </p>
            </div>
            <div style={{display: pointNumber == 9 ? 'block' : 'none'}}>
              <h2 id='s9'>Global Privacy Notice Changes</h2>
              <p className='privacy-notice-paragraph'>
                This Global Privacy Notice may be updated periodically to reflect changes in our
                privacy practices.
              </p>
              <p className='privacy-notice-paragraph'>
                We will post changes on this page and identify the date the privacy notice was last
                revised at the top of the page. If we make material changes to our privacy
                practices, we will notify you through a notice on the home page of the websites
                covered by this Global Privacy Notice. If a material change will apply to Personal
                Information we have already collected, including any new purposes for which the
                Personal Information will be used or disclosed to which you have not previously
                consented, we will additionally seek your affirmative consent.
              </p>
            </div>
            <div style={{display: pointNumber == 10 ? 'block' : 'none'}}>
              <h2 id='s10'> Contact Us</h2>
              <p className='privacy-notice-paragraph'>
                We have appointed a Data Protection Officer to investigate and respond to privacy
                issues and to be accountable for our compliance with this Global Privacy Notice. You
                can contact us, depending on the nature of your inquiry, by using the relevant
                contact information below or call the relevant department using the below toll-free
                numbers:
              </p>
              <p className='privacy-notice-paragraph'>
                In order to properly respond to your privacy questions or requests about our
                services, please email the relevant department outlined below or call the relevant
                department using the below toll-free numbers:
              </p>
              <table
                style={{fontSize: 'initial', border: '1px solid black', borderCollapse: 'collapse'}}
              >
                <tr>
                  <th
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Service
                  </th>
                  <th
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Contact Information
                  </th>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    LoopNet and Cityfeet services
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Email:LoopNetPrivacy1@costar.com <br />
                    Phone: (800) 613-1303
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Apartments.com services (e.g., Apartments.com, ApartmentFinder.com,
                    ApartmentHomeLiving.com, ForRent.com, Cozy.co)
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Email:ApartmentsPrivacy1@costar.com
                    <br />
                    Phone: (888) 658-7368
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Businesses for Sale (e.g., BizOwnerSell.com, BizQuest.com or FindAFranchise.com)
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Email:BizOwnerSellPrivacy1@costar.com
                    <br />
                    Phone: (888) 777-9893
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Rural land and real estate listing services (e.g., LandsOfAmerica.com,
                    LandAndFarm.com, LandWatch.com, etc.)
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Email:LandPrivacy1@costar.com
                    <br />
                    Phone: (512) 263-5600
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Realla, Belbex, BureauxLocaux, and Shopproperty services
                  </td>
                  <td
                    style={{
                      padding: 5,
                      fontSize: 'initial',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    Email:CoStarUKPrivacy1@costar.co.uk <br />
                    Phone: (512) 233-5600
                  </td>
                </tr>
              </table>
              <p className='privacy-notice-paragraph'>You may also write to:</p>
              <p className='privacy-notice-paragraph'>
                CoStar Realty Information, Inc. 1331 L Street, NW Washington, DC 20005 Attn: Legal
                Department
              </p>
              <p className='privacy-notice-paragraph'>
                European Economic Area (EEA) and United Kingdom Residents
              </p>
              <p className='privacy-notice-paragraph'>
                If you are a resident of the EEA or the United Kingdom, CoStar Realty Information,
                Inc. and its affiliates are the entities responsible for the processing of your
                Personal Information. In order to properly respond to your privacy questions or
                requests about our services, please email the relevant department as outlined below:
              </p>
              <p className='privacy-notice-paragraph'>
                Email: CoStarUKPrivacy1@costar.co.uk – for Realla, Belbex, BureauxLocaux, and
                Shopproperty services
              </p>
              <p className='privacy-notice-paragraph'>or write to:</p>
              <p className='privacy-notice-paragraph'>
                CoStar UK Limited <br />
                26th Floor, The Shard, 32 London Bridge Street, <br />
                London SE1 9SG, United Kingdom <br />
              </p>

              <p className='privacy-notice-paragraph'>
                You may also make a complaint to your local data protection authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PrivacyNotice
