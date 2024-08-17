'use client'
import { Box, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../authcontext";
import { useEffect, useState, } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from '../firebase'
import { collection, doc, getDoc, DocumentData } from 'firebase/firestore'
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
} from '@mui/material'


export default function Flashcard() {
    const { user, logout } = useAuth();
    const [flashcardData, setFlashcards] = useState<DocumentData[]>([]);
    const [flipped, setFlipped] = useState<Record<number, boolean>>({});

    const searchParams = useSearchParams()
    const flashcardName = searchParams.get('id')
    console.log(flashcardName)

    useEffect(() => {
        async function getFlashcard() {
            if (!flashcardName || !user) return

            const docRef = doc(db, 'users', user.uid, 'flashcardSets', flashcardName as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("exists")
                const data = docSnap.data();
                setFlashcards(data.flashcards || []);
                console.log(data.flashcards)
            } else {
                console.log('No such document!');
                setFlashcards([]);
            }
        }
        getFlashcard()
    }, [flashcardName, user])

    const handleFlip = (index: number) => {
        setFlipped({ ...flipped, [index]: !flipped[index] });
    };

    return (
        <Container maxWidth="md">
            {flashcardName && <Typography variant="h3" gutterBottom>{flashcardName}</Typography>}
            <Grid container spacing={2}>
                {flashcardData.map((card, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card
                            onClick={() => handleFlip(index)}
                            sx={{
                                py: 4,
                                cursor: 'pointer',
                                perspective: '1000px',
                                height: '100%', // Allow card to expand vertically
                                display: 'flex',
                            }}
                        >
                            <CardContent
                                sx={{
                                    position: 'relative',
                                    transform: flipped[index] ? 'rotateY(180deg)' : 'none',
                                    transition: 'transform 0.6s',
                                    transformStyle: 'preserve-3d',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column', // Arrange content vertically
                                    minHeight: '100%'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        backfaceVisibility: 'hidden',
                                        flexGrow: 1, // Allow this box to expand to fill remaining space
                                        // overflow: 'auto', // Add scrollbar if content overflows
                                    }}
                                >
                                    <Typography variant="body1" sx={{ mt: 0 }}>
                                        {card.front}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        transform: 'rotateY(180deg)',
                                        backfaceVisibility: 'hidden',
                                        flexGrow: 1,
                                        // overflow: 'auto',
                                    }}
                                >
                                    <Typography variant="body1" sx={{ mt: 2, px: 2 }}>
                                        {card.back}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    )
}