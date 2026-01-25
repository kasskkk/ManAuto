import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { LoginSchema } from "../schemas/loginSchema";



export const useAccounts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>("../manage/info");
            return response.data;
        },
        retry: false
    });

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('../login?useCookies=true', creds);

            const response = await agent.get<User>("../manage/info");
            return response.data;
        },
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData);

            toast.success("!");

            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: (error) => {
            console.error("Error while logging:", error);
            toast.error("Couldnt log in");
        }
    });

    return {
        user,
        isLoggedIn: !!user,
        isLoadingUser,
        login: loginUser.mutateAsync,
        isLoggingIn: loginUser.isPending,
        loginError: loginUser.error
    };
};