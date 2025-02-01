import { AppProvider, AuthProvider, SignInPage, ThemeSwitcher } from "@toolpad/core";
import { FC } from "react";
import { useDispatch } from "react-redux";

import { authSignInAction } from "@shared/models/slices/auth";

interface AuthResponse {
    error?: string;
    type?: string;
}

const AuthPage: FC = () => {
    const dispatch = useDispatch();

    const signIn: (_: AuthProvider, formData: FormData) => void = async (__, formData): Promise<AuthResponse | void> => {
        const res = await dispatch<any>(authSignInAction(formData));

        if (res.error) return { error: res.error.message };
    };

    return (
        <AppProvider
            branding={{
                logo: <img src="./public/icon.svg" width='100' height='100' />,
                title: `${import.meta.env.VITE_APP_NAME} admin panel`,
            }}>
            <div className='flex flex-col justify-between min-h-screen p-2'>
                <header className='flex justify-end'>
                    <ThemeSwitcher />
                </header>
                <SignInPage
                    signIn={signIn}
                    providers={[{ id: 'credentials', name: 'Email and Password' }]}
                    slotProps={{ emailField: { autoFocus: false } }}
                    sx={{ minHeight: 'auto' }}
                />
                <footer className="text-center text-xs">
                    <a href="https://www.youtube.com/watch?v=c9GU4P-1AWI" target='_blank'>
                        Fedorenka Avenue Co.
                    </a>
                </footer>
            </div>
        </AppProvider>
    );
};

export default AuthPage;
