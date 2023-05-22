import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const searchRef = useRef(null)
    const [search, setSearch] = useState('');
    const handleSearch = () => {
        setSearch(searchRef.current.value)
    }
    useEffect(() => {
        fetch(`https://car-doctor-server-roan-six.vercel.app/services?sort=${asc ? 'asc' : 'dsc'}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                setServices(data)
                data.map(d=>console.log(d.price))
            })
    }, [asc, search])
    return (
        <div className="mt-24 mb-24">
            <div className="text-center space-y-5">
                <h3 className="text-3xl font-bold text-[#FF3811]">Service</h3>
                <h2 className="text-5xl font-bold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable. </p>
                <div className="w-full flex justify-center">
                    <div className="form-control">
                        <div className="input-group">
                            <input ref={searchRef} onChange={handleSearch} type="text" placeholder="Search…" className="input input-bordered" />
                            <button onClick={handleSearch} className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={() => setAsc(!asc)} className="btn btn-primary">{asc ? 'Price: High Two Low' : 'Price: Low To High'}</button>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;