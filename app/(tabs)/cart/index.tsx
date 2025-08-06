import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SavedIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/cart/main'); 
  }, []);

  return null;
}
