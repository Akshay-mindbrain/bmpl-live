import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../../api/wallet.api";

export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const response = await getWallet();

      // Your API structure:
      // {
      //   success: true,
      //   data: {
      //     totalWallets: 1,
      //     data: [ {...wallet} ]
      //   }
      // }

      if (response?.success && response?.data?.data?.length > 0) {
        return response.data.data[0]; // return single wallet object
      }

      return null;
    },
  });
};