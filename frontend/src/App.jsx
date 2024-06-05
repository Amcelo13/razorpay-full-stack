import { ProductCard } from "./components/ProductCard";


const App = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
      {/* Main  */}
      <main>
        {/* Top  */}
        <div className="flex justify-center items-center space-x-4 mb-3">
          <img className="w-16 lg:w-28" src="https://www.devknus.com/img/react.png" alt="react logo" />
          <img className="w-8 lg:w-10" src="https://cdn-icons-png.flaticon.com/128/10238/10238173.png" alt="" />
          <img className="w-40 lg:w-72" src="https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png?f=webp" alt="razorpay logo" />
        </div>

        {/* Bottom  */}
        <h1 className=" text-xl text-center lg:text-3xl font-bold">
          Razorpay Payment Integration using React And Node js
        </h1>
        <ProductCard />
      </main>
    </section>
  );
}

export default App;