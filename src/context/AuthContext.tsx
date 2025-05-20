import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';  

// Define interface for context value
interface AuthContextType {
    session: any;
    signUpNewUser: (email: string, password: string) => Promise<any>;
    signInUser: ({ email, password }: { email: string; password: string; }) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<any>(undefined);

    // Sign up
    const signUpNewUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log('Error signing up:', error);
            return { success: false, error };
        }
        return { success: true, data }; 
    }

    // Sign in
    interface SignInParams {
        email: string;
        password: string;
    }

    interface SignInResult {
        success: boolean;
        data?: any;
        error?: any;
    }

    const signInUser = async (
        { email, password }: SignInParams
    ): Promise<SignInResult> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log('Error signing in:', error);
                return { success: false, error: error.message };
            }
            console.log('Signed in successfully:', data);
            return { success: true, data };

        } catch (error) {
            console.log('Error signing in:', error);
            return { success: false, error };
        }
    };

    // Sign out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log('Error signing out:', error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}> 
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('UserAuth must be used within an AuthContextProvider');
    }
    return context;
}