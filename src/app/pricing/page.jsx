const PricingPage = () => {
  return (
    <div className="py-24 px-6 text-center bg-[#FDFBF9]">
      <h2 className="text-4xl font-black text-[#5D4037]">Simple & Transparent Pricing</h2>
      <p className="mt-4 text-stone-500">Choose a plan that fits your business needs.</p>    
      <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {['Basic', 'Pro', 'Enterprise'].map((plan) => (
          <div key={plan} className="p-8 bg-white border border-orange-100 rounded-[2.5rem] shadow-lg">
            <h3 className="text-xl font-bold">{plan}</h3>
            <p className="text-3xl font-black my-4 text-orange-600">${plan === 'Basic' ? '0' : '49'}</p>
            <button className="w-full py-3 bg-[#5D4037] text-white rounded-full">Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
};