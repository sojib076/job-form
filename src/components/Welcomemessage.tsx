import { useAppSelector } from '@/redux/Hook';
import { Clock } from 'lucide-react';


const Welcomemessage = () => {
      const user = useAppSelector((state) => state.auth.user);
     const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }
    return (
       <div>
      <div className="bg-gradient-to-r from-sky-600 to-sky-900 rounded-lg p-4 sm:p-6 lg:p-8 text-white  mx-auto my-6 w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 lg:gap-10">
          {/* Text Content */}
          <div className="lg:col-span-2 space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {getCurrentGreeting()}, {user?.name}! 👋
            </h1>
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              {user?.role === "admin"
                ? "Welcome back to your dashboard. Here's what's happening today."
                : "Explore new opportunities and manage your applications here."}
            </p>
          </div>

          {/* Date/Time Display */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 sm:p-4 w-full max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base text-center lg:text-left">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Welcomemessage;