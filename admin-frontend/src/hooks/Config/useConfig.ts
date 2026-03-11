import { useMutation } from "@tanstack/react-query";
import { postConfigApi } from "../../api/adminConfig.api";
import type { ConfigPayload } from "../../types/config";

export const useConfig = () =>
    useMutation({
        mutationFn: (payload?: Partial<ConfigPayload>) =>
            postConfigApi(payload),
    });