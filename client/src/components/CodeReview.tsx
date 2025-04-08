import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, AlertCircle, Eye, Zap, ClipboardCheck } from "lucide-react";
import { type CodeReviewResponse } from "@shared/schema";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CodeReviewProps {
  reviewData: CodeReviewResponse | null;
  isLoading: boolean;
}

const CodeReview = ({ reviewData, isLoading }: CodeReviewProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyReviewToClipboard = () => {
    if (!reviewData) return;

    // Create a formatted text version of the review
    let reviewText = `CODE REVIEW SUMMARY\n\n`;
    reviewText += `${reviewData.summary}\n\n`;
    
    reviewText += `POTENTIAL BUGS:\n`;
    reviewData.bugs.forEach((bug, i) => {
      reviewText += `${i+1}. [${bug.severity.toUpperCase()}] ${bug.description}\n`;
      if (bug.suggestion) reviewText += `   Suggestion: ${bug.suggestion}\n`;
    });
    reviewText += `\n`;
    
    reviewText += `CODE READABILITY:\n`;
    if (reviewData.readability.naming) reviewText += `- Naming: ${reviewData.readability.naming}\n`;
    if (reviewData.readability.comments) reviewText += `- Comments: ${reviewData.readability.comments}\n`;
    if (reviewData.readability.structure) reviewText += `- Structure: ${reviewData.readability.structure}\n`;
    if (reviewData.readability.additionalNotes) reviewText += `- Additional: ${reviewData.readability.additionalNotes}\n`;
    reviewText += `\n`;
    
    reviewText += `PERFORMANCE OPTIMIZATION:\n`;
    reviewData.performance.forEach((perf, i) => {
      reviewText += `${i+1}. ${perf.description}\n`;
      if (perf.suggestion) reviewText += `   Suggestion: ${perf.suggestion}\n`;
    });
    reviewText += `\n`;
    
    reviewText += `RECOMMENDED IMPROVEMENTS:\n`;
    if (reviewData.recommendations.improvedCode) {
      reviewText += `Improved Code:\n${reviewData.recommendations.improvedCode}\n\n`;
    }
    
    if (reviewData.recommendations.keyImprovements) {
      reviewText += `Key Improvements:\n`;
      reviewData.recommendations.keyImprovements.forEach((imp, i) => {
        reviewText += `${i+1}. ${imp}\n`;
      });
    }

    // Copy to clipboard
    navigator.clipboard.writeText(reviewText)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Success",
          description: "Review copied to clipboard",
        });
        
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy review",
          variant: "destructive",
        });
      });
  };

  // Helper to display severity badge
  const SeverityBadge = ({ severity }: { severity: string }) => {
    const colors = {
      high: "bg-red-100 text-red-600",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-blue-100 text-blue-600",
    };
    
    const colorClass = severity === "high" ? colors.high : 
                      severity === "medium" ? colors.medium : colors.low;
                      
    return (
      <span className={`${colorClass} px-2 py-0.5 rounded text-xs font-medium mr-2`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-[#222222]">AI Code Review</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${isCopied ? 'text-[#14A800]' : 'text-[#1F57C3]'} hover:bg-blue-50`}
            onClick={copyReviewToClipboard}
            disabled={!reviewData || isLoading}
          >
            {isCopied ? (
              <>
                <ClipboardCheck className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy Review
              </>
            )}
          </Button>
        </div>
        
        {/* Placeholder */}
        {!reviewData && !isLoading && (
          <div className="flex flex-col items-center justify-center h-64 text-[#707070]">
            <ClipboardCheck className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-center mb-1">Your code review will appear here</p>
            <p className="text-sm text-center">Click "Get Code Review" to analyze your code</p>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="h-12 w-12 mb-4">
              <Loader2 className="h-12 w-12 animate-spin text-[#14A800]" />
            </div>
            <p className="text-[#707070]">Analyzing your code...</p>
            <p className="text-sm text-[#707070] mt-2">This usually takes 5-10 seconds</p>
          </div>
        )}
        
        {/* Review content */}
        {reviewData && !isLoading && (
          <div className="space-y-6">
            {/* Summary Section */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-[#222222] mb-2 flex items-center">
                <ClipboardCheck className="w-5 h-5 mr-2 text-[#14A800]" />
                Summary
              </h4>
              <p className="text-[#222222]">{reviewData.summary}</p>
            </div>
            
            {/* Bugs Section */}
            <Accordion type="single" collapsible defaultValue="bugs">
              <AccordionItem value="bugs">
                <AccordionTrigger className="flex items-center text-[#222222] font-medium">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                    Potential Bugs
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#F7F7F7] rounded-lg p-4 space-y-3 text-sm">
                  {reviewData.bugs.length === 0 ? (
                    <p className="text-[#222222]">No bugs detected in your code!</p>
                  ) : (
                    reviewData.bugs.map((bug, idx) => (
                      <div key={idx} className="flex items-start">
                        <SeverityBadge severity={bug.severity} />
                        <div>
                          <p className="text-[#222222]">{bug.description}</p>
                          {bug.suggestion && (
                            <pre className="bg-white p-2 rounded mt-2 text-xs overflow-x-auto font-mono">
                              <code>{bug.suggestion}</code>
                            </pre>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Readability Section */}
            <Accordion type="single" collapsible defaultValue="readability">
              <AccordionItem value="readability">
                <AccordionTrigger className="flex items-center text-[#222222] font-medium">
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-[#1F57C3]" />
                    Code Readability
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#F7F7F7] rounded-lg p-4 space-y-3 text-sm">
                  {reviewData.readability.naming && (
                    <div>
                      <p className="text-[#222222] font-medium mb-1">Naming:</p>
                      <p className="text-[#222222]">{reviewData.readability.naming}</p>
                    </div>
                  )}
                  
                  {reviewData.readability.comments && (
                    <div>
                      <p className="text-[#222222] font-medium mb-1">Comments:</p>
                      <p className="text-[#222222]">{reviewData.readability.comments}</p>
                    </div>
                  )}
                  
                  {reviewData.readability.structure && (
                    <div>
                      <p className="text-[#222222] font-medium mb-1">Structure:</p>
                      <p className="text-[#222222]">{reviewData.readability.structure}</p>
                    </div>
                  )}
                  
                  {reviewData.readability.additionalNotes && (
                    <div>
                      <p className="text-[#222222] font-medium mb-1">Additional Notes:</p>
                      <p className="text-[#222222]">{reviewData.readability.additionalNotes}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Performance Section */}
            <Accordion type="single" collapsible defaultValue="performance">
              <AccordionItem value="performance">
                <AccordionTrigger className="flex items-center text-[#222222] font-medium">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#0CA789]" />
                    Performance Optimization
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#F7F7F7] rounded-lg p-4 space-y-3 text-sm">
                  {reviewData.performance.length === 0 ? (
                    <p className="text-[#222222]">No performance issues detected!</p>
                  ) : (
                    reviewData.performance.map((perf, idx) => (
                      <div key={idx}>
                        <p className="text-[#222222]">{perf.description}</p>
                        {perf.suggestion && (
                          <pre className="bg-white p-2 rounded mt-2 text-xs overflow-x-auto font-mono">
                            <code>{perf.suggestion}</code>
                          </pre>
                        )}
                      </div>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Recommendations Section */}
            <Accordion type="single" collapsible defaultValue="recommendations">
              <AccordionItem value="recommendations">
                <AccordionTrigger className="flex items-center text-[#222222] font-medium">
                  <div className="flex items-center">
                    <ClipboardCheck className="w-5 h-5 mr-2 text-[#14A800]" />
                    Recommended Improvements
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-[#F7F7F7] rounded-lg p-4">
                  {reviewData.recommendations.improvedCode && (
                    <>
                      <p className="text-[#222222] text-sm mb-3">Here's a refactored version addressing all the issues:</p>
                      <pre className="bg-white p-3 rounded text-xs overflow-x-auto font-mono mb-4">
                        <code>{reviewData.recommendations.improvedCode}</code>
                      </pre>
                    </>
                  )}
                  
                  {reviewData.recommendations.keyImprovements && (
                    <div className="mt-4 text-sm text-[#222222]">
                      <p className="font-medium">Key improvements:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {reviewData.recommendations.keyImprovements.map((improvement, idx) => (
                          <li key={idx}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {reviewData.recommendations.additionalNotes && (
                    <div className="mt-4 text-sm text-[#222222]">
                      <p className="font-medium">Additional notes:</p>
                      <p>{reviewData.recommendations.additionalNotes}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeReview;
