"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, RefreshCw, Sparkles } from "lucide-react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onRender: () => void
  onFetchFromGitHub: () => void
  loading: boolean
  onLoadSample: (type: string) => void
}

export function CodeEditor({ code, onChange, onRender, onFetchFromGitHub, loading, onLoadSample }: CodeEditorProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
          <Sparkles size={18} className="mr-2 text-indigo-400" />
          Mermaid Code
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={onFetchFromGitHub}
            variant="outline"
            size="sm"
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Fetch Latest
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            <Copy size={16} className="mr-2" />
            Copy
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur"></div>
        <Textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono h-[400px] resize-none relative bg-black/70 border-indigo-500/30 text-indigo-100 rounded-xl focus:border-indigo-400 focus:ring-indigo-400/30"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Button
            onClick={onRender}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-600/20"
          >
            <RefreshCw size={16} className={loading ? "mr-2 animate-spin" : "mr-2"} />
            Render
          </Button>
          <Button
            onClick={onFetchFromGitHub}
            variant="outline"
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Fetch from GitHub
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSample("layered")}
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            Layered
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSample("flowchart")}
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            Flowchart
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSample("complex")}
            className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
          >
            Complex
          </Button>
        </div>
      </div>
    </div>
  )
}
