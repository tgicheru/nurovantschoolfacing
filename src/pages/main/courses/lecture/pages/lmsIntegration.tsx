"use client"
import { IoArrowBack, IoShareOutline, IoRefreshOutline, IoPencil } from "react-icons/io5"

export default function Page() {
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <IoArrowBack className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-xl font-semibold">LMS Integration</h1>
        <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <IoShareOutline className="h-4 w-4" />
          Export
        </button>
      </header>

      {/* Main Content */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-blue-600">Selected Assignment</h2>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Electricity and Magnetism</h3>
                <p className="text-sm text-gray-500">Date: Nov 15, 2024</p>
                <p className="mt-2 text-sm text-gray-500">Submissions: 24/30</p>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Grading Status</h3>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                  <span>15 Graded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600"></span>
                  <span>5 Pending</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-50">
                <IoRefreshOutline className="h-4 w-4" />
                Sync Grades
              </button>
              <p className="mt-2 text-sm text-gray-500">Last synced: 5 minutes ago</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Overall Comment</h3>
                <button className="text-blue-600 hover:text-blue-700">
                  <IoPencil className="h-4 w-4" />
                  Edit
                </button>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="mb-4">
                  <strong className="block mb-2">Strong Areas:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Understanding of electric circuits and current flow.</li>
                    <li>Application of Ohm's Law in problem-solving.</li>
                    <li>Magnetic field concepts and interactions</li>
                  </ul>
                </div>
                <div>
                  <strong className="block mb-2">Areas for Improvement:</strong>
                  <ul className="list-disc pl-5">
                    <li>Differentiating between series and parallel circuits.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="mb-4 text-blue-600">Rubric Scoring</h2>
            <div className="space-y-6">
              {[
                { title: "Participation", score: 4, total: 5 },
                { title: "Understanding", score: 3, total: 5 },
                { title: "Practical Skills", score: 4, total: 5 },
                { title: "Completeness", score: 4, total: 5 },
                { title: "Problem-Solving and Analytical Thinking", score: 2, total: 5 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-blue-600">
                      ({item.score}/{item.total})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: item.total }, (_, i) => (
                      <button
                        key={i}
                        className={`h-8 w-8 rounded-md border text-sm font-medium ${
                          i + 1 <= item.score ? "bg-blue-100 text-blue-600 hover:bg-blue-100" : "hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tailwind CSS configuration
const tailwindConfig = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          500: "#6b7280",
        },
      },
    },
  },
  plugins: [],
}

// You would typically put this in your global CSS file
const globalStyles = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`

