import Image from "next/image";

import Title1 from "@/components/general/Title1";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className=" relative flex h-[90vh] items-center justify-center overflow-hidden">
      <Image
        alt=""
        className="animateMainImage relative z-0 h-full select-none overflow-hidden rounded-b-xl border-b border-dashed border-white/50 object-cover "
        height={1000}
        width={2000}
        src="https://images.unsplash.com/photo-1630230594884-e1a57e130ac9?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="absolute z-10 flex w-full flex-col items-center">
        <div className=" mx-auto w-full text-balance px-8 text-center text-white md:w-1/2">
          <Title1 className="animate-fade-up font-bold drop-shadow-sm">
            clothing for the modern man
          </Title1>
          <p className="animate-fade-up mb-12 text-lg delay-200">
            Sweden based startup aiming to disrupt the clothing market
          </p>
        </div>
        <div className=" flex gap-2 ">
          {/* <Button className="border-2 border-rose-600 bg-rose-600/20 uppercase text-white shadow-lg hover:bg-rose-600/90">
            Learn more
          </Button>
          <Button className="bg-rose-600 uppercase text-white shadow-lg shadow-rose-700 hover:bg-rose-600/90">
            Shop now
          </Button> */}
        </div>
      </div>
    </div>
  );
}
