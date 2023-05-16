import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { _id,title, img, price } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="car service img" className="rounded-xl" />
            </figure>
            <div className="card-body font-bold text-2xl">
                <h2 className="card-title">{title}</h2>
                <p className="text-xl text-[#FF3811]">Price: ${price}</p>
                <div className="card-actions flex justify-end">
                    <button className="  text-[#FF3811]">
                        <Link to={`/checkOut/${_id}`}><FaArrowRight></FaArrowRight></Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;