import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../api/profile.api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};