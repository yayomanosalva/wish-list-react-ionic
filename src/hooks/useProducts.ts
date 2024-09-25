import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProduct } from "../services/ProductService";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  const mutation = useMutation({
    mutationFn: getAllProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { query, mutation };
};
