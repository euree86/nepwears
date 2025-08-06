import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SavedIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/saved/main'); // Redirect immediately to detail screen if accessed
  }, []);

  return null;
}
