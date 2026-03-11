import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../api/profile.api";

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserProfile,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-profile"],
            });
        },
    });
};