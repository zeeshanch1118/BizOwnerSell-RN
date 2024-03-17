import {FC} from 'react'
type Props = {
  title: string
  description: string
}

const Card5: FC<Props> = ({title, description}) => {
  return (
    <div className='card h-100 border border-doted  ' style={{backgroundColor: '#F4F7F8'}}>
      <div className='card-body d-flex px-9 pt-6 pb-8'>
        <div className='fs-2tx fw-bolder mb-3'>{description}</div>
      </div>
      <div className='card-header flex-nowrap border-0 pt-9'>
        <div className='card-title m-0'>
          <a href='#' className='fs-4 fw-bold text-hover-primary text-gray-600 m-0'>
            {title}
          </a>
        </div>
      </div>
    </div>
  )
}

export {Card5}
