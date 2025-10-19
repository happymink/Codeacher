import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Code2, FileText, BarChart3, Settings, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/submit" className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Codeacher
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={isActive('/submit') ? 'secondary' : 'ghost'}
              asChild
              className="gap-2"
            >
              <Link to="/submit">
                <Code2 className="h-4 w-4" />
                제출
              </Link>
            </Button>
            <Button
              variant={isActive('/history') ? 'secondary' : 'ghost'}
              asChild
              className="gap-2"
            >
              <Link to="/history">
                <FileText className="h-4 w-4" />
                내역
              </Link>
            </Button>
            <Button
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
              asChild
              className="gap-2"
            >
              <Link to="/dashboard">
                <BarChart3 className="h-4 w-4" />
                대시보드
              </Link>
            </Button>
          </div>
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={user.profileImage} alt={user.name || '사용자'} />
                  <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name || '사용자'}</p>
                  <p className="text-xs text-muted-foreground">{user.email || ''}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  설정
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};
