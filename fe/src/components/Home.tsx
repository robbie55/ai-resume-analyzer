'use client';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '../components/LandingPage';
import ResumeUpload from '../components/ResumeUpload';

export default function Home() {
  const { user } = useAuth();
  return user ? <ResumeUpload /> : <LandingPage />;
}
