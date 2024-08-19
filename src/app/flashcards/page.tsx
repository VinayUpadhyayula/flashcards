'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../authcontext";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from '../firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
} from '@mui/material'


export default function Flashcards() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [flashcardNames, setFlashcardNames] = useState<string[]>([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search =searchParams?.get('someParam') ?? 'default value'

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = collection(db, 'users', user?.uid, 'flashcardSets')
            const docSnap = await getDocs(docRef)
            const names = docSnap.docs.map((doc) => doc.id);
            console.log(names)
            setFlashcardNames(names);
        }
        getFlashcards()
    }, [user])


    const handleCardClick = (id:any) => {
        router.push(`/flashcard?id=${id}`)
    }
    const handleGenerateClick = ()=>{
        if(user)
        {
            router.push('/generate');
        }
        else
        {
            router.push('/');
        }
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Flashcard SaaS
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    The easiest way to create flashcards from your text.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={handleGenerateClick}>
                    Get Started
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Learn More
                </Button>
            </Box>
            <Container maxWidth="md">
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {flashcardNames.map((name, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(name)}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Button
                onClick={logout}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                }}
            >
                <LogoutIcon />
            </Button>
        </div>
    );
}
