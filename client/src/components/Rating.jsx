import { FaStar,
    FaStarHalfAlt,
    FaRegStar    
} from "react-icons/fa"


export default function Rating({ value, text}) {
    console.log(value)
  return (
    <div className="rating">
        <sapan>
            {value >=1 ? <FaStar/>: value >= 0.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </sapan>
        <sapan>
            {value >=2 ? <FaStar/>: value >= 1.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </sapan>
        <sapan>
            {value >=3 ? <FaStar/>: value >= 2.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </sapan>
        <sapan>
            {value >=4 ? <FaStar/>: value >= 3.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </sapan>
        <sapan>
            {value ===5 ? <FaStar/>: value >= 4.5? <FaStarHalfAlt/>:<FaRegStar/>}
        </sapan>
        <span className="rating-text">
            {text && text}
        </span>

    </div>
  )
}
