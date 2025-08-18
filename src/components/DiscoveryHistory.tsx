import { motion } from 'framer-motion';
import { Clock, MessageSquare, Image, Star, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation } from '@/types';

interface DiscoveryHistoryProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export function DiscoveryHistory({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation,
  onToggleFavorite,
  favorites 
}: DiscoveryHistoryProps) {
  const sortedConversations = [...conversations].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Discovery History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-6 pb-6">
          <div className="space-y-3">
            {sortedConversations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No discoveries yet!</p>
                <p className="text-sm">Start asking science questions to build your history.</p>
              </div>
            ) : (
              sortedConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 group"
                    onClick={() => onSelectConversation(conversation)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm line-clamp-2 flex-1 mr-2">
                          {conversation.title}
                        </h3>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(conversation.id);
                            }}
                          >
                            <Star 
                              className={`h-3 w-3 ${
                                favorites.includes(conversation.id) 
                                  ? 'fill-primary text-primary' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conversation.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{conversation.messages.length} messages</span>
                          </div>
                          {conversation.messages.some(m => m.image) && (
                            <div className="flex items-center space-x-1">
                              <Image className="h-3 w-3" />
                              <span>Has photos</span>
                            </div>
                          )}
                        </div>
                        <span>{new Date(conversation.timestamp).toLocaleDateString()}</span>
                      </div>
                      
                      {favorites.includes(conversation.id) && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Favorite
                        </Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}