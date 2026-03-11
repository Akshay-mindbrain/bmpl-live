// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { saveUserConfigApi } from "../../api/adminConfig";

// export const useSaveUserConfig = () => {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: saveUserConfigApi,
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["user-config"] });
//         },
//     });
// };