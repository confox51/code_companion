import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, Copy, FileCode, RefreshCw } from "lucide-react";
import { getExampleCode } from "@/lib/codeExamples";

// Import Monaco editor dynamically
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onClearCode: () => void;
  onReviewCode: () => void;
  isLoading: boolean;
}

const CodeEditor = ({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  onClearCode, 
  onReviewCode,
  isLoading 
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  // Handle editor mount
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // Load example code if editor is empty
    if (!code.trim()) {
      setCode(getExampleCode(value));
    }
  };

  // Load example code function
  const handleLoadExample = () => {
    setCode(getExampleCode(language));
  };

  // Set initial example code if empty
  useEffect(() => {
    if (!code.trim()) {
      setCode(getExampleCode(language));
    }
  }, []);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-[#222222]">Your Code</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] bg-[#F7F7F7] text-[#222222]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#1F57C3] hover:text-[#1F57C3] hover:bg-blue-50"
              onClick={handleLoadExample}
            >
              <FileCode className="w-4 h-4 mr-1" />
              Example Code
            </Button>
          </div>
        </div>
        
        <div className="code-editor-container bg-[#F7F7F7] rounded-lg overflow-hidden mb-4 border border-gray-200">
          <Editor
            height="300px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              fontFamily: "'Fira Code', monospace",
              automaticLayout: true,
            }}
          />
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-[#707070] bg-[#F7F7F7] hover:bg-gray-200"
            onClick={onClearCode}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Code
          </Button>
          <Button
            onClick={onReviewCode}
            disabled={isLoading || !code.trim()}
            className="bg-[#14A800] hover:bg-opacity-90 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Get Code Review
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
