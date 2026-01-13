import { useState } from 'react'
import Loading from './component/Loading';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("Generated Reply Appear here...")
  const [loading, setLoading] = useState(false)


  const GenerateEmail = async () => {
    try {
      setLoading(true)
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/email/generate`, {
        emailContent,
        tone
      })
      setGeneratedReply(response.data)
    } catch (error) {
      setGeneratedReply("Retry...")
    } finally {

      setLoading(false)
    }

  }

  return (
    <>
      <div className="min-h-screen bg-[#ffffff] text-[#0f172a] bg-[url('bg.png')] bg-no-repeat bg-cover">

        {/* Hero */}
        <section className="text-center pt-10">
          <h1 className="mt-6 text-5xl leading-tight font-black">
            AI Email Response
          </h1>

          <p className="mt-3 text-slate-500 text-lg">
            Reply faster and better to your emails thanks to AI.
          </p>
        </section>

        {/* Main Card */}
        <section className="max-w-6xl mx-auto mt-10 px-6 ">
          <div className="  rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.25)] p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/40 backdrop-blur-lg">

            {/* Left */}
            <div>
              <label className="block text-md font-semibold mb-2">
                Enter the email to reply to:
              </label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-52 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <label className="block text-md font-semibold mt-6 mb-2">
                Select reply tone
              </label>

              <select
                className="w-full h-12 rounded-xl border border-slate-300 px-4 text-sm bg-white
             focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                defaultValue=""
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="" disabled>
                  Choose a tone
                </option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="apologize">Apologize</option>
              </select>



              <button onClick={() => GenerateEmail()} className="mt-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3 rounded-xl font-semibold text-md">
                GENERATE EMAIL
              </button>
            </div>

            {/* Right */}
            <div className=''>
              <label className="block text-md font-semibold mb-2">
                Email result
              </label>
              <div className="h-99 rounded-xl border border-slate-300 bg-[#f8fafc] p-4 text-slate-400 text-md">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="text-md text-slate-700 whitespace-pre-wrap">
                    {generatedReply}
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default App
