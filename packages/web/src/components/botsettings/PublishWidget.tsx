import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Copy, Globe, Code, Info, CheckCircle } from "lucide-react";
import { trpc } from "../../utils/trpc";
import { useParams } from "react-router-dom";

function PublishWidget() {
  const { botId } = useParams();
  const [copiedScript, setCopiedScript] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Get bot data

  // Generate widget script with actual bot data
  const generateWidgetScript = () => {
    return `<!-- Convofy Widget Script -->
<script>
  (function() {
    var convofyConfig = {
      botId: '${botId}',
    };
    
    var script = document.createElement('script');
    script.src = 'http://localhost:5173/dist/widget/widget.iife.js'; // Replace with your widget URL
    script.async = true;
    script.onload = function() {
      window.ConvofyWidget.init(convofyConfig);
    };
    document.head.appendChild(script);
  })();
</script>`;
  };

  // if (!botData) {
  //   return (
  //     <div className="space-y-6">
  //       <Alert>
  //         <Info className="h-4 w-4" />
  //         <AlertDescription>
  //           Please create a bot first before setting up the widget.
  //         </AlertDescription>
  //       </Alert>
  //     </div>
  //   );
  // }

  const widgetScript = generateWidgetScript();

  return (
    <div className="space-y-6">
      {/* Bot Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Widget Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Bot name</h3>
              <p className="text-sm text-muted-foreground">
                Web Widget Ready for Deployment
              </p>
            </div>
            <Button
              onClick={() => {}}
              disabled={isPublishing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPublishing ? "Publishing..." : "Publish Widget"}
            </Button>
          </div>
        </CardContent>
      </Card>

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
                "Customize the appearance and behavior through the bot settings",
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className={copiedScript ? "text-green-600" : ""}
              >
                {copiedScript ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Script
                  </>
                )}
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{widgetScript}</pre>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> The widget will automatically use your
              bot's configuration including name, welcome message, and
              personality. Make sure to replace the URLs with your production
              endpoints.
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
                <li>• Any website with HTML access</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">📱 Features:</h5>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mobile responsive design</li>
                <li>• Customizable colors & position</li>
                <li>• Typing indicators</li>
                <li>• Message history persistence</li>
                <li>• Minimizable chat window</li>
                <li>• Cross-browser compatible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishWidget;
