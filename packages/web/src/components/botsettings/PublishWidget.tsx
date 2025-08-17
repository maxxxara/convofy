import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Send, Copy, Eye, Globe, Code, Info } from "lucide-react";

const widgetScript = `<!-- ChatBot Widget Script -->
<script>
  (function() {
    var chatbotConfig = {
      botId: '1',
      apiUrl: 'https://api.ragchatbot.com',
      position: 'bottom-right',
      primaryColor: '#3b82f6',
      avatar: 'Avatar',
      welcomeMessage: 'Hello! How can I help you today?'
    };
    
    var script = document.createElement('script');
    script.src = 'https://cdn.ragchatbot.com/widget.js';
    script.async = true;
    script.onload = function() {
      window.RagChatbot.init(chatbotConfig);
    };
    document.head.appendChild(script);
  })();
</script>`;

function PublishWidget() {
  return (
    <div className="space-y-6">
      {/* Installation Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Installation Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3">
              How to add the widget to your website:
            </h4>
            <ol className="space-y-2 text-sm">
              {[
                "Copy the script code below",
                "Paste it before the closing </body> tag of your website",
                "The chat widget will appear automatically on your website",
              ].map((step, index) => (
                <li key={index} className="flex gap-3">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 flex items-center justify-center text-xs p-0"
                  >
                    {index + 1}
                  </Badge>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Widget Script</Label>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy Script
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{widgetScript}</pre>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> The widget will automatically match your
              bot's configuration including colors, welcome message, and
              personality.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">✅ Works with:</h5>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• WordPress</li>
                <li>• Shopify</li>
                <li>• Squarespace</li>
                <li>• Custom HTML sites</li>
                <li>• React/Vue/Angular apps</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">📱 Features:</h5>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mobile responsive</li>
                <li>• Customizable colors</li>
                <li>• Typing indicators</li>
                <li>• Message history</li>
                <li>• GDPR compliant</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishWidget;
