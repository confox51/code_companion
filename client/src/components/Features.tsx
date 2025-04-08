import { Zap, CheckCircle, Sliders } from "lucide-react";

const Features = () => {
  return (
    <section className="mt-12">
      <h3 className="text-2xl font-semibold text-center text-[#222222] mb-8">
        Why Freelancers Love CodeReviewAI
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-sm">
          <div className="w-12 h-12 bg-[#14A800] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-[#14A800]" />
          </div>
          <h4 className="text-lg font-medium text-[#222222] mb-2">Instant Feedback</h4>
          <p className="text-[#707070]">
            Get professional-quality code reviews in seconds, not days. No waiting for senior developer availability.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm">
          <div className="w-12 h-12 bg-[#1F57C3] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-[#1F57C3]" />
          </div>
          <h4 className="text-lg font-medium text-[#222222] mb-2">Comprehensive Analysis</h4>
          <p className="text-[#707070]">
            Catches bugs, improves readability, optimizes performance, and provides actionable recommendations.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm">
          <div className="w-12 h-12 bg-[#0CA789] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <Sliders className="w-6 h-6 text-[#0CA789]" />
          </div>
          <h4 className="text-lg font-medium text-[#222222] mb-2">Multi-Language Support</h4>
          <p className="text-[#707070]">
            Works with popular programming languages including JavaScript, Python, Java, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
