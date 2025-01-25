import { useEffect } from "react";
import api from "./../utils/api";
import { useQuery } from "@tanstack/react-query";

const Main = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/api/movies").then((res) => res.data),
  });

  return <div></div>;
};

export default Main;
