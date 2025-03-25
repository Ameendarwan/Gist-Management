import { Avatar, AvatarFallback, AvatarImage } from '@app/components/Avatar/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@app/components/DropdownMenu/DropdownMenu';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';

import { Button } from '../Button/Button';
import { FC } from 'react';
import { HeaderProps } from './types';
import { Input } from '../Input/Input';
import SVGIcon from '../SVGIcon';
import logoImage from '@app/assets/logo.png';
import { paths } from '@app/routes/Routes.utils';
import useAuthListener from '@app/hooks/useAuthListener';
import { useNavigate } from 'react-router-dom';

const Header: FC<HeaderProps> = ({ search, onSearchChange }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { user } = useAuthListener();

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope('read:user'); // Optional: Request additional scopes
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleOpenGitHubProfile = () => {
    window.open(`https://github.com/${user?.reloadUserInfo?.screenName}`, '_blank');
  };

  return (
    <header className="mb-8 flex h-[70px] items-center justify-between bg-primary px-6 text-white shadow-md">
      {/* Logo */}
      <div className="flex cursor-pointer items-center" onClick={() => navigate(paths.home)}>
        <img src={logoImage} alt="Logo" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-8">
        <div className="max-sm:hidden">
          <Input
            type="text"
            startIcon={<SVGIcon icon="search" />}
            value={search}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder="Search gists..."
            className="rounded-md border !border-white/55 bg-transparent text-sm !text-white/80 !placeholder-white/80 md:h-10 md:w-[300px]"
          />
        </div>

        {!user ? (
          <Button
            onClick={handleGitHubLogin}
            className="h-[40px] bg-white px-[34px] text-sm text-primary hover:bg-white hover:text-primary">
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer border border-white">
                <AvatarImage
                  src={auth.currentUser?.photoURL ?? 'https://randomuser.me/api/portraits/men/45.jpg'}
                  alt="User"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-md border-none bg-white px-3 text-primary shadow-lg">
              <DropdownMenuLabel>
                <span className="text-xs font-normal">Signed in as </span> <br />{' '}
                <span className="text-base font-bold text-primary">
                  {auth.currentUser?.displayName || user?.reloadUserInfo?.screenName || ''}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => navigate(paths.createGist)}>
                Create gist
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={() => navigate(paths.userGists)}>
                Your gists
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(paths.starredGists)}>
                Starred gists
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={handleOpenGitHubProfile}>
                Your GitHub profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">Help</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
