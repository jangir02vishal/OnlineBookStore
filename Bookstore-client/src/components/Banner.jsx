import React, {useRef} from "react";
import BannerCard from "../home/BannerCard";
import { useNavigate } from "react-router-dom";

const Banner = () =>{
    let searchRef = useRef()
    let navigate = useNavigate()

    return (
        <div className="px-4 lg:px-24 bg-teal-100 flex items-center"> 
            <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
                {/* left side */}
                <div className="md:w-1/2 space-y-8 h-full">
                    <h2 className="text-5xl font-bold leading-snug text-black">
                        Buy and Sell Your Books <span className="text-blue-700">for the Best Prices</span>
                    </h2>
                    <p className="md:w-4/5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum neque fuga eligendi 
                        incidunt nostrum obcaecati ipsum accusamusiste quisquam, itaque modi praesentium
                        cum ut aliquam commodi minima exercitationem autem dignissimos!
                    </p>
                    <div>
                        <input ref={searchRef} type="search" name="search" id="search" placeholder="Search a Book" 
                        className="py-2 px-2 rounded-s-sm outline-none" />
                        <button onClick={()=> {
                            if (searchRef.current.value){
                                navigate('/shop?search=' + searchRef.current.value);
                            }

                        }} className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200"> 
                            Search
                        </button>
                    </div>
                </div>

                 {/* right side */}
                 <div>
                    <BannerCard />
                </div>
            </div> 
        </div>
    )
}

export default Banner;