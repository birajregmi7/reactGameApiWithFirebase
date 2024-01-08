import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cards from "./Cards";
import Spinner from "react-bootstrap/Spinner";
import { FidgetSpinner } from "react-loader-spinner";
const apiKey = "9bf9b12faa524850b5d922d32e9e093b";
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

const fetchApi = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data; // Return the entire data object for debugging
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to trigger error state in useQuery
  }
};

function Fetch() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch"],
    queryFn: fetchApi,
  });

  // Check loading and error states
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // console.log("query", data);

  // Check if results array exists before accessing properties
  const firstName = data && data.results;

  // console.log("First game name:", firstName);

  return (
    <div>
      <Cards data={firstName} />
    </div>
  );
}

export default Fetch;
