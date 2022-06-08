import React from "react";
import { BsFillTagFill, 
  // BsFillCalendarFill
 } from 'react-icons/bs';

// const offerList = [
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '7% Instant Discount on EMI transactions using YES bank Credit cards'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '5% Unlimited Cashback on Discount IT Axis Bank Credit Card'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '20% off on 1st txn with Amex Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and Mobikwik'
//   },
//   {
//     type: 'special',
//     link: 'google.com',
//     text: 'Extra ₹1000 off(price inclusive of discount)'
//   },
//   {
//     type: 'normal',
//     link: 'google.com',
//     text: 'Get Google Nest mini at just ₹1999 on purchase of select Smartphones, TVs, Laptops, TV streaming'
//   },
//   {
//     type: 'emi',
//     link: 'google.com',
//     text: 'Debit / Discount IT EMI also available',
//     isNoCostEmi: true,
//     emiPerMonth: '₹1,167/month'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: 'Flat ₹100 off on first Discount IT Pay Later order of ₹500 and above'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '₹100 Instant discount on purchase using any UPI Payment Method'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '₹50 Instant discount on purchase using any UPI Payment Method'
//   },
//   {
//     type: 'bank',
//     link: 'google.com',
//     text: '₹75 Instant discount on purchase using any UPI Payment Method'
//   },
// ]

// const defaultOffersCountToShow = 5;

export default function ProductOfferList() {
  // const [ viewFull, setViewFull ] = useState(false);
  // const getTagName = (type: string, isNoCostEmi: boolean, emiPerMonth: string) => {
  //   let tagName = ''
  //   if (type === 'emi') {
  //     tagName = `${isNoCostEmi ? 'No cost EMI ' : ''}${emiPerMonth}.`
  //   } else if (type === 'bank') {
  //     tagName = 'Bank Offer'
  //   } else if (type === 'special') {
  //     tagName = 'Special price'
  //   }
  //   if (tagName) {
  //     return <span className="pr-1"><b>{tagName}</b></span>
  //   }
  //   return null
  // }
  // const offers = viewFull ? offerList : offerList.slice(0, defaultOffersCountToShow)
	return (
		<div className="pb-7 pt-4 border-b border-gray-300">
      <span className="pr-3">
               <BsFillTagFill size={18} className="inline-block mb-1 text-green-600"/>
            </span>
      <span className="text-green-600 font-bold pr-1">Exclusive Offers for you</span>
			{/* {offers.map(offer => {
        const { type, link, text, isNoCostEmi = false, emiPerMonth = '' } = offer;
        const termsText = type === 'emi' ? 'View Plans' : 'T&C'
        return (
          <div className="mt-3 mb-3">
            <span className="pr-3">{type === 'emi'
              ? <BsFillCalendarFill size={18} className="inline-block mb-1 text-green-600" />
              : <BsFillTagFill size={18} className="inline-block mb-1 text-green-600"/>}
            </span>
            {getTagName(type, isNoCostEmi, emiPerMonth)}
            <span className="pr-1">{text}</span>
            {link && <span className="text-green-600 font-bold cursor-pointer hover:underline" onClick={() => window.open(link, '_blank')}>{termsText}</span>}
          </div>
        )
      })}
      {!viewFull && <span className="text-green-600 font-bold cursor-pointer" onClick={() => setViewFull(true)}>
        {`View ${offerList.length - defaultOffersCountToShow} more offers`}
      </span>} */}
		</div>
	);
}
