'use client';

import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from './authcontext';
import Typewriter from 'typewriter-effect';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user) {
            router.push('/flashcards');
        }
    }, [user, router]);

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
            signInWithPopup(auth, provider).then((result) => {
                console.log(result);
                if (result && result.user) {
                    setIsLoading(false);
                    router.push('/flashcards');
                }
                else {
                    throw ('Error while signing in');
                }
            });
        } catch (err) {
            console.log('Error signing in ...', err);
        }
    }
    const GoogleLogo = (props: any) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 775 794"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M775 405.797C775 373.248 772.362 349.496 766.653 324.865H395.408V471.773H613.32C608.929 508.282 585.204 563.264 532.482 600.209L531.743 605.127L649.124 696.166L657.256 696.979C731.943 627.921 775 526.315 775 405.797"
                fill="#4285F4"
            />
            <path
                d="M395.408 792.866C502.167 792.866 591.792 757.676 657.256 696.979L532.482 600.209C499.093 623.521 454.279 639.796 395.408 639.796C290.845 639.796 202.099 570.741 170.463 475.294L165.826 475.688L43.772 570.256L42.1759 574.698C107.198 704.013 240.758 792.866 395.408 792.866Z"
                fill="#34A853"
            />
            <path
                d="M170.463 475.294C162.116 450.662 157.285 424.269 157.285 397C157.285 369.728 162.116 343.338 170.024 318.706L169.803 313.46L46.2193 217.373L42.1759 219.299C15.3772 272.961 0 333.222 0 397C0 460.778 15.3772 521.036 42.1759 574.698L170.463 475.294"
                fill="#FBBC05"
            />
            <path
                d="M395.408 154.201C469.656 154.201 519.74 186.31 548.298 213.143L659.891 104.059C591.356 40.2812 502.167 1.13428 395.408 1.13428C240.758 1.13428 107.198 89.9835 42.1759 219.299L170.024 318.706C202.099 223.259 290.845 154.201 395.408 154.201"
                fill="#EB4335"
            />
        </svg>
    )
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e1e1e, #3a3a3a, #575757, #737373, #8f8f8f)',
            }}
        >
            {/* <Image
        fill
        src="/images/ai.jpg"
        alt="Image alt"
        style={{ objectFit: "cover"}}
      /> */}
            <div style={{ backgroundColor: "#0f0f0fde", zIndex: 100, borderRadius: 50 }}>
                <Box textAlign="center" m={4}>
                    <Typography variant="h4" component="h1" mt={3} sx={{ color: '#fff', fontWeight: 'bold' }}>
                        FlashEase
                    </Typography>
                    <Typewriter
                        options={{
                            strings: ['Build Flashcards using AI with ease!'],
                            autoStart: true,
                            loop: true,
                        }} />
                    <Stack spacing={2} mt={2}
                        alignItems="center"
                        sx={{ width: 'auto' }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<GoogleLogo />}
                            onClick={signInWithGoogle}
                            disabled={isLoading}
                            sx={{ width: 'auto', padding: '8px 16px' }}
                        >
                            {isLoading ? 'Signing in....' : 'Sign in with Google'}
                        </Button>
                    </Stack>
                </Box>
            </div>
        </Box>
    );
}
