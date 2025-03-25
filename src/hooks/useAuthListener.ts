import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@app/config/firebaseConfig';

export interface ExtendedUser extends User {
  reloadUserInfo?: {
    screenName?: string;
  };
}

const useAuthListener = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  return { user, loading };
};

export default useAuthListener;
