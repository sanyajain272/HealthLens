import React, { useEffect,useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currency} = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docInfo,setDocInfo] = useState(false)
  const [doctorSlot,setDoctorSlot] = useState([])
  const [slotIdx,setSlotIdx] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDocInfo = async()=>{
    const docInfo = doctors.find(doc=>doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
  setDoctorSlot([]); // clear first
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    let slots = [];
    let startTime = new Date(currentDate);
    startTime.setHours(10, 0, 0, 0);

    while (startTime < endTime) {
      let slotStart = new Date(startTime);
      let slotEnd = new Date(startTime);
      slotEnd.setMinutes(startTime.getMinutes() + 30);

      slots.push({ datetime: slotStart });
      startTime = slotEnd;
    }

    // ⬅️ Push slots of one day as a group
    setDoctorSlot(prev => ([...prev, slots]));
  }
};

  useEffect(()=>{
    fetchDocInfo();
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots();
  },[docId])

  useEffect(()=>{
    console.log(doctorSlot);
  },[doctorSlot])

  return docInfo && (
    <div>
      {/*Doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div >
          <img className='bg-blue-400 w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
        </div>
        <div className='flex-1 border border-black-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-black-600'>{docInfo?.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center text-center gap-2 text-sm mt-1 text-gray-500'>
            <p>{docInfo?.degree}-{docInfo?.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-2 text-sm mt-1 text-gray-500 mt-3'>
              About <img className='w-3' src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo?.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-600'>{currency}{docInfo?.fees}</span>
          </p>
        </div>
      </div>
      {/*Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>
          Booking Slots
        </p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {doctorSlot.length && doctorSlot.map((slots, index) => (
              <div onClick={() => setSlotIdx(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                  <p>{daysOfWeek[slots[0].datetime.getDay()]}</p>
                  <p>{slots[0].datetime.getDate()}</p>
              </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Appointment
