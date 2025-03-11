import { useEffect, useState } from "react";
import { Audio, DNA } from "react-loader-spinner";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-400/75">
        <div className="flex flex-col justify-center items-center h-screen">
          <h1>Loading...</h1>
          <DNA
            visible={true}
            height="150"
            width="150"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;
