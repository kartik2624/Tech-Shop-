import React from 'react'
import servicesData from '../data/servicesData'

const Advantages = () => {
  return (
    <div className="cont-advtgs">
      <p className="text-center text-white p-5 m-0 fs-3 fw-bold fst-italic">Our Advantages</p>

      <div className="advantages-wrapper">
        {servicesData.map((data) => {
          const Icon = data.icon

          return (
            <div className="advantage-card m-2" key={data.id}>
              <div className="icon-box">
                <Icon className="adv-icon" />
              </div>

              <div className="text-box">
                <p className="title">{data.title}</p>
                <p className="info">{data.info}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Advantages
