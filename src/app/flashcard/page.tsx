'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../authcontext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const{user,logout} = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!user) {
          router.push('/');
        }
      }, [user, router]);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
    <div className="flex space-evenly margin-right">
      <span>Welcome</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500">
       {user?.displayName}
    </span> 
    </div>
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
