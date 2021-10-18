import React from "react";



const launchRazorPay = () => {
  let options = {
    key: "rzp_test_4ZWIRbJh4Hobvn",
    amount: 500*100,
    currency: "INR",
    name: "Book My Show Clone",
    description: "Movie Purchase on Rental",
    image: "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
    handler: () => {
      alert("Payment Done")
    },
    theme: {color: "#c4242d"}
  };
  let rzp = new window.Razorpay(options);
  rzp.open();
};



const MovieHero = () => {
return (
<>
<div className="md:hidden">
   <img
      src="https://in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/shang-chi-and-the-legend-of-the-ten-rings-et00122566-24-08-2021-02-01-36.jpg"
      alt="poster"
      />
</div>
<div className="hidden md:block lg:hidden">
   <img
      src="https://in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/shang-chi-and-the-legend-of-the-ten-rings-et00122566-24-08-2021-02-01-36.jpg"
      alt="poster"
      />
</div>
<div className="relative hidden lg:block" style={{height: "30rem"}}>
<div className="absolute h-full w-full z-10"
style={{ backgroundImage: "linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%)"}}
/>
<div className="absolute z-30 w-64 h-96 left-28 top-10  ">
   <div className=" flex flex-row w-full max-w-screen-lg">
      <img
         src="https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/shang-chi-and-the-legend-of-the-ten-rings-et00122566-24-08-2021-02-01-36.jpg"
         alt="poster"
         className="h-full w-full rounded-xl"
         />
   </div>

     <div className="absolute z-30 w-96 h-96 left-64 top-1  ">
     <div className="flex flex-col gap-4 pl-8">
        <div>
           <h1 className="text-3xl font-bold text-white ">Shang-Chi and the Legend of the Ten Rings</h1>
        </div>
        <div className="conatiner bg-gray-700 rounded w-full h-16 flex ">
         <div className="flex flex-col  items-start w-2/3" >
          <h2 className="text-white font-bold ml-1 text-left  h-1/2">
             Add your rating & review
          </h2>
          <h2 className="text-white h-1/2 ml-1"> Your ratings matter</h2>
         </div>
         <div className="float-right">
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow mt-2 ">
           Rate Now
          </button>
         </div>

        </div>
        <div className="container h-15 gap-2">
           <div className="bg-white w-52 rounded-sm">
           <a className="ml-2 text-sm">2D,3D,IMAX 2D,MX4D,4DX</a>
           </div>
           <div className="bg-white w-82 mt-2 rounded-sm">
           <a className="ml-2 text-sm">  English,Kannada,Tamil,Hindi,Telugu,Malayalam</a>
           </div>
        </div>


           <button onClick={launchRazorPay} class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded">
            Book tickets
           </button>
     </div>
     </div>

</div>
<img
   src="https://in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/shang-chi-and-the-legend-of-the-ten-rings-et00122566-24-08-2021-02-01-36.jpg"
   alt="poster"
   className="w-full h-full"
   />
</div>
</>
)
};
export default MovieHero;
