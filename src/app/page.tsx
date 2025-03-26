"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Music, UserPlus, Flame, ChevronDown, Share2, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Event date - April 5, 2024
  const eventDate = new Date(2025, 3, 5)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      if (window.scrollY > 200) {
        setShowScrollIndicator(false)
      }
    }

    const updateCountdown = () => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    window.addEventListener("scroll", handleScroll)
    const countdownInterval = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(countdownInterval)
    }
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Culto da Juventude - 5 de Abril",
          text: "✨ No dia 5 de abril, prepare-se para três momentos incríveis de adoração e comunhão! Não perca essa experiência transformadora. 🙌💖",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events")
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-red-50">
      {/* Floating Action Button */}
      <button
        onClick={handleShare}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-orange-500 p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${isScrolled ? "opacity-100" : "opacity-0"}`}
        aria-label="Compartilhar"
      >
        <Share2 className="h-6 w-6 text-white" />
      </button>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-red-500/20"></div>
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"
          style={{ backgroundBlendMode: "overlay" }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Flame className="h-16 w-16 text-red-500 animate-flame" />
              <Flame
                className="h-12 w-12 text-amber-500 absolute top-1 left-2 animate-flame"
                style={{ animationDelay: "0.3s" }}
              />
              <Flame
                className="h-10 w-10 text-orange-400 absolute top-2 left-3 animate-flame"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">
            Culto da Juventude
          </h1>
          <p className="text-xl md:text-2xl text-red-600 mb-8">
          ✨ No dia 5 de abril, prepare-se para três momentos incríveis de <span className="font-bold">adoração</span> e <span className="font-bold">comunhão</span>! Não perca essa experiência transformadora. 🙌💖
          </p>
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-red-700 mb-4">Contagem Regressiva</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-20 sm:w-24 md:w-32 shadow-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">{countdown.days}</div>
                <div className="text-xs text-red-800">DIAS</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-20 sm:w-24 md:w-32 shadow-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">{countdown.hours}</div>
                <div className="text-xs text-red-800">HORAS</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-20 sm:w-24 md:w-32 shadow-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">{countdown.minutes}</div>
                <div className="text-xs text-red-800">MINUTOS</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 md:w-32 shadow-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">{countdown.seconds}</div>
                <div className="text-xs text-red-800">SEGUNDOS</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <Link href="#inscricao">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <UserPlus className="mr-2 h-5 w-5" /> Inscreva-se Agora
              </Button>
            </Link>
            <Link href="#playlist">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-100"
              >
                <Music className="mr-2 h-5 w-5" /> Ver Playlist
              </Button>
            </Link>
          </div>
        </div>
      </section>

       {/* Scroll indicator */}
       {showScrollIndicator && (
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={scrollToEvents}
          >
            <div className="flex flex-col items-center">
              <span className="text-red-600 text-sm mb-2">Veja mais</span>
              <ChevronDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        )}

      {/* Events Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-800 mb-12 flex items-center justify-center">
            <Flame className="h-8 w-8 mr-2 text-red-600" /> Nossos Momentos{" "}
            <Flame className="h-8 w-8 ml-2 text-red-600" />
          </h2>
          <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            <Card className="overflow-hidden border-2 border-red-200 shadow-lg relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute transform rotate-45 bg-red-600 text-white font-bold text-xs py-1 right-[-30px] top-[30px] w-[140px] text-center">
                  CONSAGRAÇÃO
                </div>
              </div>
              <div className="h-40 bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Consagração</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-red-700">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>5 de Abril</span>
                </div>
                <div className="flex items-center mb-4 text-red-700">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>7h30</span>
                </div>
                <div className="flex items-center mb-6 text-red-700">
                  <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                  <Link
                    href="https://maps.app.goo.gl/SCRcr6bbLJVqhdkb9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm hover:text-red-800 hover:underline"
                  >
                    R. Santa Rita, 857 - Siqueira, Fortaleza - CE
                  </Link>
                </div>
                <p className="text-gray-700">Momento especial de consagração e preparação espiritual para o dia.</p>
                <div className="flex items-center justify-center text-center mt-6">
                  <a
                    href="/consagracao.ics"
                    download="Consagração.ics"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-300 flex items-center"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Adicionar ao Calendário
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-red-200 shadow-lg relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute transform rotate-45 bg-red-600 text-white font-bold text-xs py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  AVIVAMENTO
                </div>
              </div>
              <div className="h-40 bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Tarde de Avivamento</h3>
              </div> 
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-red-700">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>5 de Abril</span>
                </div>
                <div className="flex items-center mb-4 text-red-700">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>15h00</span>
                </div>
                <div className="flex items-center mb-6 text-red-700">
                  <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                  <Link
                    href="https://maps.app.goo.gl/SCRcr6bbLJVqhdkb9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm hover:text-red-800 hover:underline"
                  >
                    R. Santa Rita, 857 - Siqueira, Fortaleza - CE
                  </Link>
                </div>
                <p className="text-gray-700">Venha experimentar uma tarde de renovação espiritual e avivamento!</p>
                <div className="flex items-center justify-center text-center mt-6">
                  <a
                    href="/avivamento.ics"
                    download="Tarde_de_Avivamento.ics"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-300 flex items-center"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Adicionar ao Calendário
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-amber-200 shadow-lg relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute transform rotate-45 bg-amber-600 text-white font-bold text-xs py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  JUVENTUDE
                </div>
              </div>
              <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-400 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Culto da Juventude TC</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-amber-700">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>5 de Abril</span>
                </div>
                <div className="flex items-center mb-4 text-amber-700">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>18h00</span>
                </div>
                <div className="flex items-center mb-6 text-amber-700">
                  <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                  <Link
                    href="https://maps.app.goo.gl/SCRcr6bbLJVqhdkb9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm hover:text-red-800 hover:underline"
                  >
                    R. Santa Rita, 857 - Siqueira, Fortaleza - CE
                  </Link>
                </div>
                <p className="text-gray-700">Um culto especial para a juventude com muita música e comunhão!</p>
                <div className="flex items-center justify-center text-center mt-6">
                  <a
                    href="/culto.ics"
                    download="Culto.ics"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-300 flex items-center"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Adicionar ao Calendário
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10 text-xl text-red-700 font-medium">
            Não fique de fora! Marque no calendário, convide seus amigos e venha fazer parte desse culto poderoso! 🔥
          </div>
        </div>
      </section>

      {/* Playlist Section */}
      <section id="playlist" className="py-16 px-4 bg-gradient-to-b from-red-50 to-amber-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-100 to-transparent"></div>

        {/* Animated notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl text-red-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              ♪
            </div>
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={i + 10}
              className="absolute text-2xl text-amber-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              ♫
            </div>
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-12 flex items-center justify-center">
            <Music className="h-8 w-8 mr-2 text-red-600" /> Nossa Playlist{" "}
            <Music className="h-8 w-8 ml-2 text-red-600" />
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200">
            <div className="grid gap-4">
              <iframe
                className="rounded-xl"
                src="https://open.spotify.com/embed/playlist/0HAc3NDuAprbKUBLF3BW2j?utm_source=generator"
                width="100%"
                height="560"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">Prepare seu coração com estas músicas antes do evento!</p>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-100"
                onClick={() => window.open("https://open.spotify.com/playlist/0HAc3NDuAprbKUBLF3BW2j", "_blank")}
              >
                <Music className="mr-2 h-4 w-4" /> Abrir no Spotify
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section
        id="inscricao"
        className="py-16 px-4 bg-gradient-to-b from-amber-50 to-red-100 relative"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Flame className="h-12 w-12 text-red-600 animate-flame" />
          </div>
          <h2 className="text-3xl font-bold text-red-800 mb-6">
            Faça sua Inscrição
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Garanta sua participação nestes momentos especiais preenchendo o
            formulário de inscrição abaixo:
          </p>
          <Link
            href="https://forms.gle/rZjuXbb3cNQvum7MA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform"
            >
              <UserPlus className="mr-2 h-5 w-5" /> Formulário de Inscrição
            </Button>
          </Link>
          <p className="mt-6 text-red-600 font-medium">
            Venha viver uma experiência única com a gente! 🕊️
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-800 to-orange-700 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4 space-x-2">
            <Flame className="h-6 w-6 text-amber-300 animate-flame" />
            <Flame
              className="h-5 w-5 text-red-300 animate-flame"
              style={{ animationDelay: "0.3s" }}
            />
            <Flame
              className="h-6 w-6 text-amber-300 animate-flame"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
          <Link
            href="https://www.instagram.com/juventudetc7s1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:to-red-700 hover:from-orange-600 text-lg px-6 py-6 shadow-lg transform hover:scale-105 transition-transform"
            >
              <Instagram className="mr-2 h-8 w-8" /> Instagram
            </Button>
          </Link>
         
          <p className="mb-4">© 2025 - Todos os direitos reservados</p>
          <p>
            adtemplocentral7setembro1@gmail.com
            {/*  | (00) 12345-6789 */}
          </p>
        </div>
      </footer>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(-40px) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
