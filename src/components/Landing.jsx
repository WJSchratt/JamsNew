function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
         Do you like consequitive rythmic sound waves hitting your ear in a pleasing manner?
        </h1>
        <p className="text-xl text-gray-300">
          Well congratulations, here is a website that deoes what every other website in the world does
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Feature 1 */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 shadow-xl">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-bold mb-3 text-purple-300">
            Choose your music
          </h3>
          <p className="text-gray-300 leading-relaxed">
            do this by clcoiking buttons and stuff
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20 shadow-xl">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-bold mb-3 text-pink-300">
            Unlimited, streaming, ad-free
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Its all rotyalty free and frankly not the best
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 shadow-xl">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-2xl font-bold mb-3 text-purple-300">
            Mobile enabled
          </h3>
          <p className="text-gray-300 leading-relaxed">
           React/Tailwind responsive design makes it work on all your devices
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
