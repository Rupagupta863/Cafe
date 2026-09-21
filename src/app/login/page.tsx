'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Image from 'next/image'
import { ArrowRight, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/shop')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden font-inter">
      <Navbar />
      
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Immersive Image Panel (Hidden on mobile) */}
        <div className="hidden lg:block relative w-full h-full bg-coffee-dark overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1500&auto=format&fit=crop" 
            alt="Barista preparing coffee" 
            fill 
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-16 left-12 right-12 text-white">
            <h2 className="text-4xl md:text-5xl font-medium font-fredoka mb-4">
              Welcome back to <br/><span className="text-[#DCA948]">Brew Spot</span>
            </h2>
            <p className="text-lg text-white/80 max-w-md font-light leading-relaxed">
              Sign in to earn rewards, track your orders, and enjoy our premium roasted blends tailored just for you.
            </p>
          </div>
        </div>

        {/* Right: Refined Login Form */}
        <div className="flex items-center justify-center py-16 px-6 sm:px-12 lg:px-16 xl:px-24 bg-white relative">
          
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9FAFB] rounded-full -mr-32 -mt-32 pointer-events-none" />
          
          <div className="w-full max-w-md relative z-10">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2 font-fredoka">Sign In</h1>
              <p className="text-gray-500 font-normal">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-coffee-brown hover:text-coffee-dark transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <Link href="#" className="text-xs font-medium text-coffee-brown hover:text-coffee-dark transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-coffee-dark hover:bg-coffee-brown focus:outline-none focus:ring-4 focus:ring-coffee-brown/20 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? 'Signing in...' : 'Sign in securely'}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
