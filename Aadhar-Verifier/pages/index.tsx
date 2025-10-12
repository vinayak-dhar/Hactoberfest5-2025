import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

// permutation table
const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

const Home: NextPage = () => {
  const [aadhar, setaadhar] = React.useState<String>("");

  const verifier = () => {
    if (aadhar == "") {
      toast.error("Please Enter the Aadhar Number");
      return;
    }
    let c = 0;
    let invertedArray = aadhar.split("").map(Number).reverse();

    invertedArray.forEach((val, i) => {
      c = d[c][p[i % 8][val]];
    });

    if (c === 0) {
      toast.success("Correct Aadhar Number");
    } else {
      toast.error("Incorrect Aadhar Number");
    }
  };

  return (
    <div className="flex bg-gray-800 min-h-screen flex-col items-center justify-center py-2">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#2563EB",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
      <Head>
        <title>Aadhar Verifier</title>
        <link
          rel="icon"
          href="https://cdn.iconscout.com/icon/free/png-256/aadhaar-2085055-1747945.png"
        />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl text-white font-bold">
          Aadhar <span className="text-blue-600">Verifier</span>
        </h1>

        <div className="mt-5 text-2xl text-white">
          <div>Get started by</div>
          <div className="rounded-md mt-2 bg-gray-100 text-blue-600 p-3 font-mono text-lg">
            Verifying Aadhar
          </div>
        </div>
        <div className="pt-16 h-[52vh] flex flex-wrap items-center justify-center sm:w-full">
          <div>
            <label htmlFor="price" className="text-xl font-medium text-white">
              Aadhar Number
            </label>
            <div className="w-full mt-5 rounded-md shadow-sm">
              <input
                type="number"
                onChange={(e) => setaadhar(e.target.value)}
                name="price"
                id="price"
                className="lg:w-[20rem] font-semibold rounded-lg py-3 border-none outline-none px-5 lg:text-base"
                placeholder="505924924932"
              />
            </div>
            <button
              onClick={verifier}
              className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              CHECK
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
