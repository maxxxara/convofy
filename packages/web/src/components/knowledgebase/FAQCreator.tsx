import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { HelpCircle, Plus, X, Edit, Info, MessageCircle } from "lucide-react";

export function FAQCreator() {
  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 py-0 to-white shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg gap-0 py-[12px]">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            FAQ Creator
          </CardTitle>
          <Button variant="secondary" size="sm">
            Upload JSON
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Add New FAQ Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-700 font-medium">
                Category (Optional)
              </Label>
              <Input
                id="category"
                placeholder="e.g., Billing, Support, Product"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question" className="text-slate-700 font-medium">
              Question
            </Label>
            <Input
              id="question"
              placeholder="What is your return policy?"
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer" className="text-slate-700 font-medium">
              Answer
            </Label>
            <Textarea
              id="answer"
              placeholder="Our return policy allows you to return items within 30 days of purchase..."
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white min-h-[100px]"
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              FAQ Questions (3)
            </h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Categories:</span>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  Category 1
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <FAQItemComponent key={index} />
            ))}
          </div>
        </div>

        {/* <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/30">
          <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <h3 className="font-medium text-slate-800 mb-2">
            No FAQ questions yet
          </h3>
          <p className="text-sm text-slate-600">
            Add your first question to start building your knowledge base
          </p>
        </div> */}

        {/* Pro Tips */}
        <div className="border-t border-blue-100 pt-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              Pro Tips
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                • Include common variations of questions customers might ask
              </li>
              <li>
                • Add contact information or links in answers when helpful
              </li>
              <li>
                • Review and update FAQs regularly based on customer feedback
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FAQItemComponent() {
  return (
    <div className="border border-blue-100 rounded-lg p-3 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              Category 1
            </Badge>
          </div>
          <h5 className="font-medium text-slate-800 mb-2">Question 1</h5>
          <p className="text-sm text-slate-600 leading-relaxed">Answer 1</p>
        </div>
        <div className="flex gap-1 ml-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
