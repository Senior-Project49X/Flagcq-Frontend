import React from 'react'
import ItemPopup from './itemPopup';

type detail ={
  Topic:string;
  Level:string;
}

export default function CardItem(param: detail ) {

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      {showModal? <ItemPopup usestate={setShowModal} Topic={param.Topic} />:null}
      <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold">{param.Topic}</h2>
          {param.Level == "Easy"? <p className="text-green-500">Easy</p> : param.Level == "Medium"? <p className="text-yellow-500">Medium</p> :<p className="text-red-500">Hard</p>}
          
          <button data-modal-target="default-modal" className="bg-[#5e4ae3] text-white py-2 px-4 mt-4 rounded-lg" onClick={()=> setShowModal(true)}>
            Start
          </button>
      </div>
    </div>
  )
}
