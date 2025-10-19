import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCharacter } from '@/contexts/CharacterContext';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LogOut, User, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { user, logout } = useAuth();
  const { currentCharacter, allCharacters, selectCharacter } = useCharacter();
  const [showCharacterDialog, setShowCharacterDialog] = useState(false);
  const { toast } = useToast();

  const handleCharacterChange = async (characterId: string) => {
    try {
      await selectCharacter(characterId);
      toast({
        title: '캐릭터 변경 완료! 🎉',
        description: '새로운 선생님이 준비되었어요!',
      });
      setShowCharacterDialog(false);
    } catch (error) {
      toast({
        title: '변경 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">설정</h1>

          {/* 프로필 섹션 */}
          <Card className="p-6 shadow-medium">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h2 className="text-xl font-bold">프로필</h2>
            </div>
            
            {user && (
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}

            <Button variant="destructive" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </Card>

          {/* 캐릭터 설정 */}
          <Card className="p-6 shadow-medium">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5" />
              <h2 className="text-xl font-bold">캐릭터 설정</h2>
            </div>

            {currentCharacter && (
              <div className="flex items-center gap-4 mb-4 p-4 bg-muted rounded-lg">
                {currentCharacter.image ? (
                  <img 
                    src={currentCharacter.image} 
                    alt={currentCharacter.name}
                    className="w-20 h-20 object-contain rounded-full"
                  />
                ) : (
                  <span className="text-5xl">{currentCharacter.emoji}</span>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">현재 선택된 선생님</p>
                  <p className="text-lg font-semibold">{currentCharacter.name}</p>
                  <p className="text-sm text-muted-foreground">{currentCharacter.description}</p>
                </div>
              </div>
            )}

            <Button onClick={() => setShowCharacterDialog(true)}>
              캐릭터 변경하기
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* 캐릭터 선택 모달 */}
      <Dialog open={showCharacterDialog} onOpenChange={setShowCharacterDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>캐릭터 선택</DialogTitle>
            <DialogDescription>원하는 선생님을 선택하세요</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {allCharacters.map((character) => (
              <Card
                key={character.id}
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  currentCharacter?.id === character.id ? 'ring-2 ring-primary' : ''
                }`}
                style={{
                  borderColor: currentCharacter?.id === character.id ? character.colorTheme : undefined,
                }}
                onClick={() => handleCharacterChange(character.id)}
              >
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    {character.image ? (
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-20 h-20 object-contain rounded-full"
                      />
                    ) : (
                      <span className="text-5xl">{character.emoji}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{character.name}</p>
                    <p className="text-sm text-muted-foreground">{character.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
