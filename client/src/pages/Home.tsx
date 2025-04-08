import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import CodeReview from "@/components/CodeReview";
import Features from "@/components/Features";
import { type CodeReviewResponse } from "@shared/schema";

const Home = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [reviewData, setReviewData] = useState<CodeReviewResponse | null>(null);
  const { toast } = useToast();

  const codeReviewMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/review", {
        code,
        language,
      });
      return response.json();
    },
    onSuccess: (data: CodeReviewResponse) => {
      setReviewData(data);
      toast({
        title: "Code Review Complete",
        description: "Your code has been analyzed successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze code",
        variant: "destructive",
      });
    },
  });

  const handleCodeReview = () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to review",
        variant: "destructive",
      });
      return;
    }
    codeReviewMutation.mutate();
  };

  const handleClearCode = () => {
    setCode("");
    setReviewData(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-[#222222] mb-3">
            Get Expert-Quality Code Reviews Instantly
          </h2>
          <p className="text-[#707070] max-w-2xl mx-auto">
            Improve your code with AI-powered feedback that mimics the insights of senior developers.
            Identify bugs, enhance readability, and optimize performance in seconds.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onClearCode={handleClearCode}
            onReviewCode={handleCodeReview}
            isLoading={codeReviewMutation.isPending}
          />

          {/* Review Output Section */}
          <CodeReview 
            reviewData={reviewData} 
            isLoading={codeReviewMutation.isPending} 
          />
        </div>

        {/* Features Section */}
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
