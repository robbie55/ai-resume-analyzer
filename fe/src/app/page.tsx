'use client';
import LandingPage from '../components/LandingPage';
import ResumeUpload from '../components/ResumeUpload';

export default function Home() {
  const isLoggedIn: Boolean = false;
  return isLoggedIn ? <ResumeUpload /> : <LandingPage />;
}
