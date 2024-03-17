import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './style.css'
const TermsOfUse = () => {
  const [pointNumber, setPointNumber] = useState(0)

  return (
    <React.Fragment>
      <div className='container mt-5'>
        <div className='row pt-8'>
          <div className='col-4'>
            {/* <p className='privacy-notice-paragraph'>Table of Contents</p> */}
            <ul>
              {/* <li className='privacy-notice-paragraph pb-4' onClick={(e) => setPointNumber(1)}>
                <a href='#s1'>GENERAL PROVISIONS</a>
              </li> */}
              <li className='privacy-notice-paragraph pb-4' onClick={(e) => setPointNumber(1)}>
                <a href='#s1'>Business for Sale Advertising Service</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(2)}>
                <a href='#s2'>License Grant and other Rights of Company</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(3)}>
                <a href='#s3'>Company Communication</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(4)}>
                <a href='#s4'> Customer Privileges</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(5)}>
                <a href='#s5'>Submission and Administration of Listings</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(6)}>
                <a href='#s6'>Use of Information</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(7)}>
                <a href='#s7'> Term and Termination</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(8)}>
                <a href='#s8'>Payment Terms</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(9)}>
                <a href='#s9'>Email Services; Unsolicited Commercial Email (Spam)</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(10)}>
                <a href='#s10'> Ownership</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(11)}>
                <a href='#s11'> Limitation of Liability and Indemnification</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(12)}>
                <a href='#s12'>Warranty Disclaimers</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(13)}>
                <a href='#s13'>Links to Third Party Sites</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(14)}>
                <a href='#s14'>
                  Procedure for Making Notification of Claims of Copyright Infringement
                </a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(15)}>
                <a href='#s15'>Miscellaneous</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(16)}>
                <a href='#s16'>BROKER SUBSCRIPTIONS PROVISIONS</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(17)}>
                <a href='#s17'>Listing Restrictions</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(18)}>
                <a href='#s18'>BROKER AGENT PLAN PROVISIONS</a>
              </li>
              <li className='privacy-notice-paragraph py-4' onClick={(e) => setPointNumber(19)}>
                <a href='#s19'>FRANCHISE DIRECTORY PROVISIONS</a>
              </li>
            </ul>
          </div>
          <div className='col-8'>
            <h1>TERMS OF USE</h1>
            <p className='privacy-notice-paragraph '>Last Modified: January 4th, 2023</p>
            <p className='privacy-notice-paragraph '>
              The submission of information to, and use of, the business listing service ("Service")
              available through the BizOwnerSell.com or any other similar website (the "Websites")
              relating to a business for sale marketplace owned, operated, or powered by CoStar
              Realty Information, Inc. ("Company") is subject to the following Terms of Use. BY
              SUBMITTING INFORMATION to, or accessing information from, the Service, YOU, the end
              user customer ("Customer" or "you") AGREE TO THE FOLLOWING TERMS OF USE and represent
              and warrant that you have the right, power and authority to agree to and be bound by
              such terms. These Terms of Use are a legal agreement between Company and you (the
              "Agreement").
            </p>
            <p className='privacy-notice-paragraph '>
              If you do not agree to these Terms of Use, do not submit information to, or access
              information from, the Service. All questions concerning this Agreement should be
              directed to: info@BizOwnerSell.com. Company may update these Terms of Use at any time
              and without notice.
            </p>

            {/* <h1>GENERAL PROVISIONS</h1> */}
            <div id='s1' style={{display: pointNumber == 1 ? 'block' : 'none'}}>
              <h2>Business for Sale Advertising Service</h2>
              <p className='privacy-notice-paragraph '>
                The Service is an online business advertising, searching and information service.
                Company does not broker or sell businesses directly and is not a party to any
                transaction between the business purchaser and seller. As a result, Company does not
                (a) guarantee or ensure any business or any transaction between the seller and
                purchaser, (b) act as a business broker, loan broker, money transmitter, payment
                manager, debt collector, or credit reporting agency, and does not guarantee any
                results from using the Service, or (c) broker or sell any businesses for sale on the
                Websites.
              </p>
            </div>
            <div id='s2' style={{display: pointNumber == 2 ? 'block' : 'none'}}>
              <h2>License Grant and other Rights of Company</h2>

              <p className='privacy-notice-paragraph '>
                With respect to listings, content and other information Customer submits to Company
                through the Service (“Customer Content”), Customer grants Company and its affiliates
                and their licensees a royalty-free, perpetual, irrevocable, non-exclusive and fully
                sub-licensable right and license (through multiple tiers) to use, reproduce, adapt,
                perform, display, publish, translate, prepare derivative works from, modify,
                distribute, sell, and take any other action with respect to the Customer Content (in
                whole or part) worldwide and/or to incorporate it in other works in any form, media,
                or technology now known or later developed, including the right to use listings and
                other information submitted to it for publication of all or part of such listing on
                the Internet for unrestricted use by Company customers and partners. This license
                you grant Company includes the express permission for Company to use and display the
                Customer Content you provide to Company, or any modification thereof, on the
                Websites and other Company-affiliated or partner products and sites. Company shall
                have sole authority to choose the manner in which any listing will be received,
                displayed and used by the Service, and reserves the right to remove all or any part
                of a listing or refuse Services to anyone at any time in its sole discretion.
                Company shall have no obligation to (i) resolve disputes among users of the Service;
                or (ii) monitor or verify the accuracy or proper use of the listings. Company
                reserves the right to modify or change any and all Terms of Use at any time. The
                most current copy of these Terms of Use will be posted and available for review on
                Company's corporate website at{' '}
                <a href='https://bizownersell.jgago.com/terms-of-use'>
                  https://www.BizOwnerSell.com/bizlegal.htm{' '}
                </a>{' '}
                <Link to='/terms-of-use'></Link>
              </p>
            </div>
            <div id='s3' style={{display: pointNumber == 3 ? 'block' : 'none'}}>
              <h2>Company Communication</h2>
              <p className='privacy-notice-paragraph '>
                Company utilizes email as a vital and primary communication channel with customers.
                As a registered user, Customer hereby consents to Company communicating and grants
                Company permission to communicate with customer via email (as well as other
                communication channels such as phone) for any purpose Company determines to be
                relevant including, but not limited to, system messages, product updates, service
                announcements and other marketing messages. Company will use commercially reasonable
                to honor Customer's request to opt out of marketing messages, but in every
                circumstance Company shall comply with applicable law with respect to such opt-out
                request and under no circumstances will Company have any liability for sending any
                email to its registered users/customers. With respect to sharing any personal data
                with third parties, Company does so in compliance with applicable law. For more
                information, please visit Company's Privacy Notice located at{' '}
                <Link to='/privacy-notice'> https://www.BizOwnerSell.com/privacy-notice. </Link>
              </p>
            </div>
            <div id='s4' style={{display: pointNumber == 4 ? 'block' : 'none'}}>
              <h2>Customer Privileges</h2>
              <p className='privacy-notice-paragraph '>
                Customer privileges are granted by Company to individuals exclusively and are
                granted specifically to the registered customer only. Individual user rights cannot
                be assigned, sublicensed, distributed, shared, viewed, accessed, or otherwise
                transferred to anyone without the express written permission of Company. Company
                requires that each registered user maintain a valid email address or Customer ID and
                a password, which shall be utilized for logging on to the Company system. Customers
                are not permitted to share their individual logon information with others. Company
                has the right to refuse service to any customer that refuses to abide by the Terms
                of Use herein or abuses their rights related to the Company service.
              </p>
            </div>
            <div id='s5' style={{display: pointNumber == 5 ? 'block' : 'none'}}>
              <h2>Submission and Administration of Listings</h2>
              <p className='privacy-notice-paragraph '>
                Customer agrees not to submit through the Websites any Customer Content containing,
                photograph, financial, contact or any other listing information to publish and
                advertise a business opportunity using the Service unless Customer has received all
                necessary rights, consents and/or authorizations from the appropriate parties,
                including, without limitation, photographers and/or copyright owners of any
                photographs. Customer agrees not to submit any image to Company which contains any
                misrepresentations or unsuitable, inappropriate or controversial content, or
                otherwise violates any terms of this Agreement. Company reserves the right to remove
                any images in violation of this provision. Customer agrees that all images submitted
                for publishing represent the business opportunity or category exclusively, and do
                not include any broker logos, contact information, website addresses, phone numbers,
                or any overlay text or graphics of any kind. Only one listing on the Company
                Websites published using the Service is permitted for each business opportunity
                (e.g., multiple business advertisements within a listing, or multiple listings for
                the same opportunity, is not permitted), and a listing may not be modified or edited
                in an attempt to sell a different business entity. Additionally, the Customer agrees
                to allow the listing, or any part of it, to be searched, displayed, accessed,
                downloaded, copied, and otherwise referred to by users of the Customer's website or
                the Company Websites. The Company shall have the sole authority to choose the manner
                in which any listing will be searched, displayed, accessed, downloaded, copied, and
                otherwise used on the Websites and Company shall have the right to modify the
                listing in the exercise of its rights under this Agreement. Customer (a) represents
                and warrants that all business and associated information provided by Customer will
                be accurate, and to the extent applicable, Customer has acquired or obtained all the
                required licensing, permits and legal authority to market and sell the business(es)
                in the locations in which it is advertising; (b) agrees that Customer will not
                permit the posting of a business on the Websites under a name other than that of the
                business owner or the named licensed business agents that have been engaged by the
                business owner to market the business under the terms of a duly executed, active and
                exclusive listing agreement with the owner; (c) agrees to administer and maintain
                the accuracy of listings provided by Customer at all times; (d) shall ensure (and
                shall require its sales agents, if applicable) to respond to all buyer inquiries
                relating to the listing (i) within seventy-two (72) business hours and (ii) in a
                professional and respectful manner; and (e) agrees to provide to prospective buyers,
                free of cost, the information needed so that such prospective buyers can make a
                fully informed purchase decision. In addition, Customer agrees not to advertise a
                business opportunity as an Established Business unless such a business (1) is open
                and has been continuously operating for a minimum of one year (two years for
                internet-based businesses), (2) has an established customer base and a material
                revenue history, and (3) has ability to provide financial history information to
                qualified buyers. Company reserves the right to remove all or any part of the
                listings posted on the Company website. Company accepts no responsibility for
                checking the accuracy of reports or data files submitted by Customer. While Company
                shall take all reasonable efforts for data backup and business resumption, Customer
                will be solely responsible for retaining back-up copies of all information,
                photographs and other materials it provides to Company.
              </p>
            </div>
            <div id='s6' style={{display: pointNumber == 6 ? 'block' : 'none'}}>
              <h2>Use of Information</h2>
              <p className='privacy-notice-paragraph '>
                All information obtained from the Service, including business listings, business
                broker directory, valuation reports, and any other information otherwise made
                available to Customer in the Service (individually and collectively, the "Content")
                is proprietary to Company and its licensors, and is protected by copyright and other
                U.S. and international intellectual property rights, laws and treaties. Customer
                agrees that Content reserved for members will be treated as proprietary, maintained
                as confidential and shall be protected as a trade secret of Company. Company does
                not ensure the accuracy of, endorse or recommend any Content and Customer uses such
                Content at the Customer's own risk. Customer may access the Content solely to obtain
                initial information from which further evaluation and investigation may commence.
                Customer shall limit access to and use of Content to personal and internal use, and
                shall not use Content obtained from the Service for further distribution,
                publication, public display, or preparation of derivative works or facilitate any of
                these activities in any way. Customer shall not use or reproduce Content obtained
                from the Service for or in connection with any other listing service or device.
                Customer shall not modify, merge, decompile, disassemble, translate, decode or
                reverse engineer any portion of the Product, or use any data mining, gathering or
                extraction tool, or any robot, spider or other automatic device or manual process,
                to monitor or copy any portion of the Service. Customer shall not access or use any
                portion of the Service if you are a direct or indirect competitor of Company, nor
                shall you provide, disclose or transmit any portion of the Service to any direct or
                indirect competitor of Company (by way of example, a "direct or indirect competitor"
                of Company includes, but is not limited to, Internet listing services or other
                business information services and employees, independent contractors and agents of
                such services). Customers violating these specific terms, specifically those
                customers searching the Service in an abusive or excessive manner, by automated or
                manual means, shall be subject to immediate termination of their subscription and
                will be assessed an excessive use fee of $500.
              </p>
            </div>
            <div id='s7' style={{display: pointNumber == 7 ? 'block' : 'none'}}>
              <h2>Term and Termination</h2>
              <p className='privacy-notice-paragraph '>
                The Company offers subscriptions to the Service through a number of products which
                vary and follow the term, renewal, and billing provisions as described below.
                Individual Listings. Single listing subscriptions are purchased through{' '}
                <a href='https://bizownersell.jgago.com/sell-a-business' target='_blank'>
                  https://bizownersell.jgago.com/sell-a-business
                </a>{' '}
                or the BizOwnerSell sales team. Customer may select a month by month, six, or twelve
                month listing term. Customer agrees to pay for the full value of the term (equal to
                the number of months in the term multiplied by the monthly rate) at the beginning of
                the initial term. After the initial term, individual listings renew on a monthly
                basis and are billed at the prevailing monthly rate until cancelled by Customer.
                Customer may cancel a listing at any time after the initial term, but the
                cancellation will take effect at the expiration of the then-current term. Customer
                agrees to provide written notice of such cancellation at least 10 business days
                before the end of any initial term or renewal month. Customer agrees that the fees
                paid for the initial term or any renewal month are non-refundable. Multiple
                Listings. Multiple listing subscriptions are available to business brokers via the
                tiered service packages which also includes a broker profile on the Website.
                Customers may select a monthly, quarterly, or annual subscription (each the "Initial
                Term"). Customer will be billed monthly at the rate determined by your contract
                length. The subscription shall continue for successive periods equal to the Initial
                Term (each such successive period being a "Renewal Term") commencing on the last day
                of the Initial Term or the Renewal Term, unless at least 10 business days prior to
                the last day of the Initial Term or Renewal Term Customer has provided Company
                written notice of intent not to renew. Mid-term cancellations are only permitted in
                the event that Customer pays all fees remaining for the then-current term. Any
                additional Showcase listing upgrade subscriptions added to a Brokers subscription
                are month-to-month and can be cancelled at the end of any month with 10 business
                days advance notice. BizOwnerSell Buyer’s subscriptions can be purchased through{' '}
                <Link to='https://bizownersell.jgago.com/auth/registration/broker'>
                  BizOwnerSell.com/Subscription/Buyer.
                </Link>{' '}
                Edge subscriptions are available in monthly and annual terms. Monthly terms renew
                and bill each month unless Customer provides 10 business days advance written notice
                of intent not to renew. All monthly subscription cancellations are effective at the
                end of the monthly billing period and no refunds will be granted for partial months.
                Annual terms are billed at the beginning of the term for the full value of the term.
                After the initial term (or a renewal term), an annual Buyer’s subscription will
                renew for a subsequent annual renewal term, unless Customer provides advance written
                notice of intent to not renew 10 business days before the end of the then-current
                term. No refunds will be granted for cancellations of partial terms. Company
                reserves the right to terminate a Customer's subscription at any time without prior
                notice. Cause for termination includes, but is not limited to, breaches or
                violations of the Terms of Use, requests by law enforcement, inappropriate,
                unsuitable, controversial, fraudulent or illegal activity by you, discontinuance or
                material modification of Company services, nonpayment of fees owed by you in
                connection with Company services, account inactivity or technical or security
                issues. Upon termination, Company shall have no obligation to maintain or forward
                any content in your account. In addition, the Company may require additional
                evidence of compliance with the provisions of this Agreement from Customers who are
                alleged to have submitted businesses or other information in violation of this
                Agreement.
              </p>
            </div>
            <div id='s8' style={{display: pointNumber == 8 ? 'block' : 'none'}}>
              <h2>Payment Terms</h2>
              <p className='privacy-notice-paragraph '>
                Customer agrees to pay for all products ordered through the Company website, or via
                Company client services personnel ("Client Services") using the payment method
                indicated and provides Company express authorization to charge said fees to their
                payment provider. Fees owed depend on the specific type and quantity of Company
                products, services, information, or deliverables (collectively "Deliverables")
                ordered. Payment of fees shall not be contingent on any events other than the
                delivery of the ordered Deliverables. Any attorney fees, court costs, or other costs
                incurred in collection of delinquent undisputed amounts shall be the responsibility
                of and paid for by Customer. If payment is not current, Company may immediately
                cease to provide any and all Deliverables to the customer. The fees paid for monthly
                subscriptions are non-refundable, regardless of whether the subscription is
                terminated prior to the end of the month or term. Fees paid for business listings
                and other products are not refundable. No partial month (or partial term if longer
                than a month) refunds will be provided. Customer may cancel their Company product
                subscription by contacting us only by email ({' '}
                <Link to='/feedback'>https://www.BizOwnerSell.com/feedback.htm </Link>). All
                cancellation requests will be processed within ten (10) business days, and a
                cancellation confirmation will be emailed to the email address on record for the
                account. The product and/or subscription will be deactivated at the end of the
                current billing term. Company reserves the right to change its fees or billing
                methods at any time. Company will provide timely notice to the affected Customers of
                any such changes. It is Customer's responsibility to promptly provide Company with
                any contact or billing information changes or updates (including email address,
                credit card numbers, etc.). The Customer must notify Company about any billing
                problems, disputes or discrepancies ("Disputes") within sixty (60) days after
                charges first appear on their account statement. If Customer does not notify Company
                of a Dispute within sixty (60) days, Customer agrees to waive their right to dispute
                such problems or discrepancies.
              </p>
            </div>
            <div id='s9' style={{display: pointNumber == 9 ? 'block' : 'none'}}>
              <h2>Email Services; Unsolicited Commercial Email (Spam)</h2>
              <p className='privacy-notice-paragraph '>
                Company prohibits the use of its system or its tools to generate or send unsolicited
                commercial email (spam). Customers may not use the email services that Company
                offers to send spam (i.e. unsolicited commercial email) or otherwise send content
                that would violate these Terms of Use. Customer may not use the listing contact form
                to promote products or services to the listing broker or business owner. Company has
                the right to revoke the privileges of any customer or company that breaches these
                terms. The email services that Company offers is intended to be used by users for
                business purposes. Customer has no expectation of privacy in its use of such email
                services. Customer’s use of the email services constitutes consent to monitoring,
                retrieval and disclosure to third parties of any information provided within the
                email service. Customer’s contact information supplied via the email services shall
                be used by Company in accordance with its Privacy Statement located at{' '}
                <Link to='/privacy-notice'> https://www.BizOwnerSell.com/privacy-notice. </Link>
              </p>
            </div>
            <div id='s10' style={{display: pointNumber == 10 ? 'block' : 'none'}}>
              <h2>Ownership</h2>
              <p className='privacy-notice-paragraph '>
                Company retains all rights (including Intellectual Property Rights, as defined
                below), title and interest in the Websites and all underlying technology and data
                including any enhancements and improvements thereto as a result of providing the
                Deliverables hereunder. Customer will not and will not allow others via manual or
                automated means (including the use of any robot, spider or other automated process):
                reverse engineer, decompile, disassemble, merge, copy, use, disclose, sell or
                transfer the underlying source code or structure or sequence of Company's technology
                or delete or alter author attributes or copyright notices. Customer shall use the
                Company system solely for their own use and shall not allow others to use the
                Company system under or through that Customer's login ID/email and password.
                Further, customer shall not use Company products or services in an unlawful manner,
                such as for offensive, abusive, tortious, libelous, defamatory or other illegal
                purposes. Intellectual Property Rights means all intellectual property rights
                (throughout the universe, in all media, now existing or created in the future, for
                all versions and elements, in all languages, and for the entire duration of such
                rights) arising under statutory or common law, contract, or otherwise, and whether
                or not perfected, including without limitation, (a) all rights associated with works
                of authorship including without limitation copyrights, moral rights, copyright
                applications, copyright registrations, synchronization rights; (b) rights associated
                with trademarks, service marks, trade names, logos, trade dress, and the
                applications for registration and registrations of trademarks and service marks; (c)
                rights relating to the protection of trade secrets and confidential information; (d)
                rights analogous to those set forth in this definition and any and all other
                proprietary rights relating to intangible property; and (e) divisions,
                continuations, renewals, reissues, and extensions of the foregoing (as and to the
                extent applicable) now existing, later filed, issued, or acquired.
              </p>
            </div>
            <div id='s11' style={{display: pointNumber == 11 ? 'block' : 'none'}}>
              <h2>Limitation of Liability and Indemnification</h2>
              <p className='privacy-notice-paragraph '>
                IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL OR
                CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS
                PROFITS, LOSS OF BUSINESS, LOSS OF USE OR OF DATA, OR INTERRUPTION OF BUSINESS)
                ARISING OUT OF THIS AGREEMENT. Customer's exclusive remedy, and Company's entire
                liability under this Agreement shall be a refund to Customer of the fees paid to
                Company hereunder, and in no event will Company's liability for any reason exceed
                such fee. Company (and its officers, directors, employees and agents) shall not be
                liable for any damages whatsoever arising from Customer's use of the Deliverables,
                and Customer shall indemnify Company (and Company's officers, directors, employees
                and agents), and hold each of them harmless from and against any and all costs,
                damages or losses by any of them (including, without limitation, reasonable
                attorneys' fees) as a result of a claim by any person other than Customer arising
                from Customer's use or application of the Services or the Deliverables.
              </p>
            </div>
            <div id='s12' style={{display: pointNumber == 12 ? 'block' : 'none'}}>
              <h2>Warranty Disclaimers</h2>
              <p className='privacy-notice-paragraph '>
                ALTHOUGH COMPANY MAKES EFFORTS TO PROVIDE AN ACCURATE PRODUCT, THE LISTINGS AND
                SERVICE ARE PROVIDED “AS IS,” “WITH ALL FAULTS” AND “AS AVAILABLE.” COMPANY DOES NOT
                ENDORSE OR RECOMMEND ANY COMPANY CONTENT ARISING OUT OF THE SERVICE AND CUSTOMER
                USES SUCH COMPANY CONTENT AT CUSTOMER’S OWN RISK. COMPANY MAKES NO PROMISES,
                REPRESENTATION OR WARRANTIES, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH
                RESPECT TO THE LISTINGS OR SERVICE, INCLUDING THEIR ACCURACY, OPERATION, CONFORMITY
                TO ANY REPRESENTATION OR DESCRIPTION, OR THE EXISTENCE OF ANY LATENT OR PATENT
                DEFECTS, AND COMPANY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES OF
                MERCHANTABILITY, NONINFRINGEMENT AND FITNESS FOR A PARTICULAR PURPOSE AND, UNDER THE
                LAW OF THE UNITED STATES OF AMERICA, THE IMPLIED CONDITIONS OF SATISFACTORY QUALITY
                AND ACCEPTANCE AS WELL AS ANY LOCAL JURISDICTIONAL ANALOGUES TO THE ABOVE AND OTHER
                IMPLIED OR STATUTORY WARRANTIES.
              </p>
            </div>
            <div id='s13' style={{display: pointNumber == 13 ? 'block' : 'none'}}>
              <h2>Links to Third Party Sites</h2>
              <p className='privacy-notice-paragraph '>
                This website may contain hyperlinks or contact forms that connect you to other
                websites operated by parties other than Company which are beyond Company's control.
                Parties other than Company may provide services or sell product lines on this site
                that take you outside of Company's service. This includes links from advertisers,
                sponsors, and content partners that may use Company's logo(s) as part of a
                co-branding relationship. For example, if you click on a banner advertisement the
                click may take you off of the Company site. Company does not control, is not
                responsible for examining or evaluating, and does not warrant the offerings of, any
                of these businesses or individuals or the content of their websites. In addition,
                you may fill out a form that delivers, at your direction and consent, the
                information you submit to another site. Company does not assume any liability for
                the actions, product, or content of any of these and any other third parties.
                Company makes no representations and cannot be held responsible for the accuracy,
                relevancy, copyright compliance, legality, or decency of material on such third
                party websites. When you click on a link that leaves the Company site or submit
                information through a form that is delivered to a third party site, such third party
                site is not controlled by Company and different terms of use and privacy statements
                may apply. Company also does not assume, and expressly disclaims, all liability for
                any viruses, worms, Trojan horses, defects, or other malfunctions caused by,
                resulting from, existing within, or in connection with such third party sites and
                any links thereto.
              </p>
            </div>
            <div id='s14' style={{display: pointNumber == 14 ? 'block' : 'none'}}>
              <h2>Procedure for Making Notification of Claims of Copyright Infringement</h2>
              <p className='privacy-notice-paragraph '>
                Company and its affiliates respect the intellectual property of others, and Company
                asks those posting or transmitting any content to or through Company's services or
                any associated websites to respect copyright law. It is the policy of Company to
                restrict and/or terminate in appropriate circumstances the ability to submit content
                and/or use the services and any associated websites by individuals or entities that
                repeatedly submit infringing content in violation of these Terms of Use. If you
                believe that your work has been copied and is available on any Company website or
                Company's other online services in a way that constitutes copyright infringement,
                you may notify Company according to the notice requirements of the Digital
                Millennium Copyright Act ("DMCA") and any other applicable law. Pursuant to 17
                U.S.C. Section 512, Company's DMCA registered agent can be reached as follows: by
                e-mail to{' '}
                <a href='mailto:bizcopyright@bizownersell.com'> bizcopyright@bizownersell.com</a>.
                Please note that this procedure is exclusively for notifying Company that your
                copyrighted material has been infringed.
              </p>
            </div>
            <div id='s15' style={{display: pointNumber == 15 ? 'block' : 'none'}}>
              <h2>Miscellaneous</h2>
              <p className='privacy-notice-paragraph '>
                This Agreement, the Service and the Deliverables provided by Company shall be
                governed by the laws of the State of Wyoming, without reference to conflict of laws
                principles. The parties hereby consent to the exclusive jurisdiction and venue of
                the State and Federal courts of Sheridan County, Wyoming. If any provision of this
                Agreement is found to be invalid or unenforceable by a court of competent
                jurisdiction, such provision shall be severed from the remainder of this Agreement,
                which shall remain in full force and effect. This Agreement shall be binding upon
                and shall inure to the benefit of the parties and their respective successors and
                permitted assigns. The rights under this Agreement or any license granted hereunder
                may not be assigned, sublicensed or otherwise transferred by Customer without the
                prior written consent of Company, which retains the right to withhold consent in its
                sole discretion. The Terms of Use of this Agreement constitute the entire agreement
                between the parties and supersede all previous agreements and understanding, whether
                oral or written, between the parties hereto with respect to the subject matter of
                this Agreement. All notices to Company must be in writing and must be sent
                registered mail, certified mail, or overnight mail with a return receipt requested
                to General Manager at Company.
              </p>
            </div>
            <div id='s16' style={{display: pointNumber == 16 ? 'block' : 'none'}}>
              <h2>BROKER SUBSCRIPTIONS PROVISIONS</h2>
              <p className='privacy-notice-paragraph '>
                In addition to the General Provisions set forth above, the following additional
                provisions are specifically and only applicable to Broker subscriptions. In the
                event of a conflict between the General Provisions and the Broker Provisions, the
                Broker Provisions shall control.
              </p>
              <h2>Broker Subscriptions</h2>
              <p className='privacy-notice-paragraph '>
                Broker Subscription privileges are granted by Company to individuals exclusively and
                are granted specifically to the subscribing Broker only. When choosing an "area
                served" which displays on the Company Broker Directory, or when advertising a
                listing in a given location, Customer is indicating that Customer is legally
                authorized to act as an intermediary for business transactions in that location.
                Company does not and shall not have any obligation to independently verify the
                licensure of individuals identified as brokers and agents on the Websites. It is
                your responsibility to confirm the licensed status of any brokers listed on the
                Websites. Broker may not use a Broker account to list businesses for sale when the
                Broker is an employee or owner of said business or when the Broker holds a financial
                stake in the business being offered for sale. Broker subscriptions are reserved for
                professional intermediaries who are actively involved in the brokering of business
                sales under a duly executed, active, and exclusive listing agreement with a business
                owner. Broker subscriptions accounts are limited to an individual business broker or
                agent. Broker subscriptions rights cannot be assigned, sublicensed, distributed,
                shared, viewed, accessed, or otherwise transferred to anyone other than the
                subscribing Broker without the express written permission of Company. Broker
                subscriptions privileges are subject to change from time to time and may be subject
                to additional business listing and searching limitations. Customer acknowledges that
                Company (in addition to its other remedies) can cancel and prohibit Broker
                subscriptions privileges to any individual, organization, or group that does not
                abide by the Terms of Use set forth herein and/or can refuse any or all subscription
                privileges. Company also has the right to refuse service to any customer or company
                that has delinquent charges that remain unpaid and to impose additional charges to
                reactivate Broker or other subscription privileges. Broker subscriptions will
                automatically renew at the prevailing monthly subscription cost and the credit card
                number provided for initial payment will be charged accordingly unless the customer
                notifies Company Client Services (in writing) 10 business days prior to the renewal
                date. The Company reserves the right to change its fees, payment frequency, or
                billing methods at any time. The Company will provide timely notice of any such
                changes.
              </p>
            </div>
            <div id='s17' style={{display: pointNumber == 17 ? 'block' : 'none'}}>
              <h2>Listing Restrictions</h2>
              <p className='privacy-notice-paragraph '>
                Customer acknowledges that business listings will only be added to the Websites if
                all contacts added to that listing are also subscribing individual members including
                Agents as described below. All listings must be added in accordance with the
                Submission and Administration of Listings terms, as above. Listings may be for
                established businesses, business real estate for sale, business real estate for
                lease, or asset sales (e.g., sale of equipment, fixtures, applicable licenses,
                website domains, etc.). Customer may not delete then re-submit the same listing in
                order to affect the listing status on the Websites. Listings for businesses that are
                no longer active or available for sale must be immediately removed from the
                Websites. No start-up businesses or new franchise opportunities may be advertised on
                the Websites with respect to your Broker account. If you have an interest in posting
                start-up or new franchise opportunities on Websites, please contact Company at{' '}
                <Link to='/feedback'>https://www.BizOwnerSell.com/feedback.htm</Link> . Company
                reserves the right, in its sole discretion, to remove any listing from the Service.
                Company reserves the right to remove listings that are deemed excessive in number or
                in violation of the Submission and Administration of Listings terms.
              </p>
            </div>
            <div id='s18' style={{display: pointNumber == 18 ? 'block' : 'none'}}>
              <h2>BROKER AGENT PLAN PROVISIONS</h2>
              <p className='privacy-notice-paragraph '>
                In addition to the General Provisions set forth above, the following additional
                provisions of Company's Terms of Use are specifically and only applicable to Broker
                Agent Plans. In the event of a conflict between the General Provisions and the
                Broker Provisions, the Broker Provisions shall control:
              </p>
              <h2>Broker Agent Plans</h2>
              <p className='privacy-notice-paragraph '>
                Broker Agent Plans are designed for business brokers ("Broker") to allow their sales
                agents to be designated as a listing contact and gain additional exposure on
                Websites. By inviting an individual ("Agent") to create an agent profile on your
                Broker account you certify that the person you are inviting is a sales agent working
                under your license and marketing businesses for sale for which you hold the listing
                agreement. You agree that no agent profile will be added for a fictitious person,
                and that each agent will have a single profile. The Company may, in its sole
                discretion but without any obligation to search for such, remove Agent profiles that
                Company reasonably believes have been created in violation of this provision. Broker
                Premium and Broker Elite customers in good-standing ("Broker") may invite a limited
                number of their sales agents to create an agent profile within their main Broker
                account. The number of available agent profiles is tied to the Broker subscriptions
                level (Premium or Elite) of the Broker. Broker may contact Company if additional
                agents are needed beyond those available in their subscription for an additional
                fee. Brokers may assign listings within their Broker account to Agents; however,
                Broker maintains ownership of said listings. It is Broker's responsibility to
                maintain (add, edit, delete, assign or reassign) all of the listings in the Broker
                account. Agents may not add, delete, edit or assign listings. Agent must agree to
                these Terms of Use herein upon accepting any invitation from a Broker. Agents may
                create an online profile for display in the Company Broker Directory. Agents may opt
                to individually pay for additional marketing services on Websites including Broker
                Premium for Agents, Broker Elite for Agents, Showcase Choice, Showcase Plus Email,
                Showcase Listings, and Buyer Blasts that they may use to enhance the visibility of
                their profile or of listings assigned by Broker to Agent (please note that these
                marketing products may change at any time). Agent agrees to pay for products in
                accordance with Payment Terms above. All subscription products will renew each month
                at the prevailing rate unless Agent contacts Company (in writing) to cancel
                subscription products prior to renewal. Agents may not use their subscribing
                broker's username, password or any login credentials to edit or assign listings.
                Agents must at all times be an invitee under an active Broker account. Agents are
                advised that they may be removed from the Broker account by the Broker at any time.
                If Agent has paid fees to Company for additional marketing services described above
                and Agent is thereafter removed from the applicable Broker account through no fault
                of Agent (i.e. Broker removes Agent plan from Broker account, or Broker account is
                terminated for any reason), then, upon request, Company will refund Agent a prorated
                amount of charges paid. Proration will be based on the number of days remaining for
                the purchased service.
              </p>
            </div>
            <div id='s19' style={{display: pointNumber == 19 ? 'block' : 'none'}}>
              <h2>FRANCHISE DIRECTORY PROVISIONS</h2>
              <p className='privacy-notice-paragraph '>
                In addition to the General Provisions set forth above, the following additional
                provisions of Company's Terms of Use are specifically and only applicable to the
                Franchise Directory. In the event of a conflict between the General Provisions and
                the Franchise Directory Provisions, the Franchise Directory Provisions shall
                control:
              </p>
              <h2>Franchise Directory</h2>
              <p className='privacy-notice-paragraph '>
                Company's Franchise Directory provides Leads (as defined herein) to Customer on a
                cost per lead or fixed fee basis. Franchise Directory customers are billed a
                one-time set-up fee, and for leads delivered on a monthly basis. The one-time set-up
                fee includes the creation of an online brochure (from content provided by Customer)
                and one round of revisions prior to the brochure being posted on the Websites. Any
                subsequent revisions, prior to or after launch, will incur additional fees. The
                Customer's credit card is charged for leads delivered after Customer has had a
                chance to review lead information, generally by the 5th business day of the
                following month. The Company may charge a minimum monthly fee for advertising
                exposure on the Websites if the monthly lead charges do not exceed this minimum. Any
                third party marketing representative or agency wishing to advertise a franchise in
                the Franchise Directory must provide to Company written approval from the franchisor
                stating that such third party is the authorized marketing representative. A "Lead"
                is defined as: a user who submits information to be contacted by the sponsor
                franchise, and such user includes its (i) first and/or last name, (ii) desired
                location, (iii) phone number and/or email address, and (iv) user available capital.
                All Lead submissions to Franchise Directory sponsors are executed by the party
                submitting the Lead. Customer shall not resell Leads received from the Websites to
                other third parties. Customers will not be billed for Leads that are: (a) located
                outside of the United States, its territories, or Canada, unless Customer opts-in to
                additional locations or (b) are duplicates of Leads received during the same
                calendar month for the same franchise concept, or (c) include demonstrably invalid
                information for both phone number and email address. Company will utilize its best
                efforts to review the validity of Leads. Cancellations may be made at any time, but
                are effective at the end of the month when notice of cancellation is received.
                Cancellations must be received by either email or in writing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TermsOfUse
