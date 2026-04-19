// Add this new section to your AdminPanel.tsx inside the "intel" tab case:

{activeTab === 'intel' && (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
    {/* Classified Status */}
    <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
      <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-4">
        Classified Intel Status
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel'].map((code, idx) => (
          <div key={code} className="bg-black rounded-sm p-3 border border-white/10 text-center">
            <p className="text-xs font-mono text-gray-400 uppercase">{code}</p>
            <p className="text-gold font-bold">{idx + 1}</p>
            <p className="text-xs text-green-400 mt-1">Active</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* SECRETS TRACKER - Document all hidden triggers */}
    <div className="bg-gold/10 border border-gold/30 rounded-sm p-4">
      <h3 className="text-sm font-mono text-gold tracking-wider uppercase mb-4 flex items-center gap-2">
        <Search className="w-4 h-4" />
        Secrets Tracker (Admin Reference)
      </h3>
      
      <div className="space-y-3 text-xs">
        {/* ALPHA */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">ALPHA</span>
            <span className="text-green-400">+15 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Click shield logo 5 times fast (within 2 seconds)</p>
          <p className="text-gray-500 mt-1">Location: Navbar.tsx line ~57</p>
          <p className="text-gray-600 italic mt-1">Intel: "Coordinates: N 10.5432, E 119.8765. Asset: UNKNOWN"</p>
        </div>

        {/* BRAVO */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">BRAVO</span>
            <span className="text-green-400">+15 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Click the "60" in "60 HECTARES"</p>
          <p className="text-gray-500 mt-1">Location: Hero.tsx - Stats section</p>
          <p className="text-gray-600 italic mt-1">Intel: "Supply cache near El Mirador. Code: MIRADOR-7429"</p>
        </div>

        {/* CHARLIE */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">CHARLIE</span>
            <span className="text-green-400">+20 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Click "Mr. Hopper" name in NPCs list</p>
          <p className="text-gray-500 mt-1">Location: NPCs.tsx - NPC World section</p>
          <p className="text-gray-600 italic mt-1">Intel: "The Broker controls information flow in Las Sombras"</p>
        </div>

        {/* DELTA */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">DELTA</span>
            <span className="text-green-400">+15 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Hover over "San Vicente, Palawan" in footer</p>
          <p className="text-gray-500 mt-1">Location: Footer.tsx</p>
          <p className="text-gray-600 italic mt-1">Intel: "Faction analysis: Legion 28, Guard 26, Front 25 operatives"</p>
        </div>

        {/* ECHO */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">ECHO</span>
            <span className="text-green-400">+20 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Type "jungle" anywhere on the site</p>
          <p className="text-gray-500 mt-1">Location: App.tsx - Global keyboard listener</p>
          <p className="text-gray-600 italic mt-1">Intel: "Night operations active. Operatives at 0200 receive bonus intel"</p>
        </div>

        {/* FOXTROT */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">FOXTROT</span>
            <span className="text-green-400">+25 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Visit site between 2:00 AM - 4:00 AM local time</p>
          <p className="text-gray-500 mt-1">Location: Auto-checks every minute in App.tsx</p>
          <p className="text-gray-600 italic mt-1">Intel: "Night Owl operative bonus. The jungle never sleeps."</p>
        </div>

        {/* GOLF */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">GOLF</span>
            <span className="text-green-400">+20 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Share profile link, get 3 unique clicks</p>
          <p className="text-gray-500 mt-1">Location: Recruitment.tsx - Dashboard share feature</p>
          <p className="text-gray-600 italic mt-1">Intel: "Social network analysis: Each recruit strengthens faction"</p>
        </div>

        {/* HOTEL */}
        <div className="bg-black/50 rounded-sm p-3 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gold font-bold">HOTEL</span>
            <span className="text-green-400">+30 pts</span>
          </div>
          <p className="text-gray-400">Trigger: Find hidden HTML comment in page source</p>
          <p className="text-gray-500 mt-1">Location: index.html - Hidden comment</p>
          <p className="text-gray-600 italic mt-1">Intel: "DECRYPTION COMPLETE. 8 files total. Good hunting."</p>
        </div>
      </div>
    </div>

    {/* ACTIVE TRIGGERS STATUS */}
    <div className="bg-gray-900 rounded-sm p-4 border border-white/10">
      <h3 className="text-sm font-mono text-gold/70 tracking-wider uppercase mb-3">
        Implementation Status
      </h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Alpha (Shield clicks)</span>
          <span className="text-green-400">✓ Implemented</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Bravo (Hero "60")</span>
          <span className="text-yellow-400">⚠ Pending</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Charlie (Mr. Hopper)</span>
          <span className="text-yellow-400">⚠ Pending</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Delta (Footer hover)</span>
          <span className="text-yellow-400">⚠ Pending</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Echo (Type "jungle")</span>
          <span className="text-yellow-400">⚠ Pending</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Foxtrot (2-4 AM)</span>
          <span className="text-yellow-400">⚠ Pending</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Golf (Social shares)</span>
          <span className="text-red-400">○ Future feature</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Hotel (Source code)</span>
          <span className="text-red-400">○ Future feature</span>
        </div>
      </div>
    </div>
  </motion.div>
)}
