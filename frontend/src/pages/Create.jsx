import InputField from "./../components/InputField";
import { inputs } from "./../utils/constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //take data as object
    const formData = new FormData(e.target);
    const movieData = Object.fromEntries(formData.entries());

    // get the categories  into object
    movieData.data.genre = movieData.genre.split(",");

    // get the cast  into object
    movieData.data.cast = movieData.cast.split(",");
    api
      .post("/api/movies", movieData)
      .then((res) => {
        // send notification
        toast.success("Movie added to the list");

        // direct to detail page
        navigate(`/movie/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong!");
      });
  };
  return (
    <div className="bg-slate-600 flex-1 grid place-items-center px-5 py-8">
      <div className="bg-white w-full max-w-[800px] p-10 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Create a new Movie</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {inputs.map((props) => (
            <InputField {...props} />
          ))}

          <button className="shadow border py-3 rounded-lg hover:shadow-lg hover:bg-blue-600 transition">
            Create
          </button>
        </form>

        {/* 
        <div className="md:mt-10 ">
          <img
            src="/movie-bg.jpg"
            className="rounded-full max-h-[200px] m-auto"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Create;
