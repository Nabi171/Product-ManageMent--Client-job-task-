/* eslint-disable prettier/prettier */
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="https://img.freepik.com/free-vector/bookshop-concept-illustration_114360-2694.jpg"
        alt="Home"
        className="w-64 h-64 rounded-full mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Wellcome to CodersLab Product Catalogue
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 p-4 text-justify">
        Welcome to the CodersLab Product Catalogue! Dive into a realm of endless
        possibilities where every product tells a unique story. From
        cutting-edge tech gadgets to timeless fashion pieces, our catalogue is
        meticulously curated to cater to every shopper's needs and desires.
        Whether you're a savvy shopper or on the hunt for something special, our
        collection offers a diverse range of products to explore. So, sit back,
        browse through our selection, and embark on a delightful shopping
        journey. Happy exploring!
      </p>
      <button className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
        All Products Catalogue
      </button>
    </div>
  )
}
